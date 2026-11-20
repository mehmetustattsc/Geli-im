# Gelişim — Mehmet'in kişisel gelişim uygulaması

Telefon için PWA (GitHub Pages). Arayüz dili Türkçe; Almanca ifadeler derslerin parçası.

## Yapı
- `index.html`, `css/style.css`, `js/app.js` (uygulama), `js/content.js` (dersler, ara hedefler, kaynaklar, başlangıç projeleri)
- `tools/fetch_news.py`: Güncel sekmesi için RSS / Google Haberler → `data/news.json`; Dinle sekmesi için podcast bölümleri (iTunes arama + RSS) → `data/podcasts.json`. Action içinde her sabah çalışır; repodaki boş dosyalar yalnızca yedek.
- `.github/workflows/pages.yml`: push ve her sabah → haberleri topla → Pages'e yayınla
- Veriler telefonda `localStorage` (`gelisim.v1`); Ben sekmesinde yedek kodu var.

## Bülten (Güncel sekmesi)
- `data/bulten.json`: `{"issues":[{date,title,intro,items:[{cat,title,summary,why,src,url,lang}]}]}`; en yeni sayı en başta, en fazla 12 sayı.
- `cat`: ki, ctl, de, sql, pbi, mkt, car, club. `lang`: kaynağın dili (de/en/tr). Türkçe olmayanlarda uygulama "Türkçe tamamı" (Google Çeviri) düğmesi gösterir.
- Özetler Türkçe ve kendi cümlelerimizle (alıntı yok, 3–5 cümle); `why` Mehmet'in durumuna bağlar (Bechtle Controlling, DB/KI projesi, TTSC App, iş değişikliği kriterleri).
- Haftalık otomatik görev yeni sayıyı ekleyip push eder; push Pages'i yeniden yayınlar.

## Ders notları
- `js/notes.js` → `NOTES[alan]`: bölümler ve bloklar (p, list, tip + slayt görselleri). Yol sekmesinden açılır.

## Oyunlar ve derste alıştırma
- `js/games.js` → `GAMES.satz` (Satzbau), `GAMES.sql` (SQL yapbozu, `x` = çeldirici satırlar), `GAMES.cw` (İsveç bulmacası: w, d = Almanca ipucu, c = Türkçe anlam, a = artikel; 8×9 dolu ızgara, yuvalar tam kelime ya da kelime parçasıyla doldurulur (ipucu "Ü…RSICHT"); harfler alttaki taşlardan, ipuçları ızgara içinde, harfler alttaki taşlardan). `l` alanı ders kimliği: o dersin "Birlikte yap" adımında da kullanılır.
- Oyun öğeleri kendi aralıklı tekrarını tutar (`S.gs[oyun][id]`); oynanan turlar `S.gplay`.
- Derslerde her 2 slayttan sonra slayt içeriğinden otomatik "Ara kontrol" sorusu üretilir (`genCheck`), testten önce 2 "Birlikte yap" görevi gelir (ipucu var, puana sayılmaz).

## Power Query simülatörü
- `js/pqsim.js` → `window.PQSIM.open(onDone)`; Oyun köşesinde "Power Query" (GINFO.pq). Küçük tblProd/tblTest örneği üzerinde dokunarak adım ekleme (Zusammenführen, Erweitern, Benutzerdef. Spalte, Filtern, Gruppieren, Entfernen), her adımın M kodu ve Türkçe açıklaması, Erweiterter Editor.
- 6 görev fnVergleich'i (Bechtle Prod↔Test karşılaştırması) parça parça kurdurur; çözülen görevler `localStorage` `gelisim.pqsim`, puan `S.gplay` (g: "pq").

## Öğrenme mantığı
- Geçme eşiği %80. Her soru aralıklı tekrarla döner (`S.srs`, 1-3-7-21-60 gün); dersin başında en fazla 3 vadesi gelmiş soru ısınma olarak sorulur, Pazar tekrarında hepsi.
- Yazılı sorular `WRITE_Q` (content.js sonunda): kullanıcı yazar, örnek cevap + anahtar kelimelerle karşılaştırıp kendini puanlar (1 / 0,5 / 0).
- Dinleme süresi `S.listen[tarih]` saniye olarak tutulur; takvimde ve Dinle sekmesinde görünür.

## İçerik ekleme
- Yeni ders: `CURRICULUM[alan][modül].lessons` dizisine aynı yapıda nesne ekle (slides + quiz + task). Ders kimlikleri (`de1-1` gibi) değişmemeli; ilerleme bunlara bağlı.
- Slayt tipleri: intro, cards, flow, compare, phrases, code, table, venn, star, bars, funnel, formula. Her slaytta kısa metin (`p`) ve görsel olsun: ne sadece yazı ne sadece görsel.
- Boş `lessons: []` olan modüller "sıradaki adım" olarak görünür; kullanıcı istediğinde içerik eklenir.
- Her yayında `sw.js` içindeki `V` sürümünü ve `index.html`'deki `?v=` değerlerini artır.

## Çalışma tercihleri
- Token tasarrufu: tam test paketi ya da CI beklemek yok; yalnızca hızlı kontrol (`node --check`, gerekirse tek ekran görüntüsü). Hataları Mehmet kendisi bildirir.
- Kullanıcıya teknik ayrıntı değil, telefonda ne yapacağını anlat (telefon dili Türkçe).
