package com.alejandroferrer.padelbackend.repository;

import com.alejandroferrer.padelbackend.entity.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {
    Optional<UsuarioEntity> findByNombreUsuario(String nombreUsuario);
    Optional<UsuarioEntity> findByEmail(String email);
    boolean existsByNombreUsuario(String nombreUsuario);
    boolean existsByEmail(String email);
}