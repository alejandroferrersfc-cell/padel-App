# 🏓 PadelPro Backend — Documentación Técnica

**Proyecto:** PadelPro App | **Desarrollador:** Alejandro Ferrer | **Año:** 2º DAM 2025/2026

## 📋 Índice

1. [Visión General](#visión-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Entidades y Base de Datos](#entidades-y-base-de-datos)
6. [API REST — Endpoints](#api-rest--endpoints)
7. [Servicios Principales](#servicios-principales)
8. [Características Implementadas](#características-implementadas)
9. [Guía de Desarrollo](#guía-de-desarrollo)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Visión General

**PadelPro App** es una aplicación web full-stack que proporciona:

- **Ranking mundial FIP** de pádel (masculino/femenino) con filtros avanzados
- **Torneos en directo** con marcadores y predicciones IA
- **Reserva de pistas** con geolocalización y radio de búsqueda ajustable
- **Equipamiento profesional** interactivo con hotspots
- **Padel Wordle** diario — juego de adivinanzas con apellidos de jugadores
- **Gestión de cuenta** con autenticación segura

### Arquitectura

- **Backend:** Spring Boot 3.4.0 (Java 17/21)
- **Frontend:** SPA servida desde Spring Boot (HTML5, CSS3, ES6+ JavaScript)
- **Base de datos:** H2 en memoria (desarrollo), MySQL en producción
- **ORM:** Hibernate/Spring Data JPA

---

## 🛠 Stack Tecnológico

| Componente | Versión | Propósito |
|---|---|---|
| Java | 17/21 LTS | Lenguaje principal |
| Spring Boot | 3.4.0 | Framework web, IoC, embedded Tomcat |
| Spring Data JPA | 3.4.0 | Acceso a datos, query derivadas |
| Hibernate | 6.x | ORM, entity mapping |
| H2 Database | 2.x | Base de datos en memoria (dev) |
| MySQL Connector | Latest | Driver para MySQL (prod) |
| Spring Security Crypto | Latest | BCrypt para hashing de contraseñas |
| Apache PDFBox | 2.0.30 | Generación de PDFs (futuro) |
| Maven | 3.9.x | Build, dependency management |

---

## 🏗 Arquitectura del Proyecto

```
Backend                              Frontend
┌─────────────────────────────┐     ┌──────────────────────┐
│  Spring Boot Application    │     │  HTML SPA (ES6+)     │
├─────────────────────────────┤     │  - /resources/       │
│ Controllers (REST)          │────►│    static/index.html │
│ - AuthController            │     │    static/css/       │
│ - JugadorController         │     │    static/js/        │
│ - AdminSyncController       │     └──────────────────────┘
├─────────────────────────────┤
│ Services (Lógica)           │
│ - AuthService               │
│ - RankingService            │
│ - FipRankingSyncService     │
├─────────────────────────────┤
│ Repositories (Data Access)  │
│ - JugadorRepository         │
│ - UsuarioRepository         │
├─────────────────────────────┤
│ Entities (Domain)           │
│ - JugadorEntity             │
│ - UsuarioEntity             │
├─────────────────────────────┤
│ Config (DataSeeder, etc)    │
└─────────────────────────────┘
         ↓
    ┌─────────┐
    │   H2/   │
    │ MySQL   │
    └─────────┘
```

---

## 📁 Estructura de Carpetas

```
padel-backend/
├── src/
│   ├── main/
│   │   ├── java/com/alejandroferrer/padelbackend/
│   │   │   ├── PadelBackendApplication.java         # Punto de entrada
│   │   │   ├── config/
│   │   │   │   ├── DataSeeder.java                  # Población inicial de DB
│   │   │   │   └── [otros configs]
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java              # Login/Registro
│   │   │   │   ├── JugadorController.java           # Ranking, búsqueda
│   │   │   │   ├── AdminSyncController.java         # Sincronización FIP
│   │   │   │   └── DebugController.java             # Endpoints de debug
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java                 # Lógica de autenticación
│   │   │   │   ├── RankingService.java              # Filtros, rankings
│   │   │   │   └── FipRankingSyncService.java       # Scraping FIP
│   │   │   ├── repository/
│   │   │   │   ├── JugadorRepository.java           # Query derivadas
│   │   │   │   └── UsuarioRepository.java
│   │   │   ├── entity/
│   │   │   │   ├── JugadorEntity.java               # @Entity del ranking
│   │   │   │   └── UsuarioEntity.java               # @Entity de usuarios
│   │   │   └── [otros paquetes]
│   │   └── resources/
│   │       ├── application.properties               # Config de Spring
│   │       ├── static/
│   │       │   ├── index.html                       # SPA principal
│   │       │   ├── css/
│   │       │   │   ├── style.css
│   │       │   │   ├── animations.css
│   │       │   │   └── [otros estilos]
│   │       │   └── js/
│   │       │       ├── main.js
│   │       │       ├── app.js
│   │       │       ├── auth.js
│   │       │       ├── ranking.js
│   │       │       ├── wordle.js
│   │       │       ├── equipment.js
│   │       │       ├── booking.js
│   │       │       └── [otros scripts]
│   │       └── data/
│   │           └── [archivos de datos mock]
│   └── test/
│       └── java/com/alejandroferrer/padelbackend/
│           ├── FipTest.java                         # Tests de scraping
│           └── PadelBackendApplicationTests.java
├── target/
│   └── padel-backend-0.0.1-SNAPSHOT.jar             # JAR compilado
├── .mvn/                                            # Maven Wrapper
├── pom.xml                                          # Dependencias, build
├── mvnw / mvnw.cmd                                  # Maven Wrapper scripts
├── README.md                                        # Documentación usuario
├── CLAUDE.md                                        # Este archivo
└── [archivos de config git, IDE, etc]
```

---

## 🗄 Entidades y Base de Datos

### Entity: JugadorEntity

```java
@Entity
@Table(name = "jugadores")
public class JugadorEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String apellido;
    private String nacionalidad;
    private int ranking;
    private String genero;              // "Masculino" / "Femenino"
    private String posicion;            // "Palas" / "Red"
    private String manoDominante;       // "Derecha" / "Izquierda"
    private double puntosRanking;
    private LocalDateTime ultimaActualizacion;
}
```

### Entity: UsuarioEntity

```java
@Entity
@Table(name = "usuarios")
public class UsuarioEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;           // Único
    private String email;              // Único
    private String passwordHash;       // Hasheada con BCrypt
    private LocalDateTime fechaCreacion;
    private boolean activo;
}
```

### Diagrama ER

```
jugadores (Table)
├── id (PK)
├── nombre
├── apellido
├── nacionalidad
├── ranking
├── genero
├── posicion
├── manoDominante
├── puntosRanking
└── ultimaActualizacion

usuarios (Table)
├── id (PK)
├── username (UQ)
├── email (UQ)
├── passwordHash
├── fechaCreacion
└── activo
```

---

## 🔌 API REST — Endpoints

### Autenticación

| Método | Endpoint | Descripción | Body |
|---|---|---|---|
| POST | `/api/auth/register` | Crear nuevo usuario | `{username, email, password}` |
| POST | `/api/auth/login` | Iniciar sesión | `{username, password}` |
| POST | `/api/auth/logout` | Cerrar sesión | - |
| GET | `/api/auth/me` | Obtener usuario actual | - |

### Ranking de Jugadores

| Método | Endpoint | Descripción | Query Params |
|---|---|---|---|
| GET | `/api/jugadores` | Listar jugadores | `genero`, `nacionalidad`, `posicion`, `mano`, `filtro` |
| GET | `/api/jugadores/{id}` | Detalles de jugador | - |
| GET | `/api/jugadores/buscar` | Búsqueda por nombre | `q` |

### Sincronización FIP

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/admin/sync-ranking` | Sincronizar ranking desde FIP |
| GET | `/api/admin/sync-status` | Estado de sincronización |

### Debug

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/debug/jugadores/count` | Número total de jugadores |
| GET | `/api/debug/db-status` | Estado de base de datos |

### Frontend

| Ruta | Descripción |
|---|---|
| `/` | Página principal (SPA index.html) |
| `/h2-console` | Consola H2 (solo desarrollo) |

---

## 🔧 Servicios Principales

### AuthService

**Responsabilidades:**
- Validar credenciales (username + password)
- Crear nuevos usuarios con BCrypt
- Buscar usuarios por username/email
- Gestionar sesiones en client-side (localStorage)

**Métodos clave:**
```java
UsuarioEntity register(String username, String email, String password)
UsuarioEntity login(String username, String password)
boolean validatePassword(String raw, String hashed)
```

### RankingService

**Responsabilidades:**
- Filtrar jugadores por categoría, nacionalidad, posición, mano dominante
- Ordenar por ranking y puntos
- Limitar resultados (máx 400 para performance)
- Calcular distancia a jugador top

**Métodos clave:**
```java
List<JugadorEntity> filtrarRanking(FilterDTO filters)
JugadorEntity obtenerJugadorPorId(Long id)
List<JugadorEntity> buscarPorNombre(String nombre)
```

### FipRankingSyncService

**Responsabilidades:**
- Hacer scraping del ranking FIP oficial
- Parsear HTML y extraer datos
- Actualizar base de datos con nuevos datos
- Mantener histórico de actualizaciones

**Métodos clave:**
```java
void sincronizarRankingMundial()
List<JugadorEntity> parsearDatosFromHtml(String html)
void guardarActualizacion(List<JugadorEntity> jugadores)
```

---

## ✨ Características Implementadas

### 1. Ranking Mundial FIP
- ✅ Ranking masculino/femenino con tarjetas
- ✅ Filtros por nacionalidad, posición, mano dominante
- ✅ Búsqueda en tiempo real
- ✅ Sincronización con datos FIP (botón manual)
- ✅ Limitación a 400 jugadores (performance)

### 2. Padel Wordle
- ✅ Palabra diaria del Top 20 (basada en fecha)
- ✅ Teclado virtual interactivo
- ✅ Estados: correcto (verde), presente (amarillo), ausente (gris)
- ✅ LocalStorage para persistencia diaria

### 3. Equipamiento Profesional
- ✅ Galería de 5 jugadores con sus equipos
- ✅ Hotspots interactivos con tooltips
- ✅ Wishlist persistente en sesión
- ✅ Cambio dinámico de jugador

### 4. Torneos En Directo
- ✅ Detección automática de torneos activos
- ✅ Banner con enlace a stream (RedBull TV)
- ✅ Tarjetas de partidos con marcador por sets
- ✅ Predicción IA basada en ranking (confianza alta/media/baja)
- ✅ Badge animado "EN DIRECTO"

### 5. Reserva de Pistas
- ✅ Geolocalización del navegador
- ✅ Radio de búsqueda: 10-50 km (slider)
- ✅ 13 clubs mock con datos reales
- ✅ Filtrado por distancia
- ✅ Enlaces a Google Maps
- ✅ Modal de reserva por franja horaria

### 6. Autenticación
- ✅ Registro con validación
- ✅ Login con usuario o email
- ✅ Modo invitado (sin cuenta)
- ✅ Sesión persistente (localStorage)
- ✅ Logout y visualización de usuario

---

## 💻 Guía de Desarrollo

### Setup Local

1. **Clonar repositorio:**
   ```bash
   git clone https://github.com/alejandroferrersfc-cell/padel-App.git
   cd padel-App
   ```

2. **Verificar Java:**
   ```bash
   java -version    # Debe ser 17+
   ```

3. **Ejecutar con Maven:**
   ```bash
   # Windows
   .\mvnw.cmd spring-boot:run
   
   # Linux/macOS
   ./mvnw spring-boot:run
   ```

4. **Acceder a la app:**
   - Frontend: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`

### Compilar JAR

```bash
# Windows
.\mvnw.cmd clean package -DskipTests

# Linux/macOS
./mvnw clean package -DskipTests

# Ejecutar JAR
java -jar target/padel-backend-0.0.1-SNAPSHOT.jar
```

### Modificar Base de Datos

#### application.properties (desarrollo)
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:padeldb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
spring.h2.console.enabled=true
```

#### H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:padeldb`
- Usuario: `sa`
- Contraseña: (vacía)

### Agregar un Nuevo Endpoint

1. **Crear Controller:**
   ```java
   @RestController
   @RequestMapping("/api/mi-feature")
   public class MiFeatureController {
       @Autowired private MiFeatureService service;
       
       @GetMapping
       public ResponseEntity<?> obtener() {
           return ResponseEntity.ok(service.traerDatos());
       }
   }
   ```

2. **Crear Service:**
   ```java
   @Service
   public class MiFeatureService {
       @Autowired private MiRepository repo;
       
       public List<MiEntity> traerDatos() {
           return repo.findAll();
       }
   }
   ```

3. **Crear Repository (Query derivadas):**
   ```java
   @Repository
   public interface MiRepository extends JpaRepository<MiEntity, Long> {
       List<MiEntity> findByNombre(String nombre);
   }
   ```

### Hot Reload en Desarrollo

Spring Boot incluye DevTools automáticamente. Los cambios en:
- Código Java → compilación automática
- HTML/CSS/JS → refresh del navegador

---

## 🔍 Troubleshooting

### Problema: "Port 8080 already in use"

**Solución:**
```bash
# Buscar proceso en puerto 8080
netstat -ano | findstr :8080      # Windows
lsof -i :8080                      # macOS/Linux

# Cambiar puerto en application.properties
server.port=8081
```

### Problema: "No JWT Token in request"

**Causa:** La sesión no está en localStorage  
**Solución:** Registrar o loguear nuevamente

### Problema: Base de datos vacía

**Causa:** H2 está en memoria, se borra al reiniciar  
**Solución:** Ejecutar DataSeeder automáticamente (ya configurado)

### Problema: Scraping FIP falla

**Causa:** El HTML de FIP cambió o está sin conexión  
**Solución:** Los datos locales siguen disponibles; sincronizar cuando FIP esté disponible

### Problema: CORS error en browser

**Solución:** Spring Boot usa `Access-Control-Allow-Origin: *` por defecto (no necesita config)

---

## 📊 Performance

### Optimizaciones Implementadas

1. **Límite de jugadores renderizados:** Máx 400 por vista (previene lag)
2. **Índices en base de datos:** `INDEX(ranking)`, `INDEX(genero)`
3. **Lazy loading en frontend:** Las imágenes y datos cargan bajo demanda
4. **LocalStorage:** Datos de sesión no requieren round-trip al servidor
5. **Query derivadas:** Delega filtrado al DB (no in-memory)

### Métricas

| Métrica | Valor |
|---|---|
| Startup time | 15-30 seg |
| Ranking load (400 jugadores) | <1 seg |
| Búsqueda en tiempo real | <100ms |
| Sincronización FIP | 5-10 seg |

---

## 🔐 Seguridad

### Implementadas

- ✅ Hashing de contraseñas con BCrypt
- ✅ Validación en servidor (no solo client-side)
- ✅ Session en localStorage (No vulnerable a CSRF en SPA)
- ✅ Input sanitization en búsqueda

### No Implementadas (Futuro)

- ⚠️ JWT con expiración
- ⚠️ HTTPS/TLS en producción
- ⚠️ Rate limiting en API
- ⚠️ CORS restrictivo
- ⚠️ Headers de seguridad (CSP, X-Frame-Options, etc)

---

## 📝 Notas de Desarrollo

- **Frontend:** Totalmente vanilla ES6+ (sin framework). Ventajas: sin build step extra, sin bundler, directo desde navegador.
- **ORM:** Hibernate con Spring Data JPA — queries derivadas vs JPQL según complejidad.
- **Testing:** FipTest.java para scraping; PadelBackendApplicationTests.java para context.
- **Datos Mock:** 13 clubs de pistas, 5 jugadores con equipos, datos de torneos simulados (próx: conectar APIs reales).
- **Database:** H2 en desarrollo, MySQL en producción (mismo código, solo cambiar datasource en properties).

---

**Última actualización:** 2026-05-04  
**Versión:** 0.0.1-SNAPSHOT  
**Estado:** En desarrollo activo (Proyecto Intermodular A9)
