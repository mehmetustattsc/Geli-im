/* Oyun içerikleri. l = bağlı olduğu ders (derste "Birlikte yap" adımında da kullanılır). */
window.GAMES = {
  /* Satzbau: w = doğru sıradaki kelimeler, alt = kabul edilen başka sıralar */
  satz: [
    { id: "s1", l: "de1-1", w: ["Könnten", "Sie", "mir", "bitte", "die", "Liste", "schicken?"], tr: "Bana listeyi gönderebilir misiniz?", e: "Rica cümlesi Konjunktiv fiille (Könnten) başlar; asıl fiil (schicken) en sona gider." },
    { id: "s2", l: "de1-1", w: ["Ich", "melde", "mich", "wegen", "der", "Event-Liste."], tr: "Event listesi nedeniyle yazıyorum.", e: "Ana cümlede çekimli fiil her zaman 2. sıradadır." },
    { id: "s3", l: "de1-1", w: ["Anbei", "finden", "Sie", "die", "Auswertung", "für", "Oktober."], tr: "Ekte Ekim değerlendirmesini bulabilirsiniz.", e: "Cümle Anbei ile başlasa da fiil 2. sırada kalır; özne (Sie) fiilin arkasına geçer." },
    { id: "s4", l: "de1-1", w: ["Mir", "ist", "aufgefallen,", "dass", "einige", "Einträge", "fehlen."], tr: "Bazı kayıtların eksik olduğu dikkatimi çekti.", e: "dass'tan sonra gelen yan cümlede çekimli fiil (fehlen) en sona gider." },
    { id: "s5", l: "de1-1", w: ["Bitte", "prüfen", "Sie", "die", "Daten", "bis", "Freitag."], alt: [["Bitte", "prüfen", "Sie", "bis", "Freitag", "die", "Daten."]], tr: "Lütfen verileri cumaya kadar kontrol edin.", e: "Emir cümlesinde (Sie ile) fiil başa gelir, hemen arkasından Sie." },
    { id: "s6", l: "de1-2", w: ["Das", "System", "muss", "doppelte", "Seriennummern", "blockieren."], tr: "Sistem çift seri numaralarını engellemeli.", e: "Modal fiil (muss) 2. sırada, asıl fiil mastar hâlinde en sonda." },
    { id: "s7", l: "de1-2", w: ["Aktuell", "wird", "die", "Liste", "manuell", "erstellt."], tr: "Şu an liste elle oluşturuluyor.", e: "Edilgen yapı: werden (wird) 2. sırada, Partizip II (erstellt) en sonda." },
    { id: "s8", l: "de1-2", w: ["Ziel", "ist,", "dass", "jedes", "Gerät", "nur", "einmal", "erfasst", "wird."], tr: "Hedef, her cihazın yalnızca bir kez kaydedilmesi.", e: "dass yan cümlesinde çekimli fiil (wird) en sona, Partizip (erfasst) ondan hemen önce." },
    { id: "s9", l: "de1-2", w: ["Dadurch", "entstehen", "Fehler", "in", "der", "Abrechnung."], tr: "Bu yüzden faturalamada hatalar oluşuyor.", e: "Dadurch başa gelince fiil yine 2. sırada, özne (Fehler) arkasında: devrik cümle." },
    { id: "s10", l: "de1-3", w: ["Ich", "sehe", "das", "anders,", "weil", "die", "Liste", "abrechnungskritisch", "ist."], tr: "Bunu farklı görüyorum, çünkü liste faturalama için kritik.", e: "weil'den sonra çekimli fiil (ist) en sona gider." },
    { id: "s11", l: "de1-3", w: ["Deshalb", "schlage", "ich", "eine", "neue", "Lösung", "vor."], tr: "Bu yüzden yeni bir çözüm öneriyorum.", e: "deshalb → fiil 2. sırada (devrik). vorschlagen ayrılabilen fiil: ön ek (vor) en sona gider." },
    { id: "s12", l: "de1-3", w: ["Was", "halten", "Sie", "davon,", "wenn", "wir", "das", "automatisieren?"], tr: "Bunu otomatikleştirsek ne dersiniz?", e: "wenn yan cümlesinde fiil (automatisieren) en sona gider." },
    { id: "s13", l: "de1-3", w: ["Können", "wir", "festhalten,", "dass", "Josip", "das", "prüft?"], tr: "Bunu Josip'in kontrol edeceğini not edebilir miyiz?", e: "Soru cümlesinde fiil başta; dass'tan sonra fiil (prüft) sonda." },
    { id: "s14", l: "de1-3", w: ["Darf", "ich", "kurz", "etwas", "ergänzen?"], tr: "Kısaca bir şey ekleyebilir miyim?", e: "Evet/hayır sorusunda çekimli fiil başa gelir, mastar en sona." },
    { id: "s15", l: "de1-4", w: ["Ich", "würde", "gern", "über", "meine", "Vergütung", "sprechen."], tr: "Ücretim hakkında konuşmak isterim.", e: "würde 2. sırada, asıl fiil (sprechen) en sonda." },
    { id: "s16", l: "de1-4", w: ["Wäre", "es", "möglich,", "zwei", "Tage", "im", "Homeoffice", "zu", "arbeiten?"], tr: "İki gün evden çalışmak mümkün olur mu?", e: "zu + mastar (zu arbeiten) cümlenin en sonuna gider." },
    { id: "s17", l: "de1-4", w: ["Seit", "2023", "habe", "ich", "den", "Event-Kalkulator", "entwickelt."], tr: "2023'ten beri Event hesaplayıcısını geliştirdim.", e: "Perfekt: haben 2. sırada, Partizip (entwickelt) sonda. Seit 2023 başta olduğu için özne fiilin arkasına geçer." },
    { id: "s18", l: "de1-4", w: ["Bis", "wann", "ist", "mit", "einer", "Entscheidung", "zu", "rechnen?"], tr: "Ne zamana kadar bir karar beklenebilir?", e: "Soru kelimesi (Bis wann) başta, fiil 2. sırada, zu + mastar sonda." },
    { id: "s19", l: "", w: ["Ich", "gebe", "Ihnen", "Bescheid,", "sobald", "die", "Daten", "vorliegen."], tr: "Veriler gelir gelmez size haber veririm.", e: "sobald yan cümlesinde fiil (vorliegen) en sona gider." },
    { id: "s20", l: "", w: ["Obwohl", "die", "Liste", "aktuell", "ist,", "fehlen", "drei", "Geräte."], tr: "Liste güncel olmasına rağmen üç cihaz eksik.", e: "Yan cümle başa gelirse (Obwohl … ist), ana cümle fiille başlar: fehlen." }
  ],

  /* SQL yapbozu: lines = doğru satırlar sırayla, x = yanlış (çeldirici) satırlar */
  sql: [
    { id: "q1", l: "sql1-1", task: "Pool'daki cihazların seri numarasını ve modelini getir.", lines: ["SELECT seriennummer, modell", "FROM assets", "WHERE lagerstatus = 'Pool';"], x: ["WHERE lagerstatus = Pool;", "SELECT * FROM modell"], e: "Metin değeri tek tırnak içinde yazılır: 'Pool'." },
    { id: "q2", l: "sql1-1", task: "Betankung'daki cihazların bütün sütunlarını getir.", lines: ["SELECT *", "FROM assets", "WHERE lagerstatus = 'Betankung';"], x: ["FROM lagerstatus", "SELECT ALL"], e: "* bütün sütunlar demektir; tablo adı FROM'dan sonra gelir." },
    { id: "q3", l: "sql1-2", task: "Hem kfl Sparte'sinde hem de Pool'da olan cihazlar.", lines: ["SELECT seriennummer", "FROM assets", "WHERE sparte = 'kfl'", "AND lagerstatus = 'Pool';"], x: ["OR lagerstatus = 'Pool';", "WHERE sparte = kfl"], e: "\"Hem … hem …\" = AND. OR, koşullardan birinin doğru olmasını yeterli sayar." },
    { id: "q4", l: "sql1-2", task: "Garantisi en erken bitecek 10 cihaz.", lines: ["SELECT seriennummer, garantie_bis", "FROM assets", "ORDER BY garantie_bis ASC", "LIMIT 10;"], x: ["ORDER BY garantie_bis DESC", "LIMIT 10 ORDER BY"], e: "En erken tarih için artan sıralama (ASC); LIMIT en sona yazılır." },
    { id: "q5", l: "sql1-2", task: "Açıklama (bemerkung) alanı boş olan kayıtlar.", lines: ["SELECT *", "FROM assets", "WHERE bemerkung IS NULL;"], x: ["WHERE bemerkung = NULL;", "WHERE bemerkung = '';"], e: "Boş (NULL) değer yalnızca IS NULL ile bulunur." },
    { id: "q6", l: "sql1-3", task: "Sparte başına cihaz sayısı.", lines: ["SELECT sparte, COUNT(*) AS anzahl", "FROM assets", "GROUP BY sparte;"], x: ["GROUP BY anzahl;", "WHERE COUNT(*) > 0"], e: "Gruplanan sütun (sparte) hem SELECT'te hem GROUP BY'da olur." },
    { id: "q7", l: "sql1-3", task: "Birden fazla geçen seri numaraları.", lines: ["SELECT seriennummer, COUNT(*)", "FROM db_abzug", "GROUP BY seriennummer", "HAVING COUNT(*) > 1;"], x: ["WHERE COUNT(*) > 1"], e: "COUNT sonucuna göre filtre HAVING ile yapılır, WHERE ile değil." },
    { id: "q8", l: "sql1-3", task: "Sparte başına toplam kira, en yüksekten en düşüğe.", lines: ["SELECT sparte, SUM(miete) AS summe", "FROM assets", "GROUP BY sparte", "ORDER BY summe DESC;"], x: ["ORDER BY summe ASC;", "GROUP BY miete"], e: "En yüksekten başlamak için DESC." },
    { id: "q9", l: "sql1-4", task: "Her cihaza fiyatını ekle; fiyatı olmayan cihazlar da listede kalsın.", lines: ["SELECT a.seriennummer, p.miete", "FROM assets a", "LEFT JOIN listepreise p", "ON a.modell = p.modell;"], x: ["INNER JOIN listepreise p", "ON a.seriennummer = p.miete;"], e: "Soldaki tablonun tamamını korumak için LEFT JOIN; ortak anahtar modell." },
    { id: "q10", l: "sql1-4", task: "Fiyat listesinde karşılığı olmayan modeller.", lines: ["SELECT a.modell", "FROM assets a", "LEFT JOIN listepreise p ON a.modell = p.modell", "WHERE p.modell IS NULL;"], x: ["WHERE p.modell = NULL;", "INNER JOIN listepreise p ON a.modell = p.modell"], e: "LEFT JOIN + IS NULL = eşleşmeyenleri bulmanın klasik yolu." }
  ],

  /* Bulmaca kelimeleri: w = kelime (büyük harf), c = Türkçe ipucu, a = artikel */
  cw: [
    { id: "w1", w: "ABWEICHUNG", c: "sapma", a: "die" }, { id: "w2", w: "AUSWERTUNG", c: "değerlendirme, analiz", a: "die" },
    { id: "w3", w: "FRIST", c: "son tarih, süre", a: "die" }, { id: "w4", w: "FREIGABE", c: "onay", a: "die" },
    { id: "w5", w: "STICHTAG", c: "kesim tarihi", a: "der" }, { id: "w6", w: "KOSTENSTELLE", c: "masraf yeri", a: "die" },
    { id: "w7", w: "RECHNUNG", c: "fatura", a: "die" }, { id: "w8", w: "ABRECHNUNG", c: "faturalama, hesap kesimi", a: "die" },
    { id: "w9", w: "URSACHE", c: "neden, kök sebep", a: "die" }, { id: "w10", w: "LIEFERSCHEIN", c: "irsaliye", a: "der" },
    { id: "w11", w: "LAGER", c: "depo", a: "das" }, { id: "w12", w: "GEHALT", c: "maaş", a: "das" },
    { id: "w13", w: "VERTRAG", c: "sözleşme", a: "der" }, { id: "w14", w: "KÜNDIGUNG", c: "fesih, işten ayrılma bildirimi", a: "die" },
    { id: "w15", w: "BESPRECHUNG", c: "toplantı, görüşme", a: "die" }, { id: "w16", w: "TERMIN", c: "randevu", a: "der" },
    { id: "w17", w: "AUFGABE", c: "görev", a: "die" }, { id: "w18", w: "ZIEL", c: "hedef", a: "das" },
    { id: "w19", w: "LEISTUNG", c: "hizmet, performans", a: "die" }, { id: "w20", w: "KUNDE", c: "müşteri", a: "der" },
    { id: "w21", w: "ANGEBOT", c: "teklif", a: "das" }, { id: "w22", w: "BERICHT", c: "rapor", a: "der" },
    { id: "w23", w: "ANFORDERUNG", c: "gereksinim", a: "die" }, { id: "w24", w: "PRÜFUNG", c: "kontrol, denetim", a: "die" },
    { id: "w25", w: "ZAHLUNG", c: "ödeme", a: "die" }, { id: "w26", w: "UMSATZ", c: "ciro", a: "der" },
    { id: "w27", w: "GEWINN", c: "kâr", a: "der" }, { id: "w28", w: "FEHLER", c: "hata", a: "der" },
    { id: "w29", w: "LÖSUNG", c: "çözüm", a: "die" }, { id: "w30", w: "VORSCHLAG", c: "öneri", a: "der" },
    { id: "w31", w: "RÜCKMELDUNG", c: "geri dönüş, yanıt", a: "die" }, { id: "w32", w: "ERGEBNIS", c: "sonuç", a: "das" },
    { id: "w33", w: "TABELLE", c: "tablo", a: "die" }, { id: "w34", w: "ÜBERSICHT", c: "genel bakış, özet", a: "die" },
    { id: "w35", w: "MIETE", c: "kira", a: "die" }, { id: "w36", w: "GERÄT", c: "cihaz", a: "das" },
    { id: "w37", w: "ABTEILUNG", c: "departman, bölüm", a: "die" }, { id: "w38", w: "URLAUB", c: "izin, tatil", a: "der" },
    { id: "w39", w: "AUFTRAG", c: "sipariş, iş emri", a: "der" }, { id: "w40", w: "BESTAND", c: "stok, mevcut", a: "der" }
  ]
};
