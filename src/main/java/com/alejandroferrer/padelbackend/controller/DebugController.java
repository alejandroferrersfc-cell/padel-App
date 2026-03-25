package com.alejandroferrer.padelbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DebugController {

    private final JdbcTemplate jdbcTemplate;

    public DebugController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/api/debug")
    public Map<String, Object> debug() {
        Map<String, Object> datos = new HashMap<>();

        String bdActual = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
        Integer totalJugadores = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM jugador", Integer.class);

        datos.put("baseDeDatos", bdActual);
        datos.put("totalJugadores", totalJugadores);

        return datos;
    }
}