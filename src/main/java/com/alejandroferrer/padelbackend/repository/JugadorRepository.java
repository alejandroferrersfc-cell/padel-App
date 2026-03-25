package com.alejandroferrer.padelbackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.alejandroferrer.padelbackend.entity.JugadorEntity;

public interface JugadorRepository extends JpaRepository<JugadorEntity, String> {

    Optional<JugadorEntity> findByNombreCompletoAndCategoria(String nombreCompleto, String categoria);

    List<JugadorEntity> findAllByOrderByRankingFipAsc();
    List<JugadorEntity> findAllByOrderByRankingFipAsc(Pageable pageable);

    List<JugadorEntity> findByCategoriaOrderByRankingFipAsc(String categoria);
    List<JugadorEntity> findByCategoriaOrderByRankingFipAsc(String categoria, Pageable pageable);

    List<JugadorEntity> findByNacionalidadIgnoreCaseOrderByRankingFipAsc(String nacionalidad);
    List<JugadorEntity> findByNacionalidadIgnoreCaseOrderByRankingFipAsc(String nacionalidad, Pageable pageable);

    List<JugadorEntity> findByCategoriaAndNacionalidadIgnoreCaseOrderByRankingFipAsc(String categoria, String nacionalidad);
    List<JugadorEntity> findByCategoriaAndNacionalidadIgnoreCaseOrderByRankingFipAsc(String categoria, String nacionalidad, Pageable pageable);
}