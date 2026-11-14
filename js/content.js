/* Gelişim — ders içeriği.
   Yeni ders eklemek: ilgili modülün lessons dizisine aynı yapıda nesne ekle.
   Slayt tipleri: intro, cards, flow, compare, phrases, code, table, venn, star, bars, funnel, formula
   Her slaytta h (başlık) ve p (kısa açıklama) olur; görsel kısmı tipe göre çizilir. */

window.TRACKS = [
  { id: "de",  name: "İş Almancası", short: "Almanca", color: "#d1495b", icon: "chat" },
  { id: "sql", name: "SQL",          short: "SQL",     color: "#1f8a83", icon: "db" },
  { id: "pbi", name: "Power BI",     short: "Power BI",color: "#e3a018", icon: "chart" },
  { id: "mkt", name: "Pazarlama ve Satış", short: "Pazarlama", color: "#7a52c7", icon: "target" },
  { id: "car", name: "Kariyer",      short: "Kariyer", color: "#2f6fd6", icon: "compass" }
];

window.MILESTONES = [
  { id: "m1", date: "2026-12-31", title: "İlk modüller tamam", desc: "Almanca M1 ve SQL M1 bitti; ilk Anforderung belgesi geliştiriciye gitti." },
  { id: "m2", date: "2027-03-31", title: "Temel teknik set", desc: "SQL ve Power BI temelleri tamam; CV başarıları rakamlarla yazıldı." },
  { id: "m3", date: "2027-06-30", title: "PL-300 sınavı", desc: "Microsoft Power BI Data Analyst sertifikası." },
  { id: "m4", date: "2027-12-31", title: "Almanca B2 Beruf", desc: "telc Deutsch B2 Beruf ya da eşdeğeri; toplantıda rahat konuşma." },
  { id: "m5", date: "2028-04-30", title: "Aktif başvuru dönemi", desc: "Hedef rollere düzenli başvuru, mülakatlar, içeride pozisyon görüşmesi." },
  { id: "m6", date: "2028-11-01", title: "Kariyer adımı", desc: "Yeni rol: ≥4.000 € brüt, ≤30 km ya da ≥%50 remote." }
];

/* Her alan için kalıcı, sık önerilen kaynaklar */
window.CLASSICS = {
  de:  [["DW Deutsch lernen", "Ücretsiz kurslar, Top-Thema ve yavaş okunan haberler", "https://learngerman.dw.com/de/"],
        ["telc Deutsch B2 Beruf", "İş Almancası sertifikası hakkında bilgi", "https://www.telc.net/"]],
  sql: [["SQLBolt", "Tarayıcıda alıştırmalı, kısa SQL dersleri", "https://sqlbolt.com/"],
        ["Mode SQL Tutorial", "Analist bakışıyla SQL", "https://mode.com/sql-tutorial/"]],
  pbi: [["Microsoft Learn: PL-300", "Resmi sertifika sayfası ve ücretsiz öğrenme yolu", "https://learn.microsoft.com/de-de/credentials/certifications/data-analyst-associate/"],
        ["DAX Guide", "Bütün DAX fonksiyonları, örneklerle", "https://dax.guide/"],
        ["SQLBI", "DAX ve veri modeli konusunda en bilinen kaynak", "https://www.sqlbi.com/"]],
  mkt: [["The Mom Test", "Müşteriyle konuşup gerçek ihtiyacı öğrenme üzerine kısa kitap", "https://www.momtestbook.com/"],
        ["HubSpot Marketing Blog", "Pazarlamanın temelleri ve güncel yazılar", "https://blog.hubspot.com/marketing"]],
  car: [["Entgeltatlas", "Bundesagentur für Arbeit: meslek ve bölgeye göre medyan maaş", "https://web.arbeitsagentur.de/entgeltatlas/"],
        ["karrierebibel.de", "Başvuru, mülakat ve maaş görüşmesi rehberleri", "https://karrierebibel.de/"]]
};

window.CURRICULUM = {
  de: [
    { id: "de1", title: "Yazılı iş iletişimi", goal: "E-posta ve gereksinim belgelerini net ve kibar yazmak", lessons: [
      { id: "de1-1", title: "E-postanın iskeleti", min: 15, slides: [
        { t: "intro", icon: "mail", h: "İyi e-posta okuyana tahmin ettirmez", p: "Okuyan 10 saniyede ne istediğini anlamalı. Bunun için her seferinde aynı iskeleti kullan." },
        { t: "flow", h: "Altı adımlı iskelet", p: "Sıra hep aynı. Kern bölümünü madde madde yazarsan okuma süresi yarıya iner.", steps: [
          ["Betreff", "Konu + ne istediğin"], ["Anrede", "Hallo Herr Weber,"], ["Anlass", "Neden yazıyorum?"],
          ["Kern", "Bilgi veya sorun, maddeler hâlinde"], ["Bitte + Frist", "Ne istiyorum, ne zamana kadar?"], ["Gruß", "Viele Grüße"] ] },
        { t: "phrases", h: "Hazır kalıplar", p: "Bu cümleleri ezberle; her e-postada en az ikisini kullanacaksın.", items: [
          ["Ich melde mich wegen der WE-Liste.", "WE listesi nedeniyle yazıyorum."],
          ["Mir ist aufgefallen, dass …", "Dikkatimi çekti ki …"],
          ["Könnten Sie bitte bis Freitag … prüfen?", "Cumaya kadar … kontrol edebilir misiniz?"],
          ["Anbei finden Sie …", "Ekte … bulabilirsiniz."],
          ["Vielen Dank vorab und viele Grüße", "Şimdiden teşekkürler, selamlar"] ] },
        { t: "compare", h: "Emir değil rica", p: "Almancada kibarlığın anahtarı Konjunktiv II'dir: könnten, würden, wäre.",
          bad: ["Doğrudan", "Schicken Sie mir die Liste."], good: ["Kibar", "Könnten Sie mir bitte die Liste bis Mittwoch schicken?"] },
        { t: "cards", h: "Üç altın kural", p: "Bu üçünü uygularsan e-postaların ekipteki en net e-postalar olur.", items: [
          ["mail", "Bir e-posta, bir konu", "İki konu varsa iki e-posta yaz."],
          ["cal", "Net tarih ver", "\"zeitnah\" değil, \"bis Freitag, 12 Uhr\"."],
          ["list", "Madde kullan", "Üç satırı geçen her açıklamayı maddeye çevir."] ] }
      ], quiz: [
        { q: "\"Mir ist aufgefallen, dass …\" ne demek?", o: ["Dikkatimi çekti ki …", "Bana söylendi ki …", "Unuttum ki …", "Hatırlıyorum ki …"], a: 0, e: "auffallen = göze çarpmak. Bir sorunu nazikçe dile getirmenin en yaygın yolu." },
        { q: "En kibar rica hangisi?", o: ["Schicken Sie die Datei.", "Sie müssen die Datei schicken.", "Könnten Sie mir bitte die Datei schicken?", "Datei schicken, bitte."], a: 2, e: "Konjunktiv II (könnten) + bitte = standart kibar rica." },
        { q: "En iyi Betreff hangisi?", o: ["Frage", "Wichtig!!!", "Event-Liste Oktober – 3 fehlende Einträge, Bitte um Rückmeldung", "Hallo"], a: 2, e: "İyi bir konu satırı hem konuyu hem ne istediğini söyler." },
        { q: "\"zeitnah\" yerine ne yazmak daha iyi?", o: ["bald", "bis Donnerstag, 14 Uhr", "irgendwann", "so schnell wie möglich!!!"], a: 1, e: "Net bir tarih, yanlış anlaşılmayı ve sürekli hatırlatmayı önler." }
      ], task: "Yarın göndereceğin gerçek bir iş e-postasını bu iskeletle yaz. Betreff'te hem konu hem istediğin şey olsun." },

      { id: "de1-2", title: "Gereksinim (Anforderung) yazmak", min: 15, slides: [
        { t: "intro", icon: "doc", h: "Sorun çoğu zaman dil değil, yapı", p: "Geliştirici seni anlamıyorsa, yazdığın şey test edilebilir değildir. Sabit bir yapı bu sorunu çözer." },
        { t: "flow", h: "Gereksinim belgesinin yapısı", p: "Bu beş başlık her gereksinim belgesinde olmalı. Yarım sayfa yeterlidir.", steps: [
          ["Ist-Zustand", "Bugün nasıl yapılıyor?"], ["Problem", "Ne sorun çıkıyor, etkisi ne?"], ["Soll-Zustand", "Hedef durum"],
          ["Anforderungen", "muss / soll / kann"], ["Akzeptanzkriterien", "Ne zaman bitmiş sayılır?"] ] },
        { t: "table", h: "muss, soll, kann", p: "Önceliği fiil belirler. Geliştirici bu üç kelimeyle neyi önce yapacağını anlar.", head: ["Wort", "Anlamı", "Öncelik"], rows: [
          ["muss", "zorunlu, olmazsa olmaz", "1"], ["soll", "olmalı, önemli", "2"], ["kann", "olursa iyi olur", "3"] ] },
        { t: "phrases", h: "Belge için kalıplar", p: "WE listesi örneğiyle. Kendi konuna uyarlaman yeterli.", items: [
          ["Aktuell wird die WE-Liste monatlich manuell in Excel erstellt.", "Şu an WE listesi her ay Excel'de elle oluşturuluyor."],
          ["Dadurch entstehen Doppelerfassungen und Fehler.", "Bu yüzden çift kayıt ve hatalar oluşuyor."],
          ["Ziel ist, dass jedes Gerät nur einmal erfasst wird.", "Hedef, her cihazın yalnızca bir kez kaydedilmesi."],
          ["Die Anforderung gilt als erfüllt, wenn …", "… olduğunda gereksinim karşılanmış sayılır."] ] },
        { t: "compare", h: "Belirsiz ve ölçülebilir", p: "İyi bir gereksinim test edilebilir: yapıldı mı yapılmadı mı, herkes aynı şeyi görür.",
          bad: ["Belirsiz", "Die DB soll mit dem WE besser werden."], good: ["Ölçülebilir", "Beim Wareneingang muss jedes Gerät einmal per Scan erfasst werden. Doppelte Seriennummern müssen beim Speichern blockiert werden."] }
      ], quiz: [
        { q: "\"Akzeptanzkriterien\" nedir?", o: ["Gereksinimin karşılandığını gösteren ölçütler", "Projenin bütçesi", "Müşterinin şikâyetleri", "Geliştiricinin saat ücreti"], a: 0, e: "Kabul kriterleri, \"bitti\" tanımıdır." },
        { q: "Zorunlu bir gereksinim için hangi fiil kullanılır?", o: ["kann", "soll", "muss", "möchte"], a: 2, e: "muss = olmazsa olmaz." },
        { q: "\"Ist-Zustand\" ne demek?", o: ["Hedef durum", "Mevcut durum", "Hata durumu", "Test durumu"], a: 1, e: "Ist = olan, Soll = olması gereken." },
        { q: "Hangisi test edilebilir bir gereksinim?", o: ["Das System soll schneller sein.", "Die Liste soll schöner aussehen.", "Der Export muss in unter 10 Sekunden laden.", "Alles soll automatisch gehen."], a: 2, e: "Rakam ve koşul içeriyor; herkes aynı şekilde test eder." }
      ], task: "WE listesi ya da Event listesi için yarım sayfalık bir Anforderung yaz: Ist, Problem, Soll, 3 muss ve 2 Akzeptanzkriterium. Göndermeden önce bana kontrol ettirebilirsin." },

      { id: "de1-3", title: "Toplantıda fikir savunmak", min: 15, slides: [
        { t: "intro", icon: "chat", h: "İyi fikir tek başına yetmez", p: "Toplantıda doğru anda, doğru kalıpla söylenen fikir kabul görür. Kalıpları önceden hazırlarsan dil engeli küçülür." },
        { t: "flow", h: "İkna eden konuşmanın sırası", p: "Rakam en güçlü argümandır. \"Çok zaman alıyor\" değil, \"ayda yaklaşık 6 saat\".", steps: [
          ["Problem", "Ne oluyor?"], ["Auswirkung", "Etkisi, mümkünse rakamla"], ["Vorschlag", "Benim önerim"], ["Nutzen", "Kazancımız ne?"], ["Nächster Schritt", "Kim, ne, ne zamana kadar?"] ] },
        { t: "phrases", h: "Söz alma ve öneri kalıpları", p: "Bunlar Almanca toplantıların en sık duyulan cümleleri.", items: [
          ["Darf ich kurz etwas ergänzen?", "Kısaca bir şey ekleyebilir miyim?"],
          ["Ich sehe das etwas anders, und zwar weil …", "Bunu biraz farklı görüyorum, çünkü …"],
          ["Mein Vorschlag wäre, …", "Benim önerim … olurdu."],
          ["Was halten Sie davon, wenn wir …?", "… yapsak ne dersiniz?"],
          ["Können wir festhalten, dass …?", "… olduğunu not edebilir miyiz?"],
          ["Wer übernimmt das bis wann?", "Bunu kim, ne zamana kadar üstleniyor?"] ] },
        { t: "compare", h: "Kişiye değil konuya itiraz", p: "Karşı çıkarken \"falsch\" yerine kendi bakış açını anlat. Ortam gerilmez, sen dinlenirsin.",
          bad: ["Sert", "Das ist falsch."], good: ["Yapıcı", "Ich sehe einen Punkt etwas anders: Die Event-Liste ist abrechnungskritisch, deshalb …"] },
        { t: "cards", h: "Toplantıdan önce 5 dakika", p: "Hazırlık, konuşma anındaki stresin yarısını alır.", items: [
          ["doc", "3 cümle yaz", "Ana mesajını önceden Almanca yaz."], ["chart", "Bir rakam getir", "Saat, hata sayısı, euro."], ["flag", "Sonu bağla", "Wer, was, bis wann."] ] }
      ], quiz: [
        { q: "\"Darf ich kurz etwas ergänzen?\" ne zaman kullanılır?", o: ["Toplantıyı bitirirken", "Söz alıp ekleme yaparken", "Özür dilerken", "Tarih sorarken"], a: 1, e: "Kibarca söz almanın standart yolu." },
        { q: "Bir fikri en ikna edici yapan ne?", o: ["Uzun açıklama", "Rakamla gösterilen etki", "Ses tonunu yükseltmek", "Çok sayıda örnek"], a: 1, e: "Rakam tartışmayı fikirden gerçeğe taşır." },
        { q: "\"Können wir festhalten, dass …?\" ne işe yarar?", o: ["Kararı kayda geçirmek", "Toplantıyı ertelemek", "Konuyu değiştirmek", "Birini eleştirmek"], a: 0, e: "festhalten = not etmek, sabitlemek." },
        { q: "En yapıcı itiraz hangisi?", o: ["Das ist Unsinn.", "Nein.", "Ich sehe das etwas anders, weil …", "Das haben wir immer so gemacht."], a: 2, e: "Bakış açını gerekçesiyle sunuyorsun." }
      ], task: "Event listesinin DB'ye taşınması için toplantıda söyleyeceğin 5 cümleyi yaz: Problem, Auswirkung, Vorschlag, Nutzen, Schritt." },

      { id: "de1-4", title: "Maaş ve çalışma koşulları dili", min: 15, slides: [
        { t: "intro", icon: "euro", h: "Bu bir pazarlık, şikâyet değil", p: "Maaş ve Homeoffice konuşmasında masraflarını değil, katkını ve piyasa değerini anlatırsın." },
        { t: "flow", h: "Görüşmenin akışı", p: "Her adımın kendi kalıbı var. Sonda mutlaka ne konuşulduğunu yazıya dök.", steps: [
          ["Termin anfragen", "Görüşme iste"], ["Leistung belegen", "Katkını göster"], ["Marktwert nennen", "Piyasa değerini söyle"],
          ["Konkreter Wunsch", "Net talep"], ["Alternativen", "Homeoffice, yol desteği"], ["Festhalten", "Yazıya dök"] ] },
        { t: "phrases", h: "Görüşme kalıpları", p: "Sakin ve net. Uzun cümle kurmana gerek yok.", items: [
          ["Ich würde gern einen Termin für ein Gespräch über meine Entwicklung und Vergütung vereinbaren.", "Gelişimim ve ücretim hakkında görüşmek için randevu almak isterim."],
          ["In den letzten drei Jahren habe ich … aufgebaut.", "Son üç yılda … kurdum."],
          ["Für vergleichbare Positionen liegt das Marktgehalt bei …", "Benzer pozisyonlarda piyasa maaşı … civarında."],
          ["Ich stelle mir ein Gehalt von … vor.", "… maaş düşünüyorum."],
          ["Wäre es möglich, auf zwei Homeoffice-Tage pro Woche zu erhöhen?", "Haftada iki gün Homeoffice'e çıkmak mümkün olur mu?"] ] },
        { t: "compare", h: "Masraf değil katkı", p: "Yol masrafın gerçek ama işverenin argümanı değil. Katkını ve piyasayı öne koy.",
          bad: ["Zayıf", "Ich verdiene zu wenig und die Fahrt ist teuer."], good: ["Güçlü", "Seit 2023 habe ich den Event-Kalkulator entwickelt und die Sparten-Zusammenführung vorbereitet. Deshalb möchte ich über eine Anpassung meiner Vergütung sprechen."] },
        { t: "cards", h: "Plan B'n hazır olsun", p: "Maaş artmazsa masaya koyabileceğin başka talepler.", items: [
          ["home", "Homeoffice", "Ek gün = yol masrafı ve zaman tasarrufu"], ["car", "Fahrtkostenzuschuss", "Yol desteği ya da Jobticket"], ["book", "Weiterbildung", "PL-300 gibi bir eğitimin karşılanması"] ] }
      ], quiz: [
        { q: "Hangisi en güçlü argüman?", o: ["Kira ve yol masrafım yüksek", "Katkım ve piyasa değerim", "Arkadaşım daha çok kazanıyor", "Uzun zamandır zam almadım"], a: 1, e: "İşveren katkıya ve piyasaya bakar." },
        { q: "\"Ich stelle mir … vor\" ne için kullanılır?", o: ["Kendini tanıtmak için", "Beklentini belirtmek için", "Özür dilemek için", "Toplantıyı bitirmek için"], a: 1, e: "sich etwas vorstellen = bir şey düşünmek, tasavvur etmek." },
        { q: "\"Vergütung\" ne demek?", o: ["İzin", "Ücret / maaş", "Terfi", "Sözleşme"], a: 1, e: "Vergütung, Gehalt'ın daha resmî karşılığı." },
        { q: "Maaş artmazsa hangisi makul bir alternatif talep?", o: ["İstifa tehdidi", "Ek Homeoffice günü", "Konuyu bir daha açmamak", "Mesaiyi azaltmak"], a: 1, e: "Homeoffice senin için doğrudan para ve zaman demek." }
      ], task: "Şefine görüşme talebi için 3–4 cümlelik bir e-posta taslağı yaz. Henüz gönderme; önce Kariyer M1'deki maaş dersini bitir." }
    ]},
    { id: "de2", title: "Sözlü iletişim ve toplantı yönetimi", goal: "Toplantı yönetmek, telefon, kısa sunum", lessons: [] },
    { id: "de3", title: "Teamleitung dili", goal: "Görev dağıtmak, geri bildirim, çatışma", lessons: [] },
    { id: "de4", title: "B2 Beruf hazırlığı", goal: "Sınav formatı ve deneme soruları", lessons: [] }
  ],

  sql: [
    { id: "sql1", title: "SQL temelleri", goal: "Kendi DB'nden veri çekebilmek", lessons: [
      { id: "sql1-1", title: "Tablo, satır ve SELECT", min: 15, slides: [
        { t: "intro", icon: "db", h: "SQL, veritabanına soru sorma dili", p: "Excel'de filtre ve formülle yaptığını SQL'de tek bir cümleyle yaparsın. Senin DB'n de MySQL/MariaDB, yani SQL konuşuyor." },
        { t: "table", h: "Excel'den SQL'e sözlük", p: "Bildiğin her şeyin SQL'de bir karşılığı var. Yeni öğrendiğin şey kavram değil, yazım.", head: ["Excel", "SQL"], rows: [
          ["Tablo (Strg+T)", "Table"], ["Satır", "Row / Datensatz"], ["Sütun", "Column"], ["Filtre", "WHERE"], ["Pivot", "GROUP BY"], ["SVERWEIS", "JOIN"] ] },
        { t: "code", h: "İlk sorgu", p: "SELECT hangi sütunları istediğini, FROM hangi tablodan okuyacağını söyler. Tablo adları örnek; senin DB'nde farklı olabilir.",
          code: "SELECT seriennummer, modell, lagerstatus\nFROM assets;", out: { head: ["seriennummer", "modell", "lagerstatus"], rows: [["C02X1…", "MacBook Pro 14", "Pool"], ["5CG21…", "HP EliteBook 840", "Aktiv"], ["5CG33…", "HP Z2 G9", "Betankung"]] } },
        { t: "code", h: "WHERE = filtre", p: "Metin değerleri tek tırnak içinde yazılır. Sonuç: yalnızca Pool'daki cihazlar.",
          code: "SELECT seriennummer, modell\nFROM assets\nWHERE lagerstatus = 'Pool';", out: { head: ["seriennummer", "modell"], rows: [["C02X1…", "MacBook Pro 14"], ["5CG19…", "HP EliteBook 830"]] } },
        { t: "cards", h: "Unutma", p: "Bu üç kural, ilk haftadaki hataların çoğunu önler.", items: [
          ["list", "Sıra sabit", "SELECT → FROM → WHERE"], ["db", "* = tüm sütunlar", "Büyük tablolarda dikkatli kullan"], ["check", "; ile bitir", "Her sorgu noktalı virgülle biter"] ] }
      ], quiz: [
        { q: "Hangi kelime verinin hangi tablodan okunacağını söyler?", o: ["SELECT", "FROM", "WHERE", "TABLE"], a: 1, e: "FROM tabloyu belirtir." },
        { q: "Pool'daki tüm cihazları hangi sorgu getirir?", o: ["SELECT * FROM assets WHERE lagerstatus = 'Pool';", "SELECT assets WHERE Pool;", "FROM assets SELECT Pool;", "SELECT * WHERE lagerstatus = Pool FROM assets;"], a: 0, e: "Sıra SELECT → FROM → WHERE, metin tırnak içinde." },
        { q: "SELECT * ne yapar?", o: ["Tüm tabloları siler", "Tüm sütunları getirir", "Satırları sayar", "Yalnızca ilk satırı getirir"], a: 1, e: "* = bütün sütunlar." },
        { q: "WHERE'in Excel'deki karşılığı nedir?", o: ["Pivot", "SVERWEIS", "Filtre", "Grafik"], a: 2, e: "WHERE satırları koşula göre süzer." }
      ], task: "Kâğıda yaz: lagerstatus değeri 'Betankung' olan cihazların seri numarasını ve modelini getiren sorgu." },

      { id: "sql1-2", title: "Filtrelemek ve sıralamak", min: 15, slides: [
        { t: "intro", icon: "filter", h: "Koşulları birleştirmek", p: "Gerçek sorular tek koşullu değildir: \"kfl'de olup Pool'da duran ve garantisi biten cihazlar\" gibi." },
        { t: "code", h: "AND ve OR", p: "AND iki koşulun da doğru olmasını ister, OR birinin doğru olması yeter. Karıştırıyorsan parantez kullan.",
          code: "SELECT seriennummer, modell\nFROM assets\nWHERE sparte = 'kfl'\n  AND lagerstatus = 'Pool';" },
        { t: "table", h: "En çok kullanacağın operatörler", p: "Bu yedisi günlük işinin %90'ını karşılar.", head: ["Operatör", "Anlamı", "Örnek"], rows: [
          ["=  <>", "eşit / eşit değil", "sparte <> 'ges'"], ["<  >", "küçük / büyük", "miete > 50"], ["IN", "listeden biri", "sparte IN ('kfl','lidl-s')"],
          ["LIKE", "metin deseni", "modell LIKE 'MacBook%'"], ["BETWEEN", "aralık", "datum BETWEEN '2026-10-01' AND '2026-10-31'"], ["IS NULL", "boş", "bemerkung IS NULL"] ] },
        { t: "code", h: "ORDER BY ve LIMIT", p: "ORDER BY sıralar (ASC artan, DESC azalan), LIMIT ilk N satırı alır. Örnek: garantisi en erken bitecek 10 cihaz.",
          code: "SELECT seriennummer, garantie_bis\nFROM assets\nWHERE garantie_bis < '2027-01-01'\nORDER BY garantie_bis ASC\nLIMIT 10;" },
        { t: "compare", h: "NULL tuzağı", p: "Boş değer (NULL) eşittir işaretiyle bulunmaz. Bu, başlangıçta en sık yapılan hatadır.",
          bad: ["Çalışmaz", "WHERE bemerkung = NULL"], good: ["Doğru", "WHERE bemerkung IS NULL"] }
      ], quiz: [
        { q: "LIKE 'HP%' neyi bulur?", o: ["HP ile biten değerleri", "HP ile başlayan değerleri", "Tam olarak 'HP' olanları", "HP içermeyenleri"], a: 1, e: "% = herhangi bir karakter dizisi. 'HP%' → HP ile başlayan." },
        { q: "Boş değerleri nasıl bulursun?", o: ["= NULL", "= ''", "IS NULL", "== NULL"], a: 2, e: "NULL yalnızca IS NULL / IS NOT NULL ile kontrol edilir." },
        { q: "Sparte'si kfl ya da lidl-s olanlar için en kısa yazım?", o: ["sparte = 'kfl, lidl-s'", "sparte IN ('kfl','lidl-s')", "sparte LIKE 'kfl lidl-s'", "sparte BETWEEN 'kfl' AND 'lidl-s'"], a: 1, e: "IN bir değer listesi alır." },
        { q: "En yeni tarihten en eskiye sıralama?", o: ["ORDER BY datum ASC", "ORDER BY datum DESC", "SORT datum", "LIMIT datum"], a: 1, e: "DESC = azalan, yani en yeni en üstte." }
      ], task: "Garantisi önümüzdeki 6 ay içinde bitecek Apple cihazlarını bulan sorguyu yaz (LIKE + tarih koşulu)." },

      { id: "sql1-3", title: "GROUP BY: SQL'in pivot tablosu", min: 15, slides: [
        { t: "intro", icon: "pivot", h: "Pivot tablo biliyorsan GROUP BY biliyorsun", p: "Satırları bir sütuna göre gruplar, her grup için sayar ya da toplarsın." },
        { t: "bars", h: "Sparte başına aktif cihaz", p: "Bu grafik tek bir sorgunun sonucu: SELECT sparte, COUNT(*) FROM assets GROUP BY sparte. Rakamlar örnektir.", unit: "", items: [["lidl-s", 31050], ["lidl-dl", 24977], ["kfl", 18420]] },
        { t: "table", h: "Toplama fonksiyonları", p: "Pivot tablodaki \"değer alanı\" seçeneklerinin aynısı.", head: ["Fonksiyon", "Ne yapar?"], rows: [
          ["COUNT(*)", "satır sayısı"], ["SUM(miete)", "toplam"], ["AVG(miete)", "ortalama"], ["MIN / MAX", "en küçük / en büyük"] ] },
        { t: "code", h: "Mükerrer seri numaraları tek sorguda", p: "DB_Abzug'daki çift seri numarası sorununu bulmanın en hızlı yolu budur. HAVING, gruplamadan sonra filtreler.",
          code: "SELECT seriennummer, COUNT(*) AS anzahl\nFROM db_abzug\nGROUP BY seriennummer\nHAVING COUNT(*) > 1;", out: { head: ["seriennummer", "anzahl"], rows: [["5CG21…", "2"], ["C02Y7…", "3"]] } },
        { t: "compare", h: "WHERE mı HAVING mi?", p: "İkisi de filtreler, ama farklı zamanda.",
          bad: ["WHERE", "Gruplamadan ÖNCE tek tek satırları süzer."], good: ["HAVING", "Gruplamadan SONRA grupları süzer (COUNT, SUM sonucuna göre)."] }
      ], quiz: [
        { q: "GROUP BY'ın Excel'deki karşılığı nedir?", o: ["Filtre", "Pivot tablo", "SVERWEIS", "Koşullu biçimlendirme"], a: 1, e: "Gruplama + toplama = pivot." },
        { q: "Birden fazla geçen seri numaralarını hangi koşul bulur?", o: ["WHERE COUNT(*) > 1", "HAVING COUNT(*) > 1", "LIMIT 1", "ORDER BY COUNT(*)"], a: 1, e: "COUNT gibi toplama sonuçları HAVING ile filtrelenir." },
        { q: "WHERE ile HAVING arasındaki fark?", o: ["Fark yok", "WHERE gruplardan sonra, HAVING önce çalışır", "WHERE satırları gruplamadan önce, HAVING grupları sonra süzer", "HAVING yalnızca metinle çalışır"], a: 2, e: "Sıra: FROM → WHERE → GROUP BY → HAVING → SELECT." },
        { q: "SELECT sparte, SUM(miete) … GROUP BY sparte ne verir?", o: ["Toplam cihaz sayısı", "Sparte başına toplam kira", "En yüksek kira", "Tüm satırlar"], a: 1, e: "Her Sparte grubu için miete toplanır." }
      ], task: "Model başına aktif cihaz sayısını en çoktan en aza sıralı getiren sorguyu yaz." },

      { id: "sql1-4", title: "JOIN: SVERWEIS'in büyük kardeşi", min: 15, slides: [
        { t: "intro", icon: "link", h: "İki tabloyu ortak anahtarla birleştir", p: "SVERWEIS tek sütun getirir; JOIN iki tablonun istediğin bütün sütunlarını tek sonuçta birleştirir." },
        { t: "venn", kind: "inner", a: "assets", b: "listepreise", h: "INNER JOIN", p: "Yalnızca iki tabloda da eşleşen satırlar gelir. Fiyatı olmayan cihaz sonuçta görünmez." },
        { t: "venn", kind: "left", a: "assets", b: "listepreise", h: "LEFT JOIN", p: "Soldaki tablonun tamamı gelir. Eşleşmeyenlerde sağ taraf NULL olur; SVERWEIS'teki #NV gibi." },
        { t: "code", h: "Cihazlara fiyat eklemek", p: "a ve p takma addır; uzun tablo adlarını tekrar yazmazsın. ON birleştirme koşuludur.",
          code: "SELECT a.seriennummer, a.modell, p.miete\nFROM assets a\nLEFT JOIN listepreise p\n  ON a.modell = p.modell;" },
        { t: "cards", h: "Controlling'de JOIN tuzakları", p: "listepreise'de aynı modelin birden çok Staffel satırı vardır. Bu, sonucu çoğaltabilir.", items: [
          ["alert", "Satır sayısı arttı mı?", "Sağdaki anahtar benzersiz değildir"], ["cal", "Geçerlilik ekle", "ON … AND datum BETWEEN gueltig_ab AND gueltig_bis"], ["filter", "Eşleşmeyeni bul", "LEFT JOIN + WHERE p.modell IS NULL"] ] }
      ], quiz: [
        { q: "Fiyatı olmayanlar dahil bütün cihazlar için hangi JOIN?", o: ["INNER JOIN", "LEFT JOIN (assets solda)", "RIGHT JOIN (assets solda)", "JOIN gerekmez"], a: 1, e: "LEFT JOIN soldaki tablonun tamamını korur." },
        { q: "LEFT JOIN'de eşleşmeyen satırın sağ taraf değerleri ne olur?", o: ["0", "Boş metin", "NULL", "Satır silinir"], a: 2, e: "SVERWEIS'teki #NV'nin karşılığı NULL." },
        { q: "JOIN sonrası satır sayısı beklenenden fazla. Neden?", o: ["Sorgu yavaş", "Sağdaki anahtar benzersiz değil", "LIMIT eksik", "WHERE yanlış yerde"], a: 1, e: "Bir model için 3 fiyat satırı varsa, o cihaz 3 kez görünür." },
        { q: "ON ne belirtir?", o: ["Sıralamayı", "Birleştirme koşulunu", "Tablo adını", "Gruplamayı"], a: 1, e: "Hangi sütunların eşleşeceğini söyler." }
      ], task: "Fiyat listesinde karşılığı olmayan modelleri bulan sorguyu yaz (LEFT JOIN + IS NULL)." }
    ]},
    { id: "sql2", title: "CASE, tarihler ve alt sorgular", goal: "Event kurallarını SQL ile ifade etmek", lessons: [] },
    { id: "sql3", title: "Veri kalitesi sorguları", goal: "Controlling kontrollerini SQL'e taşımak", lessons: [] },
    { id: "sql4", title: "Pratik: kendi DB sorgularım", goal: "Gerçek iş sorularıyla alıştırma", lessons: [] }
  ],

  pbi: [
    { id: "pbi1", title: "Power BI temelleri", goal: "İlk gerçek raporunu kurmak", lessons: [
      { id: "pbi1-1", title: "Power BI nedir, Excel'den farkı", min: 15, slides: [
        { t: "intro", icon: "chart", h: "Bildiğin Power Query'nin devamı", p: "Power BI = Power Query + veri modeli + DAX + etkileşimli rapor. İlk parçayı zaten iyi biliyorsun." },
        { t: "flow", h: "Power BI'da işin akışı", p: "Senin bugün Excel'de yaptığın kısım ilk iki adım. Gerisi yeni ama mantığı tanıdık.", steps: [
          ["Daten abrufen", "Kaynağa bağlan"], ["Power Query", "Temizle ve dönüştür (biliyorsun)"], ["Datenmodell", "Tablolar arası ilişkiler"],
          ["DAX", "Hesaplamalar (Measures)"], ["Bericht", "Grafik ve filtreler"], ["Service", "Paylaş, otomatik yenile"] ] },
        { t: "table", h: "Excel mi Power BI mı?", p: "Excel kötü değil; ama 233.000 satırlık export ve paylaşılan rapor için Power BI daha uygun.", head: ["", "Excel", "Power BI"], rows: [
          ["Veri hacmi", "~1 milyon satır", "Yüz milyonlarca (sıkıştırılmış)"], ["Paylaşım", "Dosya gönderme", "Link + otomatik yenileme"], ["Hesaplama", "Hücre formülü", "Measure (DAX)"], ["Etkileşim", "Sınırlı", "Tıkla, her şey filtrelenir"] ] },
        { t: "bars", h: "Tahmini başlangıç noktan", p: "Bu sadece bir tahmin. Power Query sayesinde yolun önemli kısmını zaten yürümüşsün.", unit: "%", items: [["Power Query", 80], ["Rapor tasarımı", 30], ["Veri modeli", 20], ["DAX", 10]] },
        { t: "cards", h: "Neden PL-300?", p: "Microsoft'un Power BI Data Analyst sertifikası, Almanya'daki analist ilanlarında sık geçer.", items: [
          ["trophy", "Görünürlük", "CV'de somut ve doğrulanabilir"], ["book", "Ücretsiz hazırlık", "Microsoft Learn yolu"], ["euro", "Pazarlık kozu", "Şirketin ödemesini isteyebilirsin"] ] }
      ], quiz: [
        { q: "Power BI'ın hangi bileşenini zaten biliyorsun?", o: ["DAX", "Power Query", "Power BI Service", "Paginated Reports"], a: 1, e: "Excel'deki Power Query, Power BI'dakiyle aynı motor." },
        { q: "Raporu paylaşma ve otomatik yenileme nerede olur?", o: ["Power BI Desktop", "Power BI Service", "Excel", "SharePoint listesi"], a: 1, e: "Desktop'ta kurarsın, Service'te yayınlarsın." },
        { q: "PL-300 nedir?", o: ["Bir Power BI eklentisi", "Microsoft Power BI Data Analyst sertifikası", "Bir DAX fonksiyonu", "Lisans türü"], a: 1, e: "Analist rolleri için en bilinen Power BI sertifikası." },
        { q: "Power BI'da filtreye göre değişen hesaplar ne ile yapılır?", o: ["Hücre formülü", "Measure (DAX)", "VBA makrosu", "SVERWEIS"], a: 1, e: "Measure'lar rapordaki filtreye göre anında hesaplanır." }
      ], task: "İş bilgisayarında Power BI Desktop kurulu mu, kontrol et (yoksa IT'ye sor). Kuruluysa bir Excel tablonu yükle ve tek bir sütun grafiği çiz." },

      { id: "pbi1-2", title: "Veri modeli: yıldız şema", min: 15, slides: [
        { t: "intro", icon: "model", h: "İyi rapor iyi modelle başlar", p: "Her şeyi tek dev tabloya koymak Excel alışkanlığıdır. Power BI'da tabloları görevlerine göre ayırırsın." },
        { t: "star", h: "Event faturalaması için yıldız şema", p: "Ortada olaylar ve rakamlar (Fakt), etrafta kim, ne, nerede, ne zaman sorularının cevabı (Dimension).", fact: "Events", dims: ["Datum", "Modell", "Standort", "Kostenstelle", "Sparte", "Event-Art"] },
        { t: "table", h: "Fakt ve Dimension", p: "Bir tablonun hangisi olduğunu satır sayısından ve içeriğinden anlarsın.", head: ["", "Fakt", "Dimension"], rows: [
          ["Satır sayısı", "Çok (her olay bir satır)", "Az (her model bir kez)"], ["İçerik", "Sayılar, tarihler, anahtarlar", "Açıklamalar, gruplar"], ["Örnek", "Asset History, Events", "Modell, Standort, KST"] ] },
        { t: "cards", h: "İlişkilerin üç kuralı", p: "Bu kurallar modeli hızlı ve doğru tutar.", items: [
          ["link", "1 → n", "Dimension'da 1, Fakt'ta çok satır"], ["arrow", "Tek yönlü filtre", "Dimension'dan Fakt'a doğru"], ["cal", "Ayrı Datum tablosu", "Zaman analizi için şart"] ] },
        { t: "compare", h: "Dev tablo ve yıldız", p: "Yıldız şema hem daha hızlıdır hem de bir değişikliği tek yerde yapmanı sağlar.",
          bad: ["Tek dev tablo", "233.000 satır × 60 sütun, model adı her satırda tekrar ediyor."], good: ["Yıldız şema", "1 Fakt + 6 küçük Dimension; model adı tek yerde."] }
      ], quiz: [
        { q: "Event satırları hangi tabloya gider?", o: ["Dimension", "Fakt", "Datum", "Hiçbiri"], a: 1, e: "Her olay bir satır: tipik Fakt tablosu." },
        { q: "Modell listesi hangi tür tablodur?", o: ["Fakt", "Dimension", "Measure", "Parametre"], a: 1, e: "Her model bir kez, açıklayıcı bilgi: Dimension." },
        { q: "İlişki genelde hangi yönde kurulur?", o: ["Fakt (1) → Dimension (n)", "Dimension (1) → Fakt (n)", "n → n", "Yönü önemsiz"], a: 1, e: "Bir modele çok sayıda olay bağlanır." },
        { q: "Neden ayrı bir Datum tablosu gerekir?", o: ["Renkler için", "Zaman analizi fonksiyonları için", "Dosya küçülsün diye", "Gerekmez"], a: 1, e: "Ay, çeyrek, geçen yılla karşılaştırma gibi hesaplar ona dayanır." }
      ], task: "Event faturalama sürecin için kâğıda bir yıldız şema çiz: ortada ne var, etrafında hangi tablolar?" },

      { id: "pbi1-3", title: "DAX'a giriş: Measure ve sütun", min: 15, slides: [
        { t: "intro", icon: "fx", h: "DAX, Power BI'ın formül dili", p: "Excel formüllerine benzer, ama hücreyle değil tablo ve sütunlarla çalışır." },
        { t: "table", h: "Hesaplanan sütun ve Measure", p: "En önemli ayrım bu. Çoğu hesap Measure olmalı.", head: ["", "Hesaplanan sütun", "Measure"], rows: [
          ["Ne zaman hesaplanır?", "Yüklemede, her satır için", "Raporda, filtreye göre anında"], ["Excel benzeri", "Yardımcı sütun", "Pivot'taki değer alanı"], ["Örnek", "Monitor ja/nein", "Toplam kira, aktif cihaz sayısı"] ] },
        { t: "code", h: "İlk measure'ların", p: "SUM toplar, COUNTROWS satır sayar. CALCULATE ise filtreyi değiştirerek hesaplar; DAX'ın en önemli fonksiyonudur.",
          code: "Gesamtmiete = SUM ( Assets[Miete] )\n\nAktive Geräte =\nCALCULATE (\n    COUNTROWS ( Assets ),\n    Assets[Status] = \"Aktiv\"\n)" },
        { t: "flow", h: "Filtre bağlamı", p: "Aynı measure her grafikte farklı sonuç verir. Bu bir hata değil, tasarımın kendisi.", steps: [
          ["Kullanıcı seçer", "Sparte = kfl"], ["Filtre modele akar", "Dimension → Fakt"], ["Measure hesaplar", "Yalnızca kfl satırları"], ["Grafik güncellenir", "Anında"] ] },
        { t: "cards", h: "İyi alışkanlıklar", p: "Başta edinirsen ileride çok zaman kazandırır.", items: [
          ["list", "Measure tablosu", "Hepsini tek bir yerde topla"], ["doc", "Anlaşılır isim", "\"Events Monat\", \"Umsatz Events\""], ["check", "DIVIDE kullan", "Sıfıra bölmede hata vermez"] ] }
      ], quiz: [
        { q: "Filtreye göre anında değişen hesap hangisi?", o: ["Hesaplanan sütun", "Measure", "Power Query adımı", "Tablo ilişkisi"], a: 1, e: "Measure, filtre bağlamında hesaplanır." },
        { q: "CALCULATE ne yapar?", o: ["Tablo siler", "Filtreyi değiştirerek hesaplar", "Grafik çizer", "Veri içe aktarır"], a: 1, e: "Bir ifadeyi değiştirilmiş filtrelerle hesaplar." },
        { q: "Bölme için güvenli fonksiyon hangisi?", o: ["DIVIDE", "SPLIT", "/ işareti her zaman", "MOD"], a: 0, e: "DIVIDE(a; b) sıfıra bölmede boş ya da alternatif değer döner." },
        { q: "COUNTROWS(Assets) ne döner?", o: ["Sütun sayısı", "Satır sayısı", "Toplam kira", "Benzersiz modeller"], a: 1, e: "Mevcut filtredeki satır sayısı." }
      ], task: "Event listen için yazacağın 3 measure'ın adını ve neyi hesaplayacağını yaz." },

      { id: "pbi1-4", title: "İyi rapor tasarımı", min: 15, slides: [
        { t: "intro", icon: "layout", h: "Bir sayfa, bir mesaj", p: "Rapor ne kadar çok şey gösterirse o kadar az şey anlatır. Okuyan 5 saniyede ana mesajı görmeli." },
        { t: "table", h: "Soruya göre grafik seç", p: "Grafik türünü soru belirler, zevk değil.", head: ["Soru", "Grafik"], rows: [
          ["Zaman içinde nasıl değişti?", "Çizgi"], ["Kategoriler nasıl karşılaştırılır?", "Çubuk / sütun"], ["Tek önemli rakam?", "KPI kartı"], ["Ayrıntı?", "Tablo (en altta)"], ["Pay (2–3 parça)?", "Çubuk, pasta değil"] ] },
        { t: "flow", h: "Sayfa düzeni", p: "Göz yukarıdan aşağıya ve soldan sağa okur. En önemli şey sol üstte.", steps: [
          ["Üst", "4 KPI kartı"], ["Orta", "Trend + karşılaştırma"], ["Alt", "Ayrıntı tablosu"], ["Kenar", "Filtreler (Sparte, Monat)"] ] },
        { t: "compare", h: "Kalabalık ve sade", p: "Sade rapor daha çok bilgi verir, çünkü okunur.",
          bad: ["Kalabalık", "12 grafik, 8 renk, 3 pasta grafik"], good: ["Sade", "4 KPI, 2 grafik, tek vurgu rengi"] },
        { t: "cards", h: "Üç küçük kural", p: "Profesyonel görünümün sırrı bu küçük kararlar.", items: [
          ["alert", "Renk anlam taşısın", "Kırmızı = sorun, başka anlamı olmasın"], ["doc", "Başlık cevap versin", "\"Okt: Events +12 % ggü. Sep\""], ["user", "Okuyanı düşün", "Finance ne görmek ister?"] ] }
      ], quiz: [
        { q: "Aylık Event sayısının seyri için hangi grafik?", o: ["Pasta", "Çizgi", "Harita", "Tablo"], a: 1, e: "Zaman içinde değişim = çizgi." },
        { q: "Tek önemli rakam (örn. bu ayki ciro) nasıl gösterilir?", o: ["KPI kartı", "Dağılım grafiği", "Pasta", "Ağaç haritası"], a: 0, e: "Kart, tek rakamı en net gösterir." },
        { q: "Hangisi iyi bir grafik başlığı?", o: ["Grafik 1", "Events", "Okt: Events +12 % ggü. Sep", "Daten"], a: 2, e: "Başlık okuyana mesajı söyler." },
        { q: "En önemli bilgi sayfanın neresinde olmalı?", o: ["Sağ alt", "Sol üst", "Orta alt", "Ayrı sayfada"], a: 1, e: "Okuma sol üstten başlar." }
      ], task: "Faturalama kontrolün için ideal panonun taslağını kâğıda çiz: 4 KPI, 2 grafik, filtreler." }
    ]},
    { id: "pbi2", title: "Zaman zekâsı ve ileri DAX", goal: "Geçen ayla, geçen yılla karşılaştırma", lessons: [] },
    { id: "pbi3", title: "Power BI Service", goal: "Yayınlama, paylaşım, otomatik yenileme", lessons: [] },
    { id: "pbi4", title: "PL-300 sınav hazırlığı", goal: "Sınav konuları ve deneme soruları", lessons: [] }
  ],

  mkt: [
    { id: "mkt1", title: "Satışın temeli", goal: "TTSC App'i ilk kulüplere anlatabilmek", lessons: [
      { id: "mkt1-1", title: "Ürün değil sorun sat", min: 15, slides: [
        { t: "intro", icon: "target", h: "İnsanlar ürün almaz, çözüm alır", p: "Kimse \"takvim modülü\" istemez. İstediği şey, antrenmana kimin geleceğini WhatsApp'ta saymak zorunda kalmamaktır." },
        { t: "formula", h: "Değer önerisinin dört parçası", p: "TTSC App örneği. Her ürün, hizmet ya da iş başvurusu için aynı kalıp çalışır.", parts: [
          ["Kime?", "Amatör kulüp yönetimi ve antrenörler"], ["Sorun", "Bilgi WhatsApp'ta kayboluyor, kim geliyor belli değil"], ["Çözüm", "Takvim, katılım ve istatistik tek uygulamada"], ["Kazanç", "Antrenör 10 saniyede kimin geleceğini görür"] ] },
        { t: "compare", h: "Özellik listesi ve fayda", p: "Özellik listesi seni anlatır, fayda karşındakini anlatır. İnsanlar kendileriyle ilgilenir.",
          bad: ["Özellik", "Takvim, chat, istatistik, oyunlar, taktik ve 4 dil var."], good: ["Fayda", "Antrenmana kimin geleceğini artık WhatsApp'ta saymanız gerekmiyor."] },
        { t: "cards", h: "Özelliği faydaya çevir", p: "Her özellik için \"Yani?\" diye sor. Cevap faydadır.", items: [
          ["bell", "Push bildirimi", "Yani: kimse antrenmanı unutmaz"], ["chat", "4 dil", "Yani: her oyuncu notu kendi dilinde okur"], ["chart", "İstatistik", "Yani: sezon sonunda katılım tartışması biter"] ] },
        { t: "intro", icon: "quote", h: "Tek soruluk test", p: "Yazdığın her cümle şu soruyu cevaplamalı: \"Peki bu bana ne kazandırır?\" Cevaplamıyorsa sil." }
      ], quiz: [
        { q: "Hangisi fayda cümlesi?", o: ["Uygulamada 12 modül var.", "Supabase altyapısı kullanıyoruz.", "Antrenör kimin geleceğini tek bakışta görür.", "Arayüz kırmızı-beyaz."], a: 2, e: "Kullanıcının hayatında neyin değiştiğini söylüyor." },
        { q: "Değer önerisinin ilk parçası nedir?", o: ["Fiyat", "Kime (hedef kitle)", "Logo", "Teknoloji"], a: 1, e: "Kime hitap ettiğini bilmeden sorun da fayda da belirsiz kalır." },
        { q: "Özelliği faydaya çevirmek için hangi soru sorulur?", o: ["Kaç para?", "Yani?", "Ne zaman?", "Kim yaptı?"], a: 1, e: "\"Yani?\" sorusu özellikten faydaya geçirir." },
        { q: "Müşteriler genelde neyi satın alır?", o: ["Teknolojiyi", "Bir sorunun çözümünü", "Özellik sayısını", "Markayı"], a: 1, e: "Sorun ne kadar acı veriyorsa çözüm o kadar değerlidir." }
      ], task: "TTSC App için tek cümlelik değer önerini yaz: [Kime] için, [hangi sorunu] çözer, [ne kazandırır]." },

      { id: "mkt1-2", title: "Hedef müşteriyi daralt", min: 15, slides: [
        { t: "intro", icon: "zoom", h: "Herkese satan, kimseye satamaz", p: "Küçük ve net bir hedef kitle, mesajını keskinleştirir ve ilk müşteriyi bulmayı kolaylaştırır." },
        { t: "funnel", h: "Daraltma adımları", p: "Her adımda pazar küçülür ama mesajın güçlenir. En alttaki grup, senin açık farkının olduğu yer.", items: [
          ["Bütün spor kulüpleri", 100], ["Futbol kulüpleri", 70], ["Amatör futbol", 50], ["Baden-Württemberg, Kreisliga", 30], ["Çok uluslu, çok dilli takımlar", 15] ] },
        { t: "cards", h: "Persona: Kassenwart Kemal, 42", p: "Hayali ama gerçekçi bir müşteri. Her mesajı ona yazıyormuş gibi yaz.", items: [
          ["user", "Kim?", "Gönüllü yönetici, tam zamanlı çalışıyor"], ["alert", "Derdi", "Aidat takibi, katılım, dağınık WhatsApp"], ["home", "Bugün ne kullanıyor?", "Excel ve WhatsApp grupları"] ] },
        { t: "compare", h: "Geniş ve dar konumlanma", p: "Spond gibi büyük uygulamalarla aynı alanda yarışmak zor. Dar alanda farkın görünür.",
          bad: ["Geniş", "Her kulüp için bir uygulama."], good: ["Dar", "Çok uluslu amatör takımlar için: her oyuncu kendi dilinde."] },
        { t: "cards", h: "Dar hedef neden kazanır?", p: "İlk 10 müşteri için en önemli şey odak.", items: [
          ["mic", "Keskin mesaj", "Tek cümleyle anlatılır"], ["users", "Kolay ulaşım", "Kulüpler birbirini tanır"], ["star", "Tavsiye zinciri", "Bir kulüp diğerine söyler"] ] }
      ], quiz: [
        { q: "Neden dar bir hedef kitle seçilir?", o: ["Daha az para kazanmak için", "Mesaj keskinleşir, ilk müşteri kolay bulunur", "Rakip olmasın diye", "Reklam yasak olduğu için"], a: 1, e: "Başlangıçta odak her şeydir; büyümek sonra gelir." },
        { q: "Persona nedir?", o: ["Gerçek bir müşterinin adı", "Hedef müşteriyi temsil eden ayrıntılı bir profil", "Logo tasarımı", "Fiyat listesi"], a: 1, e: "Mesajları somut birine yazmanı sağlar." },
        { q: "TTSC App'in en net farkı hangisi?", o: ["Takvim olması", "Çok dilli iletişim", "Ücretsiz olması", "Kırmızı tasarım"], a: 1, e: "Büyük rakiplerin çoğunda bu odak yok." },
        { q: "İlk müşteriler için en iyi kaynak?", o: ["Pahalı reklam", "Sıcak ağ: tanıdığın kulüpler", "Rastgele e-posta", "Fuar standı"], a: 1, e: "Güven zaten var; geri bildirim hızlı gelir." }
      ], task: "Bölgende (Neckar-Odenwald, Heilbronn) tanıdığın 10 kulübü listele. Hangileri hedef nişine uyuyor?" },

      { id: "mkt1-3", title: "30 saniyelik pitch", min: 15, slides: [
        { t: "intro", icon: "mic", h: "Ezberlenmiş bir paragraf dil korkusunu yener", p: "Almanca satış konuşması zor gelir. Ama 30 saniyelik metni bir kez yazıp çalışırsan her seferinde aynı netlikte söylersin." },
        { t: "formula", h: "Pitch kalıbı", p: "Bu kalıp neredeyse her ürün için çalışır. Boşlukları doldurman yeterli.", parts: [
          ["Für …", "Zielgruppe"], ["die …", "Problem"], ["ist … ein …", "Produkt + Kategorie"], ["das …", "Nutzen"], ["Anders als …", "Alternative"] ] },
        { t: "phrases", h: "Almanca örnek pitch", p: "Sesli oku. Cümleler kısa ve günlük dilde.", items: [
          ["Für Amateurvereine mit Spielern aus vielen Ländern,", "Birçok ülkeden oyuncusu olan amatör kulüpler için,"],
          ["die Termine und Zusagen in WhatsApp verlieren,", "randevuları ve katılımları WhatsApp'ta kaybeden,"],
          ["ist die TTSC App eine einfache Vereins-App,", "TTSC App basit bir kulüp uygulamasıdır,"],
          ["mit der jeder Spieler alles in seiner Sprache sieht.", "her oyuncu her şeyi kendi dilinde görür."],
          ["Wie organisiert ihr das gerade?", "Siz bunu şu an nasıl yapıyorsunuz?"] ] },
        { t: "compare", h: "Teknik dil ve fayda dili", p: "Karşındaki Supabase'i bilmez ve umursamaz. Teknik ayrıntı yalnızca sorulursa.",
          bad: ["Teknik", "Es ist eine PWA mit Supabase-Backend und Push-Benachrichtigungen."], good: ["Fayda", "Der Trainer sieht sofort, wer zum Training kommt."] },
        { t: "cards", h: "Sunarken", p: "Pitch bir monolog değil, sohbetin açılışıdır.", items: [
          ["clock", "30 saniye", "Fazlası dinlenmez"], ["chat", "Soruyla bitir", "Karşındakini konuşturur"], ["play", "Göster", "Telefonda TTSC verisiyle canlı demo"] ] }
      ], quiz: [
        { q: "Pitch neden bir soruyla bitmeli?", o: ["Kibarlık için", "Karşındaki konuşsun ve ihtiyacını anlatsın diye", "Süre dolsun diye", "Fiyatı sormak için"], a: 1, e: "Onun cevabı, sana neyi vurgulaman gerektiğini söyler." },
        { q: "İlk görüşmede hangisinden kaçınmalı?", o: ["Somut fayda", "Teknik ayrıntı yığını", "Kısa demo", "Soru sormak"], a: 1, e: "Teknik ayrıntı ancak sorulursa." },
        { q: "\"Wie organisiert ihr das gerade?\" ne demek?", o: ["Bunu ne zaman yapıyorsunuz?", "Siz bunu şu an nasıl yapıyorsunuz?", "Kim organize ediyor?", "Neden organize etmiyorsunuz?"], a: 1, e: "gerade = şu an." },
        { q: "İdeal pitch süresi?", o: ["5 dakika", "30 saniye", "15 dakika", "Süre önemsiz"], a: 1, e: "Kısa, merak uyandırır; ayrıntı sonra gelir." }
      ], task: "Kendi pitch'ini Almanca yaz ve sesli 3 kez oku. Telefonla kaydet ve dinle." },

      { id: "mkt1-4", title: "İlk 10 müşteri", min: 15, slides: [
        { t: "intro", icon: "users", h: "Mükemmel ürünü bekleme", p: "İlk müşteriler sana eksiği söyler. Ürünü onlarla birlikte bitirirsin." },
        { t: "funnel", h: "Satış hunisi", p: "Rakamlar örnek. Önemli olan her aşamayı ölçmek: hangi adımda kaybediyorsun?", items: [
          ["Kontakt", 30], ["Gespräch", 10], ["Testphase", 5], ["Kunde", 2] ] },
        { t: "flow", h: "Haftalık ritim", p: "Haftada 3 temas küçük görünür ama 3 ayda 36 kulüp eder.", steps: [
          ["Pazartesi", "3 kulübe yaz"], ["Görüşme", "15 dk, sorunu dinle"], ["Demo", "TTSC verisiyle göster"], ["Test", "2 hafta ücretsiz"], ["Geri bildirim", "Ne eksik?"], ["Teklif", "Basit fiyat"] ] },
        { t: "cards", h: "Kanallar", p: "Pahalı reklam yerine güvenin olduğu yerden başla.", items: [
          ["users", "Sıcak ağ", "Tanıdık kulüpler, rakip takımlar"], ["flag", "Kreis etkinlikleri", "Turnuvalar, toplantılar"], ["star", "Referans", "\"TTSC kullanıyor\" en güçlü cümle"] ] },
        { t: "compare", h: "Hız mı mükemmellik mi?", p: "Satışı ertelemenin en yaygın bahanesi \"daha hazır değil\" demektir.",
          bad: ["Erteleme", "Önce uygulama mükemmel olsun, sonra satarım."], good: ["Öğrenme", "TTSC'de çalışıyor; şimdi 3 kulübe gösteriyorum, eksiği onlar söylesin."] }
      ], quiz: [
        { q: "Satış hunisinde neyi ölçmelisin?", o: ["Yalnızca müşteri sayısını", "Her aşamadaki geçiş oranını", "Hiçbir şeyi", "Yalnızca geliri"], a: 1, e: "Nerede kaybettiğini bilirsen orayı düzeltirsin." },
        { q: "İlk müşteriler için en güçlü argüman hangisi?", o: ["Düşük fiyat", "Çalışan bir referans (TTSC)", "Çok sayıda özellik", "Şık logo"], a: 1, e: "Gerçek kullanım güven verir." },
        { q: "Haftada 3 temas, 3 ayda yaklaşık kaç kulüp eder?", o: ["9", "36", "90", "12"], a: 1, e: "12 hafta × 3 = 36." },
        { q: "Ürünü ne zaman göstermeye başlamalısın?", o: ["Tamamen bittiğinde", "Temel işi gördüğünde", "Bir yıl sonra", "Reklam bütçesi olunca"], a: 1, e: "Geri bildirim, ürünün eksiklerini senden önce görür." }
      ], task: "Bu hafta TTSC App'i göstereceğin 3 kişinin adını yaz ve Projeler'e not et." }
    ]},
    { id: "mkt2", title: "Fiyatlandırma ve teklif", goal: "Kulüp başına fiyat modeli", lessons: [] },
    { id: "mkt3", title: "İçerik ve sosyal medya", goal: "Instagram ve LinkedIn ile görünürlük", lessons: [] },
    { id: "mkt4", title: "İtirazlara cevap ve kapanış", goal: "\"Pahalı\", \"WhatsApp yeter\" gibi itirazlar", lessons: [] }
  ],

  car: [
    { id: "car1", title: "Kariyer adımına hazırlık", goal: "Hedef rolü, değerini ve ilk adımı netleştirmek", lessons: [
      { id: "car1-1", title: "Başarılarını sayıya dök", min: 15, slides: [
        { t: "intro", icon: "trophy", h: "İşe alımcı görev değil sonuç arar", p: "\"Excel listeleri tuttum\" herkesin yazdığı cümle. \"Şunu kurdum, şu kadar zaman kazandırdı\" ise seni ayırır." },
        { t: "formula", h: "Başarı cümlesinin formülü", p: "Rakamı bilmiyorsan bu hafta ölç ya da \"ca.\" ile dürüst bir tahmin ver.", parts: [
          ["Aktion", "Ne yaptın?"], ["Ergebnis", "Ne değişti?"], ["Zahl", "Ne kadar? (saat, hata, euro, adet)"] ] },
        { t: "compare", h: "Görev ve başarı", p: "Aynı iş, iki farklı anlatım. İkincisi mülakata çağrılır.",
          bad: ["Görev", "Pflege von Excel-Listen und Erstellung von Reports."], good: ["Başarı", "Entwicklung eines Event-Kalkulators in Power Query für die Monatsabrechnung (ca. 170 Event-Arten); manueller Prüfaufwand deutlich reduziert."] },
        { t: "cards", h: "Senin aday başarıların", p: "Bunlar zaten yaptığın işler. Eksik olan yalnızca rakamlar.", items: [
          ["fx", "Event-Kalkulator", "Aylık faturalama, ~170 Event türü"], ["db", "Sparten-Zusammenführung", "4 Sparte, ~74.000 aktif cihaz, referans listeleri"], ["link", "DB/KI süreç analizi", "Uçtan uca süreç haritası, gereksinimler"], ["star", "TTSC App", "Yapay zekâ ile 4 dilli ürün geliştirme"] ] },
        { t: "intro", icon: "quote", h: "Test sorusu", p: "\"Bu cümleyi okuyan biri, benim olmadığım bir durumda neyin farklı olacağını anlıyor mu?\" Anlamıyorsa rakam ekle." }
      ], quiz: [
        { q: "Hangisi başarı cümlesi?", o: ["Reports erstellt.", "Verantwortlich für Excel.", "Abrechnungsprüfung automatisiert, Aufwand von ca. 3 auf 1 Tag reduziert.", "Teamarbeit."], a: 2, e: "Aksiyon + sonuç + rakam." },
        { q: "Rakamı tam bilmiyorsan ne yaparsın?", o: ["Uydururum", "Yazmam", "Ölçerim ya da \"ca.\" ile dürüst tahmin veririm", "Yuvarlak bir rakam seçerim"], a: 2, e: "Mülakatta sorulursa açıklayabilmelisin." },
        { q: "Formülün üç parçası?", o: ["Ad, unvan, tarih", "Aktion, Ergebnis, Zahl", "Problem, çözüm, fiyat", "Firma, şehir, süre"], a: 1, e: "Ne yaptın, ne değişti, ne kadar." },
        { q: "İşe alımcıyı en çok ne etkiler?", o: ["Görev listesi", "Ölçülebilir sonuçlar", "Uzun CV", "Hobiler"], a: 1, e: "Sonuç, gelecekte ne yapacağını gösterir." }
      ], task: "En güçlü 3 başarını Aktion, Ergebnis, Zahl formatında yaz. Rakamı bilmiyorsan bu hafta iş yerinde ölç." },

      { id: "car1-2", title: "Hedef rolü tanımla", min: 15, slides: [
        { t: "intro", icon: "compass", h: "\"Daha iyi bir iş\" bir hedef değil", p: "Net bir rol adı, hangi becerileri öğreneceğini ve hangi ilanlara bakacağını belirler." },
        { t: "table", h: "Sana uygun roller", p: "Uyum tahminidir. SQL ve Power BI ekledikçe ikinci satır yükselir.", head: ["Rol", "Ne yapar?", "Uyum"], rows: [
          ["Prozessmanager / -analyst", "Süreçleri analiz eder, iyileştirir", "Yüksek"], ["BI- / Datenanalyst", "Power BI, SQL, raporlama", "Orta → Yüksek"],
          ["Controller (+ Teamleitung)", "Planlama, kontrol, ekip", "Orta"], ["Power Platform Entwickler", "Power Apps / Automate", "Orta"] ] },
        { t: "bars", h: "Prozessanalyst ilanı ve sen (tahmini)", p: "İlanlardaki tipik beklentiye göre tahmini seviyen. Açık en çok SQL, Power BI ve Almancada.", unit: "%", items: [
          ["Süreç bilgisi", 90], ["Excel / Power Query", 85], ["Almanca (verhandlungssicher)", 55], ["Power BI", 25], ["SQL", 20] ] },
        { t: "cards", h: "Senin kriterlerin", p: "Her ilanı önce bu üç süzgeçten geçir.", items: [
          ["euro", "≥ 4.000 € brüt", "Aylık"], ["home", "≤ 30 km ya da ≥ %50 remote", "Yol masrafı ve zaman"], ["flag", "Kariyer adımı", "Sadece maaş değil, gelişim"] ] },
        { t: "cards", h: "İlanlarda kelime avı", p: "Bu kelimeler ilanlarda geçiyorsa doğru yerdesin. CV'nde de geçmeli.", items: [
          ["list", "Prozessoptimierung", ""], ["chart", "Power BI, Reporting", ""], ["db", "SQL, Datenqualität, Stammdaten", ""] ] }
      ], quiz: [
        { q: "Bugünkü profiline en yakın rol hangisi?", o: ["Yazılım geliştirici", "Prozessmanager / -analyst", "Satış temsilcisi", "Muhasebeci"], a: 1, e: "Süreç bilgin en güçlü varlığın." },
        { q: "BI-Analyst rolü için en büyük açığın hangisi?", o: ["Excel", "SQL ve Power BI", "Süreç bilgisi", "Türkçe"], a: 1, e: "Bu yüzden ikisi programında ayrı birer alan." },
        { q: "İlanı değerlendirirken ilk adım?", o: ["Maaşa bakmadan başvurmak", "Kriter süzgecinden geçirmek", "Yalnızca şirket adına bakmak", "Her ilana başvurmak"], a: 1, e: "Maaş, mesafe/remote, gelişim." },
        { q: "İlan kelimeleri CV'de neden geçmeli?", o: ["Süs için", "İlk elemeyi (insan ya da yazılım) geçmek için", "Gerekmez", "Uzunluk için"], a: 1, e: "Çoğu ilk eleme anahtar kelimeyle yapılır." }
      ], task: "Kriterlerine uyan 5 ilan bul; her birinde en sık geçen 3 gereksinimi not et." },

      { id: "car1-3", title: "Piyasa değerini ve gerçek kazancını bil", min: 15, slides: [
        { t: "intro", icon: "euro", h: "Brüt maaş tek başına yanıltır", p: "Yol masrafı ve yolda geçen saatler, iki işi karşılaştırırken maaş farkı kadar önemlidir." },
        { t: "cards", h: "Maaş araştırma kaynakları", p: "Birden fazla kaynağa bak; ortadaki değer en gerçekçisidir.", items: [
          ["chart", "Entgeltatlas", "Bundesagentur: resmî medyan"], ["euro", "Stepstone Gehaltsreport", "Rol ve bölgeye göre"], ["users", "Glassdoor / kununu", "Şirket bazında"] ] },
        { t: "formula", h: "Gerçek kazanç", p: "Örnek hesap: tek yön 50 km, haftada 4 gün ofis, km başına 0,25 €. Kendi rakamlarını Ben sekmesindeki hesaplayıcıya gir.", parts: [
          ["Yıllık km", "50 × 2 × 4 × 46 ≈ 18.400 km"], ["Yol masrafı", "≈ 4.600 €/yıl ≈ 380 €/ay"], ["Yol zamanı", "≈ 4 × 1,5 sa × 46 ≈ 276 saat/yıl"] ] },
        { t: "bars", h: "Aylık yol masrafı karşılaştırması (örnek)", p: "Daha yakın ve yarı remote bir iş, aynı brütle bile ayda yüzlerce euro fark yaratabilir.", unit: " €", items: [
          ["Bugün: 50 km, 4 gün ofis", 380], ["30 km, %50 remote", 145], ["Tam remote", 0] ] },
        { t: "cards", h: "Brüt değil paket", p: "Teklifleri karşılaştırırken bunları da topla.", items: [
          ["home", "Homeoffice", "Gün sayısı"], ["car", "Jobticket / Fahrtkosten", "Yol desteği"], ["book", "Weiterbildung", "Eğitim bütçesi"], ["star", "bAV, Urlaub", "Emeklilik katkısı, izin"] ] }
      ], quiz: [
        { q: "Resmî medyan maaş verisi hangi kaynakta?", o: ["Instagram", "Entgeltatlas", "Wikipedia", "Kununu yorumları"], a: 1, e: "Bundesagentur für Arbeit'ın aracı." },
        { q: "İki teklifi karşılaştırırken neyi de hesaba katmalısın?", o: ["Yalnızca brüt maaşı", "Yol masrafı ve süresi, Homeoffice, yan haklar", "Ofisin rengi", "Şirket logosu"], a: 1, e: "Gerçek kazanç = paket − masraflar." },
        { q: "Örnekte yıllık yol zamanı yaklaşık kaç saat?", o: ["27", "276", "2.760", "76"], a: 1, e: "Yaklaşık 7 iş haftası." },
        { q: "\"bAV\" nedir?", o: ["Bir vergi", "İşveren destekli emeklilik (betriebliche Altersvorsorge)", "İzin türü", "Sağlık sigortası"], a: 1, e: "Paketin parçası olarak değerlendirilir." }
      ], task: "Entgeltatlas'ta hedef rolün için bölgendeki medyan maaşı bul ve Ben sekmesindeki notlara yaz." },

      { id: "car1-4", title: "İçeriden adım: konuşmayı başlat", min: 15, slides: [
        { t: "intro", icon: "door", h: "Bekleyen dosya kendiliğinden ilerlemez", p: "Teamleiter süreci Personal'da bekliyorsa, beklemek bir strateji değil. Tarih sormak hakkın." },
        { t: "flow", h: "Görüşme planı", p: "Amaç tartışma değil, netlik: ne zaman, ne olacak?", steps: [
          ["Termin", "Şefinden görüşme iste"], ["Stand klären", "Süreç nerede, kim karar veriyor?"], ["Leistung zeigen", "3 başarı cümlen"],
          ["Wunsch nennen", "Rol, maaş, Homeoffice"], ["Frist vereinbaren", "Karar tarihi"], ["Plan B", "Paralelde piyasayı tara"] ] },
        { t: "phrases", h: "Kalıplar", p: "Sakin ve net. Her cümle bir soruya cevap ister.", items: [
          ["Wie ist der aktuelle Stand meiner Teamleiter-Bewerbung?", "Teamleiter başvurumun son durumu nedir?"],
          ["Bis wann ist mit einer Entscheidung zu rechnen?", "Ne zamana kadar bir karar bekleyebilirim?"],
          ["Unabhängig davon würde ich gern über meine Vergütung sprechen.", "Bundan bağımsız olarak ücretimi konuşmak isterim."],
          ["Was müsste ich aus Ihrer Sicht noch zeigen?", "Sizce henüz neyi göstermem gerekiyor?"] ] },
        { t: "cards", h: "Pazarlık gücü: BATNA", p: "En iyi alternatifin (dışarıdan bir teklif) masadaki gücündür. Tehdit için değil, sakinlik için.", items: [
          ["compass", "Piyasayı tanı", "Dışarıyı aramak sadakatsizlik değil"], ["doc", "Teklif topla", "Gerçek rakamlar konuşur"], ["chat", "Bilgi ver, tehdit etme", "\"Marktgehälter liegen bei …\""] ] },
        { t: "compare", h: "Beklemek ve yönetmek", p: "Kontrol edebildiğin tek şey kendi adımların.",
          bad: ["Pasif", "Nasılsa bir gün olur, beklerim."], good: ["Aktif", "Tarih sorarım, hedef koyarım, paralelde piyasayı tararım."] }
      ], quiz: [
        { q: "BATNA nedir?", o: ["Bir sözleşme türü", "Anlaşma olmazsa en iyi alternatifin", "Maaş bordrosu", "Terfi formu"], a: 1, e: "Best Alternative To a Negotiated Agreement." },
        { q: "Görüşmenin ana hedefi?", o: ["Şefi ikna etmek için tartışmak", "Netlik: karar tarihi ve sonraki adım", "İstifa etmek", "Şikâyet etmek"], a: 1, e: "Netlik, sana planlama imkânı verir." },
        { q: "\"Bis wann ist mit einer Entscheidung zu rechnen?\" ne sorar?", o: ["Kim karar verecek?", "Ne zamana kadar karar beklenebilir?", "Neden karar verilmedi?", "Karar olumlu mu?"], a: 1, e: "rechnen mit = beklemek, hesaba katmak." },
        { q: "Dış ilanlara bakmak…", o: ["Sadakatsizliktir", "Piyasa değerini öğrenmenin yoludur", "Yasaktır", "Gereksizdir"], a: 1, e: "Bilgi, iç görüşmede seni güçlendirir." }
      ], task: "Şefinden \"Stand der Teamleiter-Entscheidung\" için bir görüşme tarihi iste. Projeler'e not et." }
    ]},
    { id: "car2", title: "Bewerbung, LinkedIn ve Xing", goal: "Hedef role göre CV ve profil", lessons: [] },
    { id: "car3", title: "Almanca mülakat hazırlığı", goal: "Sık sorulan sorular ve cevap kalıpları", lessons: [] },
    { id: "car4", title: "Teklif değerlendirme ve müzakere", goal: "Paket karşılaştırma, pazarlık", lessons: [] }
  ]
};

/* Başlangıçtaki projeler (Projeler sekmesinden düzenlenebilir) */
window.DEFAULT_PROJECTS = [
  { id: "p1", name: "Bechtle: DB/KI ve Event listesinin DB'ye taşınması", cat: "is", status: "aktif", next: "Almanca M1 gereksinim belgesini yaz ve geliştiriciye gönder" },
  { id: "p2", name: "Kariyer adımı ve iş arama", cat: "kariyer", status: "aktif", next: "Hedef role uyan 5 ilan topla" },
  { id: "p3", name: "TTSC App", cat: "gelir", status: "aktif", next: "Bütün takıma yay, sonra 3 kulübe göster" },
  { id: "p4", name: "Minijob araması", cat: "gelir", status: "aktif", next: "Akşam bildirimlerindeki taslakları gözden geçir" },
  { id: "p5", name: "Sakar Tayfa", cat: "aile", status: "aktif", next: "Sıradaki akşam bölümü" },
  { id: "p6", name: "Sancak", cat: "hobi", status: "park", next: "" },
  { id: "p7", name: "Pusula", cat: "hobi", status: "park", next: "" },
  { id: "p8", name: "Vali", cat: "hobi", status: "park", next: "" },
  { id: "p9", name: "Petek Ustası", cat: "hobi", status: "park", next: "Gerçek insanlarla test" },
  { id: "p10", name: "Büyük Taarruz animasyonu", cat: "hobi", status: "park", next: "Storyboard mı arşiv mi?" },
  { id: "p11", name: "Controlling AI aracı / freelance Controlling", cat: "gelir", status: "park", next: "Önce hizmet sat, sonra araç" },
  { id: "p12", name: "Mutfak Planı", cat: "aile", status: "bitti", next: "Aile kullanımda" }
];
