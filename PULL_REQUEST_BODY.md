## 🔐 Sistema de autenticación — Login y Registro

### ¿Qué hace este PR?

Implementa un sistema completo de autenticación con las siguientes reglas de acceso:

- 👤 **Sin sesión** → solo se puede ver el **Ranking**
- ✅ **Con sesión** → acceso completo a Wordle, Equipamiento, Wishlist, En Directo y Reservar Pista

---

### 📁 Archivos añadidos/modificados

#### Backend (Java/Spring)
| Archivo | Descripción |
|---|---|
| `sql/create_usuario.sql` | Script SQL para crear la tabla `usuario` |
| `entity/UsuarioEntity.java` | Entidad JPA para la tabla `usuario` |
| `repository/UsuarioRepository.java` | Repositorio JPA con búsquedas por nombre/email |
| `service/AuthService.java` | Lógica de registro y login con BCrypt |
| `controller/AuthController.java` | Endpoints REST: POST /api/auth/register, POST /api/auth/login, POST /api/auth/logout |
| `pom.xml` | Añadida dependencia spring-security-crypto para BCrypt |

#### Frontend (HTML/JS/CSS)
| Archivo | Descripción |
|---|---|
| `auth.js` | Gestión de sesión en localStorage, modal de login/registro, protección de rutas |
| `auth.css` | Estilos del modal y del área de usuario en el sidebar |
| `app.js` | Actualizado para importar auth.js y bloquear rutas protegidas |
| `index.html` | Añadido auth.css, área de usuario en sidebar, scripts como módulos ES |

---

### ⚠️ Paso necesario antes del merge

Ejecutar el SQL en tu base de datos MySQL para crear la tabla usuario.