# Desarrollo de Proyecto de Pádel

Una aplicación web full-stack para la gestión de una plataforma para los amantes del padel. Este proyecto sirve como prototipo funcional mínimo que integra un backend robusto con un frontend interactivo.

## Tecnologías Utilizadas
- **Backend**: Java 17, Spring Boot (Web, Data JPA), Maven
- **Base de Datos**: MySQL (producción), H2 (pruebas)
- **Frontend**: HTML5, CSS3, JavaScript Vanilla (SPA architecture sin frameworks pesados)

## Requisitos Previos
- Java Development Kit (JDK) 17 o superior.
- Maven 3.8+ (o usar el wrapper de Maven incluido `mvnw`).
- Opcional: MySQL Server si se desea usar en modo producción (por defecto usa H2 en memoria para pruebas).

## Instrucciones de Instalación
1. Clonar el repositorio localmente.
2. Navegar hasta el directorio raíz del proyecto: `cd padel-backend`
3. Instalar las dependencias de Maven:
   ```bash
   ./mvnw clean install
   ```

## Instrucciones de Ejecución
1. Arrancar el servidor Spring Boot:
   ```bash
   ./mvnw spring-boot:run
   ```
2. Abrir un navegador y navegar a: `http://localhost:8080/index.html`

## Funcionalidades Implementadas
- **Ranking de Jugadores**: Visualización de ranking con filtros (género, nivel, lado) ordenable interactivamente en el cliente.
- **Padel Wordle**: Minijuego diario integrado ("PadelDLE") con mecánicas de intentos y feedback visual por colores.
- **Padel Match Predictor**: Simulador que utiliza un algoritmo para predecir puntuaciones de partidos entre jugadores seleccionados basadas en su nivel.
- **Equipamiento / Wishlist**: Catálogo de palas de pádel con un sistema interactivo para añadir y eliminar artículos de una lista de deseos dinámica que calcula totales.

## Funcionalidades Pendientes
- Integración completa de la API de base de datos para el sistema de reserva de pistas y geolocalización.
- Sistema de login y autenticación, con perfiles de usuario.
- Historial de partidos guardado en base de datos.

## Autor
- **Nombre:** Alejandro
- **Curso:** Desarrollo de Aplicaciones Multiplataforma (DAM) - RA 4 / A7.
