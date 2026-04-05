package com.alejandroferrer.padelbackend.service;

import com.alejandroferrer.padelbackend.entity.UsuarioEntity;
import com.alejandroferrer.padelbackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioEntity registrar(String nombreUsuario, String email, String password) {
        if (usuarioRepository.existsByNombreUsuario(nombreUsuario)) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso.");
        }
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya está registrado.");
        }
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setNombreUsuario(nombreUsuario);
        usuario.setEmail(email);
        usuario.setPasswordHash(passwordEncoder.encode(password));
        return usuarioRepository.save(usuario);
    }

    public Optional<UsuarioEntity> login(String identificador, String password) {
        Optional<UsuarioEntity> usuario = usuarioRepository.findByNombreUsuario(identificador);
        if (usuario.isEmpty()) {
            usuario = usuarioRepository.findByEmail(identificador);
        }
        if (usuario.isPresent() && passwordEncoder.matches(password, usuario.get().getPasswordHash())) {
            return usuario;
        }
        return Optional.empty();
    }
}