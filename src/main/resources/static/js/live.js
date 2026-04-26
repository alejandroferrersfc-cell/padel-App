// js/live.js — Torneos En Directo con predicción basada en ranking

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('live-matches-container');
    if (!container) return;

    // Torneos activos simulados (en directo)
    const LIVE_TOURNAMENTS = [
        {
            id: "premier_madrid_2025",
            name: "Premier Padel Madrid P1",
            location: "Caja Mágica, Madrid",
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // empezó hace 2 días
            endDate:   new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // termina en 3 días
            category: "P1",
            streamUrl: "https://www.youtube.com/@PremierPadelTV",
            logo: "🏆"
        },
        {
            id: "fip_gold_sevilla",
            name: "FIP Gold Sevilla",
            location: "Estadio Olímpico, Sevilla",
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // empieza en 5 días
            endDate:   new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            category: "FIP Gold",
            streamUrl: "https://www.worldpadeltour.com/",
            logo: "🥇"
        }
    ];

    // Partidos simulados del torneo activo (con datos reales de jugadores del ranking)
    const MOCK_MATCHES = [
        {
            id: 1,
            round: "Cuartos de Final",
            status: "live",       // "live" | "finished" | "upcoming"
            startTime: "16:00",
            set1: { t1: 6, t2: 4 },
            set2: { t1: 3, t2: 2 },    // set en juego
            currentSet: 2,
            teamNames: { t1: ["Coello", "Tapia"], t2: ["Galán", "Chingotto"] },
            // Los puntos se rellenarán desde PADEL_PLAYERS
            teamPoints: { t1: [0, 0], t2: [0, 0] },
            streamUrl: "https://www.youtube.com/@PremierPadelTV"
        },
        {
            id: 2,
            round: "Cuartos de Final",
            status: "finished",
            startTime: "14:00",
            set1: { t1: 7, t2: 6 },
            set2: { t1: 6, t2: 4 },
            currentSet: 2,
            teamNames: { t1: ["Di Nenno", "Stupaczuk"], t2: ["Lebron", "Paquito"] },
            teamPoints: { t1: [0, 0], t2: [0, 0] },
            streamUrl: "https://www.youtube.com/@PremierPadelTV"
        },
        {
            id: 3,
            round: "Semifinal",
            status: "upcoming",
            startTime: "18:30",
            set1: null,
            set2: null,
            currentSet: null,
            teamNames: { t1: ["Lebrón", "Galán"], t2: ["Coello", "Tapia"] },
            teamPoints: { t1: [0, 0], t2: [0, 0] },
            streamUrl: "https://www.youtube.com/@PremierPadelTV"
        }
    ];

    /**
     * Comprueba si un torneo está activo (se juega hoy).
     * @param {Object} tournament
     * @returns {boolean}
     */
    function isTournamentLive(tournament) {
        const now = new Date();
        return tournament.startDate <= now && tournament.endDate >= now;
    }

    /**
     * Genera una predicción narrativa basada en la suma de puntos de cada pareja.
     * @param {{t1: number[], t2: number[]}} teamPoints
     * @param {{t1: string[], t2: string[]}} teamNames
     * @returns {{winner: string, winnerKey: 't1'|'t2', confidence: 'alta'|'media'|'baja', text: string}}
     */
    function calculatePrediction(teamPoints, teamNames) {
        const t1Total = teamPoints.t1[0] + teamPoints.t1[1];
        const t2Total = teamPoints.t2[0] + teamPoints.t2[1];
        const diff = Math.abs(t1Total - t2Total);
        const isT1Better = t1Total >= t2Total;

        const winnerNames = isT1Better ? teamNames.t1 : teamNames.t2;
        const winnerKey   = isT1Better ? 't1' : 't2';

        let confidence, result, text;

        if (diff > 10000) {
            confidence = 'alta';
            result = '2-0';
            text = `Victoria clara para ${winnerNames[0]} / ${winnerNames[1]}`;
        } else if (diff > 4000) {
            confidence = 'media';
            result = '2-1';
            text = `Ligera ventaja para ${winnerNames[0]} / ${winnerNames[1]}`;
        } else {
            confidence = 'baja';
            result = '2-1';
            text = `Partido muy igualado. Ventaja mínima para ${winnerNames[0]} / ${winnerNames[1]}`;
        }

        return { winner: winnerNames.join(' / '), winnerKey, confidence, result, text };
    }

    /**
     * Genera el HTML de la tarjeta de un partido.
     */
    function buildMatchCard(match, prediction) {
        const isLive     = match.status === 'live';
        const isFinished = match.status === 'finished';
        const isUpcoming = match.status === 'upcoming';

        // Badget de estado
        const statusBadge = isLive
            ? `<span class="live-badge"><i class="fa-solid fa-circle fa-xs"></i> EN DIRECTO</span>`
            : isFinished
                ? `<span class="finished-badge"><i class="fa-solid fa-flag-checkered"></i> Finalizado</span>`
                : `<span class="upcoming-badge"><i class="fa-solid fa-clock"></i> ${match.startTime} - Próximamente</span>`;

        // Marcador
        let scoreHtml = '';
        if (isLive || isFinished) {
            const s1 = match.set1 ? `${match.set1.t1}-${match.set1.t2}` : '-';
            const s2 = match.set2 ? `${match.set2.t1}-${match.set2.t2}` : '';
            const setLabel2 = isLive && match.currentSet === 2 ? '<span class="current-set-tag">En juego</span>' : '';
            scoreHtml = `
                <div class="score-display">
                    <div class="score-set"><span class="set-label">Set 1</span><span class="set-score">${s1}</span></div>
                    ${s2 ? `<div class="score-set"><span class="set-label">Set 2 ${setLabel2}</span><span class="set-score">${s2}</span></div>` : ''}
                </div>`;
        }

        // Colores de confianza
        const confidenceColor = {
            alta: 'var(--accent)',
            media: 'var(--warning)',
            baja: 'var(--primary)'
        }[prediction.confidence];

        const t1Winner = prediction.winnerKey === 't1';
        const t2Winner = prediction.winnerKey === 't2';

        return `
            <div class="match-card ${isLive ? 'match-live' : ''}">
                <div class="match-header">
                    <span class="match-round">${match.round}</span>
                    ${statusBadge}
                </div>
                <div class="match-teams">
                    <div class="team ${t1Winner ? 'team-favorite' : ''}">
                        <div class="team-names">
                            <span>${match.teamNames.t1[0]}</span>
                            <span>${match.teamNames.t1[1]}</span>
                        </div>
                        ${match.teamPoints.t1[0] > 0 ? `<div class="team-pts">${(match.teamPoints.t1.reduce((a,b)=>a+b,0)).toLocaleString('es-ES')} pts</div>` : ''}
                        ${t1Winner ? '<div class="fav-label">⚡ Favorito</div>' : ''}
                    </div>
                    <div class="vs-divider">
                        <span>VS</span>
                        ${scoreHtml}
                    </div>
                    <div class="team ${t2Winner ? 'team-favorite' : ''}">
                        <div class="team-names">
                            <span>${match.teamNames.t2[0]}</span>
                            <span>${match.teamNames.t2[1]}</span>
                        </div>
                        ${match.teamPoints.t2[0] > 0 ? `<div class="team-pts">${(match.teamPoints.t2.reduce((a,b)=>a+b,0)).toLocaleString('es-ES')} pts</div>` : ''}
                        ${t2Winner ? '<div class="fav-label">⚡ Favorito</div>' : ''}
                    </div>
                </div>
                <div class="match-footer">
                    <div class="prediction-box">
                        <div class="prediction-header">
                            <i class="fa-solid fa-robot"></i>
                            <span>Predicción IA — Confianza <strong style="color:${confidenceColor};">${prediction.confidence.toUpperCase()}</strong></span>
                        </div>
                        <div class="prediction-text">${prediction.text} (${prediction.result})</div>
                    </div>
                    <a href="${match.streamUrl}" target="_blank" class="btn-primary stream-btn">
                        <i class="fa-solid fa-play"></i> ${isLive ? 'Ver En Directo' : 'Ver Highlights'}
                    </a>
                </div>
            </div>`;
    }

    /**
     * Función principal de renderizado. Espera a que PADEL_PLAYERS esté disponible.
     */
    function renderLiveSection() {
        const players = window.PADEL_PLAYERS || [];

        // Intentar asignar puntos reales del ranking a los equipos
        MOCK_MATCHES.forEach(match => {
            const findPoints = (lastName) => {
                const found = players.find(p =>
                    p.name && p.name.toLowerCase().includes(lastName.toLowerCase())
                );
                return found ? found.points : Math.floor(Math.random() * 30000) + 10000;
            };

            match.teamPoints.t1 = match.teamNames.t1.map(n => findPoints(n));
            match.teamPoints.t2 = match.teamNames.t2.map(n => findPoints(n));
        });

        // Detectar torneos activos
        const liveTournaments = LIVE_TOURNAMENTS.filter(isTournamentLive);
        const upcomingTournaments = LIVE_TOURNAMENTS.filter(t => t.startDate > new Date());

        let html = '';

        // Banner de torneo activo
        if (liveTournaments.length > 0) {
            const t = liveTournaments[0];
            html += `
                <div class="tournament-banner">
                    <div class="tournament-banner-left">
                        <span class="tournament-logo">${t.logo}</span>
                        <div>
                            <div class="tournament-name">${t.name}</div>
                            <div class="tournament-location"><i class="fa-solid fa-location-dot"></i> ${t.location} · ${t.category}</div>
                        </div>
                    </div>
                    <a href="${t.streamUrl}" target="_blank" class="btn-primary">
                        <i class="fa-brands fa-youtube"></i> Ver Torneo en Directo
                    </a>
                </div>`;
        }

        // Partidos en directo
        const liveMatches = MOCK_MATCHES.filter(m => m.status === 'live');
        if (liveMatches.length > 0) {
            html += `<h2 class="matches-subtitle"><i class="fa-solid fa-circle" style="color:var(--danger);font-size:0.7rem;"></i> Partidos en Juego</h2>`;
            html += liveMatches.map(m => buildMatchCard(m, calculatePrediction(m.teamPoints, m.teamNames))).join('');
        }

        // Partidos finalizados
        const finished = MOCK_MATCHES.filter(m => m.status === 'finished');
        if (finished.length > 0) {
            html += `<h2 class="matches-subtitle">Resultado Final</h2>`;
            html += finished.map(m => buildMatchCard(m, calculatePrediction(m.teamPoints, m.teamNames))).join('');
        }

        // Próximos partidos
        const upcoming = MOCK_MATCHES.filter(m => m.status === 'upcoming');
        if (upcoming.length > 0) {
            html += `<h2 class="matches-subtitle">Próximos Partidos</h2>`;
            html += upcoming.map(m => buildMatchCard(m, calculatePrediction(m.teamPoints, m.teamNames))).join('');
        }

        // Torneos próximos si no hay torneo activo
        if (liveTournaments.length === 0) {
            html += `<div class="no-live-msg">
                <i class="fa-solid fa-satellite-dish" style="font-size:2.5rem;color:var(--text-sec);margin-bottom:1rem;"></i>
                <p style="font-size:1.1rem;color:var(--text-sec);">No hay torneos en directo ahora mismo.</p>`;

            if (upcomingTournaments.length > 0) {
                const next = upcomingTournaments[0];
                const daysLeft = Math.ceil((next.startDate - new Date()) / (1000 * 60 * 60 * 24));
                html += `<p style="margin-top:1rem;color:var(--primary);">
                    Próximo: <strong>${next.name}</strong> — en ${daysLeft} días</p>`;
            }
            html += `</div>`;
        }

        container.innerHTML = html;
    }

    // Esperar a que el ranking haya cargado para usar los puntos reales
    const maxWait = 3000; // ms
    const interval = setInterval(() => {
        if (window.PADEL_PLAYERS && window.PADEL_PLAYERS.length > 0) {
            clearInterval(interval);
            renderLiveSection();
        }
    }, 200);

    // Fallback si el ranking no carga
    setTimeout(() => {
        clearInterval(interval);
        renderLiveSection();
    }, maxWait);
});
