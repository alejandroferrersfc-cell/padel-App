package com.alejandroferrer.padelbackend.repository;

import com.alejandroferrer.padelbackend.entity.ReservaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<ReservaEntity, Long> {
    
    // Obtener todas las reservas de un usuario específico
    List<ReservaEntity> findByUsuarioIdUsuarioOrderByCreadoEnDesc(Long idUsuario);

    // Comprobar si ya existe una reserva para una fecha y hora concreta (para evitar solapamientos)
    boolean existsByUsuarioIdUsuarioAndDateAndTime(Long idUsuario, String date, String time);
}
