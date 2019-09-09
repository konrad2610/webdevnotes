---
title: 'Service Worker: ograniczona potęga'
date: '2019-09-09'
---

Korzyści wynikające z posiadania service worker'a na własnej stronie: 
- działanie w trybie offline 
- zwiększona wydajność przy odpowiednio dobranej startegii cache'owania 
- notyfikacje push
- przekształcenie strony w PWA (Progresywna Aplikacja Internetowa) 

Korzyści idą w parze z ograniczeniami. Ograniczeniami w konstrukcji:
- asynchroniczna natura - brak synchronicznego działania
- osobny wątek względem strony => brak dostępu do: 
    - localStorage 
    - DOM 
    - window 

Istnieje kilka sposobów na komunikację strony z service worker'em: 
- postMessage 
- kanały informacyjne 'jeden-do-jednego' (MessageChannels) 
- Kanały nadawcze 'jeden-do-wielu' (Broadcast Channels) 

###### WAŻNE:
Service worker 'żyje' poza Twoją stroną. Możesz do niego mówić, ale nie ma on bezpośredniego dostępu do Twojej strony 