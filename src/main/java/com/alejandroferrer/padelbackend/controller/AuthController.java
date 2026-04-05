package com.alejandroferrer.padelbackend.controller;

import com.alejandroferrer.padelbackend.entity.UsuarioEntity;
import com.alejandroferrer.padelbackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String nombreUsuario = body.get("nombreUsuario");
        String email = body.get("email");
        String password = body.get("password");

        if (nombreUsuario == null || email == null || password == null ||
            nombreUsuario.isBlank() || email.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Todos los campos son obligatorios."));
        }
        if (password.length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "La contraseña debe tener al menos 6 caracteres."));
        }

        try {
            UsuarioEntity usuario = authService.registrar(nombreUsuario, email, password);
            return ResponseEntity.ok(Map.of(
                "mensaje", "Registro exitoso",
                "nombreUsuario", usuario.getNombreUsuario(),
                "idUsuario", usuario.getIdUsuario()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String identificador = body.get("identificador");
        String password = body.get("password");

        if (identificador == null || password == null || identificador.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuario/email y contraseña son obligatorios."));
        }

        Optional<UsuarioEntity> usuario = authService.login(identificador, password);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(Map.of(
                "mensaje", "Login exitoso",
                "nombreUsuario", usuario.get().getNombreUsuario(),
                "idUsuario", usuario.get().getIdUsuario()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("mensaje", "Sesión cerrada."));
    }
}