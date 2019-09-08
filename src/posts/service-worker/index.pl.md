---
title: 'Service Worker'
date: '2019-09-08'
---

- zwykły-niezwykły plik JavaScript'owy
- rozszerzenie przeglądarki (takie które strona internetowa może zainstalować w przeglądarce użytkownika) 
- po zainstalowaniu, rozszerza przeglądarkę dla danej strony internetowej będąc potężną warstwą pośredniczącą (proxy) 
- warstwa ma zdolność przechwytywania i radzenia sobie ze wszystkimi żądaniami które wykonuje strona 
- posiada własny cykl życia niezależny od karty przeglądarki 
    - zwykłe odświeżenie strony nie jest wystarczające do jego zaktualizowania – tak jak można oczekiwać, że odświeżenie strony zaktualizuje kod wdrożony na serwerze
- każda warstwa (klient, service worker, serwer) ma swoje unikalne zasady aktualizacji  

###### WAŻNE!
Service Worker to nowa warstwa pośrednicząca ze swoim własnym cyklem życia i metodą aktualizacji 