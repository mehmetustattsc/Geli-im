/* Ders notları: her alan için temel başvuru kitapçığı.
   Blok tipleri: p (paragraf), list (madde), tip (kutu), ve slayt görselleri (code, table, flow, compare, cards, venn, star, bars, phrases, formula). */
window.NOTES = {
  sql: { title: "SQL ders notu", intro: "SQL nedir, veritabanı nasıl çalışır, en sık kullanılan komutlar ve senin işinde nerede işe yarar.", sections: [
    { h: "1. SQL nedir?", blocks: [
      { t: "p", x: "SQL (Structured Query Language), veritabanlarıyla konuşmak için kullanılan standart dildir. 1970'lerde IBM'de geliştirildi; bugün neredeyse bütün kurumsal sistemler SQL kullanır. Kelimenin tam anlamıyla bir \"soru sorma dili\"dir: veritabanına ne istediğini söylersin, o da sonucu bir tablo olarak verir." },
      { t: "p", x: "SQL bir programlama dili gibi adım adım \"nasıl\" yapılacağını değil, \"ne\" istediğini tarif eder. \"Pool'daki HP cihazlarını getir\" dersin; veritabanı bunu en hızlı nasıl bulacağına kendisi karar verir." },
      { t: "cards", h: "", items: [["db", "MySQL / MariaDB", "Bechtle'deki cihaz DB'si (PHP + MySQL)"], ["db", "Microsoft SQL Server", "Kurumsal Microsoft dünyası, Power BI ile sık"], ["db", "PostgreSQL, Oracle", "Diğer yaygın sistemler"]] },
      { t: "tip", x: "Bu sistemlerin her birinin küçük yazım farkları (lehçe) var, ama SELECT, WHERE, GROUP BY, JOIN gibi temel komutlar hepsinde aynıdır. Birini öğrenen hepsini okuyabilir." }
    ]},
    { h: "2. İlişkisel veritabanı nasıl çalışır?", blocks: [
      { t: "p", x: "Veriler tablolarda tutulur. Her tablonun sütunları (alanlar) sabittir, satırları (kayıtlar) çoğalır. Excel'e benzer ama üç önemli farkla: her sütunun tipi sabittir (tarih sütununa metin giremezsin), her satırın benzersiz bir anahtarı vardır ve tablolar birbirine anahtarlarla bağlanır." },
      { t: "table", head: ["Kavram", "Almancası", "Anlamı"], rows: [["Tablo", "Tabelle", "Aynı türden kayıtlar (ör. assets)"], ["Satır / kayıt", "Datensatz", "Tek bir cihaz, tek bir olay"], ["Sütun / alan", "Feld, Spalte", "seriennummer, modell, lagerstatus"], ["Birincil anahtar", "Primärschlüssel", "Satırı benzersiz tanımlayan alan (ör. id)"], ["Yabancı anahtar", "Fremdschlüssel", "Başka tablodaki satıra işaret eden alan"]] },
      { t: "p", x: "Örnek: assets tablosunda her cihazın modell alanı, modelle ilgili ayrıntıların (fiyat, tip) tutulduğu başka bir tabloya işaret eder. Böylece bir modelin fiyatı değişince tek yerde güncellenir; binlerce satırda tekrar etmez. Buna normalizasyon denir." },
      { t: "tip", x: "Senin DB_Abzug'daki çift seri numarası sorunu tam da bu kuralın ihlali: seri numarası benzersiz olması gereken bir alan ama anahtar olarak tanımlanmadığı için tekrar edebiliyor." }
    ]},
    { h: "3. SQL ne işe yarar? Senin işinde nerede kullanılır?", blocks: [
      { t: "list", items: ["Export almadan doğrudan veritabanından istediğin veriyi çekmek", "Ay sonu kontrollerini sorgu olarak kaydedip her ay tek tıkla çalıştırmak", "Veri kalitesi kontrolleri: boş alanlar, çift kayıtlar, tutarsız modeller", "İki tabloyu birleştirmek (cihaz + fiyat, sipariş + cihaz) – SVERWEIS'siz", "Geliştiriciyle aynı dili konuşmak: gereksinimini bir örnek sorguyla anlatmak"] },
      { t: "tip", x: "Gerçek veritabanına yazma yetkin olmasa bile, salt okunur (read-only) bir kullanıcı istemek makul bir taleptir. Okuma veriyi bozamaz." }
    ]},
    { h: "4. Bir sorgu hangi sırayla çalışır?", blocks: [
      { t: "p", x: "Yazım sırası SELECT ile başlar ama veritabanı sorguyu başka bir sırayla işler. Bunu bilmek hataların yarısını açıklar: örneğin WHERE içinde SELECT'te verdiğin takma adı kullanamazsın, çünkü WHERE daha önce çalışır." },
      { t: "flow", steps: [["FROM / JOIN", "Hangi tablolar? Birleştir."], ["WHERE", "Satırları süz"], ["GROUP BY", "Grupla"], ["HAVING", "Grupları süz"], ["SELECT", "Sütunları seç, hesapla"], ["ORDER BY", "Sırala"], ["LIMIT", "İlk N satırı al"]] }
    ]},
    { h: "5. Komut aileleri", blocks: [
      { t: "table", head: ["Aile", "Komutlar", "Ne yapar?"], rows: [["DQL – sorgu", "SELECT", "Okur, hiçbir şeyi değiştirmez"], ["DML – veri", "INSERT, UPDATE, DELETE", "Satır ekler, değiştirir, siler"], ["DDL – yapı", "CREATE, ALTER, DROP", "Tablo oluşturur, değiştirir, siler"], ["DCL – yetki", "GRANT, REVOKE", "Kimin neye erişeceğini belirler"]] },
      { t: "compare", bad: ["Tehlikeli", "UPDATE assets SET lagerstatus = 'Pool';"], good: ["Güvenli", "UPDATE assets SET lagerstatus = 'Pool' WHERE seriennummer = '5CG21…';"] },
      { t: "tip", x: "WHERE'siz UPDATE ya da DELETE bütün tabloyu değiştirir. Bir Controller olarak senin günlük işin %95 SELECT'tir; diğerlerini bilmek, geliştiricinin ne yaptığını anlamak içindir." }
    ]},
    { h: "6. Veri tipleri", blocks: [
      { t: "table", head: ["Tip", "Örnek", "Not"], rows: [["INT", "42", "Tam sayı, adet"], ["DECIMAL(10,2)", "39.90", "Para için (kuruş hatası yapmaz)"], ["VARCHAR(50)", "'HP EliteBook 840'", "Metin; tek tırnak içinde yazılır"], ["DATE", "'2026-11-30'", "Tarih; YYYY-AA-GG biçiminde"], ["DATETIME", "'2026-11-30 14:05:00'", "Tarih + saat"], ["BOOLEAN", "TRUE / FALSE", "Evet/hayır"], ["NULL", "(boş)", "Değer yok; 0 ya da '' ile aynı değil"]] }
    ]},
    { h: "7. Cebinde dursun: temel kalıplar", blocks: [
      { t: "code", code: "-- Seç ve süz\nSELECT seriennummer, modell\nFROM assets\nWHERE sparte = 'kfl' AND lagerstatus = 'Pool';\n\n-- Say ve grupla\nSELECT modell, COUNT(*) AS anzahl\nFROM assets\nGROUP BY modell\nORDER BY anzahl DESC;\n\n-- Çift kayıt bul\nSELECT seriennummer, COUNT(*)\nFROM db_abzug\nGROUP BY seriennummer\nHAVING COUNT(*) > 1;\n\n-- İki tabloyu birleştir\nSELECT a.seriennummer, p.miete\nFROM assets a\nLEFT JOIN listepreise p ON a.modell = p.modell;\n\n-- Koşula göre etiket (Excel'deki WENN)\nSELECT seriennummer,\n  CASE WHEN garantie_bis < CURDATE() THEN 'abgelaufen'\n       ELSE 'gültig' END AS garantie\nFROM assets;" },
      { t: "tip", x: "-- ile başlayan satırlar açıklamadır, çalışmaz. Sorgularına kendi notlarını böyle ekleyebilirsin." }
    ]},
    { h: "8. JOIN türleri tek bakışta", blocks: [
      { t: "venn", kind: "inner", a: "A", b: "B" },
      { t: "p", x: "INNER JOIN: yalnızca iki tabloda da eşleşenler. LEFT JOIN: soldaki tablonun tamamı, sağdan eşleşen varsa o; yoksa NULL. RIGHT JOIN: tersi (pratikte az kullanılır; tabloların yerini değiştirip LEFT kullanmak daha okunaklı). FULL JOIN: iki tarafın tamamı; MySQL'de doğrudan yok." }
    ]},
    { h: "9. En sık yapılan hatalar", blocks: [
      { t: "list", items: ["= NULL yazmak → doğrusu IS NULL", "Metni tırnaksız yazmak → 'Pool'", "JOIN'de sağ tablo benzersiz değil → satırlar çoğalır", "GROUP BY'da olmayan bir sütunu SELECT'e koymak", "Tarihi 30.11.2026 diye yazmak → '2026-11-30'", "WHERE'siz UPDATE / DELETE"] }
    ]},
    { h: "10. Nerede pratik yaparım?", blocks: [
      { t: "list", items: ["SQLBolt (sqlbolt.com): tarayıcıda, kurulum yok, kısa alıştırmalar", "İş yerinde: DB'nin yönetim aracında (çoğu PHP/MySQL sistemde phpMyAdmin gibi bir arayüz olur) salt okunur erişim iste", "Bilgisayarda: HeidiSQL ya da DBeaver ücretsiz SQL araçlarıdır", "Excel'deki bir tabloyu kafanda SQL'e çevir: \"Bu filtreyi WHERE ile nasıl yazardım?\""] }
    ]},
    { h: "11. Küçük sözlük", blocks: [
      { t: "table", head: ["Terim", "Anlamı"], rows: [["Query / Abfrage", "Sorgu"], ["View / Sicht", "Kaydedilmiş sorgu; tablo gibi kullanılır"], ["Index", "Aramayı hızlandıran dizin (kitaptaki fihrist gibi)"], ["Schema", "Tabloların ve ilişkilerin bütünü"], ["Constraint", "Kural (ör. UNIQUE: tekrar edemez)"], ["Transaction", "Ya hep ya hiç: birden çok değişikliği birlikte uygular"]] }
    ]}
  ]},

  pbi: { title: "Power BI ders notu", intro: "Power BI nedir, hangi parçalardan oluşur, Excel'den farkı ne, PL-300 neleri kapsar.", sections: [
    { h: "1. Power BI nedir?", blocks: [
      { t: "p", x: "Power BI, Microsoft'un veri analizi ve raporlama platformudur. Farklı kaynaklardan veriyi alır, temizler, birbirine bağlar ve tıklandıkça filtrelenen etkileşimli raporlar üretir. Excel'in \"raporlama ve paylaşma\" kısmının profesyonel hali gibi düşünebilirsin." },
      { t: "cards", items: [["chart", "Power BI Desktop", "Windows'ta ücretsiz; raporu burada kurarsın"], ["users", "Power BI Service", "Tarayıcıda; yayınlama, paylaşma, otomatik yenileme"], ["home", "Mobil uygulama", "Raporları telefonda görüntüleme"]] }
    ]},
    { h: "2. Dört katman", blocks: [
      { t: "flow", steps: [["Veri alma", "Excel, SQL, SharePoint, CSV…"], ["Power Query", "Temizleme ve dönüştürme (M dili) – bildiğin kısım"], ["Veri modeli", "Tablolar ve ilişkiler (yıldız şema)"], ["DAX + görseller", "Hesaplamalar ve rapor sayfaları"]] },
      { t: "tip", x: "Excel'deki Power Query ile Power BI'daki Power Query aynı motordur. Yazdığın sorguları kopyalayıp Power BI'a yapıştırabilirsin." }
    ]},
    { h: "3. Veri modeli", blocks: [
      { t: "star", fact: "Fakt", dims: ["Datum", "Modell", "Standort", "Kostenstelle", "Sparte"] },
      { t: "p", x: "Fakt tablosu olayları ve rakamları tutar (her Event bir satır). Dimension tabloları açıklamaları tutar (her model bir kez). İlişki Dimension'dan (1) Fakt'a (çok) doğru kurulur. Ayrı bir tarih tablosu (Datum) zaman analizleri için şarttır." }
    ]},
    { h: "4. DAX'ın temeli", blocks: [
      { t: "table", head: ["Kavram", "Açıklama"], rows: [["Measure", "Filtreye göre anında hesaplanan değer (toplam, adet, oran)"], ["Hesaplanan sütun", "Her satır için bir kez hesaplanıp saklanan değer"], ["Filtre bağlamı", "Rapordaki seçimlerin hesaplamaya etkisi"], ["CALCULATE", "Filtreyi değiştirerek hesaplama yapan ana fonksiyon"]] },
      { t: "code", code: "Umsatz Events = SUM ( Events[Betrag] )\n\nEvents kfl =\nCALCULATE ( [Umsatz Events], Sparte[Name] = \"kfl\" )\n\nAnteil kfl = DIVIDE ( [Events kfl], [Umsatz Events] )" }
    ]},
    { h: "5. Rapor ve pano (dashboard) farkı", blocks: [
      { t: "compare", bad: ["Rapor", "Çok sayfalı, etkileşimli, tek bir veri modeline dayanır. Desktop'ta kurulur."], good: ["Dashboard", "Service'te tek sayfa; farklı raporlardan sabitlenmiş kutucuklar. Hızlı bakış için."] }
    ]},
    { h: "6. Excel mi Power BI mı?", blocks: [
      { t: "list", items: ["Tek seferlik hesap, küçük veri, esnek hücre işlemleri → Excel", "Düzenli tekrar eden rapor, büyük veri, birden çok kişiyle paylaşım → Power BI", "İkisi birlikte: Power BI modelini Excel'den pivot ile sorgulamak mümkündür (Analyze in Excel)"] }
    ]},
    { h: "7. PL-300 sınavı neleri kapsar?", blocks: [
      { t: "table", head: ["Alan", "İçerik"], rows: [["Veriyi hazırla", "Kaynaklara bağlanma, Power Query ile temizleme, veri kalitesi"], ["Veriyi modelle", "İlişkiler, yıldız şema, DAX measure'ları, performans"], ["Görselleştir ve analiz et", "Rapor tasarımı, etkileşim, analiz özellikleri"], ["Yayınla ve yönet", "Çalışma alanları, paylaşım, yenileme, satır düzeyi güvenlik"]] },
      { t: "tip", x: "Microsoft Learn'deki resmi PL-300 öğrenme yolu ücretsizdir. Sınav İngilizce dahil birçok dilde yapılır; güncel dil seçeneklerini sınav sayfasından kontrol et." }
    ]},
    { h: "8. Küçük sözlük", blocks: [
      { t: "table", head: ["Terim", "Anlamı"], rows: [["Semantic model (eski adı Dataset)", "Yayınlanmış veri modeli"], ["Visual", "Grafik, tablo, kart"], ["Slicer / Datenschnitt", "Rapordaki filtre düğmesi"], ["Refresh / Aktualisierung", "Verinin kaynaktan yenilenmesi"], ["Gateway", "Şirket içi veriyi buluta bağlayan köprü"], ["RLS", "Satır düzeyi güvenlik: herkes yalnızca kendi verisini görür"]] }
    ]}
  ]},

  de: { title: "İş Almancası ders notu", intro: "İş yazışmasında ve toplantıda en çok gereken dilbilgisi ve kalıplar.", sections: [
    { h: "1. Sie mi du mu?", blocks: [
      { t: "p", x: "Alman iş dünyasında varsayılan Sie'dir. Ekip içinde ve IT sektöründe du yaygınlaştı; kural basit: karşı taraf du teklif edene ya da şirket kültürü belli olana kadar Sie. Yazıda Sie, Ihnen, Ihr her zaman büyük harfle başlar." },
      { t: "table", head: ["Durum", "Hitap", "Kapanış"], rows: [["Resmî, ilk temas", "Sehr geehrte Frau Weber,", "Mit freundlichen Grüßen"], ["Tanıdık, Sie", "Hallo Herr Weber, / Guten Tag Herr Weber,", "Viele Grüße / Beste Grüße"], ["Ekip içi, du", "Hallo Josip,", "Viele Grüße / VG"]] }
    ]},
    { h: "2. Kibarlığın anahtarı: Konjunktiv II", blocks: [
      { t: "p", x: "Rica ederken ve öneri yaparken fiilin Konjunktiv II hâli kullanılır. Ezberlemen gereken dört biçim neredeyse her şeyi karşılar." },
      { t: "table", head: ["Normal", "Konjunktiv II", "Örnek"], rows: [["können", "könnte / könnten", "Könnten Sie das prüfen?"], ["werden", "würde / würden", "Ich würde vorschlagen, …"], ["sein", "wäre / wären", "Wäre es möglich, …?"], ["haben", "hätte / hätten", "Hätten Sie morgen kurz Zeit?"]] }
    ]},
    { h: "3. Modal fiiller: zorunluluk dereceleri", blocks: [
      { t: "table", head: ["Fiil", "Anlam", "Örnek"], rows: [["müssen", "zorunda olmak", "Die Liste muss bis Freitag fertig sein."], ["sollen", "gerekmek, beklenmek", "Das System soll Duplikate erkennen."], ["können", "-ebilmek", "Wir können das automatisieren."], ["dürfen", "izinli olmak", "Darf ich kurz ergänzen?"], ["möchten", "istemek (kibar)", "Ich möchte einen Vorschlag machen."]] },
      { t: "tip", x: "Dikkat: \"nicht müssen\" yasak değil, \"gerekmiyor\" demektir. Yasak için \"nicht dürfen\" kullanılır: Das darf nicht passieren." }
    ]},
    { h: "4. Bağlaçlar ve fiilin yeri", blocks: [
      { t: "p", x: "Almancada bağlaç, fiilin cümledeki yerini değiştirir. İş yazışmasında en sık bu üç durumla karşılaşırsın." },
      { t: "table", head: ["Tür", "Bağlaçlar", "Örnek"], rows: [["Fiil sona gider", "weil, dass, wenn, ob, obwohl, damit", "…, weil die Liste nicht aktuell ist."], ["Fiil öne gelir (devrik)", "deshalb, trotzdem, dann, außerdem", "Deshalb schlage ich vor, …"], ["Sıra değişmez", "und, aber, oder, denn", "…, denn die Liste ist nicht aktuell."]] }
    ]},
    { h: "5. İsim üslubu (Nominalstil)", blocks: [
      { t: "p", x: "Resmî yazışma ve belgelerde fiil yerine isim kullanılır. Gereksinim belgelerinde bunu sık görürsün." },
      { t: "table", head: ["Fiil", "İsim", "Kullanım"], rows: [["prüfen", "die Prüfung", "nach Prüfung der Daten"], ["erstellen", "die Erstellung", "Erstellung der WE-Liste"], ["abrechnen", "die Abrechnung", "für die Monatsabrechnung"], ["freigeben", "die Freigabe", "nach Freigabe durch Josip"]] }
    ]},
    { h: "6. Controlling sözlüğü", blocks: [
      { t: "phrases", items: [["die Abweichung", "sapma"], ["die Auswertung", "değerlendirme, analiz"], ["die Kostenstelle", "masraf yeri"], ["der Stichtag", "kesim tarihi"], ["die Frist", "süre, son tarih"], ["die Rückmeldung", "geri dönüş"], ["die Freigabe", "onay"], ["der Abgleich", "karşılaştırma, mutabakat"], ["die Ursache", "neden, kök sebep"], ["nachvollziehbar", "izlenebilir, anlaşılır"]] }
    ]},
    { h: "7. Telefon ve toplantı kalıpları", blocks: [
      { t: "phrases", items: [["Könnten Sie das bitte wiederholen?", "Tekrar eder misiniz?"], ["Habe ich Sie richtig verstanden, dass …?", "Doğru anladım mı, …?"], ["Ich melde mich bis morgen bei Ihnen.", "Yarına kadar size dönerim."], ["Lassen Sie uns kurz zusammenfassen.", "Kısaca özetleyelim."], ["Das kläre ich und gebe Ihnen Bescheid.", "Bunu netleştirip size haber veririm."]] }
    ]}
  ]},

  mkt: { title: "Pazarlama ve satış ders notu", intro: "Bir ürünü ya da hizmeti satmanın temel kavramları ve ölçütleri.", sections: [
    { h: "1. Pazarlama ve satış farkı", blocks: [
      { t: "compare", bad: ["Pazarlama", "Doğru kişilerin seni tanımasını ve ilgilenmesini sağlar (bire çok)."], good: ["Satış", "İlgilenen kişiyle konuşup anlaşmaya varır (bire bir)."] }
    ]},
    { h: "2. Temel kavramlar", blocks: [
      { t: "table", head: ["Kavram", "Anlamı"], rows: [["Hedef kitle (Zielgruppe)", "Ürünün kime hitap ettiği"], ["Persona", "Hedef kitleyi temsil eden hayali, ayrıntılı müşteri"], ["Değer önerisi", "Kime, hangi sorunu, nasıl çözdüğün ve ne kazandırdığın"], ["Konumlandırma", "Rakiplere göre nerede durduğun"], ["Kanal", "Müşteriye ulaştığın yol: tavsiye, sosyal medya, etkinlik"]] }
    ]},
    { h: "3. Huni (funnel) ve AIDA", blocks: [
      { t: "funnel", items: [["Attention – fark etme", 100], ["Interest – ilgi", 50], ["Desire – istek", 20], ["Action – satın alma", 8]] },
      { t: "p", x: "Her aşamada insan kaybedersin; bu normaldir. Amaç, hangi aşamada en çok kaybettiğini bulup orayı düzeltmek." }
    ]},
    { h: "4. Fiyat modelleri", blocks: [
      { t: "table", head: ["Model", "Nasıl?", "Kulüp uygulaması için"], rows: [["Abonelik", "Aylık / yıllık ücret", "Kulüp başına yıllık sabit fiyat"], ["Freemium", "Temel ücretsiz, ek özellik ücretli", "Takvim bedava, istatistik ücretli"], ["Kademeli", "Büyüklüğe göre fiyat", "Takım ya da üye sayısına göre"], ["Tek seferlik", "Bir kez öde", "Kurulum ücreti + bakım"]] }
    ]},
    { h: "5. Ölçmen gereken rakamlar", blocks: [
      { t: "table", head: ["Ölçüt", "Anlamı"], rows: [["Dönüşüm oranı", "Görüşenlerden kaçı müşteri oldu?"], ["Churn (kayıp)", "Müşterilerin yüzde kaçı bıraktı?"], ["CAC", "Bir müşteri kazanmanın maliyeti"], ["LTV", "Bir müşterinin toplamda getirdiği gelir"], ["Aktif kullanım", "Kullanıcıların yüzde kaçı haftada en az bir kez açıyor?"]] },
      { t: "tip", x: "Sağlıklı bir işte LTV, CAC'den belirgin şekilde büyüktür. Bir kulübü kazanmak için harcadığın zaman ve para, o kulübün yıllar içinde ödeyeceğinden az olmalı." }
    ]},
    { h: "6. Müşteriyle konuşma kuralları (The Mom Test)", blocks: [
      { t: "list", items: ["Fikrini anlatma, onların hayatını sor: \"Bunu şu an nasıl yapıyorsunuz?\"", "Gelecek hakkında değil geçmiş hakkında sor: \"En son ne zaman sorun yaşadınız?\"", "İltifatı veri sayma: \"Harika fikir!\" bir şey ifade etmez", "Somut adım iste: deneme, tanıştırma, ön sipariş"] }
    ]},
    { h: "7. Almanya'da satış yapmadan önce", blocks: [
      { t: "list", items: ["Web sitesinde Impressum ve Datenschutzerklärung zorunludur", "Kişisel veri işleniyorsa DSGVO kurallarına uyulmalı (veri işleme sözleşmeleri)", "Ayrıntılar için bir uzmana danışmak en sağlıklısı"] }
    ]}
  ]},

  car: { title: "Kariyer ders notu", intro: "Almanya'da başvuru, maaş ve iş sözleşmesiyle ilgili temel bilgiler.", sections: [
    { h: "1. Başvuru dosyası (Bewerbungsunterlagen)", blocks: [
      { t: "table", head: ["Parça", "İçerik"], rows: [["Anschreiben", "En fazla 1 sayfa: neden bu iş, neden sen. Bazı ilanlar artık istemiyor."], ["Lebenslauf", "Tablo şeklinde, en yeni en üstte; fotoğraf isteğe bağlı"], ["Arbeitszeugnisse", "Önceki işverenlerden iş belgeleri"], ["Zertifikate", "Diploma, sertifikalar (ör. PL-300, telc B2)"]] }
    ]},
    { h: "2. Arbeitszeugnis'in gizli dili", blocks: [
      { t: "p", x: "Almanya'da iş belgeleri olumsuz bir şey yazamaz; bu yüzden not, kalıp cümlelerle verilir. Kendi belgeni alırken bunu kontrol et." },
      { t: "table", head: ["Kalıp", "Not karşılığı"], rows: [["stets zu unserer vollsten Zufriedenheit", "1 – çok iyi"], ["stets zu unserer vollen Zufriedenheit", "2 – iyi"], ["zu unserer vollen Zufriedenheit", "3 – orta"], ["zu unserer Zufriedenheit", "4 – yeterli"]] }
    ]},
    { h: "3. Maaş terimleri", blocks: [
      { t: "table", head: ["Terim", "Anlamı"], rows: [["Brutto / Netto", "Vergi ve sigortadan önce / sonra"], ["Jahresgehalt", "Yıllık brüt; ilanlarda genelde bu verilir"], ["13. Monatsgehalt, Urlaubsgeld", "Ek maaş, tatil parası"], ["bAV", "İşveren destekli emeklilik"], ["Tarifvertrag", "Toplu sözleşmeye bağlı maaş"], ["Gehaltsband", "Pozisyonun maaş aralığı"]] }
    ]},
    { h: "4. Sözleşme ve fesih", blocks: [
      { t: "list", items: ["Probezeit (deneme süresi) en fazla 6 aydır; bu sürede fesih süresi genelde 2 haftadır", "Yasal temel fesih süresi 4 haftadır (ayın 15'ine ya da sonuna); sözleşmen daha uzun süre öngörebilir, mutlaka kontrol et", "Yeni iş teklifini imzalamadan önce mevcut sözleşmendeki fesih süresine göre başlangıç tarihi konuş"] },
      { t: "tip", x: "Bunlar genel bilgidir; kendi sözleşmen ve özel durumun için gerektiğinde bir uzmana danış." }
    ]},
    { h: "5. Mülakat akışı", blocks: [
      { t: "flow", steps: [["Tanışma", "Kısa sohbet"], ["Kendini anlat", "2 dakikalık özgeçmiş"], ["Yetkinlik soruları", "\"Bir örnek verin…\" → STAR"], ["Senin soruların", "Ekip, araçlar, Homeoffice"], ["Maaş ve başlangıç", "Gehaltsvorstellung, Kündigungsfrist"]] },
      { t: "formula", parts: [["Situation", "Durum neydi?"], ["Task", "Görevin neydi?"], ["Action", "Ne yaptın?"], ["Result", "Sonuç ne oldu, rakamla?"]] }
    ]},
    { h: "6. İş arama kanalları", blocks: [
      { t: "list", items: ["StepStone, Indeed: en büyük ilan siteleri", "LinkedIn ve Xing: profil + işe alımcıların seni bulması", "Bundesagentur für Arbeit Jobbörse: resmî portal", "Şirketlerin kendi kariyer sayfaları ve doğrudan başvuru", "Tanıdık ağı: Almanya'da işlerin önemli bir kısmı tavsiyeyle doluyor"] }
    ]}
  ]}
};
