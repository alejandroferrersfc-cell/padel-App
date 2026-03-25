// Backend connection
let playersData = [];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ranking-container');
    const filterGender = document.getElementById('filter-gender');
    const filterNationality = document.getElementById('filter-nationality');
    const filterHand = document.getElementById('filter-hand');
    const filterSide = document.getElementById('filter-side');

    // Fetch players from backend
    fetch('/api/jugadores')
        .then(response => response.json())
        .then(data => {
            // Map backend data to frontend format
            playersData = data.map((p, index) => ({
                id: p.rankingFip, // Usar posición que devuelve el backend
                originalId: p.idJugador,
                name: p.nombreCompleto,
                nationality: p.nacionalidad.toUpperCase(),
                hand: p.manoDominante === 'DERECHA' || p.manoDominante === 'right' ? 'right' : 'left',
                side: p.posicionJuego === 'REVES' || p.posicionJuego === 'reves' ? 'reves' : 'drive',
                points: p.puntos,
                gender: p.categoria
            }));
            window.PADEL_PLAYERS = playersData;
            applyFilters();
        })
        .catch(error => {
            console.error('Error fetching players:', error);
            container.innerHTML = '<p style="color:var(--text-sec)">Error al cargar los jugadores.</p>';
        });

    function renderPlayers(players) {
        if (!container) return;
        container.innerHTML = '';
        
        if (players.length === 0) {
            container.innerHTML = '<p style="color:var(--text-sec)">No se encontraron jugadores con esos filtros.</p>';
            return;
        }

        players.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <div class="player-rank">#${player.id}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <div class="player-stats">
                        <span><i class="fa-solid fa-flag"></i> ${player.nationality.toUpperCase()}</span>
                        <span><i class="fa-solid fa-hand"></i> ${player.hand === 'left' ? 'Zurdo' : 'Diestro'}</span>
                        <span><i class="fa-solid fa-table-tennis-paddle-ball"></i> ${player.side === 'drive' ? 'Drive' : 'Revés'}</span>
                        <span><i class="fa-solid fa-star"></i> ${player.points.toLocaleString()} pts</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function applyFilters() {
        if (!filterNationality || !filterHand || !filterSide || !filterGender) return;
        const gender = filterGender.value;
        const nat = filterNationality.value;
        const hand = filterHand.value;
        const side = filterSide.value;

        const filtered = playersData.filter(p => {
            const matchGender = gender === 'all' || p.gender === gender;
            const matchNat = nat === 'all' || p.nationality === nat;
            const matchHand = hand === 'all' || p.hand === hand;
            const matchSide = side === 'all' || p.side === side;
            return matchGender && matchNat && matchHand && matchSide;
        });

        renderPlayers(filtered);
    }

    if (filterNationality && filterHand && filterSide && filterGender) {
        filterGender.addEventListener('change', applyFilters);
        filterNationality.addEventListener('change', applyFilters);
        filterHand.addEventListener('change', applyFilters);
        filterSide.addEventListener('change', applyFilters);
    }

    // Initial render is now done inside fetch
});
