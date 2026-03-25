-- Esquema de Base de Datos (Generado automáticamente por Hibernate JPA)
-- Este archivo es puramente demostrativo para la entrega A7.
-- El proyecto utiliza H2 (In-Memory Database) y Spring Data JPA,
-- por lo que la tabla se crea dinámicamente al ejecutar el programa (Code-First).
-- Los datos iniciales se cargan automáticamente desde el archivo src/main/java/.../config/DataSeeder.java

CREATE TABLE jugador (
    id_jugador VARCHAR(255) PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    nacionalidad VARCHAR(255),
    mano_dominante VARCHAR(255),
    ranking_fip INT,
    foto_perfil VARCHAR(255),
    fecha_actualizacion_ranking VARCHAR(255),
    categoria VARCHAR(255),
    posicion_juego VARCHAR(255),
    puntos INT
);

-- Ejemplo de datos iniciales insertados por DataSeeder.java
INSERT INTO jugador (id_jugador, nombre_completo, nacionalidad, mano_dominante, ranking_fip, categoria, posicion_juego, puntos) 
VALUES ('uuid-ejemplo-1', 'Arturo Coello', 'ESP', 'Zurdo', 1, 'MASCULINO', 'Drive', 14500);

-- El resto de miles de jugadores se sincronizan dinámicamente conectando a la URL del PDF del FIP.
