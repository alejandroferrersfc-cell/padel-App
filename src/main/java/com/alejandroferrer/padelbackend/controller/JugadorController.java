package com.alejandroferrer.padelbackend.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Pageable pageable = limit != null && limit > 0 ? PageRequest.of(0, limit) : Pageable.unpaged();

        if (tieneCategoria && tieneNacionalidad) {
            return jugadorRepository.findByCategoriaAndNacionalidadIgnoreCaseOrderByRankingFipAsc(categoria, nacionalidad, pageable);
        }
        if (tieneCategoria) {
            return jugadorRepository.findByCategoriaOrderByRankingFipAsc(categoria, pageable);
        }
        if (tieneNacionalidad) {
            return jugadorRepository.findByNacionalidadIgnoreCaseOrderByRankingFipAsc(nacionalidad, pageable);
        }
        return jugadorRepository.findAllByOrderByRankingFipAsc(pageable);
    }
}
