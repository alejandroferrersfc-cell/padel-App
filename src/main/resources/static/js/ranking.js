// Backend connection
let playersData = [];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ranking-container');
    const filterGender = document.getElementById('filter-category');
    const filterNationality = document.getElementById('filter-nationality');
    const filterHand = document.getElementById('filter-hand');
    const filterSide = document.getElementById('filter-side');

    function fetchPlayers() {
        if (container) {
            container.innerHTML = '<div style="text-align: center; width: 100%; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i><p style="margin-top: 1rem; color: var(--text-sec);">Cargando jugadores...</p></div>';
        }
        fetch('/api/jugadores')
            .then(response => response.json())
            .then(data => {
                playersData = data.map((p, index) => ({
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

        players.forEach(player => {
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
            const matchGender = gender === 'all' || p.gender === gender.toUpperCase();
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

    function initSyncButtons() {
        const btnMasculino = document.getElementById('btn-sync-masculino');
        const btnFemenino = document.getElementById('btn-sync-femenino');

        const handleSync = async (btn, endpoint) => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sincronizando...';
            btn.disabled = true;

            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const result = await response.json();
                    fetchPlayers(); 
                    alert(`¡Sincronización completada! Se actualizaron ${result.actualizados} jugadores.`);
                } else {
                    alert('Error al sincronizar con el FIP. Revisa el backend.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                alert('Error de red al conectar con el backend.');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        };

        if (btnMasculino) {
            btnMasculino.addEventListener('click', () => handleSync(btnMasculino, '/api/admin/sync-ranking-masculino'));
        }
        if (btnFemenino) {
            btnFemenino.addEventListener('click', () => handleSync(btnFemenino, '/api/admin/sync-ranking-femenino'));
        }
    }

    initSyncButtons();
    fetchPlayers();
});
