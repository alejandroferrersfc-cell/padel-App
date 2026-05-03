// js/booking.js — Reserva de Pistas con radio ajustable

// Listado ampliado de clubs mock con información realista
const MOCK_CLUBS = [
    // --- Madrid y alrededores ---
    { name: "Padel Club Central Madrid",     lat: 40.4168, lon: -3.7038, available: 3,  phone: "+34 91 234 56 78", amenities: ["Vestuarios", "Cafetería", "Aparcamiento"] },
    { name: "Club Padel Majadahonda",        lat: 40.4720, lon: -3.8726, available: 2,  phone: "+34 91 345 67 89", amenities: ["Vestuarios", "Tienda"] },
    { name: "Getafe Padel Center",           lat: 40.3051, lon: -3.7195, available: 0,  phone: "+34 91 456 78 90", amenities: ["Vestuarios", "Aparcamiento"] },
    { name: "Alcalá de Henares Padel",       lat: 40.4820, lon: -3.3635, available: 5,  phone: "+34 91 567 89 01", amenities: ["Cafetería", "Vestuarios", "Wi-Fi"] },
    { name: "Leganés Pádel Sport",           lat: 40.3284, lon: -3.7638, available: 1,  phone: "+34 91 678 90 12", amenities: ["Vestuarios"] },
    { name: "Pozuelo Padel Club",            lat: 40.4344, lon: -3.8133, available: 4,  phone: "+34 91 789 01 23", amenities: ["Piscina", "Vestuarios", "Cafetería"] },
    { name: "Valdemoro Padel & Fitness",     lat: 40.1934, lon: -3.6771, available: 2,  phone: "+34 91 890 12 34", amenities: ["Gimnasio", "Vestuarios"] },
    { name: "Colmenar Viejo Padel",          lat: 40.6625, lon: -3.7669, available: 0,  phone: "+34 91 901 23 45", amenities: ["Cafetería"] },
    { name: "Las Rozas Padel Indoor",        lat: 40.5050, lon: -3.8744, available: 6,  phone: "+34 91 912 34 56", amenities: ["Pistas Indoor", "Gimnasio", "Cafetería"] },
    { name: "Alcobendas Sport Pádel",        lat: 40.5475, lon: -3.6420, available: 1,  phone: "+34 91 923 45 67", amenities: ["Vestuarios", "Tienda", "Aparcamiento"] },
    
    // --- Barcelona y alrededores ---
    { name: "Sunset Padel Barcelona",        lat: 41.3851, lon: 2.1734,  available: 1,  phone: "+34 93 123 45 67", amenities: ["Vestuarios", "Cafetería"] },
    { name: "Club Padel Badalona",           lat: 41.4459, lon: 2.2476,  available: 3,  phone: "+34 93 234 56 78", amenities: ["Aparcamiento", "Vestuarios"] },
    { name: "L'Hospitalet Pádel Center",     lat: 41.3596, lon: 2.1003,  available: 4,  phone: "+34 93 345 67 89", amenities: ["Pistas Cubiertas", "Cafetería"] },
    { name: "Sabadell Tennis & Padel",       lat: 41.5433, lon: 2.1094,  available: 0,  phone: "+34 93 456 78 90", amenities: ["Piscina", "Gimnasio"] },
    { name: "Terrassa Pádel Club",           lat: 41.5611, lon: 2.0089,  available: 2,  phone: "+34 93 567 89 01", amenities: ["Vestuarios", "Aparcamiento"] },
    
    // --- Andalucía (Sevilla, Málaga, Córdoba, Granada) ---
    { name: "Sur Padel Indoor Sevilla",      lat: 37.3891, lon: -5.9845, available: 5,  phone: "+34 95 345 67 89", amenities: ["Aire Acondicionado", "Cafetería", "Vestuarios"] },
    { name: "Nervión Pádel Center",          lat: 37.3800, lon: -5.9750, available: 2,  phone: "+34 95 456 78 90", amenities: ["Pistas Outdoor", "Vestuarios"] },
    { name: "Málaga Pádel Resort",           lat: 36.7213, lon: -4.4214, available: 6,  phone: "+34 95 123 45 67", amenities: ["Piscina", "Restaurante", "Spa"] },
    { name: "Marbella Padel Club",           lat: 36.5101, lon: -4.8824, available: 1,  phone: "+34 95 234 56 78", amenities: ["Tienda Premium", "Cafetería"] },
    { name: "Córdoba Pádel Pro",             lat: 37.8882, lon: -4.7794, available: 0,  phone: "+34 95 345 67 12", amenities: ["Vestuarios", "Pistas Climatizadas"] },
    { name: "Granada Alhambra Pádel",        lat: 37.1773, lon: -3.5986, available: 3,  phone: "+34 95 456 78 23", amenities: ["Aparcamiento", "Cafetería"] },
    
    // --- Comunidad Valenciana (Valencia, Alicante) ---
    { name: "Valencia Pádel Center",         lat: 39.4699, lon: -0.3763, available: 4,  phone: "+34 96 123 45 67", amenities: ["Pistas Indoor", "Vestuarios"] },
    { name: "Turia Pádel Club",              lat: 39.4800, lon: -0.3900, available: 2,  phone: "+34 96 234 56 78", amenities: ["Cafetería", "Zona de calentamiento"] },
    { name: "Alicante Costa Pádel",          lat: 38.3452, lon: -0.4810, available: 5,  phone: "+34 96 345 67 89", amenities: ["Pistas Panorámicas", "Vestuarios"] },
    { name: "Elche Pádel Indoor",            lat: 38.2669, lon: -0.6984, available: 1,  phone: "+34 96 456 78 90", amenities: ["Aire Acondicionado", "Aparcamiento"] },
    
    // --- País Vasco (Bilbao, San Sebastián, Vitoria) ---
    { name: "Norte Tenis & Padel Bilbao",    lat: 43.2630, lon: -2.9350, available: 0,  phone: "+34 94 456 78 90", amenities: ["Vestuarios", "Aparcamiento"] },
    { name: "Barakaldo Pádel",               lat: 43.2965, lon: -2.9856, available: 3,  phone: "+34 94 567 89 01", amenities: ["Cafetería", "Vestuarios"] },
    { name: "Donosti Pádel Club",            lat: 43.3183, lon: -1.9812, available: 2,  phone: "+34 94 678 90 12", amenities: ["Pistas Indoor", "Tienda"] },
    { name: "Vitoria Pádel Arena",           lat: 42.8467, lon: -2.6716, available: 4,  phone: "+34 94 789 01 23", amenities: ["Gimnasio", "Vestuarios"] },
    
    // --- Galicia (Vigo, A Coruña, Santiago) ---
    { name: "Vigo Pádel Sur",                lat: 42.2406, lon: -8.7207, available: 1,  phone: "+34 98 123 45 67", amenities: ["Vestuarios", "Cafetería"] },
    { name: "A Coruña Pádel Mar",            lat: 43.3623, lon: -8.4115, available: 5,  phone: "+34 98 234 56 78", amenities: ["Pistas Indoor", "Aparcamiento"] },
    { name: "Santiago Pádel Indoor",         lat: 42.8782, lon: -8.5448, available: 0,  phone: "+34 98 345 67 89", amenities: ["Cafetería", "Vestuarios"] },
    
    // --- Aragón (Zaragoza) ---
    { name: "Zaragoza Pádel Center",         lat: 41.6488, lon: -0.8891, available: 3,  phone: "+34 97 123 45 67", amenities: ["Pistas Climatizadas", "Vestuarios"] },
    { name: "Ebro Pádel Club",               lat: 41.6600, lon: -0.9000, available: 2,  phone: "+34 97 234 56 78", amenities: ["Cafetería", "Tienda"] },
    
    // --- Otras ciudades principales ---
    { name: "Murcia Pádel Indoor",           lat: 37.9922, lon: -1.1307, available: 4,  phone: "+34 96 890 12 34", amenities: ["Aire Acondicionado", "Vestuarios"] },
    { name: "Valladolid Pádel Sport",        lat: 41.6523, lon: -4.7245, available: 1,  phone: "+34 98 345 67 12", amenities: ["Pistas Panorámicas", "Cafetería"] },
    { name: "Palma de Mallorca Pádel",       lat: 39.5696, lon: 2.6502,  available: 6,  phone: "+34 97 123 98 76", amenities: ["Outdoor", "Vestuarios", "Piscina"] },
    { name: "Las Palmas Pádel Center",       lat: 28.1235, lon: -15.4363,available: 2,  phone: "+34 92 812 34 56", amenities: ["Cafetería", "Aparcamiento"] },
    
    // --- Club local dinámico (se ajusta a la posición del usuario en tiempo real) ---
    { name: "Tu Club Local (Cerca de ti)",   lat: 0,       lon: 0,       available: 2,  phone: "+34 600 000 000", amenities: ["Vestuarios", "Cafetería"] },
    { name: "Pádel Premium (Cerca de ti)",   lat: 0,       lon: 0,       available: 5,  phone: "+34 600 111 222", amenities: ["Pistas Panorámicas", "Vestuarios", "Bar"] },
    { name: "Indoor Pádel Base",             lat: 0,       lon: 0,       available: 0,  phone: "+34 600 333 444", amenities: ["Indoor", "Tienda"] }
];

/**
 * Calcula la distancia en kilómetros entre dos coordenadas usando la fórmula de Haversine.
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnLocate   = document.getElementById('btn-locate');
    const container   = document.getElementById('clubs-container');
    const radiusSlider = document.getElementById('radius-slider');
    const radiusLabel  = document.getElementById('radius-label');

    // Inicializar la vista de reservas guardadas
    if (typeof renderMyBookings === 'function') renderMyBookings();

    if (!btnLocate || !container) return;

    let userLat = null;
    let userLon = null;
    let currentRadius = 50; // km por defecto

    // Actualiza la etiqueta del slider en tiempo real
    if (radiusSlider && radiusLabel) {
        radiusSlider.addEventListener('input', () => {
            currentRadius = parseInt(radiusSlider.value, 10);
            radiusLabel.textContent = `${currentRadius} km`;
            if (userLat !== null) filterAndRender();
        });
    }

    btnLocate.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Tu navegador no soporta geolocalización.');
            return;
        }

        btnLocate.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Buscando...';
        btnLocate.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLat = position.coords.latitude;
                userLon = position.coords.longitude;

                // Posicionar los clubs dinámicos cerca del usuario a diferentes distancias
                const n = MOCK_CLUBS.length;
                
                // Club 1: muy cerca (~1-2 km)
                MOCK_CLUBS[n - 3].lat = userLat + 0.012;
                MOCK_CLUBS[n - 3].lon = userLon + 0.015;
                
                // Club 2: un poco más lejos (~4-5 km)
                MOCK_CLUBS[n - 2].lat = userLat - 0.035;
                MOCK_CLUBS[n - 2].lon = userLon + 0.021;
                
                // Club 3: más alejado (~8-10 km)
                MOCK_CLUBS[n - 1].lat = userLat + 0.075;
                MOCK_CLUBS[n - 1].lon = userLon - 0.060;

                filterAndRender();

                btnLocate.innerHTML = '<i class="fa-solid fa-check"></i> Ubicación obtenida';
                btnLocate.classList.add('success');
            },
            () => {
                alert('No se pudo obtener la ubicación. Por favor, da permisos en tu navegador.');
                btnLocate.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Compartir mi ubicación';
                btnLocate.disabled = false;
            }
        );
    });

    /** Filtra clubs por radio seleccionado y renderiza */
    function filterAndRender() {
        const nearbyClubs = MOCK_CLUBS
            .map(club => ({ ...club, distance: getDistanceFromLatLonInKm(userLat, userLon, club.lat, club.lon) }))
            .filter(club => club.distance <= currentRadius)
            .sort((a, b) => a.distance - b.distance);

        renderClubs(nearbyClubs);
    }

    /** Renderiza las tarjetas de clubs en el contenedor */
    function renderClubs(clubs) {
        if (clubs.length === 0) {
            container.innerHTML = `
                <div class="no-clubs-msg">
                    <i class="fa-solid fa-circle-xmark" style="font-size:2rem; color:var(--danger);"></i>
                    <p>No se encontraron clubs en un radio de <strong>${currentRadius} km</strong>.</p>
                    <p style="font-size:0.85rem;">Prueba a ampliar el radio de búsqueda.</p>
                </div>`;
            return;
        }

        container.innerHTML = clubs.map(club => {
            const amenitiesHtml = club.amenities
                .map(a => `<span class="amenity-tag"><i class="fa-solid fa-check"></i> ${a}</span>`)
                .join('');

            const availColor = club.available > 0 ? 'var(--accent)' : 'var(--danger)';
            const availText  = club.available > 0 ? `${club.available} pista${club.available > 1 ? 's' : ''} disponible${club.available > 1 ? 's' : ''}` : 'Sin disponibilidad';

            // Enlace a Google Maps con las coordenadas del club
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${club.lat},${club.lon}`;

            return `
                <div class="club-card">
                    <div class="club-info">
                        <div class="club-header">
                            <h3><i class="fa-solid fa-map-pin" style="color:var(--primary);"></i> ${club.name}</h3>
                            <span class="club-distance">${club.distance.toFixed(1)} km</span>
                        </div>
                        <p class="club-phone"><i class="fa-solid fa-phone"></i> ${club.phone}</p>
                        <div class="club-amenities">${amenitiesHtml}</div>
                        <p class="club-availability" style="color:${availColor};">
                            <i class="fa-solid fa-circle" style="font-size:0.6rem;"></i> ${availText}
                        </p>
                    </div>
                    <div class="club-actions">
                        <a href="${mapsUrl}" target="_blank" class="btn-secondary">
                            <i class="fa-solid fa-map"></i> Ver Mapa
                        </a>
                        <button class="btn-primary"
                            ${club.available === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
                            onclick="handleBooking('${club.name.replace(/'/g, "\\'")}', ${club.available})">
                            <i class="fa-solid fa-calendar-check"></i> Reservar
                        </button>
                    </div>
                </div>`;
        }).join('');
    }
});

/**
 * Muestra un modal de confirmación de reserva.
 * @param {string} clubName - Nombre del club
 * @param {number} available - Número de pistas disponibles
 */
function handleBooking(clubName, available) {
    if (available === 0) return;

    const overlay = document.createElement('div');
    overlay.id = 'booking-modal-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        backdrop-filter: blur(4px); z-index: 9999;
        display: flex; align-items: center; justify-content: center;`;

    // Fecha de hoy en formato YYYY-MM-DD adaptada a la zona horaria local
    const now = new Date();
    const todayStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    overlay.innerHTML = `
        <div style="background:var(--bg-surface);border:1px solid var(--border-glass);
                    border-radius:1rem;padding:2rem;max-width:420px;width:90%;text-align:center;">
            <i class="fa-solid fa-calendar-check" style="font-size:2.5rem;color:var(--primary);margin-bottom:1rem;"></i>
            <h2 style="margin-bottom:0.5rem;">Reservar Pista</h2>
            <p style="color:var(--text-sec);margin-bottom:1.5rem;">${clubName}</p>
            
            <label style="display:block;text-align:left;margin-bottom:0.5rem;color:var(--text-sec);font-size:0.9rem;">Fecha:</label>
            <input type="date" id="booking-date" min="${todayStr}" value="${todayStr}" 
                style="width:100%;padding:0.75rem;border-radius:8px;
                background:rgba(15,23,42,0.8);color:var(--text-primary);
                border:1px solid var(--border-glass);font-size:1rem;margin-bottom:1rem; color-scheme: dark;">

            <label style="display:block;text-align:left;margin-bottom:0.5rem;color:var(--text-sec);font-size:0.9rem;">Hora:</label>
            <select id="booking-time" style="width:100%;padding:0.75rem;border-radius:8px;
                background:rgba(15,23,42,0.8);color:var(--text-primary);
                border:1px solid var(--border-glass);font-size:1rem;margin-bottom:1.5rem;">
                <!-- Opciones generadas dinámicamente -->
            </select>
            
            <div style="display:flex;gap:1rem;justify-content:center;">
                <button onclick="document.getElementById('booking-modal-overlay').remove()"
                    style="padding:0.75rem 1.5rem;border-radius:8px;border:1px solid var(--border-glass);
                    background:transparent;color:var(--text-sec);cursor:pointer;font-size:1rem;">
                    Cancelar
                </button>
                <button onclick="confirmBooking('${clubName.replace(/'/g, "\\'")}', document.getElementById('booking-date').value, document.getElementById('booking-time').value)"
                    style="padding:0.75rem 1.5rem;border-radius:8px;border:none;
                    background:linear-gradient(90deg,var(--primary-dark),var(--primary));
                    color:white;cursor:pointer;font-size:1rem;font-weight:600;">
                    <i class="fa-solid fa-check"></i> Confirmar
                </button>
            </div>
        </div>`;

    document.body.appendChild(overlay);

    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');

    function updateTimeOptions() {
        const selectedDate = dateInput.value;
        const times = ['09:00', '10:30', '12:00', '13:30', '16:00', '17:30', '19:00', '20:30'];
        
        let validTimes = times;
        
        // Filtrar horas pasadas si la fecha es hoy
        if (selectedDate === todayStr) {
            // Recalculamos el tiempo exacto actual cada vez que cambia
            const currentNow = new Date();
            const currentTimeVal = currentNow.getHours() + (currentNow.getMinutes() / 60);
            
            validTimes = times.filter(t => {
                const [h, m] = t.split(':').map(Number);
                const timeVal = h + (m / 60);
                return timeVal > currentTimeVal;
            });
        }
        
        if (validTimes.length === 0) {
            timeSelect.innerHTML = '<option value="">Sin horas disponibles hoy</option>';
            timeSelect.disabled = true;
        } else {
            timeSelect.innerHTML = validTimes.map(t => `<option value="${t}">${t}</option>`).join('');
            timeSelect.disabled = false;
        }
    }

    dateInput.addEventListener('change', updateTimeOptions);
    updateTimeOptions(); // Inicializar opciones la primera vez
}

/**
 * Confirma la reserva y muestra un mensaje de éxito.
 */
function confirmBooking(clubName, date, time) {
    if (!date || !time) {
        alert("Por favor, selecciona una fecha y hora válidas.");
        return;
    }

    // Validación estricta para evitar saltarse el calendario (por ejemplo escribiendo a mano)
    const now = new Date();
    const todayStr = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    if (date < todayStr) {
        alert("No puedes reservar pistas en una fecha pasada.");
        return;
    }

    // Si es hoy, validar que la hora no haya pasado
    if (date === todayStr) {
        const currentNow = new Date();
        const currentTimeVal = currentNow.getHours() + (currentNow.getMinutes() / 60);
        const [h, m] = time.split(':').map(Number);
        const selectedTimeVal = h + (m / 60);
        
        if (selectedTimeVal <= currentTimeVal) {
            alert("Esa hora ya ha pasado, selecciona una hora válida.");
            return;
        }
    }

    document.getElementById('booking-modal-overlay')?.remove();

    // Guardar reserva en localStorage
    const bookings = JSON.parse(localStorage.getItem('padel_bookings') || '[]');
    
    // Formatear la fecha para que se vea mejor (de YYYY-MM-DD a DD/MM/YYYY)
    const [y, m, d] = date.split('-');
    const displayDate = `${d}/${m}/${y}`;

    const newBooking = {
        id: Date.now().toString(),
        clubName: clubName,
        time: time,
        date: displayDate
    };
    bookings.push(newBooking);
    localStorage.setItem('padel_bookings', JSON.stringify(bookings));

    // Refrescar UI de mis reservas
    if (typeof renderMyBookings === 'function') renderMyBookings();

    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
        background: var(--accent); color: white; padding: 1rem 1.5rem;
        border-radius: 12px; font-weight: 600; font-size: 0.95rem;
        box-shadow: 0 4px 20px rgba(16,185,129,0.4);
        animation: slideInToast 0.4s ease;`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Reserva confirmada el ${displayDate} a las ${time}!`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}

/**
 * Renderiza el historial de reservas en el DOM
 */
function renderMyBookings() {
    const section = document.getElementById('my-bookings-section');
    const list = document.getElementById('my-bookings-list');
    const count = document.getElementById('my-bookings-count');
    
    if (!section || !list || !count) return;

    const bookings = JSON.parse(localStorage.getItem('padel_bookings') || '[]');
    count.textContent = bookings.length;

    if (bookings.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    list.innerHTML = bookings.map(b => `
        <div class="glass-panel" style="display:flex; justify-content:space-between; align-items:center; padding:1.2rem; border-left: 4px solid var(--primary);">
            <div>
                <h3 style="color:var(--text-primary); margin:0 0 0.4rem 0; font-size:1.1rem;"><i class="fa-solid fa-map-pin" style="color:var(--primary);"></i> ${b.clubName}</h3>
                <p style="margin:0; font-size:0.9rem; color:var(--text-sec);">
                    <i class="fa-regular fa-calendar"></i> Reservado: ${b.date} &nbsp;|&nbsp; 
                    <i class="fa-regular fa-clock"></i> Hora de juego: <strong style="color:var(--accent);">${b.time}</strong>
                </p>
            </div>
            <button onclick="cancelBooking('${b.id}')" class="btn-secondary" style="border-color:var(--danger); color:var(--danger); padding:0.5rem 1rem;">
                <i class="fa-solid fa-trash"></i> Cancelar
            </button>
        </div>
    `).join('');
}

/**
 * Cancela (elimina) una reserva del historial
 */
function cancelBooking(id) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;
    let bookings = JSON.parse(localStorage.getItem('padel_bookings') || '[]');
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('padel_bookings', JSON.stringify(bookings));
    renderMyBookings();
}

// Exponer globalmente para que funcionen los onclick del HTML dinámico
window.cancelBooking = cancelBooking;
window.renderMyBookings = renderMyBookings;
