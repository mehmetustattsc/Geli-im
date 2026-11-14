# Gelişim — Mehmet'in kişisel gelişim uygulaması

Telefon için PWA (GitHub Pages). Arayüz dili Türkçe; Almanca ifadeler derslerin parçası.

## Yapı
- `index.html`, `css/style.css`, `js/app.js` (uygulama), `js/content.js` (dersler, ara hedefler, kaynaklar, başlangıç projeleri)
- `tools/fetch_news.py`: Güncel sekmesi için RSS / Google Haberler → `data/news.json` (Action içinde her sabah çalışır, repoya commit edilmez)
- `.github/workflows/pages.yml`: push ve her sabah → haberleri topla → Pages'e yayınla
- Veriler telefonda `localStorage` (`gelisim.v1`); Ben sekmesinde yedek kodu var.

## İçerik ekleme
- Yeni ders: `CURRICULUM[alan][modül].lessons` dizisine aynı yapıda nesne ekle (slides + quiz + task). Ders kimlikleri (`de1-1` gibi) değişmemeli; ilerleme bunlara bağlı.
- Slayt tipleri: intro, cards, flow, compare, phrases, code, table, venn, star, bars, funnel, formula. Her slaytta kısa metin (`p`) ve görsel olsun: ne sadece yazı ne sadece görsel.
- Boş `lessons: []` olan modüller "sıradaki adım" olarak görünür; kullanıcı istediğinde içerik eklenir.
- Her yayında `sw.js` içindeki `V` sürümünü ve `index.html`'deki `?v=` değerlerini artır.

## Çalışma tercihleri
- Token tasarrufu: tam test paketi ya da CI beklemek yok; yalnızca hızlı kontrol (`node --check`, gerekirse tek ekran görüntüsü). Hataları Mehmet kendisi bildirir.
- Kullanıcıya teknik ayrıntı değil, telefonda ne yapacağını anlat (telefon dili Türkçe).
