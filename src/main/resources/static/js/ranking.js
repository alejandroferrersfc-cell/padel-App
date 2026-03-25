// MOCK PADEL PLAYERS DATA
// In a real app, this would be fetched from the Spring Boot backend
const playersData = [
    { id: 1, name: "Arturo Coello", nationality: "es", hand: "left", side: "drive", points: 14500 },
    { id: 2, name: "Agustín Tapia", nationality: "ar", hand: "right", side: "reves", points: 14200 },
    { id: 3, name: "Alejandro Galán", nationality: "es", hand: "right", side: "reves", points: 13800 },
    { id: 4, name: "Federico Chingotto", nationality: "ar", hand: "right", side: "drive", points: 13500 },
    { id: 5, name: "Martín Di Nenno", nationality: "ar", hand: "right", side: "drive", points: 11000 },
    { id: 6, name: "Franco Stupaczuk", nationality: "ar", hand: "right", side: "reves", points: 10800 },
    { id: 7, name: "Paquito Navarro", nationality: "es", hand: "right", side: "reves", points: 9500 },
    { id: 8, name: "Juan Lebrón", nationality: "es", hand: "right", side: "drive", points: 9200 },
    { id: 9, name: "Pablo Lima", nationality: "br", hand: "left", side: "drive", points: 8000 },
    { id: 10, name: "Fernando Belasteguín", nationality: "ar", hand: "right", side: "reves", points: 7500 },
    { id: 11, name: "Coki Nieto", nationality: "es", hand: "left", side: "drive", points: 6000 },
    { id: 12, name: "Jon Sanz", nationality: "es", hand: "left", side: "drive", points: 5800 }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ranking-container');
    const filterNationality = document.getElementById('filter-nationality');
    const filterHand = document.getElementById('filter-hand');
    const filterSide = document.getElementById('filter-side');

    // Make player data globally available so other scripts (Wordle, Live) can use it
    window.PADEL_PLAYERS = playersData;

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
        const nat = filterNationality.value;
        const hand = filterHand.value;
        const side = filterSide.value;

        const filtered = playersData.filter(p => {
            const matchNat = nat === 'all' || p.nationality === nat;
            const matchHand = hand === 'all' || p.hand === hand;
            const matchSide = side === 'all' || p.side === side;
            return matchNat && matchHand && matchSide;
        });

        renderPlayers(filtered);
    }

    if (filterNationality && filterHand && filterSide) {
        filterNationality.addEventListener('change', applyFilters);
        filterHand.addEventListener('change', applyFilters);
        filterSide.addEventListener('change', applyFilters);
    }

    // Initial render
    renderPlayers(playersData);
});
