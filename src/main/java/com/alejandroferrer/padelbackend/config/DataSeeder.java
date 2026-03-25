package com.alejandroferrer.padelbackend.config;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;

@Configuration
public class DataSeeder implements CommandLineRunner {

    private final JugadorRepository jugadorRepository;

    public DataSeeder(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // En cada arranque limpiamos y repoblamos para asegurar que el ranking inicial sea correcto
        // Esto es util porque se usa H2 o MySQL con ddl-auto=update para testing.
        System.out.println("Limpiando y repoblando base de datos con jugadores oficiales...");
        jugadorRepository.deleteAll();

        String fechaActual = LocalDate.now().toString();

        List<JugadorEntity> jugadoresIniciales = List.of(
            // MASCULINO
            crearJugador("Arturo Coello", "es", "ZURDO", "DRIVE", 1, 14500, "MASCULINO", fechaActual),
            crearJugador("Agustín Tapia", "ar", "DERECHA", "REVES", 2, 14200, "MASCULINO", fechaActual),
            crearJugador("Alejandro Galán", "es", "DERECHA", "REVES", 3, 13800, "MASCULINO", fechaActual),
            crearJugador("Federico Chingotto", "ar", "DERECHA", "DRIVE", 4, 13500, "MASCULINO", fechaActual),
            crearJugador("Martín Di Nenno", "ar", "DERECHA", "DRIVE", 5, 11000, "MASCULINO", fechaActual),
            crearJugador("Franco Stupaczuk", "ar", "DERECHA", "REVES", 6, 10800, "MASCULINO", fechaActual),
            crearJugador("Paquito Navarro", "es", "DERECHA", "REVES", 7, 9500, "MASCULINO", fechaActual),
            crearJugador("Juan Lebrón", "es", "DERECHA", "DRIVE", 8, 9200, "MASCULINO", fechaActual),
            crearJugador("Pablo Lima", "br", "ZURDO", "DRIVE", 9, 8000, "MASCULINO", fechaActual),
            crearJugador("Fernando Belasteguín", "ar", "DERECHA", "REVES", 10, 7500, "MASCULINO", fechaActual),
            crearJugador("Coki Nieto", "es", "ZURDO", "DRIVE", 11, 6000, "MASCULINO", fechaActual),
            crearJugador("Jon Sanz", "es", "ZURDO", "DRIVE", 12, 5800, "MASCULINO", fechaActual),
            
            // FEMENINO
            crearJugador("Paula Josemaría", "es", "ZURDO", "DRIVE", 1, 15000, "FEMENINO", fechaActual),
            crearJugador("Ariana Sánchez", "es", "DERECHA", "REVES", 2, 14800, "FEMENINO", fechaActual),
            crearJugador("Gemma Triay", "es", "DERECHA", "REVES", 3, 13500, "FEMENINO", fechaActual),
            crearJugador("Beatriz González", "es", "DERECHA", "REVES", 4, 12000, "FEMENINO", fechaActual),
            crearJugador("Delfina Brea", "ar", "DERECHA", "DRIVE", 5, 11800, "FEMENINO", fechaActual),
            crearJugador("Marta Ortega", "es", "DERECHA", "DRIVE", 6, 9500, "FEMENINO", fechaActual),
            crearJugador("Alejandra Salazar", "es", "DERECHA", "DRIVE", 7, 8500, "FEMENINO", fechaActual),
            crearJugador("Jessica Castelló", "es", "DERECHA", "REVES", 8, 7000, "FEMENINO", fechaActual)
        );

        jugadorRepository.saveAll(jugadoresIniciales);
        System.out.println("Base de datos poblada con jugadores de puntuacion real.");
    }

    private JugadorEntity crearJugador(String nombre, String nacionalidad, String mano, String posicion, int ranking, int puntos, String categoria, String fecha) {
        JugadorEntity j = new JugadorEntity();
        j.idJugador = UUID.randomUUID().toString();
        j.nombreCompleto = nombre;
        j.nacionalidad = nacionalidad;
        j.manoDominante = mano;
        j.posicionJuego = posicion;
        j.rankingFip = ranking; // Posicion FIP (1, 2, 3...)
        j.puntos = puntos;      // Puntos reales
        j.categoria = categoria;
        j.fechaActualizacionRanking = fecha;
        return j;
    }
}
