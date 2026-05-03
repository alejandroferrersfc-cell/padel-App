package com.alejandroferrer.padelbackend.config;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;

/**
 * Carga jugadores desde CSV si la tabla está vacía.
 * Formato CSV: nombre;nac;mano;posicion;ranking;puntos;categoria
 */
@Configuration
public class DataSeeder implements CommandLineRunner {

    private final JugadorRepository jugadorRepository;

    public DataSeeder(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        long count = jugadorRepository.count();
        if (count > 0) {
            System.out.println("[DataSeeder] BD ya tiene " + count + " jugadores. Omitiendo seed.");
            return;
        }
        System.out.println("[DataSeeder] Tabla vacía. Cargando jugadores desde CSV...");
        String fecha = LocalDate.now().toString();
        List<JugadorEntity> lista = new ArrayList<>();
        lista.addAll(cargarCsv("data/jugadores_masc.csv", fecha));
        lista.addAll(cargarCsv("data/jugadores_fem.csv", fecha));
        jugadorRepository.saveAll(lista);
        System.out.println("[DataSeeder] ✅ " + lista.size() + " jugadores insertados.");
    }

    private List<JugadorEntity> cargarCsv(String ruta, String fecha) {
        List<JugadorEntity> lista = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                new ClassPathResource(ruta).getInputStream(), StandardCharsets.UTF_8))) {
            String linea;
            boolean primera = true;
            while ((linea = br.readLine()) != null) {
                if (primera) { primera = false; continue; } // saltar cabecera
                linea = linea.trim();
                if (linea.isBlank()) continue;
                String[] p = linea.split(";", -1);
                if (p.length < 7) continue;
                JugadorEntity e = new JugadorEntity();
                e.idJugador = UUID.randomUUID().toString();
                e.nombreCompleto = p[0].trim();
                e.nacionalidad = p[1].trim();
                e.manoDominante = p[2].trim();
                e.posicionJuego = p[3].trim();
                e.rankingFip = Integer.parseInt(p[4].trim());
                e.puntos = Integer.parseInt(p[5].trim());
                e.categoria = p[6].trim();
                e.fechaActualizacionRanking = fecha;
                lista.add(e);
            }
        } catch (Exception ex) {
            System.err.println("[DataSeeder] Error leyendo " + ruta + ": " + ex.getMessage());
        }
        return lista;
    }
}
