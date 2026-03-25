package com.alejandroferrer.padelbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "jugador")
public class JugadorEntity {

    @Id
    @Column(name = "id_jugador")
    public String idJugador;

    @Column(name = "nombre_completo")
    public String nombreCompleto;

    @Column(name = "nacionalidad")
    public String nacionalidad;

    @Column(name = "mano_dominante")
    public String manoDominante;

    @Column(name = "ranking_fip")
    public int rankingFip;

    @Column(name = "foto_perfil")
    public String fotoPerfil;

    @Column(name = "fecha_actualizacion_ranking")
    public String fechaActualizacionRanking;
    @Column(name = "categoria")
    public String categoria;
    @Column(name = "posicion_juego")
    public String posicionJuego;
}