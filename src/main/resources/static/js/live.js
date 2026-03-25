// js/live.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('live-matches-container');
    if (!container) return;

    // Wait slightly to ensure PADEL_PLAYERS is loaded from ranking.js
    setTimeout(() => {
        const players = window.PADEL_PLAYERS || [];
        if (players.length < 4) return;

        // Mock live match data
        const matches = [
            {
                id: 1,
                team1: [players[0], players[1]], // Coello/Tapia
                team2: [players[2], players[3]], // Galan/Chingotto
                realScore: "6-4, 3-2",
                status: "En Juego (2º Set)",
                streamLink: "https://www.youtube.com/@PremierPadelTV"
            },
            {
                id: 2,
                team1: [players[4], players[5]], // Di Nenno/Stupa
                team2: [players[6], players[7]], // Paquito/Lebron
                realScore: "7-6, 6-4",
                status: "Finalizado",
                streamLink: "https://www.redbull.com/"
            }
        ];

        function calculatePrediction(t1, t2) {
            const t1Points = t1[0].points + t1[1].points;
            const t2Points = t2[0].points + t2[1].points;
            
            if (t1Points > t2Points + 5000) return `Victoria fácil para ${t1[0].name.split(' ')[1]} / ${t1[1].name.split(' ')[1]} (2-0)`;
            if (t1Points > t2Points) return `Victoria ajustada para ${t1[0].name.split(' ')[1]} / ${t1[1].name.split(' ')[1]} (2-1)`;
            if (t2Points > t1Points + 5000) return `Victoria fácil para ${t2[0].name.split(' ')[1]} / ${t2[1].name.split(' ')[1]} (0-2)`;
            return `Victoria ajustada para ${t2[0].name.split(' ')[1]} / ${t2[1].name.split(' ')[1]} (1-2)`;
        }

        container.innerHTML = matches.map(match => {
            const pred = calculatePrediction(match.team1, match.team2);
            return `
                <div class="match-card">
                    <div style="flex: 1;">
                        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">
                            ${match.team1[0].name} / ${match.team1[1].name} 
                            <span style="color: var(--text-sec); font-weight: normal; font-size: 0.9em;">vs</span> 
                            ${match.team2[0].name} / ${match.team2[1].name}
                        </h3>
                        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                            <span style="background: ${match.status.includes('En Juego') ? 'var(--danger)' : 'var(--text-sec)'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                                <i class="fa-solid fa-circle" style="font-size: 0.6rem;"></i> ${match.status}
                            </span>
                            <span style="font-size: 1.2rem; font-weight: bold; color: var(--text-primary);">${match.realScore}</span>
                        </div>
                        <div class="match-prediction">
                            <i class="fa-solid fa-robot"></i> Predicción IA (Basada en Ranking): ${pred}
                        </div>
                    </div>
                    <div style="margin-left: 2rem;">
                        <button class="btn-primary" onclick="window.open('${match.streamLink}', '_blank')">
                            <i class="fa-solid fa-play"></i> Ver Stream
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }, 100);
});
