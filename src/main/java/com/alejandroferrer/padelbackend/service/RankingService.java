package com.alejandroferrer.padelbackend.service;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@Service
public class RankingService {

    private static final Logger logger = LoggerFactory.getLogger(RankingService.class);

    @Autowired
    private JugadorRepository jugadorRepository;

    public void sincronizarRanking() {
        try {
            try (InputStream inputStream = URI
                    .create("https://www.padelfip.com/wp-content/themes/padelfiptheme/cache/rankings/men_master_rev1205.pdf")
                    .toURL()
                    .openStream();
                    PDDocument document = PDDocument.load(inputStream)) {
                PDFTextStripper stripper = new PDFTextStripper();
                String texto = stripper.getText(document);

                procesarTexto(texto);
            }

        } catch (IOException e) {
            logger.error("Error al sincronizar ranking", e);
        }
    }

    private void procesarTexto(String texto) {

        String[] lineas = texto.split("\n");

        for (String linea : lineas) {

            if (linea.matches("^\\d+\\s+.*")) {

                try {
                    String[] partes = linea.trim().split("\\s+");

                    int ranking = Integer.parseInt(partes[0]);

                    // 🔥 Construir nombre correctamente
                    StringBuilder nombreBuilder = new StringBuilder();

                    for (int i = 1; i < partes.length - 1; i++) {
                        nombreBuilder.append(partes[i]).append(" ");
                    }

                    String nombreCompleto = nombreBuilder.toString().trim();

                    // 🔥 Buscar si existe
                    Optional<JugadorEntity> existente =
                            jugadorRepository.findByNombreCompletoAndCategoria(nombreCompleto, "MASCULINO");

                    JugadorEntity jugador;

                    if (existente.isPresent()) {
                        jugador = existente.get(); // UPDATE
                    } else {
                        jugador = new JugadorEntity(); // INSERT
                        jugador.idJugador = UUID.randomUUID().toString();
                        jugador.categoria = "MASCULINO";
                    }

                    // 🔥 SET DATOS
                    jugador.nombreCompleto = nombreCompleto;
                    jugador.rankingFip = ranking;

                    // valores por defecto (para evitar null)
                    if (jugador.nacionalidad == null) jugador.nacionalidad = "DESCONOCIDO";
                    if (jugador.manoDominante == null) jugador.manoDominante = "DERECHA";
                    if (jugador.posicionJuego == null) jugador.posicionJuego = "REVES";

                    jugadorRepository.save(jugador);

                } catch (NumberFormatException e) {
                    // ignorar líneas raras
                }
            }
        }
    }
}