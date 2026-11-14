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
  var PASS = 0.7;

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
      plan: { 1: "de", 2: "sql", 3: "mkt", 4: "pbi", 5: "car", 6: "weak", 0: "review" },
      sessions: [], best: {}, tasks: {}, wrong: [], ideas: [], read: {},
      projects: JSON.parse(JSON.stringify(window.DEFAULT_PROJECTS)),
      ms: {}, notes: "", pend: { km: 50, days: 4, rate: 0.25, mins: 45 }
    };
  }
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
    var d = defaults();
    if (!S) S = d; else Object.keys(d).forEach(function (k) { if (S[k] == null) S[k] = d[k]; });
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Kaydedilemedi: tarayıcı depolaması kapalı olabilir"); } }

  /* ---------- müfredat yardımcıları ---------- */
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
  function sessionsOn(d) { return S.sessions.filter(function (x) { return x.date === d; }); }
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
    var html = '<header class="top"><div><small>' + GUN[new Date().getDay()] + ", " + fmt(TODAY) + "</small><h1>" + ({ today: "Bugün", road: "Yol haritası", cal: "Takvim", news: "Güncel", proj: "Projeler", me: "Ben" })[view] + '</h1></div><button class="me" data-go="me" aria-label="Ben">' + ic("user") + "</button></header><main>";
    html += ({ today: vToday, road: vRoad, cal: vCal, news: vNews, proj: vProj, me: vMe })[view]();
    html += "</main>" + nav();
    $app.innerHTML = html;
    if (view === "news" && !NEWS) loadNews(render);
  }
  function nav() {
    var items = [["today", "home", "Bugün"], ["road", "map", "Yol"], ["cal", "cal", "Takvim"], ["news", "news", "Güncel"], ["proj", "list", "Projeler"]];
    return '<nav class="tabs">' + items.map(function (x) { return '<button data-go="' + x[0] + '" class="' + (view === x[0] ? "on" : "") + '">' + ic(x[1]) + "<span>" + x[2] + "</span></button>"; }).join("") + "</nav>";
  }

  /* ---------- Bugün ---------- */
  function vToday() {
    var left = days(TODAY, S.target), total = Math.max(1, days(S.start, S.target)), gone = days(S.start, TODAY);
    var h = '<section class="hero"><div class="hero-l"><span class="lbl">Hedefe</span><b class="cnt">' + left + '</b><span class="lbl">gün</span></div>' +
      '<div class="hero-r"><p>' + esc(S.goal) + '</p><div class="tl"><i style="width:' + Math.min(100, Math.max(2, gone / total * 100)) + '%"></i></div><small>' + fmt(S.target) + "</small></div></section>";
    h += '<div class="chips"><span class="chip">' + ic("fire") + streak() + " gün seri</span><span class=\"chip\">" + ic("clock") + Math.round(totalMin() / 60 * 10) / 10 + " saat</span><span class=\"chip\">" + ic("check") + Object.keys(S.best).filter(done).length + " ders</span></div>";

    var tp = todayPlan(), todayDone = sessionsOn(TODAY).some(function (s) { return s.pass; });
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

    var f = focusTrack();
    if (f && f.s.behind > 0) {
      h += '<section class="card focus" style="--c:' + f.t.color + '"><div class="row">' + ic("compass", "big") + "<div><h3>Odak önerisi: " + esc(f.t.name) + "</h3><p>Bu alanda plana göre " + f.s.behind + " ders gerideysin" + (f.s.avg != null ? ", test ortalaman %" + Math.round(f.s.avg * 100) : "") + ". Cumartesi dersi otomatik olarak buraya gelir.</p></div></div></section>";
    }

    h += '<h2 class="sec">Bu hafta</h2>' + weekStrip();
    h += '<h2 class="sec">Alanlar</h2><div class="rings">' + TR.map(function (t) {
      var s = trackStats(t.id);
      return '<button class="rg" data-track="' + t.id + '">' + ring(s.pct, t.color, 62, s.done + "/" + s.avail) + "<span>" + esc(t.short) + "</span></button>";
    }).join("") + "</div>";

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
    var n = S.wrong.length;
    if (!n) {
      var f = focusTrack();
      return '<section class="card"><h3>Tekrar günü</h3><p>Tekrar havuzun boş, yanlışın yok. İstersen haftanın dersini öne alabilirsin.</p>' + (f ? '<button class="btn ghost" data-lesson="' + f.n.lesson.id + '">' + esc(f.t.short) + ": " + esc(f.n.lesson.title) + "</button>" : "") + "</section>";
    }
    return '<section class="card lesson" style="--c:#4b5563"><span class="tag">' + ic("refresh") + "Tekrar</span><h3>Yanlış yaptığın " + Math.min(n, 8) + " soru</h3><p>Doğru cevapladığın soru havuzdan çıkar. Havuzda " + n + ' soru var.</p><button class="btn" data-act="review">' + ic("play") + "Başla</button></section>";
  }
  function weekStrip() {
    var d = parse(TODAY), dow = (d.getDay() + 6) % 7, mon = addDays(TODAY, -dow), out = '<div class="week">';
    for (var i = 0; i < 7; i++) {
      var ds = addDays(mon, i), p = planFor(ds), ss = sessionsOn(ds), st = ss.some(function (s) { return s.pass; }) ? "done" : ss.length ? "part" : (ds < TODAY && ds >= S.start && p !== "review" && p !== "off") ? "miss" : "";
      var col = TRK[p] ? TRK[p].color : "#8a8f98";
      out += '<div class="wd ' + st + (ds === TODAY ? " now" : "") + '" style="--c:' + col + '"><small>' + GUNK[parse(ds).getDay()] + '</small><span class="dot">' + (st === "done" ? ic("check") : ic(TRK[p] ? TRK[p].icon : p === "review" ? "refresh" : "compass")) + "</span><em>" + esc(TRK[p] ? TRK[p].short : planLabel(p)) + "</em></div>";
    }
    return out + "</div>";
  }

  /* ---------- Yol haritası ---------- */
  function vRoad() {
    var start = S.start, end = S.target, tot = Math.max(1, days(start, end)), now = Math.min(1, Math.max(0, days(start, TODAY) / tot));
    var h = '<section class="card"><h3>Hedefe giden yol</h3><p>Ara hedefler tarih sırasıyla. Tamamladıklarını Ben sekmesinde işaretleyebilirsin.</p><div class="road">';
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
      h += '<section class="card track" id="t-' + t.id + '" style="--c:' + t.color + '"><div class="row">' + ring(s.pct, t.color, 54, Math.round(s.pct * 100) + "%") + "<div><h3>" + esc(t.name) + "</h3><p>" + s.done + "/" + s.avail + " ders" + (s.avg != null ? " · ortalama %" + Math.round(s.avg * 100) : "") + "</p></div></div>";
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
      if (ss.some(function (s) { return s.pass; })) st = "done"; else if (ss.length) st = "part";
      else if (ds < TODAY && ds >= S.start && p !== "review" && p !== "off") st = "miss";
      else if (ds >= TODAY) st = "plan";
      if (cnt[st] != null) cnt[st]++;
      var col = ss.length ? TRK[ss[0].tr] && TRK[ss[0].tr].color : TRK[p] ? TRK[p].color : "#8a8f98";
      h += '<button class="cd ' + st + (ds === TODAY ? " now" : "") + (ds === S.target ? " tgt" : "") + '" data-day="' + ds + '" style="--c:' + (col || "#8a8f98") + '"><span>' + d + "</span>" + (msMap[ds] || ds === S.target ? ic("flag", "mf") : "") + "</button>";
    }
    h += '</div><div class="legend"><span><i class="done"></i>Tamam</span><span><i class="part"></i>Yarım</span><span><i class="miss"></i>Kaçtı</span><span><i class="plan"></i>Plan</span><span>' + ic("flag") + "Hedef</span></div></section>";
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
    if (!ss.length) h += "<p>Bu gün kayıt yok.</p>";
    ss.forEach(function (s) { var L = LES[s.lid]; h += '<p class="sd"><span style="color:' + (TRK[s.tr] ? TRK[s.tr].color : "#555") + '">●</span> ' + esc(L ? L.l.title : "Tekrar") + " · " + s.sc + "/" + s.tot + (s.pass ? " ✓" : " (tekrar gerekli)") + "</p>"; });
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
    var h = '<div class="filters">' + NEWSCAT.map(function (c) { return '<button data-nf="' + c[0] + '" class="' + (newsFilter === c[0] ? "on" : "") + '">' + c[1] + "</button>"; }).join("") + "</div>";
    if (!NEWS) return h + '<p class="muted center">Yükleniyor…</p>';
    var items = NEWS.items.filter(function (x) { return newsFilter === "all" || x.tr === newsFilter; });
    h += '<p class="muted small">' + (NEWS.updated ? "Son güncelleme: " + esc(NEWS.updated) + " · her sabah otomatik yenilenir" : NEWS.offline ? "Çevrimdışısın; liste yüklenemedi." : "Liste henüz oluşturulmadı. İlk otomatik güncellemeden sonra burada olacak.") + "</p>";
    if (!items.length) h += '<section class="card"><p>Bu kategoride şu an yazı yok.</p></section>';
    items.forEach(function (x) {
      var col = TRK[x.tr] ? TRK[x.tr].color : x.tr === "ki" ? "#0f766e" : x.tr === "ctl" ? "#475569" : "#b45309", rd = S.read[x.l];
      h += '<article class="news ' + (rd ? "rd" : "") + '" style="--c:' + col + '"><div class="nh"><span class="tag">' + esc(catName(x.tr)) + "</span><small>" + esc(x.s || "") + (x.d ? " · " + esc(x.d) : "") + '</small></div><a href="' + esc(x.l) + '" target="_blank" rel="noopener" data-read="' + esc(x.l) + '"><h3>' + esc(x.t) + "</h3></a>" + (x.x ? "<p>" + esc(x.x) + "</p>" : "") +
        '<div class="na"><a class="btn sm ghost" href="' + esc(x.l) + '" target="_blank" rel="noopener" data-read="' + esc(x.l) + '">' + ic("ext") + "Oku</a>" + (rd ? '<span class="muted small">' + ic("check") + "okundu</span>" : "") + "</div></article>";
    });
    h += '<h2 class="sec">Kalıcı kaynaklar</h2>';
    TR.forEach(function (t) { (window.CLASSICS[t.id] || []).forEach(function (c) { h += '<a class="cl1" style="--c:' + t.color + '" href="' + esc(c[2]) + '" target="_blank" rel="noopener"><span class="tag">' + esc(t.short) + "</span><b>" + esc(c[0]) + "</b><small>" + esc(c[1]) + "</small></a>"; }); });
    return h;
  }
  function catName(c) { for (var i = 0; i < NEWSCAT.length; i++) if (NEWSCAT[i][0] === c) return NEWSCAT[i][1]; return c; }
  function newsTeaser(tid) {
    if (!NEWS) { loadNews(function () { if (view === "today") { var el = document.getElementById("nteaser"); if (el) el.outerHTML = newsTeaser(tid); } }); return '<div id="nteaser"></div>'; }
    var it = NEWS.items.filter(function (x) { return !S.read[x.l] && (x.tr === tid || x.tr === "ki"); })[0] || NEWS.items.filter(function (x) { return !S.read[x.l]; })[0];
    if (!it) return '<div id="nteaser"></div>';
    return '<div id="nteaser"><h2 class="sec">Bugün okumaya değer</h2><a class="cl1" style="--c:' + (TRK[it.tr] ? TRK[it.tr].color : "#0f766e") + '" href="' + esc(it.l) + '" target="_blank" rel="noopener" data-read="' + esc(it.l) + '"><span class="tag">' + esc(catName(it.tr)) + "</span><b>" + esc(it.t) + "</b><small>" + esc(it.s || "") + "</small></a></div>";
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

  /* ---------- ders oynatıcı ---------- */
  var P = null;
  function openLesson(lid) {
    var L = LES[lid]; if (!L) return;
    P = { kind: "lesson", lid: lid, tr: L.tr, l: L.l, i: 0, phase: "slides", qi: 0, score: 0, answers: [], t0: Date.now(), qs: L.l.quiz.map(function (q, k) { return { q: q, id: lid + "#" + k }; }) };
    drawPlayer();
  }
  function openReview() {
    var pool = S.wrong.slice(0, 8).map(function (id) { var p = id.split("#"), L = LES[p[0]]; return L ? { q: L.l.quiz[+p[1]], id: id, tr: L.tr } : null; }).filter(Boolean);
    if (!pool.length) return;
    P = { kind: "review", lid: null, tr: "review", l: { title: "Tekrar", slides: [] }, i: 0, phase: "quiz", qi: 0, score: 0, answers: [], t0: Date.now(), qs: pool };
    drawPlayer();
  }
  function drawPlayer() {
    var col = TRK[P.tr] ? TRK[P.tr].color : "#4b5563", el = document.getElementById("player");
    if (!el) { el = document.createElement("div"); el.id = "player"; document.body.appendChild(el); }
    el.style.setProperty("--c", col);
    document.body.classList.add("noscroll");
    var nS = P.l.slides.length, nQ = P.qs.length, pos = P.phase === "slides" ? P.i : P.phase === "quiz" ? nS + P.qi : nS + nQ, prog = pos / (nS + nQ);
    var h = '<div class="pl-top" style="--c:' + col + '"><button data-act="close" aria-label="Kapat">' + ic("x") + '</button><div class="pbar"><i style="width:' + prog * 100 + '%"></i></div><small>' + (P.phase === "slides" ? (P.i + 1) + "/" + nS : P.phase === "quiz" ? "Soru " + (P.qi + 1) + "/" + nQ : "Sonuç") + "</small></div>";
    h += '<div class="pl-body" style="--c:' + col + '">';
    if (P.phase === "slides") {
      var s = P.l.slides[P.i];
      h += '<div class="slide"><span class="tag">' + esc(P.l.title) + "</span><h2>" + esc(s.h) + "</h2>" + (s.p ? '<p class="sp">' + esc(s.p) + "</p>" : "") + '<div class="vis">' + slideVisual(s, col) + "</div></div>";
      h += '</div><div class="pl-foot"><button class="btn ghost" data-act="prev"' + (P.i ? "" : " disabled") + ">" + ic("back") + 'Geri</button><button class="btn" data-act="next">' + (P.i === nS - 1 ? "Teste geç" : "İleri") + ic("arrow") + "</button></div>";
    } else if (P.phase === "quiz") {
      var Q = P.qs[P.qi].q, ans = P.answers[P.qi];
      h += '<div class="slide quiz"><span class="tag">' + ic("star") + "Test</span><h2>" + esc(Q.q) + '</h2><div class="opts">' + Q.o.map(function (o, k) {
        var c = ans == null ? "" : k === Q.a ? "right" : k === ans ? "wrong" : "dim";
        return '<button data-ans="' + k + '" class="' + c + '"' + (ans != null ? " disabled" : "") + "><span>" + String.fromCharCode(65 + k) + "</span>" + esc(o) + "</button>";
      }).join("") + "</div>" + (ans != null ? '<div class="expl ' + (ans === Q.a ? "ok" : "no") + '"><b>' + (ans === Q.a ? "Doğru." : "Doğru cevap: " + String.fromCharCode(65 + Q.a)) + "</b> " + esc(Q.e || "") + "</div>" : "") + "</div>";
      h += '</div><div class="pl-foot">' + (ans != null ? '<button class="btn wide" data-act="nextq">' + (P.qi === nQ - 1 ? "Sonucu gör" : "Sonraki soru") + ic("arrow") + "</button>" : '<span class="muted small center wide">Bir cevap seç</span>') + "</div>";
    } else {
      var pct = P.score / nQ, pass = pct >= PASS, mins = Math.max(1, Math.round((Date.now() - P.t0) / 60000));
      h += '<div class="slide result">' + ring(pct, pass ? "#2e9e6a" : "#e3a018", 140, Math.round(pct * 100) + "%") + "<h2>" + (P.kind === "review" ? "Tekrar tamam" : pass ? "Ders tamamlandı" : "Biraz daha tekrar") + "</h2><p>" + P.score + "/" + nQ + " doğru · " + mins + " dk" + (P.kind === "lesson" && !pass ? ". Geçmek için %70 gerekiyor; yanlışların Pazar tekrarına eklendi." : "") + "</p>";
      if (P.l.task) h += '<div class="task"><span class="tag">' + ic("flag") + 'Bugünkü görev</span><p>' + esc(P.l.task) + '</p><label class="chk"><input type="checkbox" id="taskdone"' + (S.tasks[P.lid] ? " checked" : "") + "><span>Görevi yaptım (yarın da işaretleyebilirsin)</span></label></div>";
      h += '</div></div><div class="pl-foot"><button class="btn wide" data-act="finish">Kaydet ve kapat</button></div>';
    }
    el.innerHTML = h;
    el.querySelector(".pl-body").scrollTop = 0;
  }
  function finishPlayer() {
    var nQ = P.qs.length, pct = P.score / nQ, mins = Math.max(1, Math.round((Date.now() - P.t0) / 60000));
    var tb = document.getElementById("taskdone");
    if (tb && P.lid) S.tasks[P.lid] = tb.checked;
    P.qs.forEach(function (x, k) {
      var ok = P.answers[k] === x.q.a, ix = S.wrong.indexOf(x.id);
      if (ok && ix >= 0) S.wrong.splice(ix, 1);
      if (!ok && ix < 0) S.wrong.push(x.id);
    });
    if (P.kind === "lesson") S.best[P.lid] = Math.max(S.best[P.lid] || 0, pct);
    S.sessions.push({ date: TODAY, lid: P.lid, tr: P.kind === "lesson" ? P.tr : "review", sc: P.score, tot: nQ, min: mins, pass: P.kind === "review" || pct >= PASS });
    var wasReview = P.kind === "review";
    save(); closePlayer(); toast(wasReview ? "Tekrar kaydedildi" : pct >= PASS ? "Ders tamamlandı" : "Kaydedildi; Pazar tekrar edeceğiz");
  }
  function closePlayer() { var el = document.getElementById("player"); if (el) el.remove(); document.body.classList.remove("noscroll"); P = null; render(); }

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
    var b = e.target.closest("[data-go],[data-lesson],[data-act],[data-ans],[data-track],[data-cal],[data-day],[data-nf],[data-ps],[data-pe],[data-read]");
    if (!b) { if (e.target.id === "sheet") closeSheet(); return; }
    var d = b.dataset;
    if (d.read) { S.read[d.read] = TODAY; save(); return; }
    if (d.go) return go(d.go);
    if (d.lesson) return openLesson(d.lesson);
    if (d.track) { view = "road"; render(); var t = document.getElementById("t-" + d.track); if (t) t.scrollIntoView({ behavior: "smooth" }); return; }
    if (d.cal) { var y = +calMonth.slice(0, 4), m = +calMonth.slice(5, 7) - 1 + (+d.cal); var nd = new Date(y, m, 1); calMonth = iso(nd).slice(0, 7); return render(); }
    if (d.day) return dayDetail(d.day);
    if (d.nf) { newsFilter = d.nf; return render(); }
    if (d.ps) { var a = d.ps.split(":"); S.projects.forEach(function (p) { if (p.id === a[0]) p.status = a[1]; }); save(); return render(); }
    if (d.pe) return editProject(d.pe);
    if (d.ans != null && P) { var k = +d.ans; P.answers[P.qi] = k; if (k === P.qs[P.qi].q.a) P.score++; return drawPlayer(); }
    switch (d.act) {
      case "next": if (P.i < P.l.slides.length - 1) P.i++; else P.phase = "quiz"; return drawPlayer();
      case "prev": if (P.i > 0) P.i--; return drawPlayer();
      case "nextq": if (P.qi < P.qs.length - 1) P.qi++; else P.phase = "result"; return drawPlayer();
      case "finish": return finishPlayer();
      case "close": return closePlayer();
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
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.plan != null) { S.plan[t.dataset.plan] = t.value; save(); toast("Plan güncellendi"); }
    if (t.dataset.ms) { S.ms[t.dataset.ms] = t.checked; save(); }
    if (t.dataset.pend) { S.pend[t.dataset.pend] = +t.value || 0; save(); render(); }
  });
  /* kaydırma ile slayt geçişi */
  var tx = null;
  document.addEventListener("touchstart", function (e) { if (P && P.phase === "slides" && e.target.closest(".pl-body")) tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (tx == null || !P) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) < 60 || e.target.closest(".v-tbl,.v-code")) return;
    if (dx < 0) { if (P.i < P.l.slides.length - 1) P.i++; else P.phase = "quiz"; } else if (P.i > 0) P.i--;
    drawPlayer();
  }, { passive: true });

  var tt;
  function toast(m) { var el = document.getElementById("toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); } el.textContent = m; el.className = "show"; clearTimeout(tt); tt = setTimeout(function () { el.className = ""; }, 2600); }

  load(); render();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
