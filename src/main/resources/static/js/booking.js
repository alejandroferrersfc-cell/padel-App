// js/booking.js

const MOCK_CLUBS = [
    { name: "Padel Club Central", lat: 40.4168, lon: -3.7038, available: 3 }, // Madrid
    { name: "Sunset Padel", lat: 41.3851, lon: 2.1734, available: 1 }, // Barcelona
    { name: "Sur Padel Indoor", lat: 37.3891, lon: -5.9845, available: 5 }, // Sevilla
    { name: "Norte Tenis & Padel", lat: 43.2630, lon: -2.9350, available: 0 }, // Bilbao
    { name: "Tu Club Local (Simulado)", lat: 0, lon: 0, available: 2 } // Will be dynamically mapped to user's location
];

// Helper to calculate distance using Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; 
}

document.addEventListener('DOMContentLoaded', () => {
    const btnLocate = document.getElementById('btn-locate');
    const container = document.getElementById('clubs-container');
    
    if (!btnLocate || !container) return;

    btnLocate.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Tu navegador no soporta geolocalización.');
            return;
        }

        btnLocate.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Buscando...';
        btnLocate.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                // Set the dummy local club near the user
                MOCK_CLUBS[4].lat = userLat + 0.05;
                MOCK_CLUBS[4].lon = userLon + 0.05;

                // Calculate distances
                const nearbyClubs = MOCK_CLUBS.map(club => {
                    return {
                        ...club,
                        distance: getDistanceFromLatLonInKm(userLat, userLon, club.lat, club.lon)
                    };
                }).filter(club => club.distance <= 50) // Filter strictly <= 50km
                  .sort((a, b) => a.distance - b.distance);

                renderClubs(nearbyClubs);
                
                btnLocate.innerHTML = '<i class="fa-solid fa-check"></i> Ubicación obtenida';
                btnLocate.classList.add('success');
            },
            (error) => {
                alert('No se pudo obtener la ubicación. Por favor, da permisos en tu navegador.');
                btnLocate.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Compartir mi ubicación';
                btnLocate.disabled = false;
            }
        );
    });

    function renderClubs(clubs) {
        if (clubs.length === 0) {
            container.innerHTML = '<p style="color:var(--text-sec)">No se han encontrado clubs a menos de 50km de tu ubicación.</p>';
            return;
        }

        container.innerHTML = clubs.map(club => `
            <div class="club-card">
                <div>
                    <h3 style="color: var(--primary); margin-bottom: 0.5rem;">
                        <i class="fa-solid fa-map-pin"></i> ${club.name}
                    </h3>
                    <p style="color: var(--text-sec); font-size: 0.9rem;">
                        A ${club.distance.toFixed(1)} km de distancia
                    </p>
                    <p style="color: ${club.available > 0 ? 'var(--accent)' : 'var(--danger)'}; font-weight: bold; margin-top: 5px;">
                        ${club.available > 0 ? `${club.available} pistas disponibles` : 'Completo'}
                    </p>
                </div>
                <div>
                    <button class="btn-primary" ${club.available === 0 ? 'disabled style="opacity: 0.5; cursor:not-allowed;"' : ''} onclick="alert('Pista reservada en ${club.name}')">
                        Reservar Pista
                    </button>
                </div>
            </div>
        `).join('');
    }
});
