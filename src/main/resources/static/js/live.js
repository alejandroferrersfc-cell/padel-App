// js/live.js — Torneos En Directo · Premier Padel 2026

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('live-matches-container');
    if (!container) return;

    // ─── Calendario oficial Premier Padel 2026 ───────────────────────────────
    const TOURNAMENTS = [
        // ── Pasados ───────────────────────────────────────────────────────────
        { id: "pp_riyadh_2026",       name: "Riyadh Season P1",  location: "Riyadh, Arabia Saudí",     startDate: new Date("2026-02-09"), endDate: new Date("2026-02-14"), category: "P1",     logo: "🇸🇦" },
        { id: "pp_gijon_2026",        name: "Gijón P2",          location: "Gijón, España",             startDate: new Date("2026-03-02"), endDate: new Date("2026-03-08"), category: "P2",     logo: "🇪🇸" },
        { id: "pp_cancun_2026",       name: "Cancún P2",         location: "Cancún, México",            startDate: new Date("2026-03-16"), endDate: new Date("2026-03-22"), category: "P2",     logo: "🇲🇽" },
        { id: "pp_miami_2026",        name: "Miami P1",          location: "Miami, EE.UU.",             startDate: new Date("2026-03-23"), endDate: new Date("2026-03-29"), category: "P1",     logo: "🇺🇸" },
        { id: "pp_qatar_major_2026",  name: "Qatar Major",       location: "Qatar",                     startDate: new Date("2026-04-06"), endDate: new Date("2026-04-11"), category: "Major",  logo: "🇶🇦" },
        { id: "pp_newgiza_2026",      name: "Newgiza P2",        location: "El Cairo, Egipto",          startDate: new Date("2026-04-13"), endDate: new Date("2026-04-18"), category: "P2",     logo: "🇪🇬" },
        { id: "pp_brussels_2026",     name: "Brussels P2",       location: "Bruselas, Bélgica",         startDate: new Date("2026-04-20"), endDate: new Date("2026-04-26"), category: "P2",     logo: "🇧🇪" },
        // ── Activo / Próximos ─────────────────────────────────────────────────
        { id: "pp_asuncion_2026",     name: "Asunción P2",       location: "Asunción, Paraguay",        startDate: new Date("2026-05-03"), endDate: new Date("2026-05-10"), category: "P2",     logo: "🇵🇾" },
        { id: "pp_buenosaires_2026",  name: "Buenos Aires P1",   location: "Buenos Aires, Argentina",   startDate: new Date("2026-05-11"), endDate: new Date("2026-05-17"), category: "P1",     logo: "🇦🇷" },
        { id: "pp_italy_major_2026",  name: "Italy Major",       location: "Italia",                    startDate: new Date("2026-06-01"), endDate: new Date("2026-06-07"), category: "Major",  logo: "🇮🇹" },
        { id: "pp_valencia_2026",     name: "Valencia P1",       location: "Valencia, España",          startDate: new Date("2026-06-08"), endDate: new Date("2026-06-14"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_valladolid_2026",   name: "Valladolid P2",     location: "Valladolid, España",        startDate: new Date("2026-06-22"), endDate: new Date("2026-06-28"), category: "P2",     logo: "🇪🇸" },
        { id: "pp_bordeaux_2026",     name: "Bordeaux P2",       location: "Burdeos, Francia",          startDate: new Date("2026-06-29"), endDate: new Date("2026-07-05"), category: "P2",     logo: "🇫🇷" },
        { id: "pp_malaga_2026",       name: "Málaga P1",         location: "Málaga, España",            startDate: new Date("2026-07-13"), endDate: new Date("2026-07-19"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_pretoria_2026",     name: "Pretoria P2",       location: "Pretoria, Sudáfrica",       startDate: new Date("2026-07-27"), endDate: new Date("2026-08-02"), category: "P2",     logo: "🇿🇦" },
        { id: "pp_london_2026",       name: "London P1",         location: "Londres, Reino Unido",      startDate: new Date("2026-08-03"), endDate: new Date("2026-08-09"), category: "P1",     logo: "🇬🇧" },
        { id: "pp_madrid_2026",       name: "Madrid P1",         location: "Madrid, España",            startDate: new Date("2026-08-31"), endDate: new Date("2026-09-06"), category: "P1",     logo: "🇪🇸" },
        { id: "pp_paris_major_2026",  name: "Paris Major",       location: "París, Francia",            startDate: new Date("2026-09-07"), endDate: new Date("2026-09-13"), category: "Major",  logo: "🇫🇷" },
        { id: "pp_rotterdam_2026",    name: "Rotterdam P2",      location: "Róterdam, Países Bajos",    startDate: new Date("2026-09-28"), endDate: new Date("2026-10-04"), category: "P2",     logo: "🇳🇱" },
        { id: "pp_germany_2026",      name: "Germany P2",        location: "Alemania",                  startDate: new Date("2026-10-05"), endDate: new Date("2026-10-11"), category: "P2",     logo: "🇩🇪" },
        { id: "pp_milano_2026",       name: "Milano P1",         location: "Milán, Italia",             startDate: new Date("2026-10-12"), endDate: new Date("2026-10-18"), category: "P1",     logo: "🇮🇹" },
        { id: "pp_kuwait_2026",       name: "Kuwait P1",         location: "Kuwait",                    startDate: new Date("2026-10-26"), endDate: new Date("2026-10-31"), category: "P1",     logo: "🇰🇼" },
        { id: "pp_fipworldcup_2026",  name: "FIP World Cup",     location: "Por confirmar",             startDate: new Date("2026-11-01"), endDate: new Date("2026-11-07"), category: "FIP",    logo: "🌍" },
        { id: "pp_dubai_2026",        name: "Dubai P1",          location: "Dubái, EAU",                startDate: new Date("2026-11-09"), endDate: new Date("2026-11-15"), category: "P1",     logo: "🇦🇪" },
        { id: "pp_mexico_major_2026", name: "Mexico Major",      location: "México",                    startDate: new Date("2026-11-23"), endDate: new Date("2026-11-29"), category: "Major",  logo: "🇲🇽" },
        { id: "pp_barcelona_2026",    name: "Barcelona Finals 🏆", location: "Barcelona, España",       startDate: new Date("2026-12-07"), endDate: new Date("2026-12-13"), category: "Finals", logo: "🇪🇸" }
    ].map(t => ({ ...t, streamUrl: "https://www.youtube.com/@PremierPadelOfficial" }));

    // ─── Cuadro de partidos por torneo ───────────────────────────────────────
    // Cada partido: id, round, scheduledTime, status ('upcoming'|'live'|'finished'),
    //   team1/team2: { players: [string, string], pts: [number, number], sets: [{t1,t2}] }
    //   winner: 'team1'|'team2'|null, currentSet: { t1, t2 } (si live)
    const TOURNAMENT_BRACKET = {
        "pp_asuncion_2026": [
            // ── Previas · Ronda 1 (Lun 4 May) ── parejas <10.000 pts ────────
            {
                id: "asu_pv1", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 10:00",
                status: "live",
                sets: [],
                currentGame: { p1: '30', p2: '15' },
                currentSetScore: { p1: 3, p2: 2 },
                team1: { players: ["Zapata", "Sánchez"],    pts: 3500 },
                team2: { players: ["Rico", "García"],        pts: 3600 },
                winner: null
            },
            {
                id: "asu_pv2", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Campagnolo", "Rubio"],   pts: 8000 },
                team2: { players: ["Bautista", "García"],    pts: 7800 },
                winner: null
            },
            {
                id: "asu_pv3", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 15:00",
                status: "upcoming", sets: [],
                team1: { players: ["Ramírez", "Rico"],       pts: 6200 },
                team2: { players: ["Rubio", "García"],       pts: 5800 },
                winner: null
            },
            {
                id: "asu_pv4", round: "Previas · Ronda 1", scheduledTime: "Lun 4 May · 17:00",
                status: "upcoming", sets: [],
                team1: { players: ["Bautista", "Ramírez"],   pts: 6400 },
                team2: { players: ["Muñoz", "Rubio"],        pts: 7200 },
                winner: null
            },
            // ── Previas · Final (Mar 5 May) ──────────────────────────────────
            {
                id: "asu_pvf1", round: "Previas · Final", scheduledTime: "Mar 5 May · 11:00",
                status: "upcoming", sets: [],
                team1: { players: ["Clasificado PV1", ""],   pts: null },
                team2: { players: ["Clasificado PV2", ""],   pts: null },
                winner: null
            },
            {
                id: "asu_pvf2", round: "Previas · Final", scheduledTime: "Mar 5 May · 14:00",
                status: "upcoming", sets: [],
                team1: { players: ["Clasificado PV3", ""],   pts: null },
                team2: { players: ["Clasificado PV4", ""],   pts: null },
                winner: null
            },
            // ── Octavos de Final (Mié–Jue 6–7 May) ── ranking medio ──────────
            {
                id: "asu_r16_1", round: "Octavos de Final", scheduledTime: "Mié 6 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["Tello", "Alonso"],           pts: 14500 },
                team2: { players: ["Clasificado Previa 1", ""],  pts: null },
                winner: null
            },
            {
                id: "asu_r16_2", round: "Octavos de Final", scheduledTime: "Mié 6 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Garrido", "Bergamini"],      pts: 15500 },
                team2: { players: ["Clasificado Previa 2", ""],  pts: null },
                winner: null
            },
            {
                id: "asu_r16_3", round: "Octavos de Final", scheduledTime: "Jue 7 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["González", "Di Nenno"],      pts: 16500 },
                team2: { players: ["Arroyo", "Aguirre"],         pts: 12500 },
                winner: null
            },
            {
                id: "asu_r16_4", round: "Octavos de Final", scheduledTime: "Jue 7 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Nieto", "Sanz"],             pts: 17000 },
                team2: { players: ["Gutiérrez", "V. Ruiz"],      pts: 13000 },
                winner: null
            },
            // ── Cuartos de Final (Vie 8 May) ── top 4 seeds directos ─────────
            {
                id: "asu_qf1", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 10:00",
                status: "upcoming", sets: [],
                team1: { players: ["Coello", "Tapia"],           pts: 36000 },
                team2: { players: ["Ganador Octavos 1", ""],     pts: null },
                winner: null
            },
            {
                id: "asu_qf2", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 12:00",
                status: "upcoming", sets: [],
                team1: { players: ["Galán", "Chingotto"],        pts: 28000 },
                team2: { players: ["Ganador Octavos 2", ""],     pts: null },
                winner: null
            },
            {
                id: "asu_qf3", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 15:00",
                status: "upcoming", sets: [],
                team1: { players: ["Stupaczuk", "Yanguas"],      pts: 24000 },
                team2: { players: ["Ganador Octavos 3", ""],     pts: null },
                winner: null
            },
            {
                id: "asu_qf4", round: "Cuartos de Final", scheduledTime: "Vie 8 May · 17:30",
                status: "upcoming", sets: [],
                team1: { players: ["Lebrón", "Augsburger"],      pts: 20000 },
                team2: { players: ["Ganador Octavos 4", ""],     pts: null },
                winner: null
            },
            // ── Semifinal (Sáb 9 May) ────────────────────────────────────────
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
            // ── Final 🏆 (Dom 10 May) ────────────────────────────────────────
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
    const now = new Date();

    function isLive(t)     { return t.startDate <= now && t.endDate >= now; }
    function isUpcoming(t) { return t.startDate > now; }
    function daysUntil(d)  { return Math.ceil((d - now) / (1000*60*60*24)); }
    function fmtRange(s,e) {
        const o = { day:'numeric', month:'short' };
        return `${s.toLocaleDateString('es-ES',o)} – ${e.toLocaleDateString('es-ES',o)}`;
    }

    // ─── Puntos reales Premier Padel 2026 (por jugador = mitad del total de pareja) ──
    const BASE_PTS = {
        // TOP 10 ──────────────────────────────────────────────────────────────
        // 1. Tapia / Coello → 36.000 pts
        'tapia': 18000, 'coello': 18000,
        // 2. Galán / Chingotto → 28.000 pts
        'galán': 14000, 'galan': 14000, 'chingotto': 14000,
        // 3. Stupaczuk / Yanguas → 24.000 pts
        'stupaczuk': 12000, 'yanguas': 12000,
        // 4. Lebrón / Augsburger → 20.000 pts
        'lebrón': 10000, 'lebron': 10000, 'augsburger': 10000,
        // 5. Navarro / Guerrero → 18.000 pts
        'navarro': 9000, 'guerrero': 9000,
        // 6. Nieto / Sanz → 17.000 pts
        'nieto': 8500, 'sanz': 8500,
        // 7. González / Di Nenno → 16.500 pts
        'gonzález': 8250, 'gonzalez': 8250, 'di nenno': 8250,
        // 8. Garrido / Bergamini → 15.500 pts
        'garrido': 7750, 'bergamini': 7750,
        // 9. Tello / Alonso → 14.500 pts
        'tello': 7250, 'alonso': 7250,
        // 10. A.Ruiz / Leal → 13.500 pts
        'ruiz': 6750, 'leal': 6750,

        // TOP 11–25 ───────────────────────────────────────────────────────────
        // 11. Gutiérrez / V.Ruiz → 13.000 pts
        'gutiérrez': 6500, 'gutierrez': 6500,
        // 12. Arroyo / Aguirre → 12.500 pts
        'arroyo': 6250, 'aguirre': 6250,
        // 13. Alfonso / T.Aguirre → 12.000 pts
        'alfonso': 6000,
        // 14. Gil / Diestro → 11.500 pts
        'gil': 5750, 'diestro': 5750,
        // 15. Lijó / García → 11.000 pts
        'lijó': 5500, 'lijo': 5500,
        // 16. Campagnolo / Moyano → 10.800 pts
        'campagnolo': 5400, 'moyano': 5400,
        // 17. Rubio → 10.500 pts
        'rubio': 5250,
        // 18. Bautista / Muñoz → 10.200 pts
        'bautista': 5100, 'muñoz': 5100, 'munoz': 5100,
        // 19. Ramírez / Rico → 10.000 pts
        'ramírez': 5000, 'ramirez': 5000, 'rico': 5000,
        // 20. Zapata / Cabeza → 9.800 pts
        'zapata': 4900, 'cabeza': 4900,
        // 21. García / Jiménez → 9.500 pts
        'garcía': 4750, 'garcia': 4750, 'jiménez': 4750, 'jimenez': 4750,
        // 22. Jofre / Gala → 9.200 pts
        'jofre': 4600, 'gala': 4600,
        // 23. Sánchez → 9.000 pts
        'sánchez': 4500, 'sanchez': 4500,
        // 24. Barahona → 8.800 pts
        'barahona': 4400,
        // 25. Pineda → 8.500 pts
        'pineda': 4250,

        // TOP 26–50 ───────────────────────────────────────────────────────────
        'bergamasco': 3900, 'ovide': 3800, 'restivo': 3700,
        'collignon': 3600, 'silingo': 3500, 'cardona': 3400,
        'lamperti': 3300, 'lima': 3200, 'bela': 3100,
        'julianoti': 3000, 'solano': 2800,
        // Jugadores de previas (lower tier)
        'semmler': 2200, 'ibáñez': 2000, 'ibanez': 2000,
        'arce': 1800, 'vega': 1600, 'mena': 1500,
        'flores': 1400, 'barrios': 1300, 'luque': 1200,
    };

    function getPlayerPts(name, rankPlayers) {
        const norm = n => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        // 1. Ranking real del backend
        if (rankPlayers && rankPlayers.length) {
            const n = norm(name);
            const f = rankPlayers.find(p => {
                const pn = norm(p.nombreCompleto || p.name || '');
                return pn.includes(n) || n.includes(pn.split(' ').pop());
            });
            if (f && (f.puntos || f.points)) return f.puntos || f.points;
        }
        // 2. Tabla base
        const n = norm(name);
        for (const [k,v] of Object.entries(BASE_PTS)) {
            if (n.includes(norm(k))) return v;
        }
        // 3. Hash determinista (nunca aleatorio)
        return 15000 + (name.split('').reduce((a,c) => (a*31 + c.charCodeAt(0)) >>> 0, 0) % 15000);
    }

    // ─── Predicción IA ───────────────────────────────────────────────────────
    // Usa team.pts (par combinado) si está definido, si no resuelve por nombre.
    function getPrediction(match, players) {
        if (match.status === 'finished') return null;
        const valid = n => n && n.length < 25 && !n.includes('Ganador') && !n.includes('Clasificado');
        const t1names = match.team1.players.filter(valid);
        const t2names = match.team2.players.filter(valid);
        if (!t1names.length || !t2names.length) return null;

        // Prioridad: pts definidos en el cuadro → lookup por nombre
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
        if (diff > 15000)      { conf = 'alta';  label = '2-0'; }
        else if (diff > 5000)  { conf = 'media'; label = '2-1'; }
        else                   { conf = 'baja';  label = '2-1'; }

        const confColor = { alta: '#10b981', media: '#f59e0b', baja: '#00d2ff' }[conf];
        return { favTeam, label, conf, confColor,
            text: `${favNames.join(' / ')} tiene ventaja (${label})`, pts1, pts2 };
    }

    // ─── Render: Marcador de sets ─────────────────────────────────────────────
    // Estructura set: { p1, p2, tb?, tbP1?, tbP2? }
    // Reglas padel: gana a 6 con diff>=2 | 7-5 | 7-6(tiebreak). Mejor de 3 sets.
    function setWinner(s) {
        if (!s) return null;
        if ((s.p1 >= 6 || s.p2 >= 6) && Math.abs(s.p1 - s.p2) >= 2) return s.p1 > s.p2 ? 'p1' : 'p2';
        if (s.p1 === 7 && s.p2 === 6) return 'p1'; // tiebreak
        if (s.p1 === 6 && s.p2 === 7) return 'p2'; // tiebreak
        return null; // en curso
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

    // ─── Render: Tarjeta de partido ───────────────────────────────────────────
    function renderMatchCard(match, pred) {
        const { status, round, scheduledTime, team1, team2, winner } = match;

        const isMatchLive     = status === 'live';
        const isMatchFinished = status === 'finished';

        const isRedBull = round === 'Cuartos de Final' || round === 'Semifinal' || round === 'Final 🏆';
        const streamUrl = isRedBull ? 'https://www.redbull.tv/es_ES/partner-channel/rrn:content:tv-partner-channels:7bbfd0ef-86fd-40fd-be46-f245c351b77a' : 'https://www.youtube.com/@PremierPadelOfficial';
        const streamLabel = isRedBull ? '<i class="fa-solid fa-tv"></i> RedBull TV' : '<i class="fa-brands fa-youtube"></i> YouTube';
        const streamColor = isRedBull ? '#0d1b2a' : '#e52d27';
        
        const streamBtn = `<a href="${streamUrl}" target="_blank" style="margin-left:10px; font-size:0.75rem; padding: 3px 8px; border-radius:4px; background:${streamColor}; color:white; text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-weight:600; opacity:0.9;">${streamLabel}</a>`;

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
            <div class="bracket-match ${isMatchLive ? 'bracket-match-live' : ''} ${isMatchFinished ? 'bracket-match-done' : ''}">
                <div class="bracket-match-header">
                    <span class="bracket-round-label">${round}</span>
                    ${badge}
                </div>
                <div class="bracket-teams">
                    <!-- Equipo 1 -->
                    <div class="bracket-team ${t1Win ? 'bracket-winner' : ''} ${t2Win && isMatchFinished ? 'bracket-loser' : ''}">
                        <div class="bracket-team-names">
                            ${t1Win ? '<i class="fa-solid fa-trophy bracket-trophy"></i>' : ''}
                            <span>${t1Names}</span>
                        </div>
                        ${pred && !isMatchFinished ? `<div class="bracket-pts">${pred.pts1.toLocaleString('es-ES')} pts</div>` : ''}
                    </div>
                    <!-- Sets / Marcador -->
                    <div class="bracket-score-col">
                        ${setsHtml || '<span class="bracket-vs">VS</span>'}
                    </div>
                    <!-- Equipo 2 -->
                    <div class="bracket-team ${t2Win ? 'bracket-winner' : ''} ${t1Win && isMatchFinished ? 'bracket-loser' : ''}">
                        <div class="bracket-team-names">
                            ${t2Win ? '<i class="fa-solid fa-trophy bracket-trophy"></i>' : ''}
                            <span>${t2Names}</span>
                        </div>
                        ${pred && !isMatchFinished ? `<div class="bracket-pts">${pred.pts2.toLocaleString('es-ES')} pts</div>` : ''}
                    </div>
                </div>
                ${predHtml}
            </div>`;
    }

    // ─── Render: Cuadro completo ──────────────────────────────────────────────
    function renderBracket(tournament, players) {
        const matches = TOURNAMENT_BRACKET[tournament.id];
        if (!matches || matches.length === 0) {
            return `<div class="bracket-no-data">
                <i class="fa-solid fa-table-list"></i>
                El cuadro de este torneo aún no está disponible.
            </div>`;
        }

        // Agrupar por ronda
        const rounds = {};
        matches.forEach(m => {
            if (!rounds[m.round]) rounds[m.round] = [];
            rounds[m.round].push(m);
        });

        // Estadísticas rápidas
        const liveCount     = matches.filter(m => m.status === 'live').length;
        const finishedCount = matches.filter(m => m.status === 'finished').length;
        const totalCount    = matches.length;

        let html = `
            <div class="bracket-stats">
                <div class="bs-item"><span class="bs-num" style="color:var(--danger)">${liveCount}</span><span class="bs-label">En juego</span></div>
                <div class="bs-item"><span class="bs-num" style="color:var(--accent)">${finishedCount}</span><span class="bs-label">Finalizados</span></div>
                <div class="bs-item"><span class="bs-num" style="color:var(--text-sec)">${totalCount - finishedCount - liveCount}</span><span class="bs-label">Pendientes</span></div>
            </div>`;

        Object.entries(rounds).forEach(([roundName, roundMatches]) => {
            const hasLive = roundMatches.some(m => m.status === 'live');
            html += `
                <div class="bracket-round-section">
                    <h3 class="bracket-round-title ${hasLive ? 'round-has-live' : ''}">
                        ${hasLive ? '<i class="fa-solid fa-circle fa-xs" style="color:var(--danger);"></i>' : '<i class="fa-solid fa-table-tennis-paddle-ball"></i>'}
                        ${roundName}
                    </h3>
                    <div class="bracket-round-matches">
                        ${roundMatches.map(m => renderMatchCard(m, getPrediction(m, players))).join('')}
                    </div>
                </div>`;
        });

        return html;
    }

    // ─── Render: Banner torneo activo ─────────────────────────────────────────
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
                        <i class="fa-regular fa-calendar"></i> ${fmtRange(t.startDate, t.endDate)} &nbsp;·&nbsp;
                        <span class="tc-category">${t.category}</span>
                    </div>
                </div>
                <div class="live-banner-actions" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <a href="${t.streamUrl}" target="_blank" class="btn-primary btn-live-watch" style="background-color: #e52d27; border:none; gap:6px;">
                        <i class="fa-brands fa-youtube"></i> Primeras Rondas
                    </a>
                    <a href="${rbUrl}" target="_blank" class="btn-primary btn-live-watch" style="background-color: #0d1b2a; border:none; gap:6px;">
                        <i class="fa-solid fa-tv"></i> Cuartos, Semis y Final
                    </a>
                </div>
            </div>`;
    }

    // ─── Render: Sin torneo activo ────────────────────────────────────────────
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
                        <span class="next-date">${fmtRange(next.startDate, next.endDate)} · ${next.location}</span>
                        <div class="next-countdown">
                            <div class="countdown-box"><span class="cb-num">${days}</span><span class="cb-label">días</span></div>
                        </div>
                        <a href="${next.streamUrl}" target="_blank" class="btn-primary" style="margin-top:1.5rem;">
                            <i class="fa-brands fa-youtube"></i> Canal Oficial Premier Padel
                        </a>
                    </div>` : ''}
            </div>`;
    }

    // ─── Render: Calendario próximos ──────────────────────────────────────────
    function renderCalendar(upcoming) {
        if (upcoming.length === 0) return '';
        return `
            <div class="calendar-section">
                <h2 class="matches-subtitle">
                    <i class="fa-regular fa-calendar-days"></i> Próximos Torneos 2026
                </h2>
                <div class="calendar-list">
                    ${upcoming.slice(0, 8).map((t, i) => {
                        const days = daysUntil(t.startDate);
                        return `
                            <div class="tournament-card ${i===0?'tournament-next':''}">
                                <div class="tc-left">
                                    <span class="tc-logo">${t.logo}</span>
                                    <div class="tc-info">
                                        <div class="tc-name">${t.name}</div>
                                        <div class="tc-meta">
                                            <span><i class="fa-solid fa-location-dot"></i> ${t.location}</span>
                                            <span><i class="fa-regular fa-calendar"></i> ${fmtRange(t.startDate, t.endDate)}</span>
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

    // ─── Render principal ─────────────────────────────────────────────────────
    function render(players) {
        const liveTournaments     = TOURNAMENTS.filter(isLive);
        const upcomingTournaments = TOURNAMENTS.filter(isUpcoming);

        let html = '';

        if (liveTournaments.length > 0) {
            const t = liveTournaments[0];
            html += renderLiveBanner(t);
            html += `<div class="bracket-container">${renderBracket(t, players)}</div>`;
        } else {
            html += renderNoLive(upcomingTournaments);
        }

        // Siempre mostramos calendario de próximos
        html += renderCalendar(upcomingTournaments);
        container.innerHTML = html;
    }

    // Esperar a que el ranking esté disponible para usar los puntos reales
    let waited = 0;
    const poll = setInterval(() => {
        waited += 200;
        if ((window.PADEL_PLAYERS && window.PADEL_PLAYERS.length > 0) || waited >= 3000) {
            clearInterval(poll);
            render(window.PADEL_PLAYERS || []);
        }
    }, 200);
});
