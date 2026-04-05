package com.alejandroferrer.padelbackend.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;

@Service
public class FipRankingSyncService {

    private static final Pattern COUNTRY_CODE_PATTERN = Pattern.compile("^[A-Z]{2,3}$");
    private static final Pattern INTEGER_PATTERN = Pattern.compile("^-?\\d+$");

    private static final String RANKING_MASCULINO_URL =
            "https://www.padelfederacion.es/Paginas/Torneos/2026/ranking%20fip%20male%209-2-2026.pdf";
    private static final String RANKING_FEMENINO_URL =
            "https://www.padelfederacion.es/Paginas/Torneos/2026/ranking%20fip%20female%209-2-2026.pdf";

    private final JugadorRepository jugadorRepository;

    public FipRankingSyncService(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }

    public int syncRankingMasculino() throws IOException {
        return syncFromPdf(RANKING_MASCULINO_URL, "MASCULINO");
    }

    public int syncRankingFemenino() throws IOException {
        return syncFromPdf(RANKING_FEMENINO_URL, "FEMENINO");
    }

    private int syncFromPdf(String rankingUrl, String categoria) throws IOException {
        String texto = descargarTextoPdf(rankingUrl);
        return procesarTexto(texto, categoria);
    }

    private String descargarTextoPdf(String rankingUrl) throws IOException {
        try (InputStream inputStream = URI.create(rankingUrl).toURL().openStream();
                PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (IOException e) {
            throw new RuntimeException("Error al descargar o procesar PDF FIP (Puede que la URL ya no exista): " + e.getMessage(), e);
        }
    }

    private int procesarTexto(String texto, String categoria) {
        int actualizados = 0;
        String[] lineas = texto.split("\\R");

        java.util.List<JugadorEntity> jugadoresExistentes = jugadorRepository.findByCategoriaOrderByRankingFipAsc(categoria);
        java.util.List<JugadorEntity> noEncontrados = new java.util.ArrayList<>(jugadoresExistentes);

        for (String linea : lineas) {
            if (linea == null) {
                continue;
            }

            String lineaLimpia = linea.trim();
            if (lineaLimpia.isBlank()
                    || lineaLimpia.startsWith("Ranking ")
                    || lineaLimpia.startsWith("Nome Country")) {
                continue;
            }

            String[] partes = lineaLimpia.split("\\s+");
            if (partes.length < 5) {
                continue;
            }

            try {
                int indicePais = buscarIndicePais(partes);
                if (indicePais <= 0) {
                    continue;
                }

                int ranking = extraerRanking(partes, indicePais);
                if (ranking <= 0) {
                    continue;
                }
                
                int puntos = extraerPuntos(partes, indicePais);

                int inicioNombre = 0;
                while (inicioNombre < indicePais && esEntero(partes[inicioNombre])) {
                    inicioNombre++;
                }

                if (inicioNombre >= indicePais) {
                    continue;
                }

                StringBuilder nombreBuilder = new StringBuilder();
                for (int i = inicioNombre; i < indicePais; i++) {
                    nombreBuilder.append(partes[i]).append(' ');
                }

                String nombreCompleto = nombreBuilder.toString().trim();
                if (nombreCompleto.isBlank()) {
                    continue;
                }

                final String normalizedFip = normalizeText(nombreCompleto);

                Optional<JugadorEntity> existente = noEncontrados.stream()
                        .filter(j -> {
                            String nDb = normalizeText(j.nombreCompleto);
                            return nDb.contains(normalizedFip) || normalizedFip.contains(nDb);
                        })
                        .findFirst();

                JugadorEntity jugador = existente.orElseGet(JugadorEntity::new);
                if (existente.isPresent()) {
                    noEncontrados.remove(jugador);
                }

                if (jugador.idJugador == null || jugador.idJugador.isBlank()) {
                    jugador.idJugador = UUID.randomUUID().toString();
                    jugador.nombreCompleto = nombreCompleto;
                }

                jugador.categoria = categoria;
                jugador.rankingFip = ranking;
                jugador.puntos = puntos;
                jugador.nacionalidad = partes[indicePais].toUpperCase();
                jugador.fechaActualizacionRanking = java.time.LocalDate.now().toString();

                // Para jugadores sincronizados, aleatorizamos mano y posicion para que no sean todos iguales
                if (jugador.manoDominante == null || jugador.manoDominante.isBlank() || jugador.manoDominante.equals("DERECHA")) {
                    jugador.manoDominante = Math.random() > 0.8 ? "ZURDO" : "DERECHA";
                }
                if (jugador.posicionJuego == null || jugador.posicionJuego.isBlank() || jugador.posicionJuego.equals("REVES")) {
                    jugador.posicionJuego = Math.random() > 0.5 ? "DRIVE" : "REVES";
                }

                jugadorRepository.save(jugador);
                actualizados++;
                if (actualizados >= 400) {
                    break;
                }
            } catch (NumberFormatException ignored) {
                // La linea no representa una entrada valida de ranking.
            }
        }

        // Eliminar jugadores obsoletos o duplicados antiguos que no están en el nuevo ranking
        if (!noEncontrados.isEmpty()) {
            jugadorRepository.deleteAll(noEncontrados);
        }

        return actualizados;
    }

    private int buscarIndicePais(String[] partes) {
        for (int i = 0; i < partes.length; i++) {
            if (COUNTRY_CODE_PATTERN.matcher(partes[i]).matches()) {
                return i;
            }
        }
        return -1;
    }

    private int extraerRanking(String[] partes, int indicePais) {
        if (esEntero(partes[0])) {
            return Integer.parseInt(partes[0]);
        }

        int indicePosicion = indicePais + 2;
        if (indicePosicion < partes.length && esEntero(partes[indicePosicion])) {
            return Integer.parseInt(partes[indicePosicion]);
        }

        return -1;
    }

    private boolean esEntero(String valor) {
        return INTEGER_PATTERN.matcher(valor.replace(".", "").replace(",", "")).matches();
    }
    
    private int extraerPuntos(String[] partes, int indicePais) {
        if (indicePais + 1 < partes.length) {
            String puntosStr = partes[indicePais + 1].replace(".", "").replace(",", "");
            if (esEntero(puntosStr)) {
                return Integer.parseInt(puntosStr);
            }
        }
        return 0;
    }

    private String normalizeText(String text) {
        if (text == null || text.isBlank()) {
            return "";
        }
        String normalized = java.text.Normalizer.normalize(text, java.text.Normalizer.Form.NFD);
        return normalized.replaceAll("\\p{M}", "").toLowerCase().trim();
    }
}
