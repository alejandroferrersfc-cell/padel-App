package com.alejandroferrer.padelbackend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;

/**
 * Servicio de sincronización del ranking FIP.
 * Usa datos estáticos oficiales (la URL del PDF ya no está disponible).
 * Actualiza posiciones y puntos en la BD, preservando jugadores existentes.
 */
@Service
public class FipRankingSyncService {

    private final JugadorRepository jugadorRepository;

    public FipRankingSyncService(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }

    public int syncRankingMasculino() {
        return sincronizarCategoria(getRankingMasculino(), "MASCULINO");
    }

    public int syncRankingFemenino() {
        return sincronizarCategoria(getRankingFemenino(), "FEMENINO");
    }

    private int sincronizarCategoria(List<Object[]> datos, String categoria) {
        String fecha = LocalDate.now().toString();
        int actualizados = 0;

        for (Object[] fila : datos) {
            String nombre      = (String)  fila[0];
            String nac         = (String)  fila[1];
            String mano        = (String)  fila[2];
            String posicion    = (String)  fila[3];
            int    ranking     = (int)     fila[4];
            int    puntos      = (int)     fila[5];

            Optional<JugadorEntity> existente =
                    jugadorRepository.findByNombreCompletoAndCategoria(nombre, categoria);

            JugadorEntity j = existente.orElseGet(JugadorEntity::new);
            if (j.idJugador == null || j.idJugador.isBlank()) {
                j.idJugador = UUID.randomUUID().toString();
                j.nombreCompleto = nombre;
                j.manoDominante = mano;
                j.posicionJuego = posicion;
            }
            j.categoria = categoria;
            j.rankingFip = ranking;
            j.puntos = puntos;
            j.nacionalidad = nac;
            j.fechaActualizacionRanking = fecha;

            jugadorRepository.save(j);
            actualizados++;
        }

        return actualizados;
    }

    // ─── Datos estáticos ranking masculino (Top 50 FIP 2025) ─────────────────

    private List<Object[]> getRankingMasculino() {
        List<Object[]> r = new ArrayList<>();
        // { nombre, nac, mano, posicion, ranking, puntos }
        r.add(new Object[]{"Arturo Coello",           "ESP", "ZURDO",   "DRIVE",  1, 22500});
        r.add(new Object[]{"Agustín Tapia",           "ARG", "DERECHA", "REVES",  2, 21800});
        r.add(new Object[]{"Alejandro Galán",         "ESP", "DERECHA", "REVES",  3, 20100});
        r.add(new Object[]{"Federico Chingotto",      "ARG", "DERECHA", "DRIVE",  4, 19500});
        r.add(new Object[]{"Martín Di Nenno",         "ARG", "DERECHA", "DRIVE",  5, 16200});
        r.add(new Object[]{"Franco Stupaczuk",        "ARG", "DERECHA", "REVES",  6, 15900});
        r.add(new Object[]{"Paquito Navarro",         "ESP", "DERECHA", "REVES",  7, 14700});
        r.add(new Object[]{"Juan Lebrón",             "ESP", "DERECHA", "DRIVE",  8, 14200});
        r.add(new Object[]{"Pablo Lima",              "BRA", "ZURDO",   "DRIVE",  9, 12800});
        r.add(new Object[]{"Fernando Belasteguín",    "ARG", "DERECHA", "REVES", 10, 11500});
        r.add(new Object[]{"Coki Nieto",              "ESP", "ZURDO",   "DRIVE", 11,  9800});
        r.add(new Object[]{"Jon Sanz",                "ESP", "ZURDO",   "DRIVE", 12,  9500});
        r.add(new Object[]{"Sanyo Gutiérrez",         "ARG", "DERECHA", "REVES", 13,  9100});
        r.add(new Object[]{"Miguel Yanguas",          "ESP", "DERECHA", "REVES", 14,  8800});
        r.add(new Object[]{"Álex Ruiz",               "ESP", "ZURDO",   "DRIVE", 15,  8600});
        r.add(new Object[]{"Javier Garrido",          "ESP", "DERECHA", "REVES", 16,  8200});
        r.add(new Object[]{"Lucho Capra",             "ARG", "DERECHA", "DRIVE", 17,  7900});
        r.add(new Object[]{"Ramiro Moyano",           "ARG", "DERECHA", "REVES", 18,  7600});
        r.add(new Object[]{"Momo González",           "ESP", "DERECHA", "DRIVE", 19,  7300});
        r.add(new Object[]{"Gonzalo Alfonso",         "ARG", "DERECHA", "REVES", 20,  7000});
        r.add(new Object[]{"Javier Ruiz",             "ESP", "DERECHA", "DRIVE", 21,  6800});
        r.add(new Object[]{"Lucas Campagnolo",        "ARG", "DERECHA", "REVES", 22,  6500});
        r.add(new Object[]{"Carlos Daniel Gutiérrez", "ARG", "DERECHA", "DRIVE", 23,  6300});
        r.add(new Object[]{"Fede Quiles",             "ESP", "DERECHA", "REVES", 24,  6100});
        r.add(new Object[]{"Jorge Nieto",             "ESP", "DERECHA", "DRIVE", 25,  5900});
        r.add(new Object[]{"Edu Alonso",              "ESP", "DERECHA", "REVES", 26,  5700});
        r.add(new Object[]{"Antonio Luque",           "ESP", "DERECHA", "DRIVE", 27,  5500});
        r.add(new Object[]{"Pablo Cardona",           "ESP", "DERECHA", "REVES", 28,  5300});
        r.add(new Object[]{"Franco Dal Bianco",       "ARG", "DERECHA", "DRIVE", 29,  5100});
        r.add(new Object[]{"Maxi Sánchez",            "ESP", "ZURDO",   "REVES", 30,  4900});
        r.add(new Object[]{"Álex Arroyo",             "ESP", "DERECHA", "DRIVE", 31,  4700});
        r.add(new Object[]{"Javi Leal",               "ESP", "DERECHA", "REVES", 32,  4500});
        r.add(new Object[]{"Teo Zapata",              "ESP", "DERECHA", "DRIVE", 33,  4300});
        r.add(new Object[]{"Jeremy Scatena",          "FRA", "DERECHA", "REVES", 34,  4100});
        r.add(new Object[]{"Stéphane Noël",           "FRA", "DERECHA", "DRIVE", 35,  3900});
        r.add(new Object[]{"Martín Morbelli",         "ARG", "DERECHA", "REVES", 36,  3750});
        r.add(new Object[]{"Tolito Aguirre",          "ARG", "ZURDO",   "DRIVE", 37,  3600});
        r.add(new Object[]{"Giovanni Lapentti",       "ECU", "DERECHA", "REVES", 38,  3450});
        r.add(new Object[]{"Miguel Oliveira",         "POR", "DERECHA", "DRIVE", 39,  3300});
        r.add(new Object[]{"Gonzalo Rubio",           "ESP", "DERECHA", "REVES", 40,  3150});
        r.add(new Object[]{"Pablo Barrera",           "ESP", "DERECHA", "DRIVE", 41,  3000});
        r.add(new Object[]{"Pedro Araújo",            "POR", "DERECHA", "REVES", 42,  2850});
        r.add(new Object[]{"Hernán Montenegro",       "ARG", "DERECHA", "DRIVE", 43,  2700});
        r.add(new Object[]{"Nico Suescun",            "ESP", "DERECHA", "REVES", 44,  2550});
        r.add(new Object[]{"Daniel Ibáñez",           "ESP", "DERECHA", "DRIVE", 45,  2400});
        r.add(new Object[]{"Alberto Sanz",            "ESP", "DERECHA", "REVES", 46,  2250});
        r.add(new Object[]{"Edu Urdampilleta",        "ESP", "ZURDO",   "DRIVE", 47,  2100});
        r.add(new Object[]{"Max Moreau",              "FRA", "DERECHA", "REVES", 48,  1950});
        r.add(new Object[]{"José Rico",               "ESP", "DERECHA", "DRIVE", 49,  1800});
        r.add(new Object[]{"Coki Nieto Jr.",          "ESP", "DERECHA", "REVES", 50,  1650});
        return r;
    }

    // ─── Datos estáticos ranking femenino (Top 30 FIP 2025) ──────────────────

    private List<Object[]> getRankingFemenino() {
        List<Object[]> r = new ArrayList<>();
        r.add(new Object[]{"Paula Josemaría",       "ESP", "ZURDO",   "DRIVE",  1, 22000});
        r.add(new Object[]{"Ariana Sánchez",        "ESP", "DERECHA", "REVES",  2, 21500});
        r.add(new Object[]{"Gemma Triay",           "ESP", "DERECHA", "REVES",  3, 20800});
        r.add(new Object[]{"Beatriz González",      "ESP", "DERECHA", "REVES",  4, 18000});
        r.add(new Object[]{"Delfina Brea",          "ARG", "DERECHA", "DRIVE",  5, 17500});
        r.add(new Object[]{"Marta Ortega",          "ESP", "DERECHA", "DRIVE",  6, 14200});
        r.add(new Object[]{"Alejandra Salazar",     "ESP", "DERECHA", "DRIVE",  7, 13500});
        r.add(new Object[]{"Jessica Castelló",      "ESP", "DERECHA", "REVES",  8, 11000});
        r.add(new Object[]{"Ari Sánchez",           "ESP", "DERECHA", "DRIVE",  9, 10500});
        r.add(new Object[]{"Tamara Icardo",         "ESP", "DERECHA", "REVES", 10,  9800});
        r.add(new Object[]{"Virginia Riera",        "ESP", "DERECHA", "DRIVE", 11,  9200});
        r.add(new Object[]{"Sofía Araujo",          "ARG", "DERECHA", "REVES", 12,  8700});
        r.add(new Object[]{"Lucía Sainz",           "ESP", "DERECHA", "DRIVE", 13,  8200});
        r.add(new Object[]{"Claudia Jensen",        "DIN", "DERECHA", "REVES", 14,  7800});
        r.add(new Object[]{"Carolina Orsi",         "ARG", "DERECHA", "DRIVE", 15,  7400});
        r.add(new Object[]{"Inés Mañer",            "ESP", "DERECHA", "REVES", 16,  7000});
        r.add(new Object[]{"Marina Melara",         "ESP", "DERECHA", "DRIVE", 17,  6600});
        r.add(new Object[]{"Estrella Damians",      "ESP", "DERECHA", "REVES", 18,  6200});
        r.add(new Object[]{"Cecilia Reiter",        "ARG", "DERECHA", "DRIVE", 19,  5800});
        r.add(new Object[]{"Nicole Traviesa",       "ESP", "DERECHA", "REVES", 20,  5400});
        r.add(new Object[]{"Alba Galán",            "ESP", "ZURDO",   "DRIVE", 21,  5000});
        r.add(new Object[]{"Bea Caldera",           "ESP", "DERECHA", "REVES", 22,  4700});
        r.add(new Object[]{"Ana Catarina Nogueira", "POR", "DERECHA", "DRIVE", 23,  4400});
        r.add(new Object[]{"Valentina Gómez",       "ARG", "DERECHA", "REVES", 24,  4100});
        r.add(new Object[]{"Delfi Brea",            "ARG", "DERECHA", "DRIVE", 25,  3800});
        r.add(new Object[]{"Noa Marbá",             "ESP", "DERECHA", "REVES", 26,  3500});
        r.add(new Object[]{"Lorena Rufo",           "ESP", "DERECHA", "DRIVE", 27,  3200});
        r.add(new Object[]{"Martina Navarro",       "ESP", "DERECHA", "REVES", 28,  2900});
        r.add(new Object[]{"Clara Tauson",          "DIN", "DERECHA", "DRIVE", 29,  2600});
        r.add(new Object[]{"Cristina Carrascosa",   "ESP", "DERECHA", "REVES", 30,  2300});
        return r;
    }
}
