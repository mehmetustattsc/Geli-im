# Gelişim — Mehmet'in kişisel gelişim uygulaması

Telefon için PWA (GitHub Pages). Arayüz dili Türkçe; Almanca ifadeler derslerin parçası.

## Yapı
- `index.html`, `css/style.css`, `js/app.js` (uygulama), `js/content.js` (dersler, ara hedefler, kaynaklar, başlangıç projeleri)
- `tools/fetch_news.py`: Güncel sekmesi için RSS / Google Haberler → `data/news.json`; Dinle sekmesi için podcast bölümleri (iTunes arama + RSS) → `data/podcasts.json`. Action içinde her sabah çalışır; repodaki boş dosyalar yalnızca yedek.
- `.github/workflows/pages.yml`: push ve her sabah → haberleri topla → Pages'e yayınla
- Veriler telefonda `localStorage` (`gelisim.v1`); Ben sekmesinde yedek kodu var.

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
