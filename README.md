# Cockpit

Web app personale di allenamento per iPhone, nero e oro. Legge i dati da intervals.icu: prontezza (HRV, FC a riposo, sonno), calendario del coach, forma, ultime uscite, palestra, integrazione e valori.

## Installazione su iPhone
1. Apri il sito in Safari.
2. Tocca Condividi, poi "Aggiungi alla schermata Home".
3. Apri Cockpit dall'icona, vai in Impostazioni (ingranaggio) e incolla ID atleta e chiave API di intervals.icu.

La chiave resta salvata solo sul telefono, nel browser. Non è nel codice e non passa da GitHub.

## Se i dati non arrivano
In Impostazioni, Diagnostica, ogni sezione mostra se la lettura è riuscita. Se tutte danno "network", Safari blocca le chiamate dirette a intervals.icu: in quel caso si usa l'intermediario in `intermediario/worker.js` (Cloudflare Workers, gratuito) e se ne incolla l'indirizzo nelle Impostazioni.
