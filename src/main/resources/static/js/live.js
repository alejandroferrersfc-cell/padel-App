// js/live.js — Torneos En Directo · Premier Padel 2026

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('live-matches-container');
    if (!container) return;

    // ─── Calendario oficial Premier Padel 2026 ───────────────────────────────
    const TOURNAMENTS = [
        { id: "pp_riyadh_2026",       name: "Riyadh Season P1",    location: "Riyadh, Arabia Saudí",     startDate: new Date("2026-02-09"), endDate: new Date("2026-02-14"), category: "P1",     logo: "🇸🇦" },
        { id: "pp_gijon_2026",        name: "Gijón P2",            location: "Gijón, España",             startDate: new Date("2026-03-02"), endDate: new Date("2026-03-08"), category: "P2",     logo: "🇪🇸" },
        { id: "pp_cancun_2026",       name: "Cancún P2",           location: "Cancún, México",            startDate: new Date("2026-03-16"), endDate: new Date("2026-03-22"), category: "P2",     logo: "🇲🇽" },
        { id: "pp_miami_2026",        name: "Miami P1",            location: "Miami, EE.UU.",             startDate: new Date("2026-03-23"), endDate: new Date("2026-03-29"), category: "P1",     logo: "🇺🇸" },
        { id: "pp_qatar_major_2026",  name: "Qatar Major",         location: "Qatar",                     startDate: new Date("2026-04-06"), endDate: new Date("2026-04-11"), category: "Major",  logo: "🇶🇦" },
        { id: "pp_newgiza_2026",      name: "Newgiza P2",          location: "El Cairo, Egipto",          startDate: new Date("2026-04-13"), endDate: new Date("2026-04-18"), category: "P2",     logo: "🇪🇬" },
        { id: "pp_brussels_2026",     name: "Brussels P2",         location: "Bruselas, Bélgica",         startDate: new Date("2026-04-20"), endDate: new Date("2026-04-26"), category: "P2",     logo: "🇧🇪" },
        { id: "pp_asuncion_2026",     name: "Asunción P2",         location: "Asunción, Paraguay",        startDate: new Date("2026-05-03"), endDate: new Date("2026-05-10"), category: "P2",     logo: "🇵🇾" },
        { id: "pp_buenosaires_2026",  name: "Buenos Aires P1",     location: "Buenos Aires, Argentina",   startDate: new Date("2026-05-11"), endDate: new Date("2026-05-17"), category: "P1",     logo: "🇦🇷" },
        { id: "pp_italy_major_2026",  name: "Italy Major",         location: "Italia",                    startDate: new Date("2026-06-01"), endDate: new Date("2026-06-07"), category: "Major",  logo: "🇮🇹" },
        { id: "pp_valencia_2026",     name: "Valencia P1",         location: "Valencia, España",          startDate: new Date("2026-06-08"), endDate: new Date("2026-06-14"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_valladolid_2026",   name: "Valladolid P2",       location: "Valladolid, España",        startDate: new Date("2026-06-22"), endDate: new Date("2026-06-28"), category: "P2",     logo: "🇪🇸" },
        { id: "pp_bordeaux_2026",     name: "Bordeaux P2",         location: "Burdeos, Francia",          startDate: new Date("2026-06-29"), endDate: new Date("2026-07-05"), category: "P2",     logo: "🇫🇷" },
        { id: "pp_malaga_2026",       name: "Málaga P1",           location: "Málaga, España",            startDate: new Date("2026-07-13"), endDate: new Date("2026-07-19"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_pretoria_2026",     name: "Pretoria P2",         location: "Pretoria, Sudáfrica",       startDate: new Date("2026-07-27"), endDate: new Date("2026-08-02"), category: "P2",     logo: "🇿🇦" },
        { id: "pp_london_2026",       name: "London P1",           location: "Londres, Reino Unido",      startDate: new Date("2026-08-03"), endDate: new Date("2026-08-09"), category: "P1",     logo: "🇬🇧" },
        { id: "pp_madrid_2026",       name: "Madrid P1",           location: "Madrid, España",            startDate: new Date("2026-08-31"), endDate: new Date("2026-09-06"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_paris_major_2026",  name: "Paris Major",         location: "París, Francia",            startDate: new Date("2026-09-07"), endDate: new Date("2026-09-13"), category: "Major",  logo: "🇫🇷" },
        { id: "pp_rotterdam_2026",    name: "Rotterdam P2",        location: "Róterdam, Países Bajos",    startDate: new Date("2026-09-28"), endDate: new Date("2026-10-04"), category: "P2",     logo: "🇳🇱" },
        { id: "pp_germany_2026",      name: "Germany P2",          location: "Alemania",                  startDate: new Date("2026-10-05"), endDate: new Date("2026-10-11"), category: "P2",     logo: "🇩🇪" },
        { id: "pp_milano_2026",       name: "Milano P1",           location: "Milán, Italia",             startDate: new Date("2026-10-12"), endDate: new Date("2026-10-18"), category: "P1",     logo: "🇮🇹" },
        { id: "pp_kuwait_2026",       name: "Kuwait P1",           location: "Kuwait",                    startDate: new Date("2026-10-26"), endDate: new Date("2026-10-31"), category: "P1",     logo: "🇰🇼" },
        { id: "pp_fipworldcup_2026",  name: "FIP World Cup",       location: "Por confirmar",             startDate: new Date("2026-11-01"), endDate: new Date("2026-11-07"), category: "FIP",    logo: "🌍" },
        { id: "pp_dubai_2026",        name: "Dubai P1",            location: "Dubái, EAU",                startDate: new Date("2026-11-09"), endDate: new Date("2026-11-15"), category: "P1",     logo: "🇦🇪" },
        { id: "pp_mexico_major_2026", name: "Mexico Major",        location: "México",                    startDate: new Date("2026-11-23"), endDate: new Date("2026-11-29"), category: "Major",  logo: "🇲🇽" },
        { id: "pp_barcelona_2026",    name: "Barcelona Finals 🏆", location: "Barcelona, España",         startDate: new Date("2026-12-07"), endDate: new Date("2026-12-13"), category: "Finals", logo: "🇪🇸" }
    ].map(t => ({ ...t, streamUrl: "https://www.youtube.com/@PremierPadelOfficial" }));

    const TOURNAMENT_BRACKET = {
        "pp_asuncion_2026": [
            {
                id: "asu_pv1", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 10:00",
                status: "live", sets: [],
                currentGame: { p1: '30', p2: '15' },
                currentSetScore: { p1: 3, p2: 2 },
                team1: { players: ["Zapata", "Sánchez"], pts: 3500 },
                team2: { players: ["Rico", "García"],    pts: 3600 },
                winner: null
            },
            {
                id: "asu_pv2", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Campagnolo", "Rubio"], pts: 8000 },
                team2: { players: ["Bautista", "García"],  pts: 7800 },
                winner: null
            },
            {
                id: "asu_pv3", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 15:00",
                status: "upcoming", sets: [],
                team1: { players: ["Ramírez", "Rico"],  pts: 6200 },
                team2: { players: ["Rubio", "García"],  pts: 5800 },
                winner: null
            },
            {
                id: "asu_pv4", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 17:00",
                status: "upcoming", sets: [],
                team1: { players: ["Bautista", "Ramírez"], pts: 6400 },
                team2: { players: ["Muñoz", "Rubio"],      pts: 7200 },
                winner: null
            },
            {
                id: "asu_pvf1", round: "Previas · Final", scheduledTime: "Mar 5 May · 11:00",
                status: "upcoming", sets: [],
                team1: { players: ["Clasificado PV1", ""], pts: null },
                team2: { players: ["Clasificado PV2", ""], pts: null },
                winner: null
            },
            {
                id: "asu_pvf2", round: "Previas · Final", scheduledTime: "Mar 5 May · 14:00",
                status: "upcoming", sets: [],
                team1: { players: ["Clasificado PV3", ""], pts: null },
                team2: { players: ["Clasificado PV4", ""], pts: null },
                winner: null
            },
            {
                id: "asu_r16_1", round: "Octavos de Final", scheduledTime: "Mié 6 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["Tello", "Alonso"],              pts: 14500 },
                team2: { players: ["Clasificado Previa 1", ""],     pts: null },
                winner: null
            },
            {
                id: "asu_r16_2", round: "Octavos de Final", scheduledTime: "Mié 6 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Garrido", "Bergamini"],         pts: 15500 },
                team2: { players: ["Clasificado Previa 2", ""],     pts: null },
                winner: null
            },
            {
                id: "asu_r16_3", round: "Octavos de Final", scheduledTime: "Jue 7 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["González", "Di Nenno"], pts: 16500 },
                team2: { players: ["Arroyo", "Aguirre"],    pts: 12500 },
                winner: null
            },
            {
                id: "asu_r16_4", round: "Octavos de Final", scheduledTime: "Jue 7 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Nieto", "Sanz"],           pts: 17000 },
                team2: { players: ["Gutiérrez", "V. Ruiz"],    pts: 13000 },
                winner: null
            },
            {
                id: "asu_qf1", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["Coello", "Tapia"],         pts: 36000 },
                team2: { players: ["Ganador Octavos 1", ""],   pts: null },
                winner: null
            },
            {
                id: "asu_qf2", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Galán", "Chingotto"],      pts: 28000 },
                team2: { players: ["Ganador Octavos 2", ""],   pts: null },
                winner: null
            },
            {
                id: "asu_qf3", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 15:00",
                status: "upcoming", sets: [],
                team1: { players: ["Stupaczuk", "Yanguas"],    pts: 24000 },
                team2: { players: ["Ganador Octavos 3", ""],   pts: null },
                winner: null
            },
            {
                id: "asu_qf4", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 17:30",
                status: "upcoming", sets: [],
                team1: { players: ["Lebrón", "Augsburger"],    pts: 20000 },
                team2: { players: ["Ganador Octavos 4", ""],   pts: null },
                winner: null
            },
            {
                id: "asu_sf1", round: "Semifinal", scheduledTime: "Sáb 9 May · 11:00",
                status: "upcoming", sets: [],
                team1: { players: ["Ganador QF1", ""], pts: null },
                team2: { players: ["Ganador QF2", ""], pts: null },
                winner: null
            },
            {
                id: "asu_sf2", round: "Semifinal", scheduledTime: "Sáb 9 May · 14:00",
                status: "upcoming", sets: [],
                team1: { players: ["Ganador QF3", ""], pts: null },
                team2: { players: ["Ganador QF4", ""], pts: null },
                winner: null
            },
            {
                id: "asu_final", round: "Final 🏆", scheduledTime: "Dom 10 May · 16:00",
                status: "upcoming", sets: [],
                team1: { players: ["Ganador SF1", ""], pts: null },
                team2: { players: ["Ganador SF2", ""], pts: null },
                winner: null
            }
        ]
    };

    // ─── Helpers ─────────────────────────────────────────────────────────────

    // ═══════════════════════════════════════════════════════════════
    // MODO DEMO PRESENTACIÓN
    // Cambia NOW_DEMO a null para volver al comportamiento real,
    // o pon una fecha dentro de un torneo para activar el modo demo.
    //
    // Italy Major: 2026-06-01 → 2026-06-07
    // Ejemplo: viernes 5 junio a las 15:30 (Cuartos en directo)
    const NOW_DEMO = new Date('2026-05-06T15:30:00'); // Mié 6 mayo · Octavos en directo · Asunción P2 // ← null para producción real
    // const NOW_DEMO = null; // ← descomentar esto y comentar la línea de arriba después de exponer
    // ═══════════════════════════════════════════════════════════════

    const now = NOW_DEMO || new Date();

    function isLive(t)     { return t.startDate <= now && t.endDate >= now; }
    function isUpcoming(t) { return t.startDate > now; }
    function daysUntil(d)  { return Math.ceil((d - now) / (1000*60*60*24)); }
    function fmtRange(s,e) {
        const o = { day:'numeric', month:'short' };
        return `${s.toLocaleDateString('es-ES',o)} – ${e.toLocaleDateString('es-ES',o)}`;
    }

    const BASE_PTS = {
        'tapia': 18000, 'coello': 18000,
        'galán': 14000, 'galan': 14000, 'chingotto': 14000,
        'stupaczuk': 12000, 'yanguas': 12000,
        'lebrón': 10000, 'lebron': 10000, 'augsburger': 10000,
        'navarro': 9000, 'guerrero': 9000,
        'nieto': 8500, 'sanz': 8500,
        'gonzález': 8250, 'gonzalez': 8250, 'di nenno': 8250,
        'garrido': 7750, 'bergamini': 7750,
        'tello': 7250, 'alonso': 7250,
        'ruiz': 6750, 'leal': 6750,
        'gutiérrez': 6500, 'gutierrez': 6500,
        'arroyo': 6250, 'aguirre': 6250,
        'alfonso': 6000,
        'gil': 5750, 'diestro': 5750,
        'lijó': 5500, 'lijo': 5500,
        'campagnolo': 5400, 'moyano': 5400,
        'rubio': 5250,
        'bautista': 5100, 'muñoz': 5100, 'munoz': 5100,
        'ramírez': 5000, 'ramirez': 5000, 'rico': 5000,
        'zapata': 4900, 'cabeza': 4900,
        'garcía': 4750, 'garcia': 4750, 'jiménez': 4750, 'jimenez': 4750,
        'jofre': 4600, 'gala': 4600,
        'sánchez': 4500, 'sanchez': 4500,
        'barahona': 4400,
        'pineda': 4250,
        'bergamasco': 3900, 'ovide': 3800, 'restivo': 3700,
        'collignon': 3600, 'silingo': 3500, 'cardona': 3400,
        'lamperti': 3300, 'lima': 3200, 'bela': 3100,
        'julianoti': 3000, 'solano': 2800,
        'semmler': 2200, 'ibáñez': 2000, 'ibanez': 2000,
        'arce': 1800, 'vega': 1600, 'mena': 1500,
        'flores': 1400, 'barrios': 1300, 'luque': 1200,
    };

    function getPlayerPts(name, rankPlayers) {
        const norm = n => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        if (rankPlayers && rankPlayers.length) {
            const n = norm(name);
            const f = rankPlayers.find(p => {
                const pn = norm(p.nombreCompleto || p.name || '');
                return pn.includes(n) || n.includes(pn.split(' ').pop());
            });
            if (f && (f.puntos || f.points)) return f.puntos || f.points;
        }
        const n = norm(name);
        for (const [k,v] of Object.entries(BASE_PTS)) {
            if (n.includes(norm(k))) return v;
        }
        return 15000 + (name.split('').reduce((a,c) => (a*31 + c.charCodeAt(0)) >>> 0, 0) % 15000);
    }

    function getPrediction(match, players) {
        if (match.status === 'finished') return null;
        const valid = n => n && n.length < 25 && !n.includes('Ganador') && !n.includes('Clasificado');
        const t1names = match.team1.players.filter(valid);
        const t2names = match.team2.players.filter(valid);
        if (!t1names.length || !t2names.length) return null;

        const pts1 = match.team1.pts != null
            ? match.team1.pts
            : t1names.reduce((s,n) => s + getPlayerPts(n, players), 0);
        const pts2 = match.team2.pts != null
            ? match.team2.pts
            : t2names.reduce((s,n) => s + getPlayerPts(n, players), 0);

        const diff = Math.abs(pts1 - pts2);
        const favTeam = pts1 >= pts2 ? 'team1' : 'team2';
        const favNames = favTeam === 'team1' ? t1names : t2names;

        let conf, label;
        if (diff > 15000)     { conf = 'alta';  label = '2-0'; }
        else if (diff > 5000) { conf = 'media'; label = '2-1'; }
        else                  { conf = 'baja';  label = '2-1'; }

        const confColor = { alta: '#10b981', media: '#f59e0b', baja: '#00d2ff' }[conf];
        return { favTeam, label, conf, confColor,
            text: `${favNames.join(' / ')} tiene ventaja (${label})`, pts1, pts2 };
    }

    function setWinner(s) {
        if (!s) return null;
        if ((s.p1 >= 6 || s.p2 >= 6) && Math.abs(s.p1 - s.p2) >= 2) return s.p1 > s.p2 ? 'p1' : 'p2';
        if (s.p1 === 7 && s.p2 === 6) return 'p1';
        if (s.p1 === 6 && s.p2 === 7) return 'p2';
        return null;
    }

    function renderSets(match) {
        const { status, sets, currentSetScore, currentGame } = match;
        if (status === 'upcoming') return '';
        const done = sets || [];
        if (done.length === 0 && !currentSetScore) return '';

        let html = '<div class="bracket-sets">';
        done.forEach((s, i) => {
            const w = setWinner(s);
            const tbNote = s.tb ? `<span class="tb-tag">(${Math.min(s.tbP1??0,s.tbP2??0)})</span>` : '';
            html += `<div class="bracket-set-col">
                <span class="bracket-set-num">${i+1}</span>
                <span class="bracket-set-score ${w==='p1'?'set-win':''}">${s.p1}${w==='p1'?tbNote:''}</span>
                <span class="bracket-set-score ${w==='p2'?'set-win':''}">${s.p2}${w==='p2'?tbNote:''}</span>
            </div>`;
        });
        if (status === 'live' && currentSetScore) {
            html += `<div class="bracket-set-col live-set">
                <span class="bracket-set-num">●</span>
                <span class="bracket-set-score">${currentSetScore.p1}</span>
                <span class="bracket-set-score">${currentSetScore.p2}</span>
            </div>`;
        }
        html += '</div>';
        if (status === 'live' && currentGame) {
            html += `<div class="bracket-game-score">${currentGame.p1} – ${currentGame.p2}</div>`;
        }
        return html;
    }

    function renderMatchCard(match, pred) {
        const { status, round, scheduledTime, team1, team2, winner } = match;
        const isMatchLive     = status === 'live';
        const isMatchFinished = status === 'finished';

        const isRedBull = round === 'Cuartos de Final' || round === 'Semifinal' || round === 'Final 🏆';
        const streamUrl = isRedBull
            ? 'https://www.redbull.tv/es_ES/partner-channel/rrn:content:tv-partner-channels:7bbfd0ef-86fd-40fd-be46-f245c351b77a'
            : 'https://www.youtube.com/@PremierPadelOfficial';
        const streamLabel = isRedBull ? '<i class="fa-solid fa-tv"></i> RedBull TV' : '<i class="fa-brands fa-youtube"></i> YouTube';
        const streamColor = isRedBull ? '#0d1b2a' : '#e52d27';
        const streamBtn = `<a href="${streamUrl}" target="_blank" style="margin-left:10px;font-size:0.75rem;padding:3px 8px;border-radius:4px;background:${streamColor};color:white;text-decoration:none;display:inline-flex;align-items:center;gap:4px;font-weight:600;opacity:0.9;">${streamLabel}</a>`;

        const badge = isMatchLive
            ? `<span class="live-badge"><i class="fa-solid fa-circle fa-xs"></i> EN DIRECTO</span> ${streamBtn}`
            : isMatchFinished
                ? `<span class="finished-badge"><i class="fa-solid fa-flag-checkered"></i> Finalizado</span>`
                : `<span class="upcoming-badge"><i class="fa-regular fa-clock"></i> ${scheduledTime}</span> ${streamBtn}`;

        const t1Win = winner === 'team1';
        const t2Win = winner === 'team2';
        const t1Names = team1.players.filter(n=>n).join(' / ');
        const t2Names = team2.players.filter(n=>n).join(' / ');
        const setsHtml = renderSets(match);
        const predHtml = pred ? `
            <div class="bracket-prediction">
                <i class="fa-solid fa-robot"></i>
                <span>IA: <strong style="color:${pred.confColor}">${pred.conf.toUpperCase()}</strong>
                — ${pred.text}</span>
            </div>` : '';

        return `
            <div class="bracket-match ${isMatchLive?'bracket-match-live':''} ${isMatchFinished?'bracket-match-done':''}">
                <div class="bracket-match-header">
                    <span class="bracket-round-label">${round}</span>
                    ${badge}
                </div>
                <div class="bracket-teams">
                    <div class="bracket-team ${t1Win?'bracket-winner':''} ${t2Win&&isMatchFinished?'bracket-loser':''}">
                        <div class="bracket-team-names">
                            ${t1Win?'<i class="fa-solid fa-trophy bracket-trophy"></i>':''}
                            <span>${t1Names}</span>
                        </div>
                        ${pred&&!isMatchFinished?`<div class="bracket-pts">${pred.pts1.toLocaleString('es-ES')} pts</div>`:''}
                    </div>
                    <div class="bracket-score-col">
                        ${setsHtml||'<span class="bracket-vs">VS</span>'}
                    </div>
                    <div class="bracket-team ${t2Win?'bracket-winner':''} ${t1Win&&isMatchFinished?'bracket-loser':''}">
                        <div class="bracket-team-names">
                            ${t2Win?'<i class="fa-solid fa-trophy bracket-trophy"></i>':''}
                            <span>${t2Names}</span>
                        </div>
                        ${pred&&!isMatchFinished?`<div class="bracket-pts">${pred.pts2.toLocaleString('es-ES')} pts</div>`:''}
                    </div>
                </div>
                ${predHtml}
            </div>`;
    }

    function renderBracket(tournament, players) {
        const matches = TOURNAMENT_BRACKET[tournament.id];
        if (!matches || matches.length === 0) {
            return `<div class="bracket-no-data">
                <i class="fa-solid fa-table-list"></i>
                El cuadro de este torneo aún no está disponible.
            </div>`;
        }

        const rounds = {};
        matches.forEach(m => {
            if (!rounds[m.round]) rounds[m.round] = [];
            rounds[m.round].push(m);
        });

        const liveCount     = matches.filter(m => m.status === 'live').length;
        const finishedCount = matches.filter(m => m.status === 'finished').length;
        const totalCount    = matches.length;

        let html = `
            <div class="bracket-stats">
                <div class="bs-item"><span class="bs-num" style="color:var(--danger)">${liveCount}</span><span class="bs-label">En juego</span></div>
                <div class="bs-item"><span class="bs-num" style="color:var(--accent)">${finishedCount}</span><span class="bs-label">Finalizados</span></div>
                <div class="bs-item"><span class="bs-num" style="color:var(--text-sec)">${totalCount-finishedCount-liveCount}</span><span class="bs-label">Pendientes</span></div>
            </div>`;

        Object.entries(rounds).forEach(([roundName, roundMatches]) => {
            const hasLive = roundMatches.some(m => m.status === 'live');
            html += `
                <div class="bracket-round-section">
                    <h3 class="bracket-round-title ${hasLive?'round-has-live':''}">
                        ${hasLive?'<i class="fa-solid fa-circle fa-xs" style="color:var(--danger);"></i>':'<i class="fa-solid fa-table-tennis-paddle-ball"></i>'}
                        ${roundName}
                    </h3>
                    <div class="bracket-round-matches">
                        ${roundMatches.map(m => renderMatchCard(m, getPrediction(m, players))).join('')}
                    </div>
                </div>`;
        });

        return html;
    }

    function renderLiveBanner(t) {
        const rbUrl = "https://www.redbull.tv/es_ES/partner-channel/rrn:content:tv-partner-channels:7bbfd0ef-86fd-40fd-be46-f245c351b77a";
        return `
            <div class="live-now-banner">
                <div class="live-now-pulse"></div>
                <div class="live-now-info">
                    <span class="live-badge-big"><i class="fa-solid fa-circle fa-xs"></i> EN DIRECTO</span>
                    <div class="live-now-name">${t.logo} ${t.name}</div>
                    <div class="live-now-meta">
                        <i class="fa-solid fa-location-dot"></i> ${t.location} &nbsp;·&nbsp;
                        <i class="fa-regular fa-calendar"></i> ${fmtRange(t.startDate,t.endDate)} &nbsp;·&nbsp;
                        <span class="tc-category">${t.category}</span>
                    </div>
                </div>
                <div class="live-banner-actions" style="display:flex;gap:10px;flex-wrap:wrap;">
                    <a href="${t.streamUrl}" target="_blank" class="btn-primary btn-live-watch" style="background-color:#e52d27;border:none;gap:6px;">
                        <i class="fa-brands fa-youtube"></i> Primeras Rondas
                    </a>
                    <a href="${rbUrl}" target="_blank" class="btn-primary btn-live-watch" style="background-color:#0d1b2a;border:none;gap:6px;">
                        <i class="fa-solid fa-tv"></i> Cuartos, Semis y Final
                    </a>
                </div>
            </div>`;
    }

    function renderNoLive(upcoming) {
        const next = upcoming[0];
        const days = next ? daysUntil(next.startDate) : null;
        return `
            <div class="no-live-hero">
                <div class="no-live-icon">📡</div>
                <h3 class="no-live-title">No hay torneos en directo ahora mismo</h3>
                <p class="no-live-sub">Cuando haya un torneo activo, aquí podrás ver el cuadro, los resultados en tiempo real y las predicciones basadas en el ranking.</p>
                ${next ? `
                    <div class="no-live-next">
                        <span class="next-label">Próximo torneo</span>
                        <span class="next-name">${next.logo} ${next.name}</span>
                        <span class="next-date">${fmtRange(next.startDate,next.endDate)} · ${next.location}</span>
                        <div class="next-countdown">
                            <div class="countdown-box"><span class="cb-num">${days}</span><span class="cb-label">días</span></div>
                        </div>
                        <a href="${next.streamUrl}" target="_blank" class="btn-primary" style="margin-top:1.5rem;">
                            <i class="fa-brands fa-youtube"></i> Canal Oficial Premier Padel
                        </a>
                    </div>` : ''}
            </div>`;
    }

    function renderCalendar(upcoming) {
        if (upcoming.length === 0) return '';
        return `
            <div class="calendar-section">
                <h2 class="matches-subtitle">
                    <i class="fa-regular fa-calendar-days"></i> Próximos Torneos 2026
                </h2>
                <div class="calendar-list">
                    ${upcoming.slice(0,8).map((t,i) => {
                        const days = daysUntil(t.startDate);
                        return `
                            <div class="tournament-card ${i===0?'tournament-next':''}">
                                <div class="tc-left">
                                    <span class="tc-logo">${t.logo}</span>
                                    <div class="tc-info">
                                        <div class="tc-name">${t.name}</div>
                                        <div class="tc-meta">
                                            <span><i class="fa-solid fa-location-dot"></i> ${t.location}</span>
                                            <span><i class="fa-regular fa-calendar"></i> ${fmtRange(t.startDate,t.endDate)}</span>
                                            <span class="tc-category">${t.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="tc-right">
                                    ${i===0
                                        ? `<div class="tc-countdown"><span class="tc-days">${days}</span><span class="tc-days-label">días</span></div>`
                                        : `<div class="tc-days-small">En ${days} días</div>`}
                                    <a href="${t.streamUrl}" target="_blank" class="btn-stream">
                                        <i class="fa-brands fa-youtube"></i> Canal Oficial
                                    </a>
                                </div>
                            </div>`;
                    }).join('')}
                </div>
            </div>`;
    }

    const NEXT_MATCH = {
        "asu_pv1":  { id: "asu_pvf1",  slot: "team1" },
        "asu_pv2":  { id: "asu_pvf1",  slot: "team2" },
        "asu_pv3":  { id: "asu_pvf2",  slot: "team1" },
        "asu_pv4":  { id: "asu_pvf2",  slot: "team2" },
        "asu_pvf1": { id: "asu_r16_1", slot: "team2" },
        "asu_pvf2": { id: "asu_r16_2", slot: "team2" },
        "asu_r16_1":{ id: "asu_qf1",   slot: "team2" },
        "asu_r16_2":{ id: "asu_qf2",   slot: "team2" },
        "asu_r16_3":{ id: "asu_qf3",   slot: "team2" },
        "asu_r16_4":{ id: "asu_qf4",   slot: "team2" },
        "asu_qf1":  { id: "asu_sf1",   slot: "team1" },
        "asu_qf2":  { id: "asu_sf1",   slot: "team2" },
        "asu_qf3":  { id: "asu_sf2",   slot: "team1" },
        "asu_qf4":  { id: "asu_sf2",   slot: "team2" },
        "asu_sf1":  { id: "asu_final", slot: "team1" },
        "asu_sf2":  { id: "asu_final", slot: "team2" }
    };

    function parseTime(scheduledStr) {
        const months = { 'Ene':1,'Feb':2,'Mar':3,'Abr':4,'May':5,'Jun':6,'Jul':7,'Ago':8,'Sep':9,'Oct':10,'Nov':11,'Dic':12 };
        const parts = scheduledStr.split(' ');
        if (parts.length < 5) return new Date();
        const day = parseInt(parts[1]);
        const month = months[parts[2]] || 5;
        const [h,m] = parts[4].split(':').map(Number);
        return new Date(2026, month-1, day, h, m);
    }

    function prng(seedStr) {
        let h = 0xdeadbeef;
        for (let i=0; i<seedStr.length; i++) h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
        return ((h ^ h >>> 16) >>> 0) / 4294967296;
    }

    function processBracket(tournament, players) {
        const matches = TOURNAMENT_BRACKET[tournament.id];
        if (!matches) return;

        const matchMap = {};
        matches.forEach(m => matchMap[m.id] = m);

        matches.forEach(match => {
            const startTime = parseTime(match.scheduledTime);
            const endTime   = new Date(startTime.getTime() + 90 * 60000);

            if (!match.team1.players[0] || !match.team2.players[0]
                || match.team1.players[0].includes('Ganador') || match.team1.players[0].includes('Clasificado')
                || match.team2.players[0].includes('Ganador') || match.team2.players[0].includes('Clasificado')) {
                match.status = 'upcoming';
                match.winner = null;
                match.sets = [];
                match.currentSetScore = null;
                match.currentGame = null;
                return;
            }

            const p      = prng(match.id);
            const pred   = getPrediction(match, players) || { favTeam: 'team1', conf: 'media' };
            const winner = p < 0.85 ? pred.favTeam : (pred.favTeam === 'team1' ? 'team2' : 'team1');
            const loser  = winner === 'team1' ? 'team2' : 'team1';

            let sets = [];
            const straight = prng(match.id+'sets') < 0.65;
            if (straight) {
                sets.push({ [winner.replace('team','p')]: 6, [loser.replace('team','p')]: 4 - Math.floor(prng(match.id+'s1')*3) });
                sets.push({ [winner.replace('team','p')]: 6, [loser.replace('team','p')]: 4 - Math.floor(prng(match.id+'s2')*3) });
            } else {
                sets.push({ [winner.replace('team','p')]: 6, [loser.replace('team','p')]: 4 - Math.floor(prng(match.id+'s1')*3) });
                sets.push({ [winner.replace('team','p')]: 4 - Math.floor(prng(match.id+'s2')*3), [loser.replace('team','p')]: 6 });
                sets.push({ [winner.replace('team','p')]: 6, [loser.replace('team','p')]: 4 - Math.floor(prng(match.id+'s3')*3) });
            }

            // ✅ Usa NOW_DEMO si está activo, si no usa la hora real
            const currentTime = NOW_DEMO || new Date();

            if (currentTime < startTime) {
                match.status = 'upcoming';
                match.winner = null;
                match.sets = [];
                match.currentSetScore = null;
                match.currentGame = null;
            } else if (currentTime >= endTime) {
                match.status = 'finished';
                match.winner = winner;
                match.sets = sets;
                match.currentSetScore = null;
                match.currentGame = null;
                const next = NEXT_MATCH[match.id];
                if (next && matchMap[next.id]) {
                    matchMap[next.id][next.slot] = { players: [...match[winner].players], pts: match[winner].pts };
                }
            } else {
                match.status = 'live';
                match.winner = null;
                const progress = (currentTime - startTime) / (90 * 60000);
                const numSets = sets.length;
                const currentSetIndex = Math.floor(progress * numSets);
                match.sets = sets.slice(0, currentSetIndex);
                if (currentSetIndex < numSets) {
                    const targetSet = sets[currentSetIndex];
                    const setProgress = (progress * numSets) - currentSetIndex;
                    match.currentSetScore = {
                        p1: Math.floor(targetSet.p1 * setProgress),
                        p2: Math.floor(targetSet.p2 * setProgress)
                    };
                    const games = ['15','30','40','A'];
                    match.currentGame = {
                        p1: games[Math.floor(prng(match.id+'g1'+currentTime.getMinutes())*4)],
                        p2: games[Math.floor(prng(match.id+'g2'+currentTime.getMinutes())*4)]
                    };
                } else {
                    match.currentSetScore = { p1: 0, p2: 0 };
                    match.currentGame = { p1: '0', p2: '0' };
                }
            }
        });
    }

    function render(players) {
        const liveTournaments     = TOURNAMENTS.filter(isLive);
        const upcomingTournaments = TOURNAMENTS.filter(isUpcoming);
        let html = '';

        if (liveTournaments.length > 0) {
            const t = liveTournaments[0];
            processBracket(t, players);
            html += renderLiveBanner(t);
            html += `<div class="bracket-container">${renderBracket(t, players)}</div>`;
        } else {
            html += renderNoLive(upcomingTournaments);
        }

        html += renderCalendar(upcomingTournaments);
        container.innerHTML = html;
    }

    let waited = 0;
    const poll = setInterval(() => {
        waited += 200;
        if ((window.PADEL_PLAYERS && window.PADEL_PLAYERS.length > 0) || waited >= 3000) {
            clearInterval(poll);
            render(window.PADEL_PLAYERS || []);
        }
    }, 200);
});