// Backend connection
let playersData = [];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ranking-container');
    const filterGender = document.getElementById('filter-gender');
    const filterNationality = document.getElementById('filter-nationality');
    const filterHand = document.getElementById('filter-hand');
    const filterSide = document.getElementById('filter-side');

    function fetchPlayers() {
        if (container) {
            container.innerHTML = '<div style="text-align: center; width: 100%; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i><p style="margin-top: 1rem; color: var(--text-sec);">Cargando jugadores...</p></div>';
        }
        fetch('/api/jugadores')
            .then(response => {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    console.error('Respuesta inesperada del servidor:', data);
                    if (container) container.innerHTML = '<p style="color:var(--danger)">Error: respuesta inesperada del servidor.</p>';
                    return;
                }
                playersData = data.map((p) => ({
                    id: p.rankingFip,
                    originalId: p.idJugador,
                    name: p.nombreCompleto,
                    nationality: (p.nacionalidad || 'DESCONOCIDO').toUpperCase(),
                    hand: p.manoDominante === 'DERECHA' || p.manoDominante === 'right' ? 'right' : 'left',
                    side: p.posicionJuego === 'REVES' || p.posicionJuego === 'reves' ? 'reves' : 'drive',
                    points: p.puntos || 0,
                    gender: p.categoria || 'MASCULINO'
                }));
                window.PADEL_PLAYERS = playersData;
                applyFilters();
            })
            .catch(error => {
                console.error('Error fetching players:', error);
                if (container) container.innerHTML = '<p style="color:var(--danger)">Error al cargar los jugadores desde el servidor.</p>';
            });
    }

    function renderPlayers(players) {
        if (!container) return;
        container.innerHTML = '';

        if (players.length === 0) {
            container.innerHTML = '<p style="color:var(--text-sec); text-align: center; width: 100%;">No se encontraron jugadores con esos filtros.</p>';
            return;
        }

        // OPTIMIZATION: Render max 400 players to prevent browser freeze
        const playersToRender = players.slice(0, 400);
        const fragment = document.createDocumentFragment();

        playersToRender.forEach(player => {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <div class="player-rank">#${player.id}</div>
                <div class="player-info">
                    <h3>${player.name}</h3>
                    <div class="player-stats">
                        <span><i class="fa-solid fa-flag"></i> ${player.nationality}</span>
                        <span><i class="fa-solid fa-hand"></i> ${player.hand === 'left' ? 'Zurdo' : 'Diestro'}</span>
                        <span><i class="fa-solid fa-table-tennis-paddle-ball"></i> ${player.side === 'drive' ? 'Drive' : 'Revés'}</span>
                        <span><i class="fa-solid fa-star"></i> ${(player.points).toLocaleString('es-ES')} pts</span>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);

        if (players.length > 400) {
            const msg = document.createElement('p');
            msg.style.cssText = 'color: var(--text-sec); text-align: center; width: 100%; margin-top: 1rem; grid-column: 1 / -1;';
            msg.innerText = `Mostrando top 400 de ${players.length} jugadores filtrados.`;
            container.appendChild(msg);
        }
    }

    function applyFilters() {
        if (!filterNationality || !filterHand || !filterSide || !filterGender) return;
        const gender = filterGender.value;
        const nat = filterNationality.value;
        const hand = filterHand.value;
        const side = filterSide.value;

        const filtered = playersData.filter(p => {
            const genderValue = gender.toLowerCase();

            const matchGender =
                genderValue === 'all' ||
                genderValue === 'ambas' ||
                p.gender === gender.toUpperCase();
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

    fetchPlayers();
});

