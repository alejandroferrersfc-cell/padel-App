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
            "https://www.padelfip.com/wp-content/themes/padelfiptheme/cache/rankings/men_master_rev1205.pdf";
    private static final String RANKING_FEMENINO_URL =
            "https://www.padelfip.com/wp-content/themes/padelfiptheme/cache/rankings/women_master_rev1205.pdf";

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

                Optional<JugadorEntity> existente =
                        jugadorRepository.findByNombreCompletoAndCategoria(nombreCompleto, categoria);

                JugadorEntity jugador = existente.orElseGet(JugadorEntity::new);
                if (jugador.idJugador == null || jugador.idJugador.isBlank()) {
                    jugador.idJugador = UUID.randomUUID().toString();
                }

                jugador.nombreCompleto = nombreCompleto;
                jugador.categoria = categoria;
                jugador.rankingFip = ranking;
                jugador.puntos = puntos;

                if (jugador.nacionalidad == null || jugador.nacionalidad.isBlank()) {
                    jugador.nacionalidad = "DESCONOCIDO";
                }
                if (jugador.manoDominante == null || jugador.manoDominante.isBlank()) {
                    jugador.manoDominante = "DERECHA";
                }
                if (jugador.posicionJuego == null || jugador.posicionJuego.isBlank()) {
                    jugador.posicionJuego = "REVES";
                }

                jugadorRepository.save(jugador);
                actualizados++;
            } catch (NumberFormatException ignored) {
                // La linea no representa una entrada valida de ranking.
            }
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
}
