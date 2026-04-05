// ============================================================
//  auth.js — Gestión de sesión, modal login/registro
// ============================================================

const AUTH_KEY = 'padel_session';

export function getSession() {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
    return getSession() !== null;
}

function saveSession(data) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
}

export function clearSession() {
    localStorage.removeItem(AUTH_KEY);
}

const PROTECTED_SECTIONS = ['wordle', 'equipment', 'wishlist', 'live', 'booking'];

export function isSectionProtected(sectionId) {
    return PROTECTED_SECTIONS.includes(sectionId);
}

const API_BASE = 'http://localhost:8080/api/auth';

async function apiRegister(nombreUsuario, email, password) {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, email, password })
    });
    return { status: res.status, data: await res.json() };
}

async function apiLogin(identificador, password) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificador, password })
    });
    return { status: res.status, data: await res.json() };
}

function createAuthModal() {
    if (document.getElementById('auth-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-overlay" id="auth-overlay">
            <div class="auth-card">
                <div class="auth-tabs">
                    <button class="auth-tab active" data-tab="login">Iniciar Sesión</button>
                    <button class="auth-tab" data-tab="register">Registrarse</button>
                </div>
                <form id="form-login" class="auth-form active">
                    <h2><i class="fa-solid fa-right-to-bracket"></i> Bienvenido</h2>
                    <p class="auth-subtitle">Inicia sesión para acceder a todas las funciones.</p>
                    <div class="auth-field">
                        <label>Usuario o Email</label>
                        <input type="text" id="login-identificador" placeholder="tu_usuario o email@ejemplo.com" required>
                    </div>
                    <div class="auth-field">
                        <label>Contraseña</label>
                        <input type="password" id="login-password" placeholder="••••••••" required>
                    </div>
                    <p class="auth-error" id="login-error"></p>
                    <button type="submit" class="btn-primary auth-submit" id="login-btn">
                        <i class="fa-solid fa-right-to-bracket"></i> Entrar
                    </button>
                    <p class="auth-guest">
                        <a href="#" id="btn-continue-guest">Continuar como invitado (solo Ranking)</a>
                    </p>
                </form>
                <form id="form-register" class="auth-form">
                    <h2><i class="fa-solid fa-user-plus"></i> Crear cuenta</h2>
                    <p class="auth-subtitle">Regístrate gratis y accede a todo.</p>
                    <div class="auth-field">
                        <label>Nombre de usuario</label>
                        <input type="text" id="reg-username" placeholder="mi_usuario" required>
                    </div>
                    <div class="auth-field">
                        <label>Email</label>
                        <input type="email" id="reg-email" placeholder="email@ejemplo.com" required>
                    </div>
                    <div class="auth-field">
                        <label>Contraseña (mín. 6 caracteres)</label>
                        <input type="password" id="reg-password" placeholder="••••••••" required>
                    </div>
                    <p class="auth-error" id="reg-error"></p>
                    <p class="auth-success" id="reg-success"></p>
                    <button type="submit" class="btn-primary auth-submit" id="reg-btn">
                        <i class="fa-solid fa-user-plus"></i> Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            modal.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`form-${tab.dataset.tab}`).classList.add('active');
            document.getElementById('login-error').textContent = '';
            document.getElementById('reg-error').textContent = '';
            document.getElementById('reg-success').textContent = '';
        });
    });

    document.getElementById('form-login').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('login-btn');
        const errEl = document.getElementById('login-error');
        const identificador = document.getElementById('login-identificador').value.trim();
        const password = document.getElementById('login-password').value;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Entrando...';
        errEl.textContent = '';
        const { status, data } = await apiLogin(identificador, password);
        if (status === 200) {
            saveSession({ nombreUsuario: data.nombreUsuario, idUsuario: data.idUsuario });
            closeAuthModal();
            updateNavForSession();
            window.dispatchEvent(new CustomEvent('sessionChanged', { detail: { loggedIn: true } }));
        } else {
            errEl.textContent = data.error || 'Error al iniciar sesión.';
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Entrar';
        }
    });

    document.getElementById('form-register').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('reg-btn');
        const errEl = document.getElementById('reg-error');
        const sucEl = document.getElementById('reg-success');
        const nombreUsuario = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creando cuenta...';
        errEl.textContent = '';
        sucEl.textContent = '';
        const { status, data } = await apiRegister(nombreUsuario, email, password);
        if (status === 200) {
            sucEl.textContent = '¡Cuenta creada! Iniciando sesión...';
            const loginRes = await apiLogin(nombreUsuario, password);
            if (loginRes.status === 200) {
                saveSession({ nombreUsuario: loginRes.data.nombreUsuario, idUsuario: loginRes.data.idUsuario });
                setTimeout(() => {
                    closeAuthModal();
                    updateNavForSession();
                    window.dispatchEvent(new CustomEvent('sessionChanged', { detail: { loggedIn: true } }));
                }, 800);
            }
        } else {
            errEl.textContent = data.error || 'Error al registrarse.';
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Crear cuenta';
        }
    });

    document.getElementById('btn-continue-guest').addEventListener('click', (e) => {
        e.preventDefault();
        closeAuthModal();
    });
}

export function openAuthModal() {
    createAuthModal();
    document.getElementById('auth-modal').style.display = 'flex';
}

export function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';
}

export function updateNavForSession() {
    const session = getSession();
    const userArea = document.getElementById('nav-user-area');
    if (!userArea) return;

    if (session) {
        userArea.innerHTML = `
            <span class="nav-username"><i class="fa-solid fa-circle-user"></i> ${session.nombreUsuario}</span>
            <button id="btn-logout" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
        `;
        document.getElementById('btn-logout').addEventListener('click', () => {
            clearSession();
            updateNavForSession();
            window.dispatchEvent(new CustomEvent('sessionChanged', { detail: { loggedIn: false } }));
            const hash = window.location.hash.substring(1);
            if (PROTECTED_SECTIONS.includes(hash)) {
                window.location.hash = 'ranking';
            }
        });
    } else {
        userArea.innerHTML = `
            <button id="btn-open-login" class="btn-primary btn-login-nav">
                <i class="fa-solid fa-right-to-bracket"></i> Iniciar Sesión
            </button>
        `;
        document.getElementById('btn-open-login').addEventListener('click', openAuthModal);
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        const section = link.dataset.section;
        const lockIcon = link.querySelector('.lock-icon');
        if (PROTECTED_SECTIONS.includes(section) && !session) {
            if (!lockIcon) {
                const icon = document.createElement('i');
                icon.className = 'fa-solid fa-lock lock-icon';
                icon.style.cssText = 'margin-left: 6px; font-size: 0.7em; opacity: 0.6;';
                link.appendChild(icon);
            }
        } else {
            if (lockIcon) lockIcon.remove();
        }
    });
}