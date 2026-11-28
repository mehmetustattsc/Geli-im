/* Gelişim — kişisel gelişim uygulaması. Veri telefonda (localStorage) saklanır. */
(function () {
  "use strict";
  var TR = window.TRACKS, CUR = window.CURRICULUM;
  var KEY = "gelisim.v1";
  var $app = document.getElementById("app");
  var TRK = {}; TR.forEach(function (t) { TRK[t.id] = t; });
  var GUN = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  var GUNK = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  var AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  var CAT = { is: "İş", kariyer: "Kariyer", gelir: "Gelir", hobi: "Hobi", aile: "Aile" };
  var PASS = 0.8;

  /* ---------- ikonlar ---------- */
  var IC = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>',
    euro: '<path d="M17 6.5A6 6 0 1 0 17 17.5"/><path d="M4 10h9M4 14h9"/>',
    db: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
    filter: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
    pivot: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-5M12 16V8M16 16v-3"/>',
    model: '<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5" r="2"/><circle cx="19.5" cy="5" r="2"/><circle cx="4.5" cy="19" r="2"/><circle cx="19.5" cy="19" r="2"/><path d="m6 6.5 4 3.5M18 6.5l-4 3.5M6 17.5l4-3.5M18 17.5l-4-3.5"/>',
    fx: '<path d="M10 4c-2 0-3 1-3 3v12M4 10h7"/><path d="m14 11 6 8M20 11l-6 8"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M10 9v12"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M8 11h6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .8 3 3 3 6"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16"/><circle cx="14.5" cy="12" r="1"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    home: '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    fire: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 1-8.5z"/>',
    quote: '<path d="M5 17c0-4 1-7 5-9M14 17c0-4 1-7 5-9"/><path d="M5 17h4v-4H5M14 17h4v-4h-4"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.5"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3z"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h6M7 12h10M7 16h10"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    head: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    rew: '<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5"/><path d="M10 10v5M13 10h2v5h-2"/>',
    fwd: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/><path d="M9 10h2v2H9v3h2M14 10v5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  function ic(n, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (IC[n] || IC.star) + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- tarih ---------- */
  function iso(d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function days(a, b) { return Math.round((parse(b) - parse(a)) / 864e5); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function fmt(s) { var d = parse(s); return d.getDate() + " " + AY[d.getMonth()] + " " + d.getFullYear(); }
  var TODAY = iso();

  /* ---------- durum ---------- */
  var S;
  function defaults() {
    return {
      start: TODAY, target: "2028-11-01",
      goal: "Kariyer adımı: Prozess- / Datenanalyst gibi bir rol, ≥4.000 € brüt, ≤30 km ya da ≥%50 remote.",
      plan: { 1: "de", 2: "sql", 3: "mkt", 4: "pbi", 5: "car", 6: "de", 0: "review" },
      sessions: [], best: {}, tasks: {}, srs: {}, ideas: [], read: {}, listen: {},
      pod: { pos: {}, done: {}, last: null, rate: 1, goal: 150 }, gs: {}, gplay: [],
      projects: JSON.parse(JSON.stringify(window.DEFAULT_PROJECTS)),
      ms: {}, notes: "", pend: { km: 50, days: 4, rate: 0.25, mins: 45 }
    };
  }
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
    var d = defaults();
    if (!S) S = d; else Object.keys(d).forEach(function (k) { if (S[k] == null) S[k] = d[k]; });
    if (!S.m9) { if (S.plan && S.plan[6] === "weak") S.plan[6] = "de"; S.m9 = 1; }
    if (S.wrong) { S.wrong.forEach(function (id) { S.srs[id] = { b: 0, due: TODAY }; }); delete S.wrong; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Kaydedilemedi: tarayıcı depolaması kapalı olabilir"); } }

  /* ---------- müfredat yardımcıları ---------- */
  Object.keys(window.WRITE_Q || {}).forEach(function (lid) {
    TR.forEach(function (t) { CUR[t.id].forEach(function (m) { m.lessons.forEach(function (l) { if (l.id === lid && !l.quiz.some(function (q) { return q.k === "w"; })) { var w = window.WRITE_Q[lid]; w.k = "w"; l.quiz.push(w); } }); }); });
  });
  var LES = {};
  TR.forEach(function (t) { CUR[t.id].forEach(function (m, mi) { m.lessons.forEach(function (l, li) { LES[l.id] = { l: l, m: m, mi: mi, li: li, tr: t.id }; }); }); });
  function done(lid) { return (S.best[lid] || 0) >= PASS; }
  function trackStats(tid) {
    var avail = 0, dn = 0, sc = [], mods = CUR[tid];
    mods.forEach(function (m) { m.lessons.forEach(function (l) { avail++; if (done(l.id)) dn++; if (S.best[l.id] != null) sc.push(S.best[l.id]); }); });
    var weeks = Math.max(1, Math.ceil((days(S.start, TODAY) + 1) / 7));
    var expected = Math.min(avail, weeks);
    var avg = sc.length ? sc.reduce(function (a, b) { return a + b; }, 0) / sc.length : null;
    var curMod = null;
    for (var i = 0; i < mods.length; i++) { var m = mods[i]; if (!m.lessons.length || m.lessons.some(function (l) { return !done(l.id); })) { curMod = m; break; } }
    return { avail: avail, done: dn, expected: expected, behind: expected - dn, avg: avg, pct: avail ? dn / avail : 0, curMod: curMod };
  }
  function nextLesson(tid) {
    var mods = CUR[tid];
    for (var i = 0; i < mods.length; i++) {
      var m = mods[i];
      if (!m.lessons.length) return { mod: m, lesson: null };
      for (var j = 0; j < m.lessons.length; j++) if (!done(m.lessons[j].id)) return { mod: m, lesson: m.lessons[j] };
    }
    return { mod: null, lesson: null };
  }
  function focusTrack() {
    var arr = TR.map(function (t) { var s = trackStats(t.id); return { t: t, s: s, n: nextLesson(t.id) }; })
      .filter(function (x) { return x.n.lesson; });
    if (!arr.length) return null;
    arr.sort(function (a, b) {
      if (b.s.behind !== a.s.behind) return b.s.behind - a.s.behind;
      return (a.s.avg == null ? 1 : a.s.avg) - (b.s.avg == null ? 1 : b.s.avg);
    });
    return arr[0];
  }
  function planFor(dateStr) { var d = parse(dateStr).getDay(); return S.plan[d] || "review"; }
  function todayPlan() {
    var p = planFor(TODAY);
    if (p === "weak") { var f = focusTrack(); return { kind: "weak", tid: f ? f.t.id : null }; }
    if (p === "review") return { kind: "review" };
    if (p === "off") return { kind: "off" };
    return { kind: "track", tid: p };
  }
  function sessionsOn(d) { return S.sessions.filter(function (x) { return (x.date === d && !x.for) || x.for === d; }); }
  function madeUp(d) { return S.sessions.some(function (x) { return x.for === d && x.pass; }) && !S.sessions.some(function (x) { return x.date === d && !x.for && x.pass; }); }
  function missedDays() {
    var out = [];
    for (var i = 1; i <= 14; i++) {
      var d = addDays(TODAY, -i); if (d < S.start) break;
      var p = planFor(d); if (p === "review" || p === "off") continue;
      if (sessionsOn(d).some(function (x) { return x.pass; })) continue;
      var tid = p === "weak" ? (focusTrack() || { t: {} }).t.id : p, n = tid ? nextLesson(tid) : null;
      if (n && n.lesson) out.push({ d: d, tid: tid, l: n.lesson });
    }
    return out;
  }
  function streak() {
    var n = 0, d = TODAY;
    if (!sessionsOn(d).length) d = addDays(d, -1);
    while (true) {
      var p = planFor(d);
      if (sessionsOn(d).length) n++;
      else if (p !== "review" && p !== "off") break;
      d = addDays(d, -1);
      if (days(S.start, d) < 0) break;
    }
    return n;
  }
  function totalMin() { return S.sessions.reduce(function (a, s) { return a + (s.min || 0); }, 0); }

  /* ---------- görseller ---------- */
  function ring(pct, color, size, label) {
    size = size || 64; var r = size / 2 - 6, c = 2 * Math.PI * r;
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" class="ring-bg"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="' + color + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + c * (1 - pct) + '" class="ring-fg" transform="rotate(-90 ' + size / 2 + " " + size / 2 + ')"/>' +
      (label != null ? '<text x="50%" y="50%" dy=".35em" text-anchor="middle" class="ring-t">' + label + "</text>" : "") + "</svg>";
  }
  function slideVisual(s, col) {
    switch (s.t) {
      case "intro": return '<div class="v-intro" style="--c:' + col + '">' + ic(s.icon || "star", "big") + "</div>";
      case "flow": return '<ol class="v-flow" style="--c:' + col + '">' + s.steps.map(function (x, i) { return '<li><span class="n">' + (i + 1) + "</span><div><b>" + esc(x[0]) + "</b><small>" + esc(x[1]) + "</small></div></li>"; }).join("") + "</ol>";
      case "compare": return '<div class="v-cmp"><div class="bad"><span>' + ic("x") + esc(s.bad[0]) + "</span><p>" + esc(s.bad[1]) + '</p></div><div class="good"><span>' + ic("check") + esc(s.good[0]) + "</span><p>" + esc(s.good[1]) + "</p></div></div>";
      case "phrases": return '<ul class="v-phr" style="--c:' + col + '">' + s.items.map(function (x) { return "<li><b>" + esc(x[0]) + "</b><small>" + esc(x[1]) + "</small></li>"; }).join("") + "</ul>";
      case "code": return '<pre class="v-code">' + hl(s.code) + "</pre>" + (s.out ? '<div class="v-out"><span>Sonuç</span>' + tbl(s.out.head, s.out.rows) + "</div>" : "");
      case "table": return tbl(s.head, s.rows);
      case "cards": return '<div class="v-cards" style="--c:' + col + '">' + s.items.map(function (x) { return '<div class="vc">' + ic(x[0]) + "<b>" + esc(x[1]) + "</b>" + (x[2] ? "<small>" + esc(x[2]) + "</small>" : "") + "</div>"; }).join("") + "</div>";
      case "formula": return '<div class="v-form" style="--c:' + col + '">' + s.parts.map(function (x, i) { return (i ? '<span class="plus">' + ic("plus") + "</span>" : "") + '<div class="fp"><b>' + esc(x[0]) + "</b><small>" + esc(x[1]) + "</small></div>"; }).join("") + "</div>";
      case "bars":
        var mx = Math.max.apply(null, s.items.map(function (x) { return x[1]; })) || 1;
        return '<div class="v-bars" style="--c:' + col + '">' + s.items.map(function (x) { return '<div class="br"><span class="bl">' + esc(x[0]) + '</span><span class="bt"><i style="width:' + (x[1] / mx * 100) + '%"></i></span><span class="bv">' + x[1].toLocaleString("de-DE") + esc(s.unit || "") + "</span></div>"; }).join("") + "</div>";
      case "funnel":
        var fx = s.items[0][1];
        return '<div class="v-fun" style="--c:' + col + '">' + s.items.map(function (x, i) { return '<div class="fu" style="width:' + (40 + 60 * x[1] / fx) + '%;opacity:' + (1 - i * 0.12) + '"><b>' + esc(x[0]) + "</b><span>" + x[1] + "</span></div>"; }).join("") + "</div>";
      case "venn":
        var inner = s.kind === "inner";
        return '<svg class="v-venn" viewBox="0 0 300 150"><defs><clipPath id="cA"><circle cx="115" cy="75" r="62"/></clipPath></defs>' +
          '<circle cx="115" cy="75" r="62" fill="' + (inner ? "none" : col) + '" fill-opacity=".55" stroke="' + col + '" stroke-width="2"/>' +
          '<circle cx="185" cy="75" r="62" fill="none" stroke="' + col + '" stroke-width="2" stroke-dasharray="' + (inner ? "0" : "5 4") + '"/>' +
          '<circle cx="185" cy="75" r="62" fill="' + col + '" fill-opacity=".85" clip-path="url(#cA)"/>' +
          '<text x="80" y="80" class="vt">' + esc(s.a) + '</text><text x="222" y="80" class="vt" text-anchor="middle">' + esc(s.b) + "</text></svg>";
      case "star":
        var n = s.dims.length, cx = 150, cy = 100, R = 78, out = "";
        s.dims.forEach(function (d, i) {
          var a = -Math.PI / 2 + i * 2 * Math.PI / n, x = cx + R * Math.cos(a) * 1.35, y = cy + R * Math.sin(a);
          out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="' + col + '" stroke-width="2"/>' +
            '<rect x="' + (x - 44) + '" y="' + (y - 14) + '" width="88" height="28" rx="8" class="sd"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" class="st">' + esc(d) + "</text>" +
            '<text x="' + (cx + (x - cx) * 0.3) + '" y="' + (cy + (y - cy) * 0.3 - 4) + '" class="sn">n</text><text x="' + (cx + (x - cx) * 0.72) + '" y="' + (cy + (y - cy) * 0.72 - 4) + '" class="sn">1</text>';
        });
        return '<svg class="v-star" viewBox="0 0 300 200">' + out + '<rect x="' + (cx - 50) + '" y="' + (cy - 20) + '" width="100" height="40" rx="10" fill="' + col + '"/><text x="' + cx + '" y="' + (cy + 6) + '" text-anchor="middle" class="sf">' + esc(s.fact) + "</text></svg>";
    }
    return "";
  }
  function tbl(h, rows) { return '<div class="v-tbl"><table><thead><tr>' + h.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") + "</tr></thead><tbody>" + rows.map(function (r) { return "<tr>" + r.map(function (x) { return "<td>" + esc(x) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>"; }
  function hl(code) {
    var kw = /\b(SELECT|FROM|WHERE|AND|OR|GROUP BY|ORDER BY|HAVING|LIMIT|LEFT JOIN|INNER JOIN|JOIN|ON|AS|IN|LIKE|IS NULL|BETWEEN|ASC|DESC|COUNT|SUM|AVG|CALCULATE|COUNTROWS|DIVIDE)\b/g;
    return esc(code).replace(/(&#39;[^&]*?&#39;|&quot;[^&]*?&quot;)/g, '<span class="s">$1</span>').replace(kw, '<span class="k">$1</span>');
  }

  /* ---------- yönlendirme ---------- */
  var view = "today", calMonth = null, newsFilter = "all", NEWS = null;
  function go(v) { view = v; render(); window.scrollTo(0, 0); }
  function render() {
    var html = '<header class="top"><div><small>' + GUN[new Date().getDay()] + ", " + fmt(TODAY) + "</small><h1>" + ({ today: "Bugün", road: "Yol haritası", cal: "Takvim", news: "Güncel", listen: "Dinle", proj: "Projeler", me: "Ben" })[view] + '</h1></div><button class="me" data-go="me" aria-label="Ben">' + ic("user") + "</button></header><main>";
    html += ({ today: vToday, road: vRoad, cal: vCal, news: vNews, listen: vListen, proj: vProj, me: vMe })[view]();
    html += "</main>" + nav();
    $app.innerHTML = html;
    if (view === "news" && !NEWS) loadNews(render);
  }
  function nav() {
    var items = [["today", "home", "Bugün"], ["road", "map", "Yol"], ["cal", "cal", "Takvim"], ["listen", "head", "Dinle"], ["news", "news", "Güncel"], ["proj", "list", "Projeler"]];
    return '<nav class="tabs">' + items.map(function (x) { return '<button data-go="' + x[0] + '" class="' + (view === x[0] ? "on" : "") + '">' + ic(x[1]) + "<span>" + x[2] + "</span></button>"; }).join("") + "</nav>";
  }

  /* ---------- Bugün ---------- */
  function vToday() {
    var left = days(TODAY, S.target), total = Math.max(1, days(S.start, S.target)), gone = days(S.start, TODAY);
    var h = '<section class="hero"><div class="hero-l"><span class="lbl">Hedefe</span><b class="cnt">' + left + '</b><span class="lbl">gün</span></div>' +
      '<div class="hero-r"><p>' + esc(S.goal) + '</p><div class="tl"><i style="width:' + Math.min(100, Math.max(2, gone / total * 100)) + '%"></i></div><small>' + fmt(S.target) + "</small></div></section>";
    h += '<div class="chips"><span class="chip">' + ic("fire") + streak() + " gün seri</span><span class=\"chip\">" + ic("clock") + Math.round(totalMin() / 60 * 10) / 10 + " saat</span><span class=\"chip\">" + ic("check") + Object.keys(S.best).filter(done).length + " ders</span></div>";

    var tp = todayPlan(), todayDone = S.sessions.some(function (s) { return s.date === TODAY && !s.for && s.pass; });
    if (todayDone) {
      h += '<section class="card ok"><div class="row">' + ic("check", "big") + "<div><h3>Bugünkü çalışma tamam</h3><p>Yarın: " + esc(planLabel(planFor(addDays(TODAY, 1)))) + ". İstersen aşağıdan bir ders daha seçebilirsin.</p></div></div></section>";
    } else if (tp.kind === "review") {
      h += reviewCard();
    } else if (tp.kind === "off") {
      h += '<section class="card"><h3>Dinlenme günü</h3><p>Bugün plan yok. Güncel sekmesinden bir yazı okuyabilirsin.</p></section>';
    } else if (tp.tid) {
      h += lessonCard(tp.tid, tp.kind === "weak");
    } else {
      h += '<section class="card"><h3>Bütün dersler tamam</h3><p>Yeni modüllerin içeriği eklenince burada görünecek.</p></section>';
    }

    if (todayDone || tp.kind === "review" || tp.kind === "off") {
      var ms = missedDays();
      if (ms.length) h += '<section class="card miss-card"><div class="row">' + ic("refresh", "big") + "<div><h3>Kaçırdığın dersler</h3><p>Bugünkü işini bitirdin. İstersen kaçırdığın bir günü şimdi telafi et; takvimde o gün tamamlanmış görünür.</p></div></div>" +
        ms.slice(0, 3).map(function (m) { var t = TRK[m.tid]; return '<button class="mk-btn" data-mk="' + m.d + "|" + m.l.id + '" style="--c:' + t.color + '"><span><small>' + GUN[parse(m.d).getDay()] + ", " + fmt(m.d) + "</small><b>" + esc(t.short) + ": " + esc(m.l.title) + "</b></span>" + ic("play") + "</button>"; }).join("") +
        (ms.length > 3 ? '<p class="muted small">+' + (ms.length - 3) + " gün daha</p>" : "") + "</section>";
    }
    var f = focusTrack();
    if (f && f.s.behind > 0) {
      h += '<section class="card focus" style="--c:' + f.t.color + '"><div class="row">' + ic("compass", "big") + "<div><h3>Odak önerisi: " + esc(f.t.name) + "</h3><p>Bu alanda plana göre " + f.s.behind + " ders gerideysin" + (f.s.avg != null ? ", test ortalaman %" + Math.round(f.s.avg * 100) : "") + ". Cumartesi dersi otomatik olarak buraya gelir.</p></div></div></section>";
    }

    h += '<h2 class="sec">Bu hafta</h2>' + weekStrip();
    h += '<h2 class="sec">Alanlar</h2><div class="rings">' + TR.map(function (t) {
      var s = trackStats(t.id);
      return '<button class="rg" data-track="' + t.id + '">' + ring(s.pct, t.color, 62, s.done + "/" + s.avail) + "<span>" + esc(t.short) + "</span></button>";
    }).join("") + "</div>";

    h += '<button class="go-btn sm" data-go="listen">' + ic("head", "big") + "<span><small>Yolda mısın?</small><b>Almanca dinle</b><em>Bu hafta " + weekListen() + " / " + (S.pod.goal || 150) + " dk</em></span>" + ic("arrow") + "</button>";
    h += gamesCard();
    var nt = tp.tid || (f && f.t.id);
    h += newsTeaser(nt);
    h += '<button class="idea-btn" data-act="idea">' + ic("bulb") + "<span><b>Yeni bir şey mi istiyorsun?</b><small>Eklemeden önce hedefine uyup uymadığına birlikte bakalım</small></span>" + ic("arrow") + "</button>";
    return h;
  }
  function planLabel(p) { return p === "weak" ? "Zayıf alan" : p === "review" ? "Tekrar" : p === "off" ? "Dinlenme" : TRK[p].name; }
  function lessonCard(tid, weak) {
    var t = TRK[tid], n = nextLesson(tid);
    if (!n.lesson) {
      return '<section class="card" style="--c:' + t.color + '"><span class="tag">' + esc(t.name) + "</span><h3>Sıradaki adım: " + esc(n.mod ? n.mod.title : "Alan tamam") + "</h3><p>" +
        (n.mod ? "Önceki modülü bitirdin. Bu modülün içeriği henüz eklenmedi; bana \"Gelişim: " + esc(t.short) + " " + esc(n.mod.title) + " modülünü ekle\" demen yeterli." : "Bu alandaki bütün modülleri bitirdin.") + "</p></section>";
    }
    var ix = LES[n.lesson.id];
    return '<section class="card lesson" style="--c:' + t.color + '"><div class="lc-top"><span class="tag">' + ic(t.icon) + esc(t.name) + (weak ? " · zayıf alan" : "") + '</span><span class="dur">' + ic("clock") + n.lesson.min + " dk</span></div>" +
      "<h3>" + esc(n.lesson.title) + "</h3><p>Modül " + (ix.mi + 1) + ": " + esc(n.mod.title) + " · Ders " + (ix.li + 1) + "/" + n.mod.lessons.length + "</p>" +
      '<button class="btn" data-lesson="' + n.lesson.id + '">' + ic("play") + "Başla</button></section>";
  }
  function reviewCard() {
    var n = dueList().length;
    if (!n) {
      var f = focusTrack();
      return '<section class="card"><h3>Tekrar günü</h3><p>Bugün tekrar zamanı gelen soru yok. İstersen haftanın dersini öne alabilirsin.</p>' + (f ? '<button class="btn ghost" data-lesson="' + f.n.lesson.id + '">' + esc(f.t.short) + ": " + esc(f.n.lesson.title) + "</button>" : "") + "</section>";
    }
    return '<section class="card lesson" style="--c:#4b5563"><span class="tag">' + ic("refresh") + "Tekrar</span><h3>Tekrar zamanı gelen " + Math.min(n, 12) + " soru</h3><p>Her soru doğru cevapladıkça daha seyrek gelir: 1, 3, 7, 21, 60 gün sonra. Bugün sırası gelen " + n + ' soru var.</p><button class="btn" data-act="review">' + ic("play") + "Başla</button></section>";
  }
  function weekStrip() {
    var d = parse(TODAY), dow = (d.getDay() + 6) % 7, mon = addDays(TODAY, -dow), out = '<div class="week">';
    for (var i = 0; i < 7; i++) {
      var ds = addDays(mon, i), p = planFor(ds), ss = sessionsOn(ds), st = ss.some(function (s) { return s.pass; }) ? (madeUp(ds) ? "done mk" : "done") : ss.length ? "part" : (ds < TODAY && ds >= S.start && p !== "review" && p !== "off") ? "miss" : "";
      var col = TRK[p] ? TRK[p].color : "#8a8f98";
      out += '<div class="wd ' + st + (ds === TODAY ? " now" : "") + '" style="--c:' + col + '"><small>' + GUNK[parse(ds).getDay()] + '</small><span class="dot">' + (st === "done" ? ic("check") : ic(TRK[p] ? TRK[p].icon : p === "review" ? "refresh" : "compass")) + "</span><em>" + esc(TRK[p] ? TRK[p].short : planLabel(p)) + "</em></div>";
    }
    return out + "</div>";
  }

  /* ---------- Yol haritası ---------- */
  function vRoad() {
    var start = S.start, end = S.target, tot = Math.max(1, days(start, end)), now = Math.min(1, Math.max(0, days(start, TODAY) / tot));
    var h = '<section class="card"><h3>Ders notları</h3><p>Derslerden bağımsız başvuru kitapçığı: nedir, ne işe yarar, nasıl çalışır.</p><div class="nbtns">' + TR.map(function (t) { return '<button data-note="' + t.id + '" style="--c:' + t.color + '">' + ic(t.icon) + "<span>" + esc(t.short) + "</span></button>"; }).join("") + "</div></section>";
    h += '<section class="card"><h3>Hedefe giden yol</h3><p>Ara hedefler tarih sırasıyla. Tamamladıklarını Ben sekmesinde işaretleyebilirsin.</p><div class="road">';
    h += '<div class="road-line"><i style="width:' + now * 100 + '%"></i></div>';
    window.MILESTONES.forEach(function (m) {
      var x = Math.min(100, Math.max(0, days(start, m.date) / tot * 100));
      h += '<span class="ms ' + (S.ms[m.id] ? "ok" : m.date < TODAY ? "late" : "") + '" style="left:' + x + '%"></span>';
    });
    h += '<span class="ms now" style="left:' + now * 100 + '%"></span></div><ol class="mlist">' + window.MILESTONES.map(function (m) {
      return '<li class="' + (S.ms[m.id] ? "ok" : "") + '"><span class="md">' + fmt(m.date) + "</span><b>" + (S.ms[m.id] ? ic("check") : "") + esc(m.title) + "</b><small>" + esc(m.desc) + "</small></li>";
    }).join("") + "</ol></section>";
    TR.forEach(function (t) {
      var s = trackStats(t.id);
      h += '<section class="card track" id="t-' + t.id + '" style="--c:' + t.color + '"><div class="row">' + ring(s.pct, t.color, 54, Math.round(s.pct * 100) + "%") + "<div><h3>" + esc(t.name) + "</h3><p>" + s.done + "/" + s.avail + " ders" + (s.avg != null ? " · ortalama %" + Math.round(s.avg * 100) : "") + "</p></div></div>" + '<button class="btn sm ghost nbtn" data-note="' + t.id + '">' + ic("book") + "Ders notu</button>";
      CUR[t.id].forEach(function (m, mi) {
        var allDone = m.lessons.length && m.lessons.every(function (l) { return done(l.id); });
        var isCur = s.curMod === m;
        h += '<div class="mod ' + (allDone ? "ok" : isCur ? "cur" : "lock") + '"><div class="mh"><span class="mn">M' + (mi + 1) + "</span><div><b>" + esc(m.title) + "</b><small>" + esc(m.goal) + "</small></div>" + (allDone ? ic("check") : "") + "</div>";
        if (m.lessons.length) {
          h += '<ul class="ls">' + m.lessons.map(function (l) { var b = S.best[l.id]; return '<li><button data-lesson="' + l.id + '" class="' + (done(l.id) ? "ok" : "") + '">' + (done(l.id) ? ic("check") : ic("play")) + "<span>" + esc(l.title) + "</span>" + (b != null ? "<em>%" + Math.round(b * 100) + "</em>" : "") + "</button></li>"; }).join("") + "</ul>";
        } else if (isCur) {
          h += '<p class="soon">Önceki modül bitti. Bu modülün içeriğini eklememi istediğinde hazırlayacağım.</p>';
        }
        h += "</div>";
      });
      var cl = window.CLASSICS[t.id] || [];
      if (cl.length) h += '<div class="cls"><small>Kalıcı kaynaklar</small>' + cl.map(function (c) { return '<a href="' + esc(c[2]) + '" target="_blank" rel="noopener">' + ic("ext") + "<span><b>" + esc(c[0]) + "</b>" + esc(c[1]) + "</span></a>"; }).join("") + "</div>";
      h += "</section>";
    });
    return h;
  }

  /* ---------- Takvim ---------- */
  function vCal() {
    if (!calMonth) calMonth = TODAY.slice(0, 7);
    var y = +calMonth.slice(0, 4), m = +calMonth.slice(5, 7) - 1, first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, nd = new Date(y, m + 1, 0).getDate();
    var msMap = {}; window.MILESTONES.forEach(function (x) { msMap[x.date] = x; });
    var h = '<section class="card"><div class="calh"><button data-cal="-1" aria-label="Önceki ay">' + ic("back") + "</button><b>" + AY[m] + " " + y + '</b><button data-cal="1" aria-label="Sonraki ay">' + ic("arrow") + '</button></div><div class="calg">' +
      ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map(function (d) { return "<small>" + d + "</small>"; }).join("");
    for (var i = 0; i < off; i++) h += "<span></span>";
    var cnt = { done: 0, part: 0, miss: 0 };
    for (var d = 1; d <= nd; d++) {
      var ds = iso(new Date(y, m, d)), p = planFor(ds), ss = sessionsOn(ds), st = "";
      if (ss.some(function (s) { return s.pass; })) st = madeUp(ds) ? "done mk" : "done"; else if (ss.length) st = "part";
      else if (ds < TODAY && ds >= S.start && p !== "review" && p !== "off") st = "miss";
      else if (ds >= TODAY) st = "plan";
      if (cnt[st] != null) cnt[st]++;
      var col = ss.length ? TRK[ss[0].tr] && TRK[ss[0].tr].color : TRK[p] ? TRK[p].color : "#8a8f98";
      h += '<button class="cd ' + st + (ds === TODAY ? " now" : "") + (ds === S.target ? " tgt" : "") + '" data-day="' + ds + '" style="--c:' + (col || "#8a8f98") + '"><span>' + d + "</span>" + (msMap[ds] || ds === S.target ? ic("flag", "mf") : "") + (listenMin(ds) >= 5 ? ic("head", "lh") : "") + "</button>";
    }
    h += '</div><div class="legend"><span><i class="done"></i>Tamam</span><span><i class="part"></i>Yarım</span><span><i class="miss"></i>Kaçtı</span><span><i class="plan"></i>Plan</span><span>' + ic("flag") + "Hedef</span><span>" + ic("head") + "Dinleme</span></div></section>";
    h += '<section class="card"><h3>' + AY[m] + " özeti</h3>" + '<div class="v-bars" style="--c:#1f8a83">' +
      [["Tamamlanan gün", cnt.done, "#2e9e6a"], ["Yarım kalan", cnt.part, "#e3a018"], ["Kaçırılan", cnt.miss, "#d1495b"]].map(function (x) {
        return '<div class="br"><span class="bl">' + x[0] + '</span><span class="bt"><i style="width:' + Math.min(100, x[1] / Math.max(1, nd) * 300) + "%;background:" + x[2] + '"></i></span><span class="bv">' + x[1] + "</span></div>";
      }).join("") + '</div><div id="daydet"></div></section>';
    var open = S.projects.filter(function (p) { return p.status === "aktif" || p.status === "park"; });
    h += '<section class="card"><h3>Yarım kalanlar</h3><p>Park edilenler ve aktif işler. Ayrıntı Projeler sekmesinde.</p><ul class="half">' + open.map(function (p) { return '<li class="' + p.status + '"><span class="st">' + (p.status === "aktif" ? "aktif" : "park") + "</span>" + esc(p.name) + "</li>"; }).join("") + "</ul></section>";
    return h;
  }
  function dayDetail(ds) {
    var ss = sessionsOn(ds), p = planFor(ds), ms = window.MILESTONES.filter(function (x) { return x.date === ds; });
    var h = "<h4>" + fmt(ds) + " · plan: " + esc(planLabel(p)) + "</h4>";
    ms.forEach(function (x) { h += '<p class="msd">' + ic("flag") + esc(x.title) + "</p>"; });
    if (ds === S.target) h += '<p class="msd">' + ic("flag") + "Hedef tarih</p>";
    if (listenMin(ds)) h += '<p class="sd">' + ic("head") + " " + listenMin(ds) + " dk dinleme</p>";
    if (!ss.length && !listenMin(ds)) h += "<p>Bu gün kayıt yok.</p>";
    ss.forEach(function (s) { var L = LES[s.lid]; h += '<p class="sd"><span style="color:' + (TRK[s.tr] ? TRK[s.tr].color : "#555") + '">●</span> ' + esc(L ? L.l.title : "Tekrar") + (s.for ? " (telafi, " + fmt(s.date) + ")" : "") + " · " + s.sc + "/" + s.tot + (s.pass ? " ✓" : " (tekrar gerekli)") + "</p>"; });
    var el = document.getElementById("daydet"); if (el) el.innerHTML = h;
  }

  /* ---------- Güncel ---------- */
  function loadNews(cb) {
    fetch("data/news.json?" + TODAY, { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { NEWS = j || { items: [], updated: null }; cb && cb(); })
      .catch(function () { NEWS = { items: [], updated: null, offline: true }; cb && cb(); });
  }
  var NEWSCAT = [["all", "Hepsi"], ["ki", "Yapay zekâ"], ["ctl", "Controlling"], ["de", "Almanca"], ["sql", "SQL"], ["pbi", "Power BI"], ["mkt", "Pazarlama"], ["car", "Kariyer"], ["club", "Kulüp / spor"]];
  function vNews() {
    var seg = '<div class="seg"><button data-nm="bulten" class="' + (newsMode === "bulten" ? "on" : "") + '">Bülten</button><button data-nm="akis" class="' + (newsMode === "akis" ? "on" : "") + '">Haber akışı</button></div>';
    if (newsMode === "bulten") return seg + vBulten();
    var h = seg + '<div class="filters">' + NEWSCAT.map(function (c) { return '<button data-nf="' + c[0] + '" class="' + (newsFilter === c[0] ? "on" : "") + '">' + c[1] + "</button>"; }).join("") + "</div>";
    if (!NEWS) return h + '<p class="muted center">Yükleniyor…</p>';
    var items = NEWS.items.filter(function (x) { return newsFilter === "all" || x.tr === newsFilter; });
    h += '<p class="muted small">' + (NEWS.updated ? "Son güncelleme: " + esc(NEWS.updated) + " · her sabah otomatik yenilenir" : NEWS.offline ? "Çevrimdışısın; liste yüklenemedi." : "Liste henüz oluşturulmadı. İlk otomatik güncellemeden sonra burada olacak.") + "</p>";
    if (!items.length) h += '<section class="card"><p>Bu kategoride şu an yazı yok.</p></section>';
    items.forEach(function (x) {
      var col = TRK[x.tr] ? TRK[x.tr].color : x.tr === "ki" ? "#0f766e" : x.tr === "ctl" ? "#475569" : "#b45309", rd = S.read[x.l];
      h += '<article class="news ' + (rd ? "rd" : "") + '" style="--c:' + col + '"><div class="nh"><span class="tag">' + esc(catName(x.tr)) + "</span><small>" + esc(x.s || "") + (x.d ? " · " + esc(x.d) : "") + '</small></div><a href="' + esc(x.l) + '" target="_blank" rel="noopener" data-read="' + esc(x.l) + '"><h3>' + esc(x.t) + "</h3></a>" + (x.x ? "<p>" + esc(x.x) + "</p>" : "") +
        '<div class="na"><a class="btn sm ghost" href="' + esc(x.l) + '" target="_blank" rel="noopener" data-read="' + esc(x.l) + '">' + ic("ext") + "Kaynak</a>" + '<a class="btn sm" href="' + esc(trUrl(x.l)) + '" target="_blank" rel="noopener" data-read="' + esc(x.l) + '">' + ic("book") + "Türkçe oku</a>" + (rd ? '<span class="muted small">' + ic("check") + "okundu</span>" : "") + "</div></article>";
    });
    h += '<h2 class="sec">Kalıcı kaynaklar</h2>';
    TR.forEach(function (t) { (window.CLASSICS[t.id] || []).forEach(function (c) { h += '<a class="cl1" style="--c:' + t.color + '" href="' + esc(c[2]) + '" target="_blank" rel="noopener"><span class="tag">' + esc(t.short) + "</span><b>" + esc(c[0]) + "</b><small>" + esc(c[1]) + "</small></a>"; }); });
    return h;
  }
  function catName(c) { for (var i = 0; i < NEWSCAT.length; i++) if (NEWSCAT[i][0] === c) return NEWSCAT[i][1]; return c; }
  function newsTeaser(tid) {
    if (!BUL) { loadBul(function () { if (view === "today") { var el = document.getElementById("nteaser"); if (el) el.outerHTML = newsTeaser(tid); } }); return '<div id="nteaser"></div>'; }
    var I = BUL.issues[0]; if (!I) return '<div id="nteaser"></div>';
    var it = I.items.filter(function (x) { return !S.read[x.url] && x.cat === tid; })[0] || I.items.filter(function (x) { return !S.read[x.url]; })[0];
    if (!it) return '<div id="nteaser"></div>';
    return '<div id="nteaser"><h2 class="sec">Bültenden</h2><button class="cl1" style="--c:' + (TRK[it.cat] ? TRK[it.cat].color : "#0f766e") + '" data-go="news"><span class="tag">' + esc(catName(it.cat)) + "</span><b>" + esc(it.title) + "</b><small>" + esc(it.summary.slice(0, 110)) + "…</small></button></div>";
  }


  /* ---------- ders notları ---------- */
  function trUrl(u) { return "https://translate.google.com/translate?sl=auto&tl=tr&hl=tr&u=" + encodeURIComponent(u); }
  function noteBlock(b, col) {
    if (b.t === "p") return '<p class="np">' + esc(b.x) + "</p>";
    if (b.t === "list") return '<ul class="nl">' + b.items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
    if (b.t === "tip") return '<div class="ntip">' + ic("bulb") + "<p>" + esc(b.x) + "</p></div>";
    return '<div class="nv">' + slideVisual(b, col) + "</div>";
  }
  function openNote(tid) {
    var N = (window.NOTES || {})[tid]; if (!N) return;
    var t = TRK[tid], col = t.color, el = document.getElementById("player");
    if (!el) { el = document.createElement("div"); el.id = "player"; document.body.appendChild(el); }
    el.style.setProperty("--c", col); document.body.classList.add("noscroll");
    var h = '<div class="pl-top"><button data-act="closeNote" aria-label="Kapat">' + ic("x") + '</button><b class="rt-t">' + esc(N.title) + '</b></div><div class="pl-body reader">';
    h += '<span class="tag">' + ic(t.icon) + esc(t.name) + '</span><h2 class="rh">' + esc(N.title) + '</h2><p class="sp">' + esc(N.intro) + '</p><div class="toc">' +
      N.sections.map(function (s, i) { return '<button data-sec="' + i + '">' + esc(s.h) + "</button>"; }).join("") + "</div>";
    N.sections.forEach(function (s, i) { h += '<section class="nsec" id="ns-' + i + '"><h3>' + esc(s.h) + "</h3>" + s.blocks.map(function (b) { return noteBlock(b, col); }).join("") + "</section>"; });
    h += '<button class="btn wide ghost" data-act="closeNote">Kapat</button></div>';
    el.innerHTML = h; el.querySelector(".pl-body").scrollTop = 0;
  }

  /* ---------- bülten ---------- */
  var BUL = null, newsMode = "bulten", bulIx = 0;
  function loadBul(cb) {
    fetch("data/bulten.json?" + TODAY, { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { BUL = j || { issues: [] }; cb && cb(); }).catch(function () { BUL = { issues: [], offline: true }; cb && cb(); });
  }
  function vBulten() {
    if (!BUL) { loadBul(render); return '<p class="muted center">Yükleniyor…</p>'; }
    if (!BUL.issues.length) return '<section class="card"><p>' + (BUL.offline ? "Çevrimdışısın." : "Henüz bülten yok.") + "</p></section>";
    var I = BUL.issues[Math.min(bulIx, BUL.issues.length - 1)], h = "";
    if (BUL.issues.length > 1) h += '<div class="filters">' + BUL.issues.map(function (x, i) { return '<button data-bi="' + i + '" class="' + (i === bulIx ? "on" : "") + '">' + fmt(x.date) + "</button>"; }).join("") + "</div>";
    h += '<section class="card bul-h"><span class="tag">' + ic("news") + "Haftalık bülten</span><h3>" + esc(I.title) + "</h3><p>" + esc(I.intro) + "</p></section>";
    I.items.forEach(function (x) {
      var col = TRK[x.cat] ? TRK[x.cat].color : x.cat === "ki" ? "#0f766e" : x.cat === "ctl" ? "#475569" : "#b45309", rd = S.read[x.url];
      h += '<article class="news bul ' + (rd ? "rd" : "") + '" style="--c:' + col + '"><div class="nh"><span class="tag">' + esc(catName(x.cat)) + "</span><small>" + esc(x.src) + " · " + (x.lang === "de" ? "Almanca" : x.lang === "en" ? "İngilizce" : "Türkçe") + "</small></div><h3>" + esc(x.title) + "</h3><p>" + esc(x.summary) + "</p>" +
        (x.why ? '<div class="why">' + ic("compass") + "<p><b>Senin için:</b> " + esc(x.why) + "</p></div>" : "") +
        '<div class="na">' + (x.lang !== "tr" ? '<a class="btn sm" href="' + esc(trUrl(x.url)) + '" target="_blank" rel="noopener" data-read="' + esc(x.url) + '">' + ic("book") + "Türkçe tamamı</a>" : "") +
        '<a class="btn sm ghost" href="' + esc(x.url) + '" target="_blank" rel="noopener" data-read="' + esc(x.url) + '">' + ic("ext") + "Kaynak</a>" + (rd ? '<span class="muted small">' + ic("check") + "okundu</span>" : "") + "</div></article>";
    });
    h += '<p class="muted small">Özetler Türkçe yazıldı. \"Türkçe tamamı\" makalenin tamamını Google Çeviri ile açar; makine çevirisi olduğu için bazı cümleler kusurlu olabilir.</p>';
    return h;
  }

  /* ---------- Projeler ---------- */
  function vProj() {
    var act = S.projects.filter(function (p) { return p.status === "aktif" && p.cat !== "aile"; });
    var h = "";
    if (act.length > 3) h += '<section class="card warn"><div class="row">' + ic("alert", "big") + "<div><h3>Aktif sınırı aşıldı: " + act.length + "/3</h3><p>Aile projeleri hariç aynı anda en fazla 3 aktif iş. Birini park etmek, diğerlerinin bitme ihtimalini artırır.</p></div></div></section>";
    h += '<button class="idea-btn" data-act="idea">' + ic("bulb") + "<span><b>Yeni fikir ekle</b><small>Önce birkaç soru soracağım</small></span>" + ic("arrow") + "</button>";
    [["aktif", "Aktif"], ["park", "Park edildi"], ["bitti", "Bitti"]].forEach(function (g) {
      var list = S.projects.filter(function (p) { return p.status === g[0]; });
      if (!list.length) return;
      h += '<h2 class="sec">' + g[1] + " <em>" + list.length + "</em></h2>";
      list.forEach(function (p) {
        h += '<section class="card proj ' + p.status + '"><div class="ph"><span class="tag c-' + p.cat + '">' + CAT[p.cat] + "</span><b>" + esc(p.name) + "</b></div>" + (p.next ? '<p class="nx">' + ic("arrow") + esc(p.next) + "</p>" : "") +
          '<div class="pa">' + ["aktif", "park", "bitti"].map(function (s) { return '<button data-ps="' + p.id + ":" + s + '" class="' + (p.status === s ? "on" : "") + '">' + s + "</button>"; }).join("") + '<button data-pe="' + p.id + '" aria-label="Düzenle">' + ic("doc") + "</button></div></section>";
      });
    });
    if (S.ideas.length) {
      h += '<h2 class="sec">Fikir kayıtları</h2>' + S.ideas.slice().reverse().map(function (i) { return '<section class="card idea-log"><small>' + fmt(i.date) + " · " + esc(i.verdict) + "</small><b>" + esc(i.title) + "</b></section>"; }).join("");
    }
    return h;
  }

  /* ---------- Ben ---------- */
  function vMe() {
    var h = '<section class="card"><h3>Hedef</h3><label>Hedef cümlen<textarea id="f-goal" rows="3">' + esc(S.goal) + '</textarea></label><div class="two"><label>Başlangıç<input type="date" id="f-start" value="' + S.start + '"></label><label>Hedef tarih<input type="date" id="f-target" value="' + S.target + '"></label></div><button class="btn" data-act="saveGoal">Kaydet</button></section>';
    h += '<section class="card"><h3>Haftalık plan</h3><p>Her akşam yaklaşık 15 dakika. Cumartesi en geride kalan alan, Pazar yanlışların tekrarı.</p>' + [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      return '<div class="pl"><span>' + GUN[d] + '</span><select data-plan="' + d + '">' + TR.map(function (t) { return '<option value="' + t.id + '"' + (S.plan[d] === t.id ? " selected" : "") + ">" + esc(t.name) + "</option>"; }).join("") +
        '<option value="weak"' + (S.plan[d] === "weak" ? " selected" : "") + '>Zayıf alan (otomatik)</option><option value="review"' + (S.plan[d] === "review" ? " selected" : "") + '>Tekrar</option><option value="off"' + (S.plan[d] === "off" ? " selected" : "") + ">Dinlenme</option></select></div>";
    }).join("") + "</section>";
    h += '<section class="card"><h3>Alanlara göre test ortalaman</h3><div class="v-bars">' + TR.map(function (t) {
      var s = trackStats(t.id), v = s.avg == null ? 0 : Math.round(s.avg * 100);
      return '<div class="br"><span class="bl">' + esc(t.short) + '</span><span class="bt"><i style="width:' + v + "%;background:" + t.color + '"></i></span><span class="bv">' + (s.avg == null ? "–" : "%" + v) + "</span></div>";
    }).join("") + "</div></section>";
    h += '<section class="card"><h3>Ara hedefler</h3>' + window.MILESTONES.map(function (m) { return '<label class="chk"><input type="checkbox" data-ms="' + m.id + '"' + (S.ms[m.id] ? " checked" : "") + "><span><b>" + esc(m.title) + "</b><small>" + fmt(m.date) + "</small></span></label>"; }).join("") + "</section>";
    var P = S.pend, yrKm = P.km * 2 * P.days * 46, cost = yrKm * P.rate, hrs = P.mins * 2 * P.days * 46 / 60;
    h += '<section class="card"><h3>Yol masrafı hesaplayıcı</h3><p>İş tekliflerini karşılaştırırken kullan.</p><div class="two"><label>Tek yön km<input type="number" data-pend="km" value="' + P.km + '"></label><label>Ofis günü / hafta<input type="number" data-pend="days" value="' + P.days + '"></label><label>€ / km<input type="number" step="0.01" data-pend="rate" value="' + P.rate + '"></label><label>Tek yön dakika<input type="number" data-pend="mins" value="' + P.mins + '"></label></div>' +
      '<div class="kpis"><div><b>' + Math.round(cost / 12).toLocaleString("de-DE") + ' €</b><small>aylık</small></div><div><b>' + Math.round(cost).toLocaleString("de-DE") + ' €</b><small>yıllık</small></div><div><b>' + Math.round(hrs) + " sa</b><small>yolda / yıl</small></div></div></section>";
    h += '<section class="card"><h3>Notlar</h3><p>Maaş araştırması, ilanlar, görüşme notları.</p><textarea id="f-notes" rows="5">' + esc(S.notes) + '</textarea><button class="btn ghost" data-act="saveNotes">Notları kaydet</button></section>';
    h += '<section class="card"><h3>Yedek</h3><p>Veriler yalnızca bu telefonda saklanır. Ayda bir yedek kodunu kopyalayıp bir yere kaydet.</p><div class="two"><button class="btn ghost" data-act="export">Yedek kodunu kopyala</button><button class="btn ghost" data-act="import">Yedekten yükle</button></div></section>';
    return h;
  }

  /* ---------- aralıklı tekrar ---------- */
  var INT = [1, 3, 7, 21, 60];
  function qById(id) { var p = id.split("#"), L = LES[p[0]]; return L ? { q: L.l.quiz[+p[1]], id: id, tr: L.tr } : null; }
  function dueList(exclude) {
    return Object.keys(S.srs).filter(function (id) { return S.srs[id].due <= TODAY && (!exclude || id.indexOf(exclude + "#") !== 0); })
      .sort(function (a, b) { return S.srs[a].due < S.srs[b].due ? -1 : 1; }).map(qById).filter(Boolean);
  }
  function srsUpdate(id, pts) {
    var r = S.srs[id] || { b: 0, due: TODAY };
    if (pts >= 1) { r.b = Math.min(r.b + 1, INT.length - 1); r.due = addDays(TODAY, INT[r.b]); }
    else if (pts >= 0.5) { r.due = addDays(TODAY, 1); }
    else { r.b = 0; r.due = addDays(TODAY, 1); }
    S.srs[id] = r;
  }

  /* ---------- ders oynatıcı ---------- */
  var P = null;
  function openLesson(lid, forDate) {
    var L = LES[lid]; if (!L) return;
    var warm = dueList(lid).slice(0, 3);
    var seq = [], sl = L.l.slides;
    sl.forEach(function (s, i) { seq.push({ k: "s", s: s }); if ((i + 1) % 2 === 0 && i < sl.length - 1) { var c = genCheck(sl[i]) || genCheck(sl[i - 1]); if (c) seq.push({ k: "c", q: c }); } });
    var lastC = genCheck(sl[sl.length - 1]); if (lastC) seq.push({ k: "c", q: lastC });
    shuffle(GM.satz.filter(function (x) { return x.l === lid; }).map(function (x) { return { k: "g", kind: "satz", it: x }; })
      .concat(GM.sql.filter(function (x) { return x.l === lid; }).map(function (x) { return { k: "g", kind: "sql", it: x }; }))).slice(0, 2).forEach(function (g) { seq.push(g); });
    P = { kind: "lesson", forDate: forDate || null, lid: lid, tr: L.tr, l: L.l, seq: seq, phase: warm.length ? "warm" : "slides", warm: warm, wi: 0, i: 0, qi: 0, ans: {}, t0: Date.now(),
      qs: L.l.quiz.map(function (q, k) { return { q: q, id: lid + "#" + k }; }) };
    drawPlayer();
  }
  function openReview() {
    var pool = dueList().slice(0, 12);
    if (!pool.length) return;
    P = { kind: "review", lid: null, tr: "review", l: { title: "Tekrar", slides: [] }, seq: [], phase: "quiz", warm: [], wi: 0, i: 0, qi: 0, ans: {}, t0: Date.now(), qs: pool };
    drawPlayer();
  }
  function curQ() { if (P.phase === "slides" && P.seq[P.i] && P.seq[P.i].k === "c") return { it: { q: P.seq[P.i].q }, key: "c" + P.i }; return P.phase === "warm" ? { it: P.warm[P.wi], key: "w" + P.wi } : { it: P.qs[P.qi], key: "q" + P.qi }; }
  function norm(s) { return String(s || "").toLowerCase().replace(/\s+/g, " ").trim(); }
  /* ---------- yazılı cevap denetimi ---------- */
  var CONFUSE = {
    "anderes|anders": "anders = farklı şekilde (Ich sehe das anders). anderes = başka bir şey (etwas anderes).",
    "das|dass": "dass = ki (bağlaç, yan cümle başlatır). das = artikel ya da zamir.",
    "wen|wenn": "wenn = eğer / -dığında. wen = kimi.",
    "seid|seit": "seit = -den beri. seid = sein fiili (ihr seid).",
    "den|dem": "Hâl eki: den = -i hâli (Akkusativ), dem = -e hâli (Dativ).",
    "einen|einem": "einen = Akkusativ, einem = Dativ.",
    "wieder|wider": "wieder = tekrar. wider = -e karşı (nadir).",
    "mir|mich": "mir = bana (Dativ), mich = beni (Akkusativ).",
    "dir|dich": "dir = sana (Dativ), dich = seni (Akkusativ)."
  };
  function tok(s) { return String(s || "").replace(/[„“"'.,!?;:()]/g, " ").split(/\s+/).filter(Boolean); }
  function lev(a, b) { var m = a.length, n = b.length, d = []; for (var i = 0; i <= m; i++) { d[i] = [i]; } for (var j = 1; j <= n; j++) d[0][j] = j; for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
  function wdiff(user, model) {
    var u = tok(user), m = tok(model), U = u.map(function (x) { return x.toLowerCase(); }), M = m.map(function (x) { return x.toLowerCase(); });
    var L = []; for (var i = 0; i <= U.length; i++) { L[i] = []; for (var j = 0; j <= M.length; j++) L[i][j] = 0; }
    for (i = U.length - 1; i >= 0; i--) for (j = M.length - 1; j >= 0; j--) L[i][j] = U[i] === M[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var ops = []; i = 0; j = 0;
    while (i < U.length && j < M.length) { if (U[i] === M[j]) { ops.push(["eq", u[i], m[j]]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) { ops.push(["ins", u[i]]); i++; } else { ops.push(["del", null, m[j]]); j++; } }
    while (i < U.length) ops.push(["ins", u[i++]]); while (j < M.length) ops.push(["del", null, m[j++]]);
    var out = [];
    for (var k = 0; k < ops.length; k++) {
      var o = ops[k], nx = ops[k + 1];
      if (o[0] === "ins" && nx && nx[0] === "del" || o[0] === "del" && nx && nx[0] === "ins") { var uw = o[0] === "ins" ? o[1] : nx[1], mw = o[0] === "del" ? o[2] : nx[2], dd = lev(uw.toLowerCase(), mw.toLowerCase()); out.push([dd <= 2 || mw.toLowerCase().indexOf(uw.toLowerCase()) === 0 || uw.toLowerCase().indexOf(mw.toLowerCase()) === 0 ? "near" : "sub", uw, mw]); k++; }
      else out.push(o);
    }
    return out;
  }
  function ltCheck(text) {
    return fetch("https://api.languagetool.org/v2/check", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "text=" + encodeURIComponent(text) + "&language=de-DE&motherTongue=tr" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j ? j.matches.map(function (m) { return { msg: m.message, rep: (m.replacements || []).slice(0, 3).map(function (x) { return x.value; }), bad: text.substr(m.offset, m.length), minor: /TYPOGRAPHY|PUNCTUATION|CASING/.test((m.rule && m.rule.category && m.rule.category.id) || "") && !/UPPERCASE_SENTENCE_START/.test((m.rule || {}).id || "") }; }) : "err"; })
      .catch(function () { return "err"; });
  }
  function wScore(Q, A) {
    var t = norm(A.text), ok = Q.keys.filter(function (k) { return t.indexOf(norm(k)) >= 0; }).length / Q.keys.length;
    var d = wdiff(A.text, Q.model), exact = d.every(function (o) { return o[0] === "eq"; }), near = d.filter(function (o) { return o[0] === "near"; }).length;
    var lt = Array.isArray(A.lt) ? A.lt.filter(function (m) { return !m.minor; }).length : 0;
    if (exact) return 1;
    if (ok >= 0.8 && !lt && !near) return 1;
    if (ok >= 0.8 || (ok >= 0.4 && lt <= 1)) return 0.5;
    return 0;
  }
  function renderWCheck(Q, A) {
    var d = wdiff(A.text, Q.model), notes = [], h = "";
    h += '<div class="wc"><span class="wcl">Senin cevabın</span><p class="wcu">' + d.filter(function (o) { return o[0] !== "del"; }).map(function (o) {
      return o[0] === "eq" ? '<span class="ok">' + esc(o[1]) + "</span>" : o[0] === "near" ? '<span class="nr">' + esc(o[1]) + "</span>" : '<span class="bd">' + esc(o[1]) + "</span>";
    }).join(" ") + '</p><span class="wcl">Örnek cevap</span><p class="wcm">' + d.filter(function (o) { return o[0] !== "ins"; }).map(function (o) {
      return o[0] === "eq" ? esc(o[2]) : '<span class="wms">' + esc(o[2]) + "</span>";
    }).join(" ") + "</p>";
    d.forEach(function (o) { if (o[0] === "near" || o[0] === "sub") { var a = o[1].toLowerCase(), b = o[2].toLowerCase(), key = [a, b].sort().join("|"), c = CONFUSE[key]; notes.push("<b>" + esc(o[1]) + "</b> → <b>" + esc(o[2]) + "</b>" + (c ? ": " + esc(c) : o[0] === "near" ? ": yazım ya da ek farkı" : "")); } });
    if (notes.length) h += '<ul class="wcn">' + notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") + "</ul>";
    h += "</div>";
    if (!Q.code) {
      if (A.lt === "loading") h += '<p class="muted small">' + ic("refresh") + " Dilbilgisi kontrol ediliyor…</p>";
      else if (A.lt === "err") h += '<p class="muted small">Dilbilgisi denetimine ulaşılamadı (internet?). Karşılaştırmaya göre puanla.</p>';
      else if (Array.isArray(A.lt)) {
        var main = A.lt.filter(function (m) { return !m.minor; });
        h += '<div class="lt ' + (main.length ? "has" : "") + '"><b>' + ic(main.length ? "alert" : "check") + (main.length ? " Dilbilgisi: " + main.length + " sorun" : " Dilbilgisi: hata bulunmadı") + "</b>" +
          A.lt.map(function (m) { return "<p" + (m.minor ? ' class="minor"' : "") + "><span>„" + esc(m.bad) + "”</span>" + (m.rep.length ? " → " + esc(m.rep.join(" / ")) : "") + "<br><small>" + esc(m.msg) + "</small></p>"; }).join("") + "</div>";
      }
    }
    return h;
  }

  var lastPos = -1;
  function balancedOrder(n, a) {
    var ord, tries = 0;
    do { ord = shuffle(Array.apply(null, { length: n }).map(function (_, i) { return i; })); } while (ord.indexOf(a) === lastPos && ++tries < 6);
    lastPos = ord.indexOf(a); return ord;
  }
  function renderQ(it, key, label) {
    var Q = it.q, A = P.ans[key], h = '<div class="slide quiz"><span class="tag">' + ic(label === "Isınma" ? "refresh" : "star") + label + (it.tr && TRK[it.tr] && label !== "Test" ? " · " + esc(TRK[it.tr].short) : "") + "</span><h2>" + esc(Q.q) + "</h2>";
    if (Q.k === "w") {
      h += '<textarea id="wans" class="wans' + (Q.code ? " mono" : "") + '" rows="' + (Q.code ? 5 : 3) + '" placeholder="Cevabını yaz…"' + (A ? " disabled" : "") + ' autocapitalize="off" autocorrect="off" spellcheck="false">' + esc(A ? A.text : "") + "</textarea>";
      if (A) {
        h += renderWCheck(Q, A);
        var sug = A.lt === "loading" ? null : wScore(Q, A);
        if (sug != null) h += '<p class="muted small">Uygulamanın önerisi: <b>' + (sug === 1 ? "Doğru" : sug === 0.5 ? "Kısmen" : "Yanlış") + '</b>. Farklı ama doğru bir cümle kurduysan puanı değiştirebilirsin.</p>';
        h += '<div class="rate">' + [[1, "Doğru"], [0.5, "Kısmen"], [0, "Yanlış"]].map(function (r) { return '<button data-rate="' + r[0] + '" class="' + (A.pts === r[0] ? "on " : "") + (A.pts == null && sug === r[0] ? "sug" : "") + '">' + r[1] + "</button>"; }).join("") + "</div>";
      }
    } else {
      P.ord = P.ord || {};
      var ord = P.ord[key] || (P.ord[key] = balancedOrder(Q.o.length, Q.a));
      h += '<div class="opts">' + ord.map(function (k, j) {
        var c = !A ? "" : k === Q.a ? "right" : k === A.v ? "wrong" : "dim";
        return '<button data-ans="' + k + '" class="' + c + '"' + (A ? " disabled" : "") + "><span>" + String.fromCharCode(65 + j) + "</span>" + esc(Q.o[k]) + "</button>";
      }).join("") + "</div>";
      if (A) h += '<div class="expl ' + (A.pts ? "ok" : "no") + '"><b>' + (A.pts ? "Doğru." : "Doğru cevap: " + String.fromCharCode(65 + ord.indexOf(Q.a))) + "</b> " + esc(Q.e || "") + "</div>";
    }
    return h + "</div>";
  }
  function drawPlayer() {
    var col = TRK[P.tr] ? TRK[P.tr].color : "#4b5563", el = document.getElementById("player");
    if (!el) { el = document.createElement("div"); el.id = "player"; document.body.appendChild(el); }
    el.style.setProperty("--c", col);
    document.body.classList.add("noscroll");
    var nW = P.warm.length, nS = P.seq.length, nQ = P.qs.length, tot = nW + nS + nQ;
    var pos = P.phase === "warm" ? P.wi : P.phase === "slides" ? nW + P.i : P.phase === "quiz" ? nW + nS + P.qi : tot;
    var lab = P.phase === "warm" ? "Isınma " + (P.wi + 1) + "/" + nW : P.phase === "slides" ? (P.seq[P.i].k === "c" ? "Ara kontrol" : P.seq[P.i].k === "g" ? "Birlikte yap" : (P.i + 1) + "/" + nS) : P.phase === "quiz" ? "Soru " + (P.qi + 1) + "/" + nQ : "Sonuç";
    var h = '<div class="pl-top"><button data-act="close" aria-label="Kapat">' + ic("x") + '</button><div class="pbar"><i style="width:' + pos / tot * 100 + '%"></i></div><small>' + lab + '</small></div><div class="pl-body">';
    if (P.phase === "slides") {
      var it = P.seq[P.i], last = P.i === nS - 1, nxt = last ? "Teste geç" : "İleri";
      if (it.k === "s") {
        var s = it.s;
        h += '<div class="slide"><span class="tag">' + esc(P.l.title) + "</span><h2>" + esc(s.h) + "</h2>" + (s.p ? '<p class="sp">' + esc(s.p) + "</p>" : "") + '<div class="vis">' + slideVisual(s, col) + "</div></div>";
        h += '</div><div class="pl-foot"><button class="btn ghost" data-act="prev"' + (P.i ? "" : " disabled") + ">" + ic("back") + 'Geri</button><button class="btn" data-act="next">' + nxt + ic("arrow") + "</button></div>";
      } else if (it.k === "c") {
        var A = P.ans["c" + P.i];
        h += renderQ({ q: it.q }, "c" + P.i, "Ara kontrol") + '</div><div class="pl-foot">' + (A ? '<button class="btn wide" data-act="next">' + nxt + ic("arrow") + "</button>" : '<span class="muted small center wide">Az önce gördüğünü hatırla</span>') + "</div>";
      } else {
        if (!it.op) it.op = mkOP(it.it, it.kind);
        OP = it.op;
        h += '<div class="slide"><span class="tag">' + ic("users") + 'Birlikte yap</span>' + renderOP(OP) + (OP.res == null ? '<p class="muted small">Takılırsan İpucu\'na bas; bu adım puana sayılmaz.</p>' : "") + '</div></div><div class="pl-foot">' + opFoot(OP, "next", nxt) + "</div>";
      }
    } else if (P.phase === "warm" || P.phase === "quiz") {
      var c = curQ(), A = P.ans[c.key], isW = c.it.q.k === "w";
      if (P.phase === "warm" && P.wi === 0 && !A) h += '<p class="warm-note">' + ic("refresh") + "Derse başlamadan önce geçmiş derslerden " + nW + " soru. Hatırlamaya çalışmak, unutmayı en çok yavaşlatan şeydir.</p>";
      h += renderQ(c.it, c.key, P.phase === "warm" ? "Isınma" : P.kind === "review" ? "Tekrar" : "Test") + '</div><div class="pl-foot">';
      if (isW && !A) h += '<button class="btn wide" data-act="wcheck">Kontrol et</button>';
      else if (A && A.pts != null) {
        var last = P.phase === "warm" ? P.wi === nW - 1 : P.qi === nQ - 1;
        h += '<button class="btn wide" data-act="nextq">' + (last ? (P.phase === "warm" ? "Derse geç" : "Sonucu gör") : "Sonraki soru") + ic("arrow") + "</button>";
      } else h += '<span class="muted small center wide">' + (isW ? "Kendini puanla" : "Bir cevap seç") + "</span>";
      h += "</div>";
    } else {
      var sc = lessonScore(), pct = sc / nQ, pass = pct >= PASS, mins = Math.max(1, Math.round((Date.now() - P.t0) / 60000));
      h += '<div class="slide result">' + ring(pct, pass ? "#2e9e6a" : "#e3a018", 140, Math.round(pct * 100) + "%") + "<h2>" + (P.kind === "review" ? "Tekrar tamam" : pass ? "Ders tamamlandı" : "Biraz daha tekrar") + "</h2><p>" + (Math.round(sc * 10) / 10) + "/" + nQ + " puan · " + mins + " dk" + (P.kind === "lesson" && !pass ? ". Geçmek için %80 gerekiyor. Dersi istediğin zaman tekrar açabilirsin; yanlış soruların yarın tekrar karşına çıkacak." : "") + "</p>";
      var prc = P.seq.filter(function (x) { return x.k !== "s"; }), pok = P.seq.reduce(function (acc, x, i) { return acc + (x.k === "c" ? ((P.ans["c" + i] || {}).pts || 0) : x.k === "g" ? ((x.op || {}).pts || 0) : 0); }, 0);
      if (prc.length) h += '<p class="muted small">Alıştırma: ' + (Math.round(pok * 10) / 10) + "/" + prc.length + "</p>";
      if (P.warm.length) { var wsc = P.warm.reduce(function (a, x, k) { return a + ((P.ans["w" + k] || {}).pts || 0); }, 0); h += '<p class="muted small">Isınma: ' + wsc + "/" + P.warm.length + "</p>"; }
      if (P.l.task) h += '<div class="task"><span class="tag">' + ic("flag") + "Bugünkü görev</span><p>" + esc(P.l.task) + '</p><label class="chk"><input type="checkbox" id="taskdone"' + (S.tasks[P.lid] ? " checked" : "") + "><span>Görevi yaptım (yarın da işaretleyebilirsin)</span></label></div>";
      h += '</div></div><div class="pl-foot"><button class="btn wide" data-act="finish">Kaydet ve kapat</button></div>';
    }
    var key = P.phase + ":" + P.wi + ":" + P.i + ":" + P.qi;
    el.classList.toggle("noanim", el.dataset.k === key); el.dataset.k = key;
    var keep = el.dataset.k2 === key ? (el.querySelector(".pl-body") || {}).scrollTop : 0; el.dataset.k2 = key;
    el.innerHTML = h;
    el.querySelector(".pl-body").scrollTop = keep || 0;
  }
  function lessonScore() { return P.qs.reduce(function (a, x, k) { return a + ((P.ans["q" + k] || {}).pts || 0); }, 0); }
  function finishPlayer() {
    var nQ = P.qs.length, pct = lessonScore() / nQ, mins = Math.max(1, Math.round((Date.now() - P.t0) / 60000));
    var tb = document.getElementById("taskdone");
    if (tb && P.lid) S.tasks[P.lid] = tb.checked;
    P.warm.forEach(function (x, k) { var a = P.ans["w" + k]; if (a && a.pts != null) srsUpdate(x.id, a.pts); });
    P.qs.forEach(function (x, k) { var a = P.ans["q" + k]; if (a && a.pts != null) srsUpdate(x.id, a.pts); });
    if (P.kind === "lesson") S.best[P.lid] = Math.max(S.best[P.lid] || 0, pct);
    var rec = { date: TODAY, lid: P.lid, tr: P.kind === "lesson" ? P.tr : "review", sc: Math.round(lessonScore() * 10) / 10, tot: nQ, min: mins, pass: P.kind === "review" || pct >= PASS };
    if (P.forDate) rec.for = P.forDate;
    S.sessions.push(rec);
    var wasReview = P.kind === "review";
    save(); closePlayer(); toast(wasReview ? "Tekrar kaydedildi" : pct >= PASS ? "Ders tamamlandı" : "Kaydedildi; yarın yanlışlar tekrar gelecek");
  }
  function closePlayer() { var el = document.getElementById("player"); if (el) el.remove(); document.body.classList.remove("noscroll"); P = null; render(); }

  /* ---------- podcast oynatıcı ---------- */
  var PODS = null, AU = null, lastT = 0, saveT = 0, curEp = null;
  var PODCAT = [["all", "Hepsi"], ["lern", "Almanca öğren"], ["uyku", "Uyku"], ["nat", "Doğal Almanca"], ["ki", "Yapay zekâ"], ["is", "İş ve kariyer"]];
  function loadPods(cb) {
    fetch("data/podcasts.json?" + TODAY, { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { PODS = j || { eps: [] }; cb && cb(); }).catch(function () { PODS = { eps: [], offline: true }; cb && cb(); });
  }
  function epById(id) { return PODS && PODS.eps.filter(function (e) { return e.id === id; })[0]; }
  function listenMin(d) { return Math.round((S.listen[d] || 0) / 60); }
  function weekListen() { var s = 0, mon = addDays(TODAY, -((parse(TODAY).getDay() + 6) % 7)); for (var i = 0; i < 7; i++) s += S.listen[addDays(mon, i)] || 0; return Math.round(s / 60); }
  function fmtDur(s) { s = Math.round(s || 0); var m = Math.floor(s / 60); return m >= 60 ? Math.floor(m / 60) + " sa " + (m % 60) + " dk" : m + " dk"; }
  function ensureAudio() {
    if (AU) return AU;
    AU = new Audio(); AU.preload = "metadata";
    AU.addEventListener("timeupdate", function () {
      if (!curEp) return;
      var t = AU.currentTime, dt = t - lastT; lastT = t;
      if (!AU.paused && dt > 0 && dt < 3) S.listen[TODAY] = (S.listen[TODAY] || 0) + dt / (AU.playbackRate || 1);
      S.pod.pos[curEp.id] = t;
      if (AU.duration && t / AU.duration > 0.92) S.pod.done[curEp.id] = TODAY;
      if (Date.now() - saveT > 5000) { saveT = Date.now(); save(); drawMini(); }
    });
    AU.addEventListener("seeked", function () { lastT = AU.currentTime; });
    ["play", "pause", "ended"].forEach(function (ev) { AU.addEventListener(ev, function () { save(); drawMini(); if (view === "listen") render(); }); });
    AU.addEventListener("error", function () { toast("Bölüm açılamadı; internet bağlantını kontrol et"); });
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", function () { AU.play(); });
        navigator.mediaSession.setActionHandler("pause", function () { AU.pause(); });
        navigator.mediaSession.setActionHandler("seekbackward", function () { AU.currentTime = Math.max(0, AU.currentTime - 15); });
        navigator.mediaSession.setActionHandler("seekforward", function () { AU.currentTime += 30; });
      } catch (e) {}
    }
    return AU;
  }
  function playEp(id) {
    var e = epById(id); if (!e) return;
    ensureAudio();
    if (curEp && curEp.id === id) { AU.paused ? AU.play() : AU.pause(); return; }
    curEp = e; S.pod.last = id; AU.src = e.url; AU.playbackRate = S.pod.rate || 1;
    var start = S.pod.pos[id] || 0;
    AU.addEventListener("loadedmetadata", function f() { AU.removeEventListener("loadedmetadata", f); if (start && (!AU.duration || start < AU.duration - 5)) AU.currentTime = start; lastT = AU.currentTime; AU.playbackRate = S.pod.rate || 1; });
    lastT = start;
    AU.play().catch(function () { toast("Oynatmak için tekrar dokun"); });
    if ("mediaSession" in navigator && window.MediaMetadata) navigator.mediaSession.metadata = new MediaMetadata({ title: e.t, artist: e.show, artwork: e.img ? [{ src: e.img, sizes: "600x600" }] : [] });
    save(); drawMini(); if (view === "listen") render();
  }
  function nextEp() {
    if (!PODS) return null;
    if (S.pod.last && !S.pod.done[S.pod.last] && epById(S.pod.last)) return epById(S.pod.last);
    return PODS.eps.filter(function (e) { return !S.pod.done[e.id] && (podCat === "all" || e.cat === podCat); })[0] || null;
  }
  var podCat = "all";
  function vListen() {
    var seg = '<div class="seg"><button data-lm="pod" class="' + (listenMode === "pod" ? "on" : "") + '">Podcast</button><button data-lm="story" class="' + (listenMode === "story" ? "on" : "") + '">Hikâyeler</button></div>';
    if (listenMode === "story") return seg + vStories();
    return seg + vListenPod();
  }
  function vListenPod() {
    if (!PODS) { loadPods(render); return '<p class="muted center">Yükleniyor…</p>'; }
    var wk = weekListen(), goal = S.pod.goal || 150, nx = nextEp();
    var h = '<section class="hero listen"><div class="hero-l"><span class="lbl">Bu hafta</span><b class="cnt">' + wk + '</b><span class="lbl">dk</span></div><div class="hero-r"><p>Yolda Almanca dinlemek, en çok saat biriktireceğin yer. Hedef: haftada ' + goal + ' dakika.</p><div class="tl"><i style="width:' + Math.min(100, wk / goal * 100) + '%"></i></div><small>' + Math.min(100, Math.round(wk / goal * 100)) + "% tamam</small></div></section>";
    if (nx) h += '<button class="go-btn" data-ep="' + esc(nx.id) + '">' + ic(curEp && curEp.id === nx.id && AU && !AU.paused ? "pause" : "play", "big") + "<span><small>" + (S.pod.pos[nx.id] ? "Kaldığın yerden devam" : "Yola çıkıyorum") + "</small><b>" + esc(nx.t) + "</b><em>" + esc(nx.show) + "</em></span></button>";
    var mon = addDays(TODAY, -((parse(TODAY).getDay() + 6) % 7)), mx = 1, wd = [];
    for (var i = 0; i < 7; i++) { var ds = addDays(mon, i), m = listenMin(ds); wd.push([GUNK[parse(ds).getDay()], m, ds]); mx = Math.max(mx, m); }
    h += '<section class="card"><h3>Günlük dinleme</h3><div class="lbars">' + wd.map(function (x) { return '<div class="' + (x[2] === TODAY ? "now" : "") + '"><em>' + (x[1] || "") + '</em><i style="height:' + Math.max(3, x[1] / mx * 100) + '%"></i><small>' + x[0] + "</small></div>"; }).join("") + "</div></section>";
    h += '<div class="filters">' + PODCAT.map(function (c) { return '<button data-pc="' + c[0] + '" class="' + (podCat === c[0] ? "on" : "") + '">' + c[1] + "</button>"; }).join("") + "</div>";
    var eps = PODS.eps.filter(function (e) { return podCat === "all" || e.cat === podCat; });
    if (!eps.length) h += '<section class="card"><p>' + (PODS.offline ? "Çevrimdışısın." : "Bölüm listesi henüz oluşturulmadı. İlk otomatik güncellemeden sonra burada olacak.") + "</p></section>";
    eps.forEach(function (e) {
      var pos = S.pod.pos[e.id] || 0, pr = e.dur ? Math.min(1, pos / e.dur) : 0, on = curEp && curEp.id === e.id && AU && !AU.paused;
      h += '<div class="ep ' + (S.pod.done[e.id] ? "dn" : "") + '">' + (e.img ? '<img src="' + esc(e.img) + '" alt="" loading="lazy">' : '<span class="noimg">' + ic("mic") + "</span>") +
        '<div class="ei"><small>' + esc(e.show) + (e.d ? " · " + esc(e.d) : "") + "</small><b>" + esc(e.t) + "</b><span>" + (e.dur ? fmtDur(e.dur) : "") + (S.pod.done[e.id] ? " · dinlendi" : pos > 5 ? " · " + fmtDur(e.dur - pos) + " kaldı" : "") + "</span>" + (pr ? '<div class="epbar"><i style="width:' + pr * 100 + '%"></i></div>' : "") + "</div>" +
        '<button class="pp" data-ep="' + esc(e.id) + '" aria-label="Oynat">' + ic(on ? "pause" : "play") + "</button></div>";
    });
    h += '<p class="muted small">' + (PODS.updated ? "Liste her sabah yenilenir · son: " + esc(PODS.updated) : "") + "</p>";
    return h;
  }
  function drawMini() {
    var el = document.getElementById("mini");
    document.body.classList.toggle("hasmini", !!curEp);
    if (!curEp) { if (el) el.remove(); return; }
    if (!el) { el = document.createElement("div"); el.id = "mini"; document.body.appendChild(el); }
    var pr = AU && AU.duration ? AU.currentTime / AU.duration : 0, rate = S.pod.rate || 1;
    el.innerHTML = '<div class="mbar"><i style="width:' + pr * 100 + '%"></i></div><div class="mrow"><button data-act="aback" aria-label="15 sn geri">' + ic("rew") + '</button><button data-ep="' + esc(curEp.id) + '" class="mpp" aria-label="Oynat/Durdur">' + ic(AU && !AU.paused ? "pause" : "play") + '</button><button data-act="afwd" aria-label="30 sn ileri">' + ic("fwd") + '</button><div class="mt"><b>' + esc(curEp.t) + "</b><small>" + esc(curEp.show) + '</small></div><button data-act="arate" class="rt">' + String(rate).replace(".", ",") + '×</button><button data-act="asleep" class="rt">' + ic("clock") + (sleepEnd ? Math.max(1, Math.round((sleepEnd - Date.now()) / 60000)) + "′" : "") + "</button></div>";
  }

  /* ---------- oyunlar: ortak ---------- */
  var GM = window.GAMES || { satz: [], sql: [], cw: [] };
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function srsStep(r, pts) {
    r = r || { b: 0, due: TODAY };
    if (pts >= 1) { r.b = Math.min(r.b + 1, INT.length - 1); r.due = addDays(TODAY, INT[r.b]); }
    else if (pts >= 0.5) r.due = addDays(TODAY, 1);
    else { r.b = 0; r.due = addDays(TODAY, 1); }
    return r;
  }
  function gUpdate(kind, id, pts) { S.gs[kind] = S.gs[kind] || {}; S.gs[kind][id] = srsStep(S.gs[kind][id], pts); }
  function pickItems(kind, bank, n) {
    var gs = S.gs[kind] || {};
    var due = bank.filter(function (x) { return gs[x.id] && gs[x.id].due <= TODAY; }), un = bank.filter(function (x) { return !gs[x.id]; }), rest = bank.filter(function (x) { return gs[x.id] && gs[x.id].due > TODAY; });
    return shuffle(due).concat(shuffle(un), shuffle(rest)).slice(0, n);
  }

  /* ---------- sıralama bulmacası (Satzbau + SQL yapbozu) ---------- */
  var OP = null;
  function mkOP(item, kind) {
    var toks = kind === "satz" ? item.w.slice() : item.lines.concat(item.x || []);
    return { item: item, kind: kind, toks: toks, n: kind === "satz" ? item.w.length : item.lines.length, pool: shuffle(toks.map(function (_, i) { return i; })), picked: [], res: null, hints: 0 };
  }
  function opTarget(o) { return o.kind === "satz" ? o.item.w : o.item.lines; }
  function opJoin(o, arr) { return arr.join(o.kind === "satz" ? " " : "\n"); }
  function opCheck(o) {
    var ans = opJoin(o, o.picked.map(function (i) { return o.toks[i]; }));
    var sols = [opJoin(o, opTarget(o))].concat((o.item.alt || []).map(function (a) { return opJoin(o, a); }));
    o.res = sols.indexOf(ans) >= 0;
    o.pts = o.res ? (o.hints ? 0.5 : 1) : 0;
  }
  function opHint(o) {
    var tg = opTarget(o), k = 0;
    while (k < o.picked.length && o.toks[o.picked[k]] === tg[k]) k++;
    o.picked = o.picked.slice(0, k);
    if (k >= tg.length) return;
    for (var i = 0; i < o.toks.length; i++) if (o.picked.indexOf(i) < 0 && o.toks[i] === tg[k]) { o.picked.push(i); break; }
    o.hints++;
  }
  function renderOP(o) {
    var it = o.item, isS = o.kind === "satz", cls = isS ? "s" : "q", h = "";
    h += "<h2>" + esc(isS ? "„" + it.tr + "”" : it.task) + '</h2><p class="sp">' + (isS ? "Bu anlamdaki Almanca cümleyi kelimelere dokunarak doğru sıraya diz." : "Doğru satırları doğru sırayla seç. Aralarında yanlış satırlar da var.") + "</p>";
    h += '<div class="op-ans ' + cls + (o.res === true ? " ok" : o.res === false ? " no" : "") + '">' + (o.picked.length ? o.picked.map(function (i, k) { return '<button data-opu="' + k + '" class="tk"' + (o.res != null ? " disabled" : "") + ">" + esc(o.toks[i]) + "</button>"; }).join("") : '<span class="ph">' + (isS ? "Kelimelere dokun…" : "Satırlara dokun…") + "</span>") + "</div>";
    if (o.res == null) h += '<div class="op-pool ' + cls + '">' + o.pool.map(function (i) { return o.picked.indexOf(i) >= 0 ? "" : '<button data-opp="' + i + '" class="tk">' + esc(o.toks[i]) + "</button>"; }).join("") + "</div>";
    else {
      h += '<div class="expl ' + (o.res ? "ok" : "no") + '"><b>' + (o.res ? (o.hints ? "Doğru (ipucuyla)." : "Doğru.") : "Doğrusu:") + "</b>";
      if (!o.res) h += isS ? ' <span class="sol">' + esc(it.w.join(" ")) + "</span>" : '<pre class="v-code">' + hl(it.lines.join("\n")) + "</pre>";
      h += (it.e ? "<p>" + esc(it.e) + "</p>" : "") + "</div>";
    }
    return h;
  }
  function opFoot(o, nextAct, nextLabel) {
    if (o.res == null) return '<button class="btn ghost" data-act="ophint">' + ic("bulb") + 'İpucu</button><button class="btn" data-act="opcheck"' + (o.picked.length === o.n ? "" : " disabled") + ">Kontrol et</button>";
    return '<button class="btn wide" data-act="' + nextAct + '">' + nextLabel + ic("arrow") + "</button>";
  }

  /* ---------- İsveç bulmacası (Schwedenrätsel) ---------- */
  function nz(s) { return String(s || "").toUpperCase().replace(/Ä/g, "AE").replace(/Ö/g, "OE").replace(/Ü/g, "UE").replace(/ß/g, "SS").replace(/[^A-Z]/g, ""); }
  function genCW(bank, R, C) {
    R = R || 9; C = C || 8;
    var cand = {}, maxL = 7;
    bank.forEach(function (it) {
      var W = it.w, n = W.length;
      if (n <= maxL) (cand[n] = cand[n] || []).push({ ans: W, full: true, it: it });
      for (var L = 2; L <= Math.min(maxL, n - 2); L++) for (var p = 0; p + L <= n; p++) (cand[L] = cand[L] || []).push({ ans: W.substr(p, L), full: false, it: it, pos: p });
    });
    for (var tries = 0; tries < 25; tries++) {
      var T = [];
      for (var r = 0; r < R; r++) { T.push([]); for (var c = 0; c < C; c++) T[r].push(r === 0 || c === 0 ? "C" : "L"); }
      for (r = 1; r < R; r++) if (Math.random() < 0.75) T[r][2 + Math.floor(Math.random() * (C - 4))] = "C";
      for (c = 1; c < C; c++) {
        var run = 0, longest = 0; for (r = 1; r < R; r++) { run = T[r][c] === "L" ? run + 1 : 0; longest = Math.max(longest, run); }
        if (longest > maxL || (longest > 5 && Math.random() < 0.6)) { var rr = 3 + Math.floor(Math.random() * (R - 5)); if ((c === 1 || T[rr][c - 1] !== "C") && (c + 1 >= C || T[rr][c + 1] !== "C")) T[rr][c] = "C"; }
      }
      var slots = [], cover = {};
      for (r = 0; r < R; r++) for (c = 0; c < C; c++) {
        if (T[r][c] !== "C") continue;
        [[0, 1, 0], [1, 0, 1]].forEach(function (D) {
          var len = 0; while (r + D[0] * (len + 1) < R && c + D[1] * (len + 1) < C && T[r + D[0] * (len + 1)][c + D[1] * (len + 1)] === "L") len++;
          if (len >= 2) { var sl = { r: r + D[0], c: c + D[1], d: D[2], L: len, cells: [] }; for (var k = 0; k < len; k++) { var key = (sl.r + D[0] * k) + "_" + (sl.c + D[1] * k); sl.cells.push(key); cover[key] = 1; } slots.push(sl); }
        });
      }
      var bad = false;
      for (r = 1; r < R && !bad; r++) for (c = 1; c < C; c++) if (T[r][c] === "L" && !cover[r + "_" + c]) { bad = true; break; }
      if (bad || slots.some(function (s) { return s.L > maxL || !cand[s.L]; })) { continue; }
      var grid = {}, used = {}, steps = 0, asg = [];
      var fit = function (s, a) { for (var k = 0; k < s.L; k++) { var g = grid[s.cells[k]]; if (g && g !== a.ans[k]) return false; } return true; };
      var solve = function () {
        if (++steps > 4000) return false;
        var best = null, bl = null;
        for (var i = 0; i < slots.length; i++) {
          if (asg[i]) continue;
          var l = cand[slots[i].L].filter(function (a) { return !used[a.it.id] && fit(slots[i], a); });
          if (!l.length) return false;
          if (!best || l.length < bl.length) { best = i; bl = l; }
        }
        if (best == null) return true;
        var s = slots[best], opts = shuffle(bl).sort(function (x, y) { return (y.full ? 1 : 0) - (x.full ? 1 : 0); }).slice(0, 12);
        for (var j = 0; j < opts.length; j++) {
          var a = opts[j], prev = s.cells.map(function (k) { return grid[k]; });
          s.cells.forEach(function (k, q) { grid[k] = a.ans[q]; }); used[a.it.id] = 1; asg[best] = a;
          if (solve()) return true;
          s.cells.forEach(function (k, q) { grid[k] = prev[q]; }); delete used[a.it.id]; asg[best] = null;
        }
        return false;
      };
      if (!solve()) { continue; }
      var cells = {}, words = slots.map(function (s, i) {
        var a = asg[i], it = a.it, pat = a.full ? null : it.w.slice(0, a.pos) + "…" + it.w.slice(a.pos + s.L);
        return { id: it.id, full: a.full, w: a.ans, src: it.w, c: a.full ? it.c : it.c, dc: a.full ? it.d : pat, pat: pat, a: it.a, r: s.r, col: s.c, d: s.d, solved: false, miss: 0, hint: 0 };
      });
      words.forEach(function (w, wi) { cwCells(w).forEach(function (key, k) { cells[key] = cells[key] || { t: "L", ch: w.w[k], ws: [] }; cells[key].ws.push(wi); }); });
      words.forEach(function (w, wi) { var key = (w.r - (w.d ? 1 : 0)) + "_" + (w.col - (w.d ? 0 : 1)); cells[key] = cells[key] || { t: "C", h: null, v: null }; if (w.d) cells[key].v = wi; else cells[key].h = wi; });
      for (r = 0; r < R; r++) for (c = 0; c < C; c++) if (!cells[r + "_" + c]) cells[r + "_" + c] = { t: "C", h: null, v: null };
      return { rows: R, cols: C, words: words, cells: cells, filled: Object.keys(grid).length, fill: {}, sel: null, done: false, lang: "de", rack: [] };
    }
    return null;
  }
  function cwCells(w) { var a = []; for (var k = 0; k < w.w.length; k++) a.push((w.r + (w.d ? k : 0)) + "_" + (w.col + (w.d ? 0 : k))); return a; }
  function newCW() {
    var pri = pickItems("cw", GM.cw, 30), best = null;
    for (var t = 0; t < 6 && !best; t++) best = genCW(pri.concat(shuffle(GM.cw)));
    if (!best) best = genCW(GM.cw);
    var keys = Object.keys(best.cells).filter(function (k) { return best.cells[k].t === "L"; });
    shuffle(keys).slice(0, Math.round(keys.length * 0.22)).forEach(function (k) { best.fill[k] = 1; });
    best.words.forEach(function (w) { if (cwCells(w).every(function (k) { return best.fill[k]; })) best.fill[cwCells(w)[0]] = 0; });
    return best;
  }
  function cwSelect(cw, wi) {
    cw.sel = wi;
    var w = cw.words[wi], need = cwCells(w).filter(function (k) { return !cw.fill[k]; }).map(function (k) { return cw.cells[k].ch; });
    var abc = "AEINRSTULMOGHBDKZ", dec = [];
    while (dec.length < Math.min(3, 8 - need.length)) { var ch = abc[Math.floor(Math.random() * abc.length)]; if (dec.indexOf(ch) < 0) dec.push(ch); }
    cw.rack = shuffle(need.concat(dec)).map(function (ch, i) { return { ch: ch, id: i, used: false }; });
  }
  function cwNextWord(cw) {
    for (var i = 1; i <= cw.words.length; i++) { var j = ((cw.sel == null ? -1 : cw.sel) + i) % cw.words.length; if (!cw.words[j].solved) return cwSelect(cw, j); }
    cw.sel = null; cw.done = true;
  }
  function cwCheckSolved(cw) {
    cw.words.forEach(function (w) { if (!w.solved && cwCells(w).every(function (k) { return cw.fill[k]; })) w.solved = true; });
  }
  function cwPlace(cw, ch) {
    var w = cw.words[cw.sel], ks = cwCells(w), k = ks.filter(function (x) { return !cw.fill[x]; })[0];
    if (!k) return true;
    if (cw.cells[k].ch === ch) { cw.fill[k] = 1; cwCheckSolved(cw); return true; }
    w.miss++; return false;
  }
  function fitClue(t, w, h) {
    var raw = [];
    String(t).toUpperCase().split(/\s+/).forEach(function (x) { var i = x.indexOf("…"); if (i > 0 && i < x.length - 1) { raw.push({ x: x.slice(0, i + 1) }); raw.push({ x: x.slice(i + 1), j: 1 }); } else raw.push({ x: x }); });
    for (var fs = 11; fs >= 7; fs -= 0.5) {
      var maxc = Math.floor((w - 3) / (fs * 0.64)), toks = [], lines = [];
      raw.forEach(function (o) { var x = o.x, j = o.j; while (x.length > maxc) { toks.push({ x: x.slice(0, maxc - 1) + "-", j: j }); x = x.slice(maxc - 1); j = 1; } toks.push({ x: x, j: j }); });
      toks.forEach(function (o) { var n = lines.length, l = lines[n - 1]; if (l != null && !/-$/.test(l) && (l + (o.j ? "" : " ") + o.x).length <= maxc) lines[n - 1] = l + (o.j ? "" : " ") + o.x; else lines.push(o.x); });
      if (lines.length * fs * 1.08 <= h - 3) return { fs: fs, html: lines.map(esc).join("<br>") };
    }
    return { fs: 7, html: esc(String(t).toUpperCase()) };
  }
  function clueText(cw, wi) { var w = cw.words[wi]; return w.pat || (cw.lang === "de" ? w.dc : w.c); }
  function renderCW(cw) {
    var sz = Math.min(50, Math.floor(354 / cw.cols)), sel = cw.sel != null ? cwCells(cw.words[cw.sel]) : [];
    var h = '<div class="cwtop"><div class="seg sm"><button data-cwl="de" class="' + (cw.lang === "de" ? "on" : "") + '">İpucu: Almanca</button><button data-cwl="tr" class="' + (cw.lang === "tr" ? "on" : "") + '">Türkçe</button></div></div>';
    h += '<div class="sw" style="grid-template-columns:repeat(' + cw.cols + "," + sz + "px);grid-auto-rows:" + sz + "px;--fs:" + Math.max(8, Math.round(sz / 5.2)) + 'px">';
    for (var r = 0; r < cw.rows; r++) for (var c = 0; c < cw.cols; c++) {
      var key = r + "_" + c, m = cw.cells[key];
      if (!m) { h += '<span class="sc"></span>'; continue; }
      if (m.t === "C") {
        var parts = [];
        if (m.h != null) parts.push([m.h, "h"]);
        if (m.v != null) parts.push([m.v, "v"]);
        h += '<div class="sc' + (parts.length > 1 ? " two" : "") + '">' + parts.map(function (p) { var w = cw.words[p[0]]; var fc = fitClue(clueText(cw, p[0]), sz, parts.length > 1 ? sz / 2 : sz); return '<button data-cwc="' + p[0] + '" class="' + p[1] + (w.solved ? " ok" : "") + (cw.sel === p[0] ? " on" : "") + '"><span style="font-size:' + fc.fs + 'px">' + fc.html + "</span></button>"; }).join("") + "</div>";
      } else {
        var shown = cw.fill[key] || cw.done, solved = m.ws.some(function (i) { return cw.words[i].solved; });
        h += '<button class="sl' + (sel.indexOf(key) >= 0 ? " sel" : "") + (shown ? " t" : "") + (solved ? " ok" : "") + (cw.done && !cw.fill[key] ? " rv" : "") + '" data-cwc="' + m.ws[0] + '" style="font-size:' + Math.round(sz * 0.55) + 'px">' + (shown ? m.ch : "") + "</button>";
      }
    }
    h += "</div>";
    if (cw.sel != null) { var w = cw.words[cw.sel]; h += '<p class="cwsel"><b>' + (w.d ? "↓ " : "→ ") + esc(w.pat ? w.pat : cw.lang === "de" ? w.dc : w.c) + "</b> · " + w.w.length + " harf · " + (w.pat ? '<span class="muted">boşluğu doldur (' + esc(w.c) + ")</span>" : cw.lang === "de" ? '<span class="muted">' + esc(w.c) + "</span>" : "") + "</p>"; }
    else if (!cw.done) h += '<p class="muted small center">Bir ipucu kutusuna dokun.</p>';
    else { h += '<div class="cwdone">' + cw.words.map(function (w) { return "<p><b>" + esc(w.a !== "-" ? w.a + " " : "") + esc(w.src.charAt(0) + w.src.slice(1).toLowerCase()) + "</b> · " + esc(w.c) + (w.solved ? "" : ' <span class="muted">(açıldı)</span>') + "</p>"; }).join("") + "</div>"; }
    return h;
  }
  function cwFoot(cw) {
    if (cw.done) return '<button class="btn wide" data-act="gfinish">Sonucu kaydet</button>';
    var rk = cw.sel != null ? '<div class="rack">' + cw.rack.map(function (t, i) { return '<button data-rk="' + i + '"' + (t.used ? ' class="u" disabled' : "") + ">" + t.ch + "</button>"; }).join("") + "</div>" : "";
    return '<div class="cwf">' + rk + '<div class="row2"><button class="btn sm ghost" data-act="cwend">Bitir</button><span style="flex:1"></span><button class="btn sm ghost" data-act="cwrev"' + (cw.sel == null ? " disabled" : "") + ">" + ic("bulb") + "Harf aç</button></div></div>";
  }

  /* ---------- oyun oturumu ---------- */
  var G = null;
  var GINFO = { satz: ["Satzbau", "chat", "#d1495b", "Almanca cümleyi doğru sıraya diz"], sql: ["Sorgu yapbozu", "db", "#1f8a83", "Parçalardan doğru sorguyu kur"], cw: ["Schwedenrätsel", "pivot", "#3f6fd8", "Gazete bulmacası, iş kelimeleriyle"], pq: ["Power Query", "fx", "#7a4fc9", "Dokunarak sorgu kur, M kodunu gör"], wort: ["Wortschatz", "book", "#c2410c", "İş kelimeleri: anlamını seç, örnekle öğren"] };
  /* ---------- Wortschatz (kelime kartları) ---------- */
  function mkWQ(it) {
    var bank = GM.wort || [], dir = Math.random() < 0.5 ? "de" : "tr", same = bank.filter(function (x) { return x.t === it.t && x.id !== it.id; });
    if (same.length < 3) same = bank.filter(function (x) { return x.id !== it.id; });
    var f = dir === "de" ? "tr" : "w", right = it[f], wr = shuffle(same).map(function (x) { return x[f]; }).filter(function (x, i, a) { return x !== right && a.indexOf(x) === i; }).slice(0, 3);
    var base = [right].concat(wr), ord = balancedOrder(base.length, 0), o = ord.map(function (i) { return base[i]; });
    return { it: it, dir: dir, o: o, a: o.indexOf(right), v: null };
  }
  function renderWQ(q) {
    var it = q.it, T = window.WORT_TOPICS || {}, h = "<p class=\"sp\">" + esc(T[it.t] || "") + " · " + (q.dir === "de" ? "Bu ne demek?" : "Almancası hangisi?") + "</p><h2>" + esc(q.dir === "de" ? it.w : it.tr) + "</h2>";
    h += '<div class="opts">' + q.o.map(function (o, k) { var c = q.v == null ? "" : k === q.a ? "right" : k === q.v ? "wrong" : "dim"; return '<button data-wa="' + k + '" class="' + c + '"' + (q.v != null ? " disabled" : "") + "><span>" + String.fromCharCode(65 + k) + "</span>" + esc(o) + "</button>"; }).join("") + "</div>";
    if (q.v != null) h += '<div class="expl ' + (q.v === q.a ? "ok" : "no") + '"><b>' + esc(it.w) + " = " + esc(it.tr) + "</b><br>„" + esc(it.ex) + "”<br><i>" + esc(it.ext) + "</i></div>";
    return h;
  }
  function wFoot(q) {
    if (q.v == null) return '<button class="btn wide ghost" data-act="wskip">Bilmiyorum, göster</button>';
    return '<button class="btn wide" data-act="gnext">' + (G.ix === G.items.length - 1 ? "Sonuç" : "Sonraki") + ic("arrow") + "</button>";
  }
  function wAnswer(k) { var q = G.wq; if (q.v != null) return; q.v = k; var p = k === q.a ? 1 : 0; G.pts.push(p); gUpdate("wort", q.it.id, p); drawGame(); }
  function openGame(kind) {
    if (kind === "pq") {
      if (!window.PQSIM) return toast("Simülatör yüklenemedi");
      return window.PQSIM.open(function (sc, tot, min) { S.gplay.push({ date: TODAY, g: "pq", sc: sc, tot: tot, min: min }); save(); render(); });
    }
    G = { kind: kind, ix: 0, t0: Date.now(), pts: [] };
    if (kind === "cw") { G.cw = newCW(); }
    else if (kind === "wort") { G.items = pickItems("wort", GM.wort || [], 10); G.wq = mkWQ(G.items[0]); }
    else { G.items = pickItems(kind, GM[kind], kind === "satz" ? 6 : 4); OP = mkOP(G.items[0], kind); }
    drawGame();
  }
  function drawGame() {
    var inf = GINFO[G.kind], el = document.getElementById("player");
    if (!el) { el = document.createElement("div"); el.id = "player"; document.body.appendChild(el); }
    el.style.setProperty("--c", inf[2]); document.body.classList.add("noscroll");
    var tot = G.kind === "cw" ? G.cw.words.length : G.items.length, pos = G.kind === "cw" ? G.cw.words.filter(function (w) { return w.solved; }).length : G.ix;
    var h = '<div class="pl-top"><button data-act="gclose" aria-label="Kapat">' + ic("x") + '</button><div class="pbar"><i style="width:' + (G.res ? 100 : pos / tot * 100) + '%"></i></div><small>' + (G.res ? "Sonuç" : G.kind === "cw" ? pos + "/" + tot : (G.ix + 1) + "/" + tot) + '</small></div><div class="pl-body"><div class="slide"><span class="tag">' + ic(inf[1]) + inf[0] + "</span>";
    var foot = "";
    if (G.res) {
      var sc = G.pts.reduce(function (a, b) { return a + b; }, 0), pct = sc / Math.max(1, G.pts.length);
      h += '<div class="result">' + ring(pct, pct >= 0.8 ? "#2e9e6a" : "#e3a018", 130, Math.round(pct * 100) + "%") + "<h2>" + (pct >= 0.8 ? "Harika" : pct >= 0.5 ? "İyi gidiyor" : "Tekrar edelim") + "</h2><p>" + (Math.round(sc * 10) / 10) + "/" + G.pts.length + " puan · " + Math.max(1, Math.round((Date.now() - G.t0) / 60000)) + " dk. Zorlandığın öğeler yakında yine karşına çıkacak.</p></div>";
      foot = '<button class="btn ghost" data-act="gclose">Kapat</button><button class="btn" data-act="gagain">Bir tur daha</button>';
    } else if (G.kind === "cw") { h += renderCW(G.cw); foot = cwFoot(G.cw); }
    else if (G.kind === "wort") { h += renderWQ(G.wq); foot = wFoot(G.wq); }
    else { h += renderOP(OP); foot = opFoot(OP, "gnext", G.ix === G.items.length - 1 ? "Sonuç" : "Sonraki"); }
    h += '</div></div><div class="pl-foot">' + foot + "</div>";
    var key = G.kind + ":" + (G.res ? "r" : G.ix);
    el.classList.toggle("noanim", el.dataset.k === key); el.dataset.k = key;
    var keep = el.classList.contains("noanim") ? (el.querySelector(".pl-body") || {}).scrollTop : 0;
    el.innerHTML = h;
    el.querySelector(".pl-body").scrollTop = keep || 0;
    var inp = document.getElementById("cwi"); if (inp) inp.focus();
  }
  function finishGame() {
    if (G.kind === "cw") G.cw.words.forEach(function (w) { var p = w.solved ? (w.miss || w.hint ? 0.5 : 1) : 0; G.pts.push(p); if (w.full) gUpdate("cw", w.id, p); });
    var sc = G.pts.reduce(function (a, b) { return a + b; }, 0);
    S.gplay.push({ date: TODAY, g: G.kind, sc: Math.round(sc * 10) / 10, tot: G.pts.length, min: Math.max(1, Math.round((Date.now() - G.t0) / 60000)) });
    G.res = true; save(); drawGame();
  }
  function closeGame() { var el = document.getElementById("player"); if (el) el.remove(); document.body.classList.remove("noscroll"); G = null; OP = null; render(); }
  function gamesCard() {
    return '<h2 class="sec">Oyun köşesi</h2><div class="games">' + Object.keys(GINFO).map(function (k) {
      var inf = GINFO[k], pl = S.gplay.filter(function (x) { return x.g === k; }), last = pl[pl.length - 1];
      return '<button class="gtile" data-game="' + k + '" style="--c:' + inf[2] + '">' + ic(inf[1], "big") + "<b>" + inf[0] + "</b><small>" + inf[3] + "</small><em>" + (last ? pl.length + " tur · son %" + Math.round(last.sc / Math.max(1, last.tot) * 100) : "Yeni") + "</em></button>";
    }).join("") + "</div>";
  }

  /* ---------- derste ara kontrol ---------- */
  function genCheck(s) {
    if (!s) return null;
    var q = null, o = [], a = 0;
    function mk(qt, right, wrongs) { wrongs = shuffle(wrongs.filter(function (x, i, arr) { return x && x !== right && arr.indexOf(x) === i; })).slice(0, 3); if (!wrongs.length) return null; o = shuffle([right].concat(wrongs)); return { q: qt, o: o, a: o.indexOf(right), e: "Az önceki slayttan." }; }
    if (s.t === "phrases" && s.items.length >= 3) { var p = s.items[Math.floor(Math.random() * s.items.length)]; return mk("„" + p[0] + "” ne demek?", p[1], s.items.map(function (x) { return x[1]; })); }
    if (s.t === "table" && s.rows.length >= 3 && s.head.length >= 2) { var r = s.rows[Math.floor(Math.random() * s.rows.length)]; return mk(s.head[0] + ": „" + r[0] + "” → " + s.head[1] + "?", r[1], s.rows.map(function (x) { return x[1]; })); }
    if (s.t === "flow" && s.steps.length >= 3) { var k = 1 + Math.floor(Math.random() * (s.steps.length - 1)); return mk("„" + s.steps[k - 1][0] + "” adımından sonra hangisi gelir?", s.steps[k][0], s.steps.map(function (x) { return x[0]; })); }
    if (s.t === "compare") return mk("Hangisi önerilen kullanım?", s.good[1], [s.bad[1]]);
    if (s.t === "cards" && s.items.length >= 3) { var cs = s.items.filter(function (x) { return x[2]; }); if (cs.length >= 3) { var cd = cs[Math.floor(Math.random() * cs.length)]; return mk("„" + cd[2] + "” hangisine ait?", cd[1], cs.map(function (x) { return x[1]; })); } }
    if (s.t === "formula" && s.parts.length >= 3) { var fp = s.parts[Math.floor(Math.random() * s.parts.length)]; return mk("„" + fp[1] + "” hangi parça?", fp[0], s.parts.map(function (x) { return x[0]; })); }
    if (s.t === "bars" && s.items.length >= 3) { var mx = s.items.slice().sort(function (x, y) { return y[1] - x[1]; })[0]; return mk("Grafikte en yüksek değer hangisindeydi?", mx[0], s.items.map(function (x) { return x[0]; })); }
    return q;
  }

  /* ---------- uyku öncesi hikâyeler (sesli okuma) ---------- */
  var ST = null, listenMode = "pod";
  function deVoice() {
    var vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [], de = vs.filter(function (v) { return /^de/i.test(v.lang); });
    var pref = ["Anna", "Helena", "Petra", "Markus", "Yannick", "Martin"];
    for (var i = 0; i < pref.length; i++) for (var j = 0; j < de.length; j++) if (de[j].name.indexOf(pref[i]) >= 0) return de[j];
    return de[0] || null;
  }
  function vStories() {
    var h = '<section class="card"><h3>Uyku öncesi hikâyeler</h3><p>Sakin anlatılan, duygular ve gündelik hayat üzerine Almanca hikâyeler. Yatmadan önce 20–30 dakika dinle; zamanlayıcı dolunca okuma kendiliğinden durur.</p></section>';
    (window.STORIES || []).forEach(function (s, i) {
      var dn = (S.stories || {})[s.id];
      h += '<button class="story" data-story="' + i + '"><span class="snum">' + (i + 1) + '</span><span class="si"><b>' + esc(s.title) + "</b><small>" + esc(s.tr) + " · " + esc(s.mood) + " · " + s.s.length + " cümle</small></span>" + (dn ? ic("check") : ic("play")) + "</button>";
    });
    h += '<p class="muted small">Hikâyeler telefonun Almanca sesiyle okunur. Ekran kilitlenince okuma durabilir; bu yüzden okurken ekran açık kalır, istersen <b>Karanlık ekran</b>la karartabilirsin. Kilit ekranında dinlemek istersen Podcast sekmesindeki <b>Uyku</b> bölümünü zamanlayıcıyla kullan.</p>';
    return h;
  }
  function openStory(ix) {
    ST = { ix: ix, si: 0, playing: false, tr: S.storyTr !== false, rate: S.storyRate || 0.85, tmi: 0, end: 0, dark: false };
    drawStory();
  }
  function drawStory() {
    var s = STORIES[ST.ix], el = document.getElementById("player");
    if (!el) { el = document.createElement("div"); el.id = "player"; document.body.appendChild(el); }
    el.style.setProperty("--c", "#3b2a57"); document.body.classList.add("noscroll");
    el.classList.toggle("dark", ST.dark);
    var left = ST.end ? Math.max(0, Math.round((ST.end - Date.now()) / 60000)) : 0;
    var h = '<div class="pl-top"><button data-act="stclose" aria-label="Kapat">' + ic("x") + '</button><b class="rt-t">' + esc(s.title) + '</b><button class="stbtn" data-act="stdark">' + (ST.dark ? "Aydınlık" : "Karanlık ekran") + '</button></div><div class="pl-body reader" id="stbody">';
    if (!ST.dark) h += '<span class="tag">' + ic("book") + esc(s.tr) + " · " + esc(s.mood) + "</span>";
    h += '<div class="sts">' + s.s.map(function (x, i) { return '<p class="stl' + (i === ST.si && ST.playing ? " on" : "") + '" data-sts="' + i + '" id="stl' + i + '"><span>' + esc(x[0]) + "</span>" + (ST.tr && !ST.dark ? "<small>" + esc(x[1]) + "</small>" : "") + "</p>"; }).join("") + "</div>";
    if (!ST.dark) h += '<h4 class="cwh">Önemli kelimeler</h4><div class="v-phr">' + s.v.map(function (v) { return "<li><b>" + esc(v[0]) + "</b><small>" + esc(v[1]) + "</small></li>"; }).join("") + "</div>";
    h += '</div><div class="pl-foot stfoot">' +
      '<button class="btn sm ghost" data-act="strate">' + String(ST.rate).replace(".", ",") + "×</button>" +
      '<button class="btn sm ghost" data-act="sttimer">' + ic("clock") + (ST.end ? left + " dk" : "Zamanlayıcı") + "</button>" +
      '<button class="btn mpp2" data-act="stplay">' + ic(ST.playing ? "pause" : "play") + "</button>" +
      '<button class="btn sm ghost" data-act="sttr">' + (ST.tr ? "TR gizle" : "TR göster") + "</button></div>";
    el.innerHTML = h;
    var cur = document.getElementById("stl" + ST.si); if (cur && ST.playing) cur.scrollIntoView({ block: "center" });
  }
  var wl = null;
  function stSpeak() {
    if (!ST || !ST.playing) return;
    var s = STORIES[ST.ix];
    if (ST.end && Date.now() > ST.end) { stStop(); ST.end = 0; drawStory(); return; }
    if (ST.si >= s.s.length) {
      S.stories = S.stories || {}; S.stories[s.id] = TODAY; save();
      if (ST.end) { ST.ix = (ST.ix + 1) % STORIES.length; ST.si = 0; drawStory(); setTimeout(stSpeak, 2500); }
      else { ST.playing = false; ST.si = 0; drawStory(); relWL(); }
      return;
    }
    var u = new SpeechSynthesisUtterance(s.s[ST.si][0]), v = deVoice();
    u.lang = "de-DE"; if (v) u.voice = v; u.rate = ST.rate; u.pitch = 1;
    var t0 = Date.now();
    u.onend = function () {
      S.listen[TODAY] = (S.listen[TODAY] || 0) + (Date.now() - t0) / 1000;
      if (!ST || !ST.playing) return;
      ST.si++; drawStory(); setTimeout(stSpeak, 700);
    };
    u.onerror = function () { if (ST) { ST.playing = false; drawStory(); } };
    speechSynthesis.speak(u);
  }
  function relWL() { try { if (wl) wl.release(); } catch (e) {} wl = null; save(); }
  function stStop() { if (window.speechSynthesis) speechSynthesis.cancel(); if (ST) ST.playing = false; relWL(); }
  function stPlay() {
    if (!window.speechSynthesis) { toast("Bu tarayıcı sesli okumayı desteklemiyor"); return; }
    if (ST.playing) { stStop(); drawStory(); return; }
    if (!deVoice()) toast("Almanca ses bulunamadı; Ayarlar → Erişilebilirlik → Seslendirilen İçerik → Sesler → Almanca'dan bir ses indir");
    ST.playing = true; drawStory();
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (x) { wl = x; }).catch(function () {}); } catch (e) {}
    stSpeak();
  }
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = function () {};

  /* ---------- podcast uyku zamanlayıcısı ---------- */
  var sleepEnd = 0, sleepT = null;
  function setSleep(min) {
    clearTimeout(sleepT); sleepEnd = min ? Date.now() + min * 60000 : 0;
    if (min) sleepT = setTimeout(function () { if (AU) AU.pause(); sleepEnd = 0; drawMini(); }, min * 60000);
    drawMini();
  }

  /* ---------- fikir süzgeci ---------- */
  function openIdea() {
    var act = S.projects.filter(function (p) { return p.status === "aktif" && p.cat !== "aile"; });
    var el = document.createElement("div"); el.id = "sheet";
    el.innerHTML = '<div class="sh"><div class="sh-h"><b>Yeni fikir</b><button data-act="closeSheet">' + ic("x") + "</button></div>" +
      '<label>Ne istiyorsun?<input id="i-title" placeholder="örn. yeni bir oyun, Python öğrenmek…"></label>' +
      '<label>Türü<select id="i-kind"><option value="proje">Proje</option><option value="ogrenme">Öğrenme konusu</option><option value="is">İş / gelir fikri</option></select></label>' +
      '<label>Hangi hedefine hizmet ediyor?<select id="i-goal"><option value="kariyer">Kariyer adımı</option><option value="gelir">Ek gelir</option><option value="beceri">Programdaki bir beceri (Almanca, SQL, Power BI, pazarlama)</option><option value="aile">Aile</option><option value="keyif">Hiçbiri, sadece keyif</option></select></label>' +
      '<label>Haftada ne kadar zaman alır?<select id="i-hours"><option value="0">1 saatten az</option><option value="1">1–3 saat</option><option value="2">3 saatten fazla</option></select></label>' +
      '<label>Şu an ' + act.length + ' aktif işin var. Bunun için hangisini park edersin?<select id="i-drop"><option value="">Hiçbirini</option>' + act.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + "</option>"; }).join("") + "</select></label>" +
      '<label>3 ay sonra ölçülebilir sonucu ne olur?<textarea id="i-result" rows="2" placeholder="örn. 3 kulüp test ediyor, ayda 200 € gelir"></textarea></label>' +
      '<button class="btn wide" data-act="judge">Değerlendir</button><div id="verdict"></div></div>';
    document.body.appendChild(el); document.body.classList.add("noscroll");
  }
  var lastIdea = null;
  function judge() {
    var t = val("i-title").trim(); if (!t) { toast("Önce fikrin adını yaz"); return; }
    var kind = val("i-kind"), goal = val("i-goal"), hours = +val("i-hours"), drop = val("i-drop"), res = val("i-result").trim();
    var act = S.projects.filter(function (p) { return p.status === "aktif" && p.cat !== "aile"; }).length;
    var why = [], v;
    if (goal === "keyif") why.push("Hiçbir hedefine hizmet etmiyor. Keyif önemli, ama hedef yolunda zaman çalar.");
    else why.push("Hedefine bağlanıyor: " + ({ kariyer: "kariyer adımı", gelir: "ek gelir", beceri: "programdaki beceriler", aile: "aile" })[goal] + ".");
    if (hours === 2) why.push("Haftada 3 saatten fazla istiyor; bu, akşam derslerinle doğrudan yarışır.");
    if (res.length < 8) why.push("Ölçülebilir bir 3 aylık sonuç yazmadın. Sonucu tanımlanmayan işler genelde yarım kalır.");
    else why.push("Somut bir sonuç tanımladın: \"" + res + "\".");
    if (act >= 3 && !drop && goal !== "aile") why.push("Zaten " + act + " aktif işin var ve hiçbirini bırakmıyorsun.");
    if (goal === "aile") v = "ekle";
    else if (goal === "keyif") v = hours === 0 ? "ekle-hobi" : "park";
    else if (act >= 3 && !drop) v = "once-birak";
    else if (res.length < 8) v = "netlestir";
    else v = "ekle";
    if (kind === "ogrenme" && v === "ekle") v = "ogrenme";
    var T = {
      "ekle": ["Uygun", "Ekleyebilirsin. " + (drop ? "Seçtiğin iş park edilecek." : ""), "ok"],
      "ekle-hobi": ["Küçük hobi olarak olur", "Haftada 1 saatten az; hedef yolunu tıkamaz. Hobi olarak ekleniyor.", "ok"],
      "park": ["Otoparka", "Şimdilik park et. Bir ara hedefe ulaştığında ödül olarak geri al.", "mid"],
      "once-birak": ["Önce birini bırak", "Yeni bir şey eklemeden önce aktif işlerinden birini park et ya da bitir.", "no"],
      "netlestir": ["Önce netleştir", "3 ay sonra neyin değişmiş olacağını tek cümleyle yaz, sonra tekrar değerlendir.", "mid"],
      "ogrenme": ["Programa aday", "Öğrenme konusu olarak kaydedildi. Bana söylersen uygun bir alana modül olarak eklerim.", "ok"]
    }[v];
    lastIdea = { title: t, kind: kind, goal: goal, drop: drop, v: v, res: res };
    document.getElementById("verdict").innerHTML = '<div class="verdict ' + T[2] + '"><b>' + T[0] + "</b><p>" + esc(T[1]) + "</p><ul>" + why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul>" +
      (v === "ekle" || v === "ekle-hobi" || v === "park" || v === "ogrenme" ? '<button class="btn wide" data-act="applyIdea">' + (v === "park" ? "Otoparka kaydet" : v === "ogrenme" ? "Kaydet" : "Ekle") + "</button>" : '<button class="btn wide ghost" data-act="logIdea">Sadece kaydet</button>') + "</div>";
  }
  function applyIdea(onlyLog) {
    var I = lastIdea; if (!I) return;
    var verdictTxt = { ekle: "eklendi", "ekle-hobi": "hobi olarak eklendi", park: "otoparka", "once-birak": "önce birini bırak", netlestir: "netleştirilecek", ogrenme: "öğrenme listesi" }[I.v];
    S.ideas.push({ date: TODAY, title: I.title, verdict: verdictTxt, res: I.res });
    if (!onlyLog && I.v !== "ogrenme") {
      if (I.drop) S.projects.forEach(function (p) { if (p.id === I.drop) p.status = "park"; });
      var cat = I.goal === "kariyer" ? "kariyer" : I.goal === "gelir" ? "gelir" : I.goal === "aile" ? "aile" : I.goal === "beceri" ? "is" : "hobi";
      S.projects.push({ id: "p" + Date.now(), name: I.title, cat: cat, status: I.v === "park" ? "park" : "aktif", next: I.res });
    }
    save(); closeSheet(); toast("Kaydedildi"); if (view === "proj") render();
  }
  function closeSheet() { var el = document.getElementById("sheet"); if (el) el.remove(); document.body.classList.remove("noscroll"); }
  function editProject(id) {
    var p = S.projects.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    var el = document.createElement("div"); el.id = "sheet";
    el.innerHTML = '<div class="sh"><div class="sh-h"><b>Projeyi düzenle</b><button data-act="closeSheet">' + ic("x") + '</button></div><label>Ad<input id="e-name" value="' + esc(p.name) + '"></label><label>Kategori<select id="e-cat">' + Object.keys(CAT).map(function (k) { return '<option value="' + k + '"' + (p.cat === k ? " selected" : "") + ">" + CAT[k] + "</option>"; }).join("") + '</select></label><label>Sıradaki adım<textarea id="e-next" rows="2">' + esc(p.next) + '</textarea></label><button class="btn wide" data-act="saveProj" data-id="' + id + '">Kaydet</button><button class="btn wide ghost danger" data-act="delProj" data-id="' + id + '">Sil</button></div>';
    document.body.appendChild(el); document.body.classList.add("noscroll");
  }
  function val(id) { var e = document.getElementById(id); return e ? e.value : ""; }

  /* ---------- olaylar ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-go],[data-lesson],[data-act],[data-ans],[data-rate],[data-ep],[data-pc],[data-note],[data-sec],[data-nm],[data-bi],[data-game],[data-opp],[data-opu],[data-cwc],[data-cwl],[data-rk],[data-track],[data-cal],[data-day],[data-nf],[data-ps],[data-pe],[data-read],[data-wa],[data-lm],[data-story],[data-sts],[data-mk]");
    if (!b) { if (e.target.id === "sheet") closeSheet(); return; }
    var d = b.dataset;
    if (d.read) { S.read[d.read] = TODAY; save(); return; }
    if (d.go) return go(d.go);
    if (d.lesson) return openLesson(d.lesson);
    if (d.mk) { var mk = d.mk.split("|"); return openLesson(mk[1], mk[0]); }
    if (d.track) { view = "road"; render(); var t = document.getElementById("t-" + d.track); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
    if (d.cal) { var y = +calMonth.slice(0, 4), m = +calMonth.slice(5, 7) - 1 + (+d.cal); var nd = new Date(y, m, 1); calMonth = iso(nd).slice(0, 7); return render(); }
    if (d.day) return dayDetail(d.day);
    if (d.nf) { newsFilter = d.nf; return render(); }
    if (d.ps) { var a = d.ps.split(":"); S.projects.forEach(function (p) { if (p.id === a[0]) p.status = a[1]; }); save(); return render(); }
    if (d.pe) return editProject(d.pe);
    if (d.ans != null && P) { var c = curQ(), k = +d.ans; if (P.ans[c.key]) return; P.ans[c.key] = { v: k, pts: k === c.it.q.a ? 1 : 0 }; return drawPlayer(); }
    if (d.rate != null && P) { P.ans[curQ().key].pts = +d.rate; return drawPlayer(); }
    if (d.ep) return playEp(d.ep);
    if (d.game) return openGame(d.game);
    if (d.wa != null && G && G.wq) return wAnswer(+d.wa);
    if (d.lm) { listenMode = d.lm; return render(); }
    if (d.story != null) return openStory(+d.story);
    if (d.sts != null && ST) { var was = ST.playing; stStop(); ST.si = +d.sts; if (was) { ST.playing = true; drawStory(); stSpeak(); } else drawStory(); return; }
    if (d.opp != null && OP && OP.res == null) { OP.picked.push(+d.opp); return P ? drawPlayer() : drawGame(); }
    if (d.opu != null && OP && OP.res == null) { OP.picked.splice(+d.opu, 1); return P ? drawPlayer() : drawGame(); }
    if (d.cwl && G && G.kind === "cw") { G.cw.lang = d.cwl; return drawGame(); }
    if (d.rk != null && G && G.kind === "cw" && G.cw.sel != null) {
      var cwr = G.cw, t = cwr.rack[+d.rk], wsel = cwr.words[cwr.sel];
      if (cwPlace(cwr, t.ch)) { t.used = true; if (wsel.solved) { toast("✓ " + (wsel.a !== "-" ? wsel.a + " " : "") + wsel.src.charAt(0) + wsel.src.slice(1).toLowerCase()); cwNextWord(cwr); } }
      else { toast("Bu harf değil"); var bt = b; bt.classList.add("shake"); setTimeout(function () { drawGame(); }, 350); return; }
      return drawGame();
    }
    if (d.cwc != null && G && G.kind === "cw" && !G.cw.done) { var ci = +d.cwc; if (G.cw.words[ci].solved) return; if (G.cw.sel === ci) { var cur = G.cw.words[ci], alt = G.cw.words.findIndex(function (w, j) { return j !== ci && !w.solved && cwCells(w).some(function (k) { return cwCells(cur).indexOf(k) >= 0; }); }); if (alt >= 0) ci = alt; } cwSelect(G.cw, ci); return drawGame(); }
    if (d.note) return openNote(d.note);
    if (d.sec != null) { var se = document.getElementById("ns-" + d.sec); if (se) se.scrollIntoView({ behavior: "smooth" }); return; }
    if (d.nm) { newsMode = d.nm; return render(); }
    if (d.bi != null) { bulIx = +d.bi; return render(); }
    if (d.pc) { podCat = d.pc; return render(); }
    switch (d.act) {
      case "next": if (P.i < P.seq.length - 1) P.i++; else P.phase = "quiz"; return drawPlayer();
      case "opcheck": if (OP) { opCheck(OP); if (G && !P) { G.pts.push(OP.pts); gUpdate(G.kind, OP.item.id, OP.pts); } } return P ? drawPlayer() : drawGame();
      case "ophint": if (OP) opHint(OP); return P ? drawPlayer() : drawGame();
      case "gnext": G.ix++; if (G.ix >= G.items.length) return finishGame(); if (G.kind === "wort") G.wq = mkWQ(G.items[G.ix]); else OP = mkOP(G.items[G.ix], G.kind); return drawGame();
      case "wskip": return wAnswer(-1);
      case "gfinish": return finishGame();
      case "stplay": return stPlay();
      case "stclose": stStop(); ST = null; var pe2 = document.getElementById("player"); if (pe2) pe2.remove(); document.body.classList.remove("noscroll"); return render();
      case "sttr": ST.tr = !ST.tr; S.storyTr = ST.tr; save(); return drawStory();
      case "stdark": ST.dark = !ST.dark; return drawStory();
      case "strate": var rr = [0.7, 0.85, 1], ix2 = rr.indexOf(ST.rate); ST.rate = rr[(ix2 + 1) % rr.length]; S.storyRate = ST.rate; save(); return drawStory();
      case "sttimer": var ts = [0, 15, 30, 45]; ST.tmi = ((ST.tmi || 0) + 1) % ts.length; ST.end = ts[ST.tmi] ? Date.now() + ts[ST.tmi] * 60000 : 0; toast(ST.end ? ts[ST.tmi] + " dakika sonra duracak; hikâyeler arka arkaya okunur" : "Zamanlayıcı kapalı"); return drawStory();
      case "asleep": var tl = [0, 15, 30, 45, 60], cm = sleepEnd ? Math.round((sleepEnd - Date.now()) / 60000) : 0, nm2 = tl.filter(function (m) { return m > cm + 1; })[0] || 0; setSleep(nm2); toast(nm2 ? nm2 + " dakika sonra duracak" : "Uyku zamanlayıcısı kapalı"); return;
      case "gclose": return closeGame();
      case "gagain": var gk = G.kind; return openGame(gk);
      case "cwend": G.cw.done = true; G.cw.sel = null; return drawGame();
      case "cwrev": var cw1 = G.cw; if (cw1.sel == null) return; var w1 = cw1.words[cw1.sel], k1 = cwCells(w1).filter(function (x) { return !cw1.fill[x]; })[0]; if (k1) { cw1.fill[k1] = 1; w1.hint++; cwCheckSolved(cw1); } if (w1.solved) cwNextWord(cw1); else cwSelect(cw1, cw1.sel); return drawGame();
      case "prev": if (P.i > 0) P.i--; return drawPlayer();
      case "nextq":
        if (P.phase === "warm") { if (P.wi < P.warm.length - 1) P.wi++; else P.phase = "slides"; }
        else if (P.qi < P.qs.length - 1) P.qi++; else P.phase = "result";
        return drawPlayer();
      case "wcheck":
        var tx2 = val("wans").trim(); if (!tx2) { toast("Önce cevabını yaz"); return; }
        var cq = curQ(), A2 = { text: tx2, pts: null, lt: cq.it.q.code ? null : "loading" }; P.ans[cq.key] = A2;
        if (cq.it.q.code) A2.pts = wScore(cq.it.q, A2);
        else ltCheck(tx2).then(function (res) { A2.lt = res; if (A2.pts == null) A2.pts = wScore(cq.it.q, A2); if (P && P.ans[cq.key] === A2) drawPlayer(); });
        return drawPlayer();
      case "aback": if (AU) AU.currentTime = Math.max(0, AU.currentTime - 15); return;
      case "afwd": if (AU) AU.currentTime = Math.min(AU.duration || 1e9, AU.currentTime + 30); return;
      case "arate": var rs = [0.8, 1, 1.15, 1.3], ri = rs.indexOf(S.pod.rate || 1); S.pod.rate = rs[(ri + 1) % rs.length]; if (AU) AU.playbackRate = S.pod.rate; save(); return drawMini();
      case "finish": return finishPlayer();
      case "close": return closePlayer();
      case "closeNote": var pe = document.getElementById("player"); if (pe) pe.remove(); document.body.classList.remove("noscroll"); return;
      case "review": return openReview();
      case "idea": return openIdea();
      case "closeSheet": return closeSheet();
      case "judge": return judge();
      case "applyIdea": return applyIdea(false);
      case "logIdea": return applyIdea(true);
      case "saveProj":
        S.projects.forEach(function (p) { if (p.id === d.id) { p.name = val("e-name") || p.name; p.cat = val("e-cat"); p.next = val("e-next"); } });
        save(); closeSheet(); return render();
      case "delProj": S.projects = S.projects.filter(function (p) { return p.id !== d.id; }); save(); closeSheet(); return render();
      case "saveGoal":
        S.goal = val("f-goal"); if (val("f-start")) S.start = val("f-start"); if (val("f-target")) S.target = val("f-target"); save(); toast("Hedef kaydedildi"); return;
      case "saveNotes": S.notes = val("f-notes"); save(); toast("Notlar kaydedildi"); return;
      case "export":
        var code = "GLS1:" + btoa(unescape(encodeURIComponent(JSON.stringify(S))));
        if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { toast("Yedek kodu kopyalandı"); }, function () { prompt("Yedek kodu:", code); });
        else prompt("Yedek kodu:", code);
        return;
      case "import":
        var c = prompt("Yedek kodunu yapıştır:"); if (!c) return;
        try { var o = JSON.parse(decodeURIComponent(escape(atob(c.replace(/^GLS1:/, ""))))); S = o; load2(); save(); toast("Yedek yüklendi"); render(); } catch (err) { toast("Kod okunamadı"); }
        return;
    }
  });
  function load2() { var d = defaults(); Object.keys(d).forEach(function (k) { if (S[k] == null) S[k] = d[k]; }); }
  document.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.id === "cwi") { e.preventDefault(); var b = document.querySelector('[data-act="cwok"]'); if (b) b.click(); } });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.plan != null) { S.plan[t.dataset.plan] = t.value; save(); toast("Plan güncellendi"); }
    if (t.dataset.ms) { S.ms[t.dataset.ms] = t.checked; save(); }
    if (t.dataset.pend) { S.pend[t.dataset.pend] = +t.value || 0; save(); render(); }
  });
  /* kaydırma ile slayt geçişi */
  var tx = null;
  document.addEventListener("touchstart", function (e) { if (P && P.phase === "slides" && P.seq[P.i].k === "s" && e.target.closest(".pl-body")) tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (tx == null || !P) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) < 60 || e.target.closest(".v-tbl,.v-code")) return;
    if (dx < 0) { if (P.i < P.seq.length - 1) P.i++; else P.phase = "quiz"; } else if (P.i > 0) P.i--;
    drawPlayer();
  }, { passive: true });

  var tt;
  function toast(m) { var el = document.getElementById("toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); } el.textContent = m; el.className = "show"; clearTimeout(tt); tt = setTimeout(function () { el.className = ""; }, 2600); }

  load(); render();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
