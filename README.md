# 🏓 PadelPro App

Aplicación web full-stack para seguimiento del circuito profesional de pádel. Permite consultar el ranking mundial, interactuar con equipamiento de jugadores profesionales, jugar al Padel Wordle diario y mucho más — con sistema completo de autenticación de usuarios.

---

## 🚀 Tecnologías Utilizadas

| Capa | Tecnología |
|---|---|
| **Backend** | Java 17, Spring Boot 3.4 (Web, Data JPA, Security Crypto) |
| **Base de Datos** | MySQL (producción), H2 (pruebas) |
| **Frontend** | HTML5, CSS3, JavaScript Vanilla (SPA sin frameworks) |
| **Build** | Maven |

---

## ✅ Funcionalidades Implementadas

### 🔐 Sistema de Autenticación (Nuevo en A8)
- Registro de usuarios con nombre, email y contraseña (mínimo 6 caracteres)
- Inicio de sesión con usuario o email
- Contraseñas cifradas con **BCrypt**
- Sesión persistida en `localStorage`
- **Acceso restringido**: sin sesión solo se puede ver el Ranking; con sesión acceso completo
- Botón de cerrar sesión en el sidebar con nombre del usuario visible
- Modal animado con pestañas Login / Registro
- Opción de continuar como invitado

### 🖼️ Equipamiento con Hotspots Interactivos (Nuevo en A8)
- Fotos reales de jugadores del Top 10 mundial (Coello, Tapia, Paquito, Chingotto, Yanguas)
- **Puntos interactivos (hotspots)** posicionados sobre cada producto en la fotografía
- Tooltip con nombre del producto y precio al hacer hover
- Clic en hotspot → añade directamente a la Wishlist
- Selector de jugador para navegar entre los 5 profesionales

### ❤️ Wishlist Funcional (Nuevo en A8)
- Añadir/eliminar productos desde los hotspots de equipamiento
- Persistencia en `localStorage` (sobrevive al cierre del navegador)
- Botón de compra directa a la web oficial de cada marca
- Aviso si el artículo ya está en la lista

### 🏆 Ranking Mundial
- Visualización del ranking FIP masculino y femenino
- Filtros por categoría, nacionalidad, mano dominante y posición en pista
- Sincronización con datos del circuito FIP

### 🎮 Padel Wordle Diario
- Adivina el apellido de un jugador del Top 20
- Mecánica de colores (verde/amarillo/gris) con feedback visual
- Teclado virtual integrado

### 📺 Torneos en Directo
- Visualización de partidos en curso
- Predicción de resultado basada en ranking

### 📍 Reservar Pista
- Localización de clubes cercanos por geolocalización

---

## 🔧 Requisitos Previos

- Java Development Kit (JDK) 17 o superior
- Maven 3.8+
- MySQL Server

---

## 📦 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/alejandroferrersfc-cell/padel-App.git
cd padel-App
```

### 2. Crear la base de datos MySQL
```sql
CREATE DATABASE IF NOT EXISTS plataforma_padel;
USE plataforma_padel;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurar `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/plataforma_padel?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA
```

### 4. Arrancar el servidor
```bash
mvn spring-boot:run
```

### 5. Abrir en el navegador
```
http://localhost:8080
```

---

## 🗂️ Estructura del Proyecto

```
src/
├── main/
│   ├── java/com/alejandroferrer/padelbackend/
│   │   ├── controller/
│   │   │   ├── AuthController.java       ← Endpoints /api/auth/*
│   │   │   ├── JugadorController.java
│   │   │   └── AdminSyncController.java
│   │   ├── entity/
│   │   │   ├── UsuarioEntity.java        ← Entidad usuario
│   │   │   └── JugadorEntity.java
│   │   ├── repository/
│   │   │   ├── UsuarioRepository.java
│   │   │   └── JugadorRepository.java
│   │   └── service/
│   │       ├── AuthService.java          ← Lógica BCrypt
│   │       └── RankingService.java
│   └── resources/
│       └── static/
│           ├── css/
│           │   ├── styles.css
│           │   ├── components.css
│           │   └── auth.css              ← Estilos modal auth
│           ├── js/
│           │   ├── app.js                ← Router + control sesión
│           │   ├── auth.js               ← Gestión sesión/modal
│           │   ├── ranking.js
│           │   ├── equipment.js          ← Hotspots interactivos
│           │   ├── wishlist.js           ← Lista de deseos
│           │   ├── wordle.js
│           │   ├── live.js
│           │   └── booking.js
│           └── index.html
sql/
└── create_usuario.sql
```

---

## 🔌 API REST

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de nuevo usuario |
| `POST` | `/api/auth/login` | Inicio de sesión |
| `POST` | `/api/auth/logout` | Cierre de sesión |
| `GET` | `/api/jugadores` | Listado del ranking |
| `POST` | `/api/admin/sync/masculino` | Sincronizar ranking FIP masculino |
| `POST` | `/api/admin/sync/femenino` | Sincronizar ranking FIP femenino |

---

## 🔮 Funcionalidades Pendientes (A9)

- [ ] Sistema de reserva de pistas con mapa y geolocalización real
- [ ] Historial de partidos guardado en base de datos por usuario
- [ ] Perfil de usuario editable
- [ ] Tokens JWT para autenticación stateless

---

## 👤 Autor

- **Nombre:** Alejandro Ferrer
- **Curso:** Desarrollo de Aplicaciones Multiplataforma (DAM) — 2º curso 2025/2026
- **Módulo:** Proyecto Intermodular — RA4 / A8