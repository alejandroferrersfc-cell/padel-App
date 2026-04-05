## 🔐 Sistema de autenticación — Login y Registro

Implementa un sistema completo de autenticación:

- 👤 **Sin sesión** → solo visible el **Ranking**
- ✅ **Con sesión** → acceso completo a todas las secciones

### Archivos añadidos
- `sql/create_usuario.sql` — tabla MySQL
- `UsuarioEntity.java`, `UsuarioRepository.java`, `AuthService.java`, `AuthController.java` — backend Spring
- `auth.js`, `auth.css` — frontend modal login/registro
- `app.js`, `index.html` — actualizados con control de sesión
- `pom.xml` — añadida dependencia BCrypt

### ⚠️ Ejecutar antes del merge
```sql
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
```