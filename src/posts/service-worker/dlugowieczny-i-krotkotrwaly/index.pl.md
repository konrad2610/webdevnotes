---
title: 'Service Worker: długowieczny, ale krótkotrwały'
date: '2019-09-09'
---

- Aktywny service worker żyje nawet po wyjściu użytkownika ze strony lub zamknięciu przez niego karty przeglądarki 
- Przeglądarka trzyma aktywnego service workera w pobliżu, tak żeby był gotowy, gdy użytkownik powróci na stronę 
- Przed pierwszym wykonanym żądaniem, service worker ma szanse na przechwycenie tego żądania i przejęcia kontroli nad stroną 
- Service worker może zaserwować zcache'owaną wersję całej strony, nawet jeśli użytkownik nie ma połączenia z Internetem (praca offline)

###### ZATRZYMANY: 
- Pomimo pozornej nieśmiertelności, można go w każdej chwili --zatrzymać-- 
- Przeglądarka nie chce marnować zasobów na bezczynnego service workera 
- Zatrzymanie to nie to samo co ZAKOŃCZENIE service workera – po zatrzymaniu pozostaje zainstalowany i aktywowany 
- Uśpiony 
- Następnym razem, gdy service worker jest potrzebny (np. do obsługi żądania), przeglądarka budzi go z powrotem 

###### WAITUNTIL: 

- Ze względu na ciągłą możliwość bycia usypianym, service worker potrzebuje sposobu na poinformowanie przeglądarki, gdy robi coś ważnego i nie chce się zdrzemnąć -> to tutaj event.waitUntil() wchodzi do gry 
- waitUntil wydłuża cykl życia service workera 
- chroni service worker'a zarówno przed zatrzymaniem, jak i przejściem do następnej fazy cyklu życia, dopóki nie będzie na to gotowy 
    - To daje nam czas na konfigurowanie pamięci podręcznych, pobieranie zasobów z sieci itp. 

W poniższym przykładzie dajemy znać przeglądarce, że instalacja service workera nie zostanie zakończona, dopóki pamięć podręczna 'assets' nie zostanie utworzona i zapełniona obrazem 

self.addEventListener("install", event => { 
  event.waitUntil( 
    caches.open("assets").then(cache => { 
      return cache.addAll(["/weapons/sword/blade.png"]); 
    }) 
  ); 
}); 

###### UWAGA NA STAN GLOBALNY: 

- Kiedy następuje ten cykl budzenia/usypiania (startowania/zatrzymywania), globalny stan jest resetowany. 
- Nie można polegać na globalnym stanu w service workerze, bo następnym razem, gdy service worker się obudzi może mieć inny stan niż oczekiwany. 

Przykład z użyciem globalnego stanu: 

const favoriteNumber = Math.random(); 
let hasHandledARequest = false; 
 
self.addEventListener("fetch", event => { 
  console.log(favoriteNumber); 
  console.log(hasHandledARequest); 
  hasHandledARequest = true; 
}); 

###### KROK po KROKU: 
- Przy każdym żądaniu service worker zaloguje numer, powiedzmy '0.13981866382421893' 
- Dodatkowo zmienna hasHandledARequest zmienia się na 'true' 

- Teraz service worker siedzi przez chwilę bezczynnie, więc przeglądarka go zatrzymuje 
- Po jakimś czasie, pojawia się żądanie, więc service worker jest ponownie potrzebny, więc przeglądarka go budzi 
- Jego skrypt jest ponownie oceniany/analizowany (evaluated) 

- Teraz zmienna hasHandledARequest jest resetowana do wartości 'false', a zmienna 'favoriteNumber' przybiera zupełnie inną wartość - '0.590728183535909033' 

- Nie można polegać na stanie przechowywanym w SW 
- Dodatkowo, tworzenie instancji takich rzeczy jak kanały wiadomości (MessageChannels) może powodować błędy: otrzymasz nową instancję za każdym razem, gdy SW zatrzymuje się / uruchamia. 

###### UWAGA!!! 

- O tym smaczku należy szczególnie pamiętać podczas pracy nad kodem service workera, ponieważ gdy DevTools'y są otwarte, zachowanie start / stop jest wyłączone.  
- W trakcie developmentu, można nawet nie zobaczyć błędów spowodowanych poleganiem na globalnym stanie, dopóki nie zostaną wysłane do Twoich użytkowników 

###### WAŻNE:
Service worker - pomyśl o nim jak o psie. Jest szybki, lojalny i niesamowity. Pozostanie przy twoim boku bez względu na wszystko. Ale głównie chce po prostu spać. Cały czas. Musisz powiadomić go, kiedy chcesz, żeby nie zasypiał/był czujny. 