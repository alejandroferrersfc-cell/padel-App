package com.alejandroferrer.padelbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;
import com.alejandroferrer.padelbackend.repository.JugadorRepository;

@RestController
@CrossOrigin(origins = "*")
public class JugadorController {

    private final JugadorRepository jugadorRepository;

    public JugadorController(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }

    @GetMapping("/api/jugadores")
    public List<JugadorEntity> getJugadores(
            @RequestParam(name = "categoria", required = false) String categoria,
            @RequestParam(name = "nacionalidad", required = false) String nacionalidad,
            @RequestParam(name = "limit", required = false) Integer limit) {

        boolean tieneCategoria = categoria != null && !categoria.isBlank();
        boolean tieneNacionalidad = nacionalidad != null && !nacionalidad.isBlank();
        

        if (tieneCategoria && tieneNacionalidad) {
            return jugadorRepository.findByCategoriaAndNacionalidadIgnoreCaseOrderByRankingFipAsc(categoria, nacionalidad);
        }
        if (tieneCategoria) {
            return jugadorRepository.findByCategoriaOrderByRankingFipAsc(categoria);
        }
        if (tieneNacionalidad) {
            return jugadorRepository.findByNacionalidadIgnoreCaseOrderByRankingFipAsc(nacionalidad );
        }
        return jugadorRepository.findAllByOrderByRankingFipAsc();
    }
}
