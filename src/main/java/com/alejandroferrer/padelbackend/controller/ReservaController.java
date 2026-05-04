package com.alejandroferrer.padelbackend.controller;

import com.alejandroferrer.padelbackend.entity.ReservaEntity;
import com.alejandroferrer.padelbackend.entity.UsuarioEntity;
import com.alejandroferrer.padelbackend.repository.ReservaRepository;
import com.alejandroferrer.padelbackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // DTOs internos para request/response
    public static class ReservaRequest {
        public Long idUsuario;
        public String clubName;
        public String date;
        public String time;
    }

    public static class ReservaResponse {
        public String id;
        public String clubName;
        public String date;
        public String time;

        public ReservaResponse(ReservaEntity entity) {
            this.id = entity.getIdReserva().toString();
            this.clubName = entity.getClubName();
            this.date = entity.getDate();
            this.time = entity.getTime();
        }
    }

    @GetMapping
    public ResponseEntity<List<ReservaResponse>> getReservas(@RequestParam Long userId) {
        List<ReservaEntity> reservas = reservaRepository.findByUsuarioIdUsuarioOrderByCreadoEnDesc(userId);
        List<ReservaResponse> response = reservas.stream().map(ReservaResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createReserva(@RequestBody ReservaRequest req) {
        UsuarioEntity usuario = usuarioRepository.findById(req.idUsuario).orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("{\"error\": \"Usuario no encontrado\"}");
        }

        if (reservaRepository.existsByUsuarioIdUsuarioAndDateAndTime(req.idUsuario, req.date, req.time)) {
            return ResponseEntity.badRequest().body("{\"error\": \"Ya tienes una reserva en esa fecha y hora\"}");
        }

        ReservaEntity reserva = new ReservaEntity();
        reserva.setUsuario(usuario);
        reserva.setClubName(req.clubName);
        reserva.setDate(req.date);
        reserva.setTime(req.time);

        reservaRepository.save(reserva);
        return ResponseEntity.ok(new ReservaResponse(reserva));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReserva(@PathVariable Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
