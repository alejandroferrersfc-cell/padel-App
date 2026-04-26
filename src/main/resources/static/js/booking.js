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
    // --- Barcelona ---
    { name: "Sunset Padel Barcelona",        lat: 41.3851, lon: 2.1734,  available: 1,  phone: "+34 93 123 45 67", amenities: ["Vestuarios", "Cafetería"] },
    { name: "Club Padel Badalona",           lat: 41.4459, lon: 2.2476,  available: 3,  phone: "+34 93 234 56 78", amenities: ["Aparcamiento", "Vestuarios"] },
    // --- Sevilla ---
    { name: "Sur Padel Indoor Sevilla",      lat: 37.3891, lon: -5.9845, available: 5,  phone: "+34 95 345 67 89", amenities: ["Aire Acondicionado", "Cafetería", "Vestuarios"] },
    // --- Bilbao ---
    { name: "Norte Tenis & Padel Bilbao",    lat: 43.2630, lon: -2.9350, available: 0,  phone: "+34 94 456 78 90", amenities: ["Vestuarios", "Aparcamiento"] },
    // --- Club local dinámico (se ajusta a la posición del usuario) ---
    { name: "Tu Club Local (Cerca de ti)",   lat: 0,       lon: 0,       available: 2,  phone: "+34 600 000 000", amenities: ["Vestuarios", "Cafetería"] }
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

                // Posicionar el club local dinámico cerca del usuario (~3 km)
                const localClub = MOCK_CLUBS[MOCK_CLUBS.length - 1];
                localClub.lat = userLat + 0.027;
                localClub.lon = userLon + 0.027;

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

    // Modal simple de confirmación con hora
    const times = ['09:00', '10:30', '12:00', '13:30', '16:00', '17:30', '19:00', '20:30'];
    const timeOptions = times.map(t => `<option value="${t}">${t}</option>`).join('');

    const overlay = document.createElement('div');
    overlay.id = 'booking-modal-overlay';
    overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.7);
        backdrop-filter: blur(4px); z-index: 9999;
        display: flex; align-items: center; justify-content: center;`;

    overlay.innerHTML = `
        <div style="background:var(--bg-surface);border:1px solid var(--border-glass);
                    border-radius:1rem;padding:2rem;max-width:420px;width:90%;text-align:center;">
            <i class="fa-solid fa-calendar-check" style="font-size:2.5rem;color:var(--primary);margin-bottom:1rem;"></i>
            <h2 style="margin-bottom:0.5rem;">Reservar Pista</h2>
            <p style="color:var(--text-sec);margin-bottom:1.5rem;">${clubName}</p>
            <label style="display:block;text-align:left;margin-bottom:0.5rem;color:var(--text-sec);font-size:0.9rem;">Selecciona hora:</label>
            <select id="booking-time" style="width:100%;padding:0.75rem;border-radius:8px;
                background:rgba(15,23,42,0.8);color:var(--text-primary);
                border:1px solid var(--border-glass);font-size:1rem;margin-bottom:1.5rem;">
                ${timeOptions}
            </select>
            <div style="display:flex;gap:1rem;justify-content:center;">
                <button onclick="document.getElementById('booking-modal-overlay').remove()"
                    style="padding:0.75rem 1.5rem;border-radius:8px;border:1px solid var(--border-glass);
                    background:transparent;color:var(--text-sec);cursor:pointer;font-size:1rem;">
                    Cancelar
                </button>
                <button onclick="confirmBooking('${clubName.replace(/'/g, "\\'")}', document.getElementById('booking-time').value)"
                    style="padding:0.75rem 1.5rem;border-radius:8px;border:none;
                    background:linear-gradient(90deg,var(--primary-dark),var(--primary));
                    color:white;cursor:pointer;font-size:1rem;font-weight:600;">
                    <i class="fa-solid fa-check"></i> Confirmar
                </button>
            </div>
        </div>`;

    document.body.appendChild(overlay);
}

/**
 * Confirma la reserva y muestra un mensaje de éxito.
 */
function confirmBooking(clubName, time) {
    document.getElementById('booking-modal-overlay')?.remove();

    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
        background: var(--accent); color: white; padding: 1rem 1.5rem;
        border-radius: 12px; font-weight: 600; font-size: 0.95rem;
        box-shadow: 0 4px 20px rgba(16,185,129,0.4);
        animation: slideInToast 0.4s ease;`;
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ¡Reserva confirmada en ${clubName} a las ${time}!`;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}
