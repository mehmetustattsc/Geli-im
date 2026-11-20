/* Power Query simülatörü: dokunarak sorgu kur, her adımın M kodunu gör.
   Görevler fnVergleich'in parçalarını sırayla kurdurur. window.PQSIM.open(onDone) */
(function () {
  var KEY = "gelisim.pqsim";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- örnek veriler (gerçek dosyanın küçük kopyası) ---------- */
  var COLS = ["PiccoNr", "Datum", "AssetArt", "Standort", "Miete"];
  var SRC = {
    tblProd: [
      ["1001", "03.09.2026", "Notebook", "Neckarsulm", "19,68"],
      ["1002", "14.08.2026", "Monitor", "Heilbronn", "4,10"],
      ["1003", "02.10.2026", "Notebook", "Weinsberg", "19,68"],
      ["1004", "05.11.2026", "Dock", "Neckarsulm", "3,20"],
      ["1005", "21.07.2026", "PC-Mini", "Bad Wimpfen", "22,50"],
      ["1007", "10.11.2026", "Monitor", "Heilbronn", "4,10"]
    ],
    tblTest: [
      ["1001", "03.09.2026", "NB", "Neckarsulm", "19,68"],
      ["1002", "14.08.2026", "Monitor", "Haller Straße", "4,10"],
      ["1003", "02.10.2026", "NB", "Weinsberg", "19,68"],
      ["1005", "21.07.2026", "DT Micro", "Bad Wimpfen", "22,50"],
      ["1006", "11.03.2025", "NB", "Buchen", "19,68"],
      ["1007", "30.09.2026", "Monitor", "Neckarsulm", "4,10"]
    ]
  };
  var UEB = ["Notebook→NB", "PC-Mini→DT Micro"];
  var JOINS = {
    left: ["Linker äußerer", "JoinKind.LeftOuter", "Prod'un tüm satırları + Test'te eşleşen"],
    inner: ["Innerer", "JoinKind.Inner", "Sadece iki tabloda da olanlar"],
    lanti: ["Linke Anti", "JoinKind.LeftAnti", "Sadece Prod'da olanlar"],
    ranti: ["Rechte Anti", "JoinKind.RightAnti", "Sadece Test'te olanlar"]
  };
  /* Benutzerdefinierte Spalte: hazır formüller. c = karşılaştırılan sütun */
  function presets(c) {
    return {
      diff: { name: c + "_anders", need: [c, "tblTest." + c], m: "[" + c + "] <> [tblTest." + c + "]", tr: c + " Prod ile Test'te farklı mı? (TRUE/FALSE)",
        f: function (r) { return r[c] !== r["tblTest." + c]; } },
      dat: { name: "Datum_anders", need: ["Datum", "tblTest.Datum"], m: "[Datum] <> [tblTest.Datum]", tr: "Tarih farklı mı? Farklıysa cihaz arada hareket etmiş.",
        f: function (r) { return r.Datum !== r["tblTest.Datum"]; } },
      st: { name: "Status", need: ["Datum", "tblTest.Datum", c, "tblTest." + c],
        m: "if [Datum] <> [tblTest.Datum] then \"Zeit\"\n      else if [" + c + "] = [tblTest." + c + "] then \"gleich\"\n      else if List.Contains(Uebersetzung, [" + c + "] & \"→\" & [tblTest." + c + "]) then \"Erwartet\"\n      else \"UNERWARTET\"",
        tr: "Her satıra statü: tarih farklı → Zeit, aynı → gleich, çeviri tablosunda → Erwartet, kalan → UNERWARTET",
        f: function (r) { var a = r[c], b = r["tblTest." + c]; return r.Datum !== r["tblTest.Datum"] ? "Zeit" : a === b ? "gleich" : UEB.indexOf(a + "→" + b) >= 0 ? "Erwartet" : "UNERWARTET"; } }
    };
  }

  /* ---------- görevler ---------- */
  function pk(t) { var a = t.cols.indexOf("PiccoNr"), b = t.cols.indexOf("tblTest.PiccoNr"); if (a < 0 && b < 0) return []; return t.rows.map(function (r) { return (a >= 0 && r[a] != null) ? r[a] : b >= 0 ? r[b] : null; }).filter(function (x) { return x != null; }).sort(); }
  function same(a, b) { return a.join() === b.join(); }
  var MIS = [
    { id: "m1", t: "Sadece Prod'da olan cihazı bul", d: "Prod'da aktif, Test'te hiç olmayan cihaz hangisi?",
      hint: "Menü: Zusammenführen → tblTest → Join-Art: Linke Anti → Tamam.",
      ok: function (t) { return t.rows.length === 1 && same(pk(t), ["1004"]); },
      why: "fnVergleich'teki NurProdK satırı tam olarak bu: Table.Join(…, JoinKind.LeftAnti). Excel'deki karşılığı: SVERWEIS'ta #NV çıkanlar." },
    { id: "m2", t: "Sadece Test'te olan cihazı bul", d: "Test'te var, Prod'da yok. Cihaz numarasını görebilmek için Test sütunlarını açman gerekecek.",
      hint: "Zusammenführen → Rechte Anti → Tamam. Sonra menüde Erweitern'e dokun: Prod sütunları boş (null) kalır, Test sütunları dolar.",
      ok: function (t) { return t.rows.length === 1 && t.cols.indexOf("tblTest.PiccoNr") >= 0 && same(pk(t), ["1006"]); },
      why: "NurTestK = JoinKind.RightAnti. Prod tarafı null gelir çünkü o cihaz Prod'da yok. fnVergleich bu yüzden NurTest'te sadece _t sütunlarını tutar." },
    { id: "m3", t: "Standort'u farklı olan ortak cihazlar", d: "İki tabloda da olan cihazlardan Standort'u farklı olanlar.",
      hint: "Zusammenführen → Innerer → Erweitern → Benutzerdef. Spalte → 'Standort farklı mı' → sonra Standort_anders başlığına dokun → Filtern → TRUE.",
      ok: function (t) { return t.cols.indexOf("Standort_anders") >= 0 && same(pk(t), ["1002", "1007"]); },
      why: "Bu, fnVergleich'teki DiffSpalte'nin ilk satırı: Table.SelectRows(Beide, each [Standort] <> [Standort_t])." },
    { id: "m4", t: "Gerçek hatayı ayıkla", d: "1007 arada taşınmış (tarihi farklı). Tarihi AYNI olup Standort'u farklı olanı bul. Gerçek migrasyon hatası bu.",
      hint: "Görev 3'teki sorguya devam et: Benutzerdef. Spalte → 'Tarih farklı mı' → Datum_anders başlığı → Filtern → FALSE.",
      ok: function (t) { return t.cols.indexOf("Datum_anders") >= 0 && same(pk(t), ["1002"]); },
      why: "fnVergleich'te 'Erklärt: Zeit' statüsü bu mantık: Datum farklıysa fark zaman yüzündendir, hata sayılmaz." },
    { id: "m5", t: "AssetArt farklarına statü ver ve say", d: "Ortak cihazlarda AssetArt'ı karşılaştır, her satıra statü ver, sonra statüye göre say.",
      hint: "Yeni sorgu (Sıfırla) → Zusammenführen → Innerer → Erweitern → Benutzerdef. Spalte → Status (sütun: AssetArt) → Status başlığı → Gruppieren.",
      ok: function (t) { var si = t.cols.indexOf("Status"), ai = t.cols.indexOf("Anzahl"); if (si < 0 || ai < 0) return false; var m = {}; t.rows.forEach(function (r) { m[r[si]] = r[ai]; }); return m.Erwartet === 3 && m.Zeit === 1; },
      why: "Bu, fnVergleich'teki DiffSpalte'nin statü kısmı + ProSpalte (Table.Group). Notebook→NB çeviri tablosunda olduğu için 'Erwartet'." },
    { id: "m6", t: "Fonksiyona çevir", d: "Görev 3'teki sorgunun içinde 'Standort' yazan her yere c yaz: artık tek sorgu her sütun için çalışır. Alttan en az 3 farklı sütun dene.",
      hint: "Menüde 'ƒ(c)' düğmesine dokun, sonra alttaki sütun düğmelerinden birini seç.",
      ok: function () { return Object.keys(Q.fnTried || {}).length >= 3; },
      why: "fnVergleich'in kalbi bu: DiffSpalte = (c) => … ve List.Transform(Vergl, DiffSpalte). Aynı adımları her sütun için otomatik tekrarlar. Excel'de bunu her sütuna ayrı formülle yapardın." }
  ];

  /* ---------- motor ---------- */
  function T(cols, rows) { return { cols: cols, rows: rows }; }
  function src(n) { return T(COLS.slice(), SRC[n].map(function (r) { return r.slice(); })); }
  function rec(t, r) { var o = {}; t.cols.forEach(function (c, i) { o[c] = r[i]; }); return o; }
  function run(steps, upto) {
    var t = src("tblProd"), last = upto == null ? steps.length - 1 : upto;
    for (var i = 1; i <= last; i++) t = apply(t, steps[i]);
    return t;
  }
  function apply(t, s) {
    var ki = t.cols.indexOf("PiccoNr");
    if (s.t === "join") {
      var R = src("tblTest"), used = {}, rows = [];
      t.rows.forEach(function (r) {
        var m = R.rows.filter(function (x) { return x[0] === r[ki]; });
        m.forEach(function (x) { used[x[0]] = 1; });
        if (s.k === "left" || (s.k === "inner" && m.length) || (s.k === "lanti" && !m.length)) rows.push(r.concat([{ nt: T(R.cols, m) }]));
      });
      if (s.k === "ranti") R.rows.forEach(function (x) { if (!t.rows.some(function (r) { return r[ki] === x[0]; })) rows.push(t.cols.map(function () { return null; }).concat([{ nt: T(R.cols, [x]) }])); });
      return T(t.cols.concat(["tblTest"]), rows);
    }
    if (s.t === "exp") {
      var ni = t.cols.indexOf("tblTest"); if (ni < 0) return t;
      var nc = COLS.map(function (c) { return "tblTest." + c; }), out = [];
      t.rows.forEach(function (r) {
        var base = r.slice(0, ni).concat(r.slice(ni + 1)), sub = r[ni].nt.rows;
        if (!sub.length) out.push(base.concat(nc.map(function () { return null; })));
        sub.forEach(function (x) { out.push(base.concat(x)); });
      });
      return T(t.cols.slice(0, ni).concat(t.cols.slice(ni + 1), nc), out);
    }
    if (s.t === "add") {
      var p = presets(s.c)[s.p];
      return T(t.cols.concat([p.name]), t.rows.map(function (r) { return r.concat([p.f(rec(t, r))]); }));
    }
    if (s.t === "filter") { var fi = t.cols.indexOf(s.col); return fi < 0 ? t : T(t.cols, t.rows.filter(function (r) { return show(r[fi]) === s.val; })); }
    if (s.t === "rm") { var ri = t.cols.indexOf(s.col); return ri < 0 ? t : T(t.cols.filter(function (_, i) { return i !== ri; }), t.rows.map(function (r) { return r.filter(function (_, i) { return i !== ri; }); })); }
    if (s.t === "grp") {
      var gi = t.cols.indexOf(s.col), cnt = {}, ord = [];
      t.rows.forEach(function (r) { var v = r[gi]; if (!(show(v) in cnt)) { cnt[show(v)] = 0; ord.push(v); } cnt[show(v)]++; });
      return T([s.col, "Anzahl"], ord.map(function (v) { return [v, cnt[show(v)]]; }));
    }
    return t;
  }
  function show(v) { return v === true ? "TRUE" : v === false ? "FALSE" : v == null ? "null" : v && v.nt ? "[Table]" : String(v); }

  /* ---------- M kodu ---------- */
  function stepNames(steps) {
    var base = { src: "Quelle", join: "Zusammengeführte Abfragen", exp: "Erweiterte tblTest", add: "Benutzerdefiniert hinzugefügt", filter: "Gefilterte Zeilen", rm: "Entfernte Spalten", grp: "Gruppierte Zeilen" }, seen = {};
    return steps.map(function (s) { var b = base[s.t], n = seen[b] = (seen[b] || 0) + 1; return n > 1 ? b + (n - 1) : b; });
  }
  function ref(n) { return /^[A-Za-z_]\w*$/.test(n) ? n : '#"' + n + '"'; }
  function lit(v) { return v === "TRUE" ? "true" : v === "FALSE" ? "false" : v === "null" ? "null" : '"' + v + '"'; }
  function mOf(steps, i, names) {
    var s = steps[i], prev = i ? ref(names[i - 1]) : "";
    if (s.t === "src") return 'Excel.CurrentWorkbook(){[Name="tblProd"]}[Content]';
    if (s.t === "join") return 'Table.NestedJoin(' + prev + ', {"PiccoNr"}, tblTest, {"PiccoNr"}, "tblTest", ' + JOINS[s.k][1] + ")";
    if (s.t === "exp") return 'Table.ExpandTableColumn(' + prev + ', "tblTest", {' + COLS.map(function (c) { return '"' + c + '"'; }).join(", ") + "}, {" + COLS.map(function (c) { return '"tblTest.' + c + '"'; }).join(", ") + "})";
    if (s.t === "add") { var p = presets(s.c)[s.p]; return 'Table.AddColumn(' + prev + ', "' + p.name + '", each ' + p.m + ")"; }
    if (s.t === "filter") return "Table.SelectRows(" + prev + ", each [" + s.col + "] = " + lit(s.val) + ")";
    if (s.t === "rm") return "Table.RemoveColumns(" + prev + ', {"' + s.col + '"})';
    if (s.t === "grp") return "Table.Group(" + prev + ', {"' + s.col + '"}, {{"Anzahl", each Table.RowCount(_), Int64.Type}})';
  }
  function trOf(s) {
    if (s.t === "src") return "Kaynak: Excel'deki tblProd tablosu okunur.";
    if (s.t === "join") return "tblProd ile tblTest PiccoNr üzerinden birleştirildi (" + JOINS[s.k][0] + ": " + JOINS[s.k][2] + "). Test satırları 'tblTest' sütununda paket [Table] olarak duruyor.";
    if (s.t === "exp") return "[Table] paketleri açıldı: Test'in sütunları 'tblTest.' önekiyle yan yana geldi.";
    if (s.t === "add") return "Yeni sütun: " + presets(s.c)[s.p].tr + ". 'each' = her satır için (Excel'de formülü aşağı çekmek gibi).";
    if (s.t === "filter") return "Filtre: sadece " + s.col + " = " + s.val + " olan satırlar kaldı.";
    if (s.t === "rm") return s.col + " sütunu silindi.";
    if (s.t === "grp") return s.col + " değerine göre gruplandı ve satırlar sayıldı (Pivot / ZÄHLENWENN gibi).";
  }
  function hl(code) {
    return esc(code).replace(/(&quot;[^&]*?&quot;)/g, '<i class="s">$1</i>').replace(/\b(let|in|each|if|then|else|true|false|null)\b/g, '<b class="k">$1</b>').replace(/\b(Table|List|Excel|JoinKind|Int64)\.\w+/g, '<u class="f">$&</u>');
  }

  /* ---------- durum ---------- */
  var Q = null, el = null, onDone = null;
  function loadSaved() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function store() { try { localStorage.setItem(KEY, JSON.stringify({ solved: Q.solved })); } catch (e) {} }
  function fresh() { return [{ t: "src" }]; }
  function open(cb) {
    onDone = cb; var sv = loadSaved();
    Q = { steps: fresh(), sel: null, mi: 0, solved: sv.solved || {}, hint: {}, sheet: null, c: "Standort", fn: false, fnTried: {}, t0: Date.now(), just: null, sessionPts: {} };
    for (var i = 0; i < MIS.length; i++) if (!Q.solved[MIS[i].id]) { Q.mi = i; break; }
    el = document.createElement("div"); el.id = "pqs"; document.body.appendChild(el); document.body.classList.add("noscroll");
    el.addEventListener("click", onClick); draw();
  }
  function close(finish) {
    if (finish && onDone) { var ks = Object.keys(Q.sessionPts); onDone(ks.reduce(function (a, k) { return a + Q.sessionPts[k]; }, 0), ks.length, Math.max(1, Math.round((Date.now() - Q.t0) / 60000))); }
    el.remove(); el = null; document.body.classList.remove("noscroll"); Q = null;
  }
  function cur() { return Q.sel == null ? Q.steps.length - 1 : Q.sel; }
  function check() {
    var m = MIS[Q.mi]; if (!m || Q.just) return;
    var t = run(Q.steps);
    if (m.ok(t)) { Q.just = m.id; if (!(m.id in Q.sessionPts)) Q.sessionPts[m.id] = Q.hint[m.id] ? 0.5 : 1; Q.solved[m.id] = 1; store(); }
  }

  /* ---------- çizim ---------- */
  function draw() {
    var i = cur(), t = run(Q.steps, i), names = stepNames(Q.steps), m = MIS[Q.mi], nested = t.cols.indexOf("tblTest") >= 0;
    var h = '<div class="q-top"><button data-q="close" aria-label="Kapat">✕</button><b>Power Query</b><small>' + Object.keys(Q.solved).length + "/" + MIS.length + " görev</small></div><div class=\"q-body\">";
    /* görev kartı */
    if (m) {
      h += '<div class="q-mis' + (Q.just === m.id ? " ok" : "") + '"><div class="q-mh"><span>Görev ' + (Q.mi + 1) + "</span><div>" + MIS.map(function (x, k) { return '<button data-q="mis:' + k + '" class="' + (k === Q.mi ? "on " : "") + (Q.solved[x.id] ? "dn" : "") + '">' + (k + 1) + "</button>"; }).join("") + "</div></div><b>" + esc(m.t) + "</b><p>" + esc(m.d) + "</p>";
      if (Q.just === m.id) h += '<div class="q-why"><b>✓ Doğru!</b> ' + esc(m.why) + '</div><button class="q-btn" data-q="nextmis">' + (Q.mi < MIS.length - 1 ? "Sonraki görev" : "Bitir") + "</button>";
      else if (Q.hint[m.id]) h += '<div class="q-hint">' + esc(m.hint) + "</div>";
      else h += '<button class="q-lnk" data-q="hint">İpucu göster</button>';
      h += "</div>";
    }
    /* şerit menü */
    var hasExp = t.cols.indexOf("tblTest.PiccoNr") >= 0;
    h += '<div class="q-rib">' +
      rb("join", "⇄", "Zusammen­führen", Q.steps.length === 1) +
      rb("exp", "⤢", "Erweitern", nested && i === Q.steps.length - 1) +
      rb("add", "ƒx", "Benutzerdef. Spalte", hasExp && i === Q.steps.length - 1) +
      rb("fn", "ƒ(c)", "Fonksiyona çevir", true) +
      rb("adv", "{ }", "Erweiterter Editor", true) +
      rb("reset", "↺", "Sıfırla", Q.steps.length > 1) + "</div>";
    /* formül çubuğu */
    h += '<div class="q-fx"><span>fx</span><code>= ' + hl(mOf(Q.steps, i, names)) + '</code></div><p class="q-tr">' + esc(trOf(Q.steps[i])) + "</p>";
    /* veri ızgarası */
    h += '<div class="q-grid"><table><thead><tr><th class="rn"></th>' + t.cols.map(function (c) { return '<th><button data-q="col:' + esc(c) + '">' + esc(c) + " ▾</button></th>"; }).join("") + "</tr></thead><tbody>" +
      (t.rows.length ? t.rows.map(function (r, ri) { return '<tr><td class="rn">' + (ri + 1) + "</td>" + r.map(function (v) { var sv = show(v); return '<td class="' + (v == null ? "nl" : v === true ? "tr" : v === false ? "fl" : v && v.nt ? "nt" : sv === "UNERWARTET" ? "ue" : "") + '">' + esc(sv) + "</td>"; }).join("") + "</tr>"; }).join("") : '<tr><td class="rn"></td><td colspan="' + t.cols.length + '" class="nl">Satır yok</td></tr>') + "</tbody></table></div><small class=\"q-cnt\">" + t.cols.length + " sütun · " + t.rows.length + " satır" + (i < Q.steps.length - 1 ? " · eski bir adıma bakıyorsun" : "") + "</small>";
    /* fonksiyon modu */
    if (Q.fn) {
      h += '<div class="q-fn"><b>ƒ(c): aynı sorgu, her sütun için</b><p>Görev 3\'ün adımları, "Standort" yerine c ile. Bir sütun seç:</p><div class="q-chips">' + ["Standort", "AssetArt", "Miete", "Datum"].map(function (c) { return '<button data-q="fnc:' + c + '" class="' + (Q.c === c ? "on" : "") + (Q.fnTried[c] ? " dn" : "") + '">' + c + "</button>"; }).join("") + '</div><pre class="q-code">' + hl(fnCode(Q.c)) + "</pre>";
      var ft = fnRun(Q.c);
      h += "<p><b>" + ft.length + "</b> cihazda " + esc(Q.c) + " farklı" + (ft.length ? ": " + ft.map(function (x) { return esc(x[0] + " (" + x[1] + " → " + x[2] + ")"); }).join(", ") : "") + '</p><p class="q-tr">fnVergleich bunu List.Transform ile Konfig\'deki tüm sütunlar için çalıştırıp sonuçları alt alta koyar (Table.Combine).</p></div>';
    }
    /* uygulanan adımlar */
    h += '<h4 class="q-h">Angewendete Schritte</h4><ol class="q-steps">' + Q.steps.map(function (s, k) { return '<li class="' + (k === i ? "on" : "") + '"><button data-q="step:' + k + '">' + esc(names[k]) + "</button>" + (k === Q.steps.length - 1 && k > 0 ? '<button data-q="del" class="x" aria-label="Adımı sil">✕</button>' : "") + "</li>"; }).join("") + "</ol>";
    h += "</div>";
    if (Q.sheet) h += sheet(t);
    var keep = (el.querySelector(".q-body") || {}).scrollTop || 0;
    el.innerHTML = h;
    var qb = el.querySelector(".q-body"); if (qb) qb.scrollTop = keep;
  }
  function rb(k, icon, lab, on) { return '<button data-q="rib:' + k + '"' + (on ? "" : " disabled") + '><span>' + icon + "</span><small>" + lab + "</small></button>"; }
  function fnCode(c) {
    return "DiffSpalte = (c) =>\n  let\n    J = Table.NestedJoin(tblProd, {\"PiccoNr\"}, tblTest, {\"PiccoNr\"}, \"tblTest\", JoinKind.Inner),\n    E = Table.ExpandTableColumn(J, \"tblTest\", {…}, {…}),\n    F = Table.SelectRows(E, each Record.Field(_, c) <> Record.Field(_, \"tblTest.\" & c))\n  in F\n\n// c = \"" + c + "\"  →  Record.Field(_, \"" + c + "\") = [" + c + "]";
  }
  function fnRun(c) {
    var ci = COLS.indexOf(c), out = [];
    SRC.tblProd.forEach(function (r) { SRC.tblTest.forEach(function (x) { if (x[0] === r[0] && x[ci] !== r[ci]) out.push([r[0], r[ci], x[ci]]); }); });
    return out;
  }
  function sheet(t) {
    var s = Q.sheet, h = '<div class="q-sh" data-q="shclose"><div class="q-shi">';
    if (s.k === "join") {
      h += "<b>Zusammenführen</b><p>tblProd → <b>tblTest</b>, eşleşen sütun: <b>PiccoNr</b> (iki tabloda da seçili). Join-Art seç:</p>" + Object.keys(JOINS).map(function (k) { return '<button class="q-opt" data-q="join:' + k + '"><b>' + JOINS[k][0] + "</b><small>" + JOINS[k][2] + "</small></button>"; }).join("");
    } else if (s.k === "add") {
      h += "<b>Benutzerdefinierte Spalte</b><p>Karşılaştırılacak sütun:</p><div class=\"q-chips\">" + ["Standort", "AssetArt", "Miete"].map(function (c) { return '<button data-q="addc:' + c + '" class="' + (Q.c === c ? "on" : "") + '">' + c + "</button>"; }).join("") + "</div>";
      var P = presets(Q.c);
      h += [["diff", Q.c + " farklı mı?"], ["dat", "Tarih farklı mı?"], ["st", "Status (Zeit / gleich / Erwartet / UNERWARTET)"]].map(function (x) { var ok = P[x[0]].need.every(function (n) { return t.cols.indexOf(n) >= 0; }) && t.cols.indexOf(P[x[0]].name) < 0; return '<button class="q-opt" data-q="add:' + x[0] + '"' + (ok ? "" : " disabled") + "><b>" + esc(x[1]) + "</b><code>" + esc(P[x[0]].name + " = " + P[x[0]].m.replace(/\n\s*/g, " ")) + "</code></button>"; }).join("");
    } else if (s.k === "col") {
      var ci = t.cols.indexOf(s.col), vals = [];
      t.rows.forEach(function (r) { var v = show(r[ci]); if (vals.indexOf(v) < 0) vals.push(v); });
      h += "<b>" + esc(s.col) + "</b>";
      if (s.col === "tblTest") h += '<button class="q-opt" data-q="rib:exp"><b>⤢ Erweitern</b><small>[Table] paketlerini aç</small></button>';
      else {
        h += "<p>Filtern: sadece şu değer kalsın</p><div class=\"q-chips\">" + vals.map(function (v) { return '<button data-q="flt:' + esc(v) + '">' + esc(v) + "</button>"; }).join("") + "</div>" +
          '<button class="q-opt" data-q="grp"><b>Gruppieren nach</b><small>Bu sütuna göre say (Anzahl)</small></button><button class="q-opt" data-q="rm"><b>Spalte entfernen</b><small>Bu sütunu sil</small></button>';
      }
    } else if (s.k === "adv") {
      var names = stepNames(Q.steps);
      h += "<b>Erweiterter Editor</b><p>Dokunduğun her adım burada bir satır oldu. let = adımlar, in = sonuç.</p><pre class=\"q-code\">" + hl("let\n" + Q.steps.map(function (st, k) { return "    " + ref(names[k]) + " = " + mOf(Q.steps, k, names) + (k < Q.steps.length - 1 ? "," : ""); }).join("\n") + "\nin\n    " + ref(names[names.length - 1])) + "</pre>";
    }
    return h + '<button class="q-btn ghost" data-q="shclose">Kapat</button></div></div>';
  }

  /* ---------- dokunuşlar ---------- */
  function push(s) { if (Q.sel != null) { Q.steps = Q.steps.slice(0, Q.sel + 1); Q.sel = null; } Q.steps.push(s); Q.sheet = null; check(); draw(); }
  function onClick(e) {
    var b = e.target.closest("[data-q]"); if (!b || b.disabled) return;
    if (b.classList.contains("q-sh") && e.target !== b) return;
    var a = b.dataset.q.split(":"), k = a[0], v = a.slice(1).join(":");
    if (k === "close") return close(Object.keys(Q.sessionPts).length > 0);
    if (k === "shclose") { Q.sheet = null; return draw(); }
    if (k === "hint") { Q.hint[MIS[Q.mi].id] = 1; return draw(); }
    if (k === "mis") { Q.mi = +v; Q.just = Q.solved[MIS[Q.mi].id] && false; Q.fn = Q.mi === 5; if (Q.fn) Q.fnTried[Q.c] = 1; check(); return draw(); }
    if (k === "nextmis") { if (Q.mi >= MIS.length - 1) return close(true); Q.mi++; Q.just = null; Q.fn = Q.mi === 5; if (Q.fn) Q.fnTried[Q.c] = 1; if (Q.mi === 4) { Q.steps = fresh(); Q.sel = null; Q.c = "AssetArt"; } check(); return draw(); }
    if (k === "step") { Q.sel = +v === Q.steps.length - 1 ? null : +v; return draw(); }
    if (k === "del") { Q.steps.pop(); Q.sel = null; Q.just = null; check(); return draw(); }
    if (k === "rib") {
      if (v === "exp") return push({ t: "exp" });
      if (v === "reset") { Q.steps = fresh(); Q.sel = null; Q.just = null; return draw(); }
      if (v === "fn") { Q.fn = !Q.fn; if (Q.fn) Q.fnTried[Q.c] = 1; check(); return draw(); }
      Q.sheet = { k: v }; return draw();
    }
    if (k === "join") return push({ t: "join", k: v });
    if (k === "addc") { Q.c = v; return draw(); }
    if (k === "add") return push({ t: "add", p: v, c: Q.c });
    if (k === "col") { if (cur() !== Q.steps.length - 1) { Q.sel = null; } var t = run(Q.steps); if (t.cols.indexOf(v) < 0) return; if (v === "Anzahl") return; Q.sheet = { k: "col", col: v }; return draw(); }
    if (k === "flt") return push({ t: "filter", col: Q.sheet.col, val: v });
    if (k === "grp") return push({ t: "grp", col: Q.sheet.col });
    if (k === "rm") return push({ t: "rm", col: Q.sheet.col });
    if (k === "fnc") { Q.c = v; Q.fnTried[v] = 1; check(); return draw(); }
  }

  window.PQSIM = { open: open };
})();
