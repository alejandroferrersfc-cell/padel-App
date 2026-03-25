package com.alejandroferrer.padelbackend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alejandroferrer.padelbackend.service.FipRankingSyncService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminSyncController {

    private final FipRankingSyncService syncService;

    public AdminSyncController(FipRankingSyncService syncService) {
        this.syncService = syncService;
    }

    @GetMapping("/sync-ranking-masculino")
    public Map<String, Object> syncMasculino() throws Exception {
        int total = syncService.syncRankingMasculino();
        return Map.of(
                "ok", true,
                "categoria", "MASCULINO",
                "actualizados", total
        );
    }

    @GetMapping("/sync-ranking-femenino")
    public Map<String, Object> syncFemenino() throws Exception {
        int total = syncService.syncRankingFemenino();
        return Map.of(
                "ok", true,
                "categoria", "FEMENINO",
                "actualizados", total
        );
    }
}