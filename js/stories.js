/* Uyku öncesi hikâyeler: özgün, sakin, B1 seviyesi. s = [Almanca, Türkçe] cümleler, v = önemli kelimeler. */
window.STORIES = [
  { id: "h1", title: "Der Abend am See", tr: "Göldeki akşam", mood: "Ruhe", s: [
    ["Es ist ein warmer Abend im September.", "Eylülde ılık bir akşam."],
    ["Emre sitzt auf einer Bank am See.", "Emre gölün kenarındaki bir bankta oturuyor."],
    ["Die Sonne geht langsam unter, und das Wasser wird golden.", "Güneş yavaşça batıyor ve su altın rengine dönüyor."],
    ["Er hört die Vögel und das leise Rauschen der Bäume.", "Kuşları ve ağaçların hafif hışırtısını duyuyor."],
    ["Die Woche war anstrengend, aber jetzt ist alles still.", "Hafta yorucuydu ama şimdi her şey sessiz."],
    ["Emre atmet tief ein und wieder aus.", "Emre derin bir nefes alıp veriyor."],
    ["Er denkt an seine Kinder, die zu Hause schon schlafen.", "Evde çoktan uyumuş olan çocuklarını düşünüyor."],
    ["Ein Gefühl von Dankbarkeit füllt sein Herz.", "Kalbini bir minnet duygusu dolduruyor."],
    ["Nicht alles im Leben ist perfekt, denkt er.", "Hayatta her şey mükemmel değil, diye düşünüyor."],
    ["Aber heute Abend ist es genug.", "Ama bu akşam yeterli."],
    ["Ein kleiner Fisch springt aus dem Wasser und verschwindet wieder.", "Küçük bir balık sudan sıçrayıp yeniden kayboluyor."],
    ["Emre lächelt, steht langsam auf und geht nach Hause.", "Emre gülümsüyor, yavaşça kalkıp eve gidiyor."]
  ], v: [["anstrengend", "yorucu"], ["still", "sessiz"], ["tief einatmen", "derin nefes almak"], ["die Dankbarkeit", "minnet"], ["verschwinden", "kaybolmak"], ["lächeln", "gülümsemek"]] },

  { id: "h2", title: "Die Überraschung", tr: "Sürpriz", mood: "Freude", s: [
    ["Heute hat Sabine Geburtstag, aber sie weiß nichts von der Überraschung.", "Bugün Sabine'nin doğum günü ama sürprizden haberi yok."],
    ["Ihre Kollegen sind schon früh im Büro.", "İş arkadaşları erkenden ofise gelmiş."],
    ["Mehmet hat einen Kuchen gebacken, und Lisa hat Luftballons mitgebracht.", "Mehmet pasta yapmış, Lisa da balon getirmiş."],
    ["Alle sind ein bisschen aufgeregt.", "Herkes biraz heyecanlı."],
    ["Um neun Uhr öffnet Sabine die Tür.", "Saat dokuzda Sabine kapıyı açıyor."],
    ["\"Überraschung! Alles Gute zum Geburtstag!\", rufen alle.", "\"Sürpriz! Doğum günün kutlu olsun!\" diye bağırıyor herkes."],
    ["Sabine ist sprachlos.", "Sabine'nin dili tutuluyor."],
    ["Dann lacht sie und hat Tränen in den Augen.", "Sonra gülüyor, gözleri doluyor."],
    ["\"Ihr seid verrückt\", sagt sie, \"aber ich bin so gerührt.\"", "\"Siz delisiniz\" diyor, \"ama çok duygulandım.\""],
    ["Sie essen zusammen Kuchen und erzählen Geschichten.", "Birlikte pasta yiyip hikâyeler anlatıyorlar."],
    ["An diesem Tag arbeiten alle ein bisschen langsamer, aber mit guter Laune.", "O gün herkes biraz daha yavaş çalışıyor ama keyifle."]
  ], v: [["die Überraschung", "sürpriz"], ["aufgeregt", "heyecanlı"], ["sprachlos", "dili tutulmuş"], ["gerührt", "duygulanmış"], ["die Träne", "gözyaşı"], ["gute Laune", "iyi ruh hâli"]] },

  { id: "h3", title: "Ein schwieriger Montag", tr: "Zor bir pazartesi", mood: "Stress → Erleichterung", s: [
    ["Am Montag geht alles schief.", "Pazartesi her şey ters gidiyor."],
    ["Der Zug hat Verspätung, und Ali kommt zu spät zur Arbeit.", "Tren rötar yapıyor ve Ali işe geç kalıyor."],
    ["Im Büro wartet schon eine lange Liste mit Fehlern.", "Ofiste onu hatalarla dolu uzun bir liste bekliyor."],
    ["Ali ist gestresst und ein bisschen wütend auf sich selbst.", "Ali stresli ve kendine biraz kızgın."],
    ["Seine Kollegin Anna merkt das.", "İş arkadaşı Anna bunu fark ediyor."],
    ["\"Alles okay bei dir? Du siehst müde aus\", sagt sie.", "\"İyi misin? Yorgun görünüyorsun\" diyor."],
    ["\"Ehrlich gesagt nicht so\", antwortet Ali.", "\"Açıkçası pek değil\" diye cevap veriyor Ali."],
    ["Anna bietet ihm Hilfe an, und zusammen finden sie die Ursache.", "Anna yardım teklif ediyor ve birlikte nedeni buluyorlar."],
    ["Es war nur ein kleiner Fehler in einer Formel.", "Bir formülde küçük bir hataymış sadece."],
    ["Ali ist sehr erleichtert.", "Ali çok rahatlıyor."],
    ["\"Danke, du hast meinen Tag gerettet\", sagt er.", "\"Teşekkürler, günümü kurtardın\" diyor."],
    ["\"Kein Ding\", lacht Anna. \"Nächstes Mal hilfst du mir.\"", "\"Ne demek\" diye gülüyor Anna. \"Bir dahaki sefere sen bana yardım edersin.\""]
  ], v: [["schiefgehen", "ters gitmek"], ["die Verspätung", "gecikme, rötar"], ["wütend", "kızgın"], ["merken", "fark etmek"], ["erleichtert", "rahatlamış"], ["retten", "kurtarmak"]] },

  { id: "h4", title: "Das verlorene Spiel", tr: "Kaybedilen maç", mood: "Enttäuschung → Zusammenhalt", s: [
    ["Es regnet, und der Platz ist nass und schwer.", "Yağmur yağıyor, saha ıslak ve ağır."],
    ["Die Mannschaft kämpft neunzig Minuten lang.", "Takım doksan dakika boyunca mücadele ediyor."],
    ["Aber in der letzten Minute fällt das Gegentor.", "Ama son dakikada gol yiyorlar."],
    ["Die Spieler sitzen enttäuscht in der Kabine.", "Oyuncular soyunma odasında hayal kırıklığı içinde oturuyor."],
    ["Niemand sagt ein Wort.", "Kimse tek kelime etmiyor."],
    ["Dann steht der Trainer auf.", "Sonra antrenör ayağa kalkıyor."],
    ["\"Ich bin stolz auf euch\", sagt er ruhig.", "\"Sizinle gurur duyuyorum\" diyor sakince."],
    ["\"Heute hat das Ergebnis nicht gestimmt, aber der Einsatz schon.\"", "\"Bugün skor tutmadı ama emek tuttu.\""],
    ["Ein junger Spieler hebt den Kopf.", "Genç bir oyuncu başını kaldırıyor."],
    ["Langsam kommt die Hoffnung zurück.", "Umut yavaş yavaş geri geliyor."],
    ["Nach dem Duschen essen alle zusammen im Vereinsheim.", "Duştan sonra herkes kulüp lokalinde birlikte yemek yiyor."],
    ["Am Ende lachen sie wieder, denn eine Mannschaft verliert zusammen und gewinnt zusammen.", "Sonunda yine gülüyorlar, çünkü takım birlikte kaybeder, birlikte kazanır."]
  ], v: [["kämpfen", "mücadele etmek"], ["das Gegentor", "yenilen gol"], ["enttäuscht", "hayal kırıklığına uğramış"], ["stolz auf", "… ile gurur duymak"], ["der Einsatz", "çaba, emek"], ["die Hoffnung", "umut"]] },

  { id: "h5", title: "Der neue Nachbar", tr: "Yeni komşu", mood: "Neugier → Freundschaft", s: [
    ["Nebenan ist eine neue Familie eingezogen.", "Yan eve yeni bir aile taşındı."],
    ["Herr Weber ist älter und wirkt ein bisschen streng.", "Bay Weber yaşlıca ve biraz sert görünüyor."],
    ["Mehmet ist unsicher. Soll er Hallo sagen?", "Mehmet emin değil. Merhaba mı desin?"],
    ["Am Samstag sieht er Herrn Weber im Garten.", "Cumartesi Bay Weber'i bahçede görüyor."],
    ["\"Guten Tag! Ich bin Mehmet, Ihr Nachbar\", sagt er freundlich.", "\"İyi günler! Ben Mehmet, komşunuzum\" diyor güler yüzle."],
    ["Herr Weber lächelt. \"Schön, Sie kennenzulernen!\"", "Bay Weber gülümsüyor. \"Tanıştığıma memnun oldum!\""],
    ["Sie reden über das Wetter, über Gärten und über Fußball.", "Hava, bahçeler ve futbol hakkında konuşuyorlar."],
    ["Herr Weber war früher Trainer in einem kleinen Verein.", "Bay Weber eskiden küçük bir kulüpte antrenörmüş."],
    ["\"Kommen Sie doch mal zum Spiel!\", sagt Mehmet.", "\"Bir gün maça gelsenize!\" diyor Mehmet."],
    ["\"Gern! Und Sie kommen auf einen Kaffee vorbei\", antwortet Herr Weber.", "\"Memnuniyetle! Siz de bir kahveye uğrayın\" diye cevap veriyor Bay Weber."],
    ["Mehmet geht zurück ins Haus und ist froh.", "Mehmet eve dönüyor ve memnun."],
    ["Manchmal braucht es nur ein Hallo.", "Bazen tek gereken bir merhabadır."]
  ], v: [["einziehen", "taşınmak (eve)"], ["wirken", "… görünmek"], ["unsicher", "kararsız, emin değil"], ["kennenlernen", "tanışmak"], ["vorbeikommen", "uğramak"], ["froh", "memnun"]] },

  { id: "h6", title: "Der erste Schnee", tr: "İlk kar", mood: "Erinnerung → Geborgenheit", s: [
    ["In der Nacht hat es zum ersten Mal geschneit.", "Gece ilk kez kar yağdı."],
    ["Am Morgen ist der Garten ganz weiß.", "Sabah bahçe bembeyaz."],
    ["Die Kinder stehen am Fenster und können es kaum glauben.", "Çocuklar pencerenin önünde duruyor, inanamıyorlar."],
    ["\"Papa, dürfen wir raus?\", fragen sie ungeduldig.", "\"Baba, dışarı çıkabilir miyiz?\" diye soruyorlar sabırsızca."],
    ["Der Vater denkt an seine eigene Kindheit.", "Baba kendi çocukluğunu düşünüyor."],
    ["Auch er hat damals im Schnee gespielt, weit weg in einem anderen Land.", "O da o zamanlar, uzak bir ülkede karda oynamıştı."],
    ["Für einen Moment spürt er ein bisschen Heimweh.", "Bir an hafif bir memleket özlemi hissediyor."],
    ["Dann zieht er die Jacke an und geht mit den Kindern hinaus.", "Sonra montunu giyip çocuklarla dışarı çıkıyor."],
    ["Sie bauen einen Schneemann und werfen Schneebälle.", "Kardan adam yapıyor, kartopu atıyorlar."],
    ["Die Kinder lachen laut, ihre Wangen sind rot.", "Çocuklar yüksek sesle gülüyor, yanakları kıpkırmızı."],
    ["Später trinken alle warmen Kakao in der Küche.", "Sonra herkes mutfakta sıcak kakao içiyor."],
    ["Der Vater merkt: Zuhause ist dort, wo die Familie ist.", "Baba fark ediyor: ev, ailenin olduğu yerdir."]
  ], v: [["schneien", "kar yağmak"], ["ungeduldig", "sabırsız"], ["die Kindheit", "çocukluk"], ["das Heimweh", "memleket özlemi"], ["spüren", "hissetmek"], ["die Wange", "yanak"]] }
];
