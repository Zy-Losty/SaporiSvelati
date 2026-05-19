# Politica di Sicurezza (Security Policy)

Prendiamo molto seriamente la sicurezza di **Sapori Svelati**. In quanto blog dedicato alla cultura gastronomica e alla condivisione di contenuti di qualità, ci impegniamo a proteggere i dati dei nostri lettori e l'integrità della nostra piattaforma.

Questo documento descrive le versioni supportate, la nostra politica di divulgazione responsabile e le modalità per segnalare in modo sicuro eventuali vulnerabilità.

---

## Versioni Supportate (Supported Versions)

Sapori Svelati è un sito web statico basato su componenti JavaScript e stili CSS moderni. Di conseguenza, solo l'ultima versione rilasciata sul ramo `main` ed eseguita in produzione è attivamente supportata con aggiornamenti e correzioni di sicurezza.

| Versione | Supportata | Note |
| :--- | :---: | :--- |
| **1.x (Ramo `main`)** | :white_check_mark: | Ultima versione di produzione attiva su GitHub Pages |
| **Versioni Precedenti** | :x: | Non supportate, invitiamo ad aggiornare all'ultimo commit del ramo `main` |

---

## Segnalare una Vulnerabilità (Reporting a Vulnerability)

Se ritieni di aver scoperto una vulnerabilità di sicurezza (come problemi di Cross-Site Scripting (XSS), configurazioni errate o vulnerabilità nei componenti JavaScript di terze parti), ti preghiamo di **non divulgarla pubblicamente** prima che sia stata risolta.

Ti invitiamo a segnalarcela seguendo questi passaggi:

1. **Invia un'email privata** a: **[saporisvelati@gmail.com](mailto:saporisvelati@gmail.com)**.
2. Includi nell'oggetto: `[SICUREZZA] Segnalazione Vulnerabilità - Sapori Svelati`.
3. Nel corpo dell'email, fornisci una descrizione dettagliata del problema, includendo:
   - Tipo di vulnerabilità (es. DOM-based XSS, Sanitizzazione Input, ecc.)
   - Passaggi dettagliati per riprodurre il problema (Proof of Concept - PoC)
   - L'impatto potenziale o lo scenario di rischio
   - Eventuali suggerimenti per la risoluzione

### Cosa Aspettarsi

Ci impegniamo a gestire ogni segnalazione con la massima tempestività e professionalità:

- **Conferma di ricezione:** Ti risponderemo entro **48 ore** confermando di aver preso in carico la segnalazione.
- **Triage e Analisi:** Analizzeremo la gravità del problema e ti terremo aggiornato sul progresso delle nostre indagini.
- **Risoluzione:** Qualora la vulnerabilità sia confermata, pubblicheremo una correzione sul ramo principale entro un tempo ragionevole (solitamente entro 7 giorni per problemi a basso/medio impatto, o entro 48 ore per problemi critici).
- **Divulgazione:** Una volta applicato e verificato il fix di sicurezza, potremo concordare una divulgazione pubblica (ad esempio tramite note di rilascio o commit dedicati).

---

## Il Nostro Approccio alla Sicurezza

Per mantenere il nostro sito sicuro, applichiamo costantemente buone pratiche di sviluppo, tra cui:
- **Sanitizzazione dell'Input:** Utilizziamo funzioni di escaping avanzate (come la sanitizzazione dei testi dinamici e delle email tramite `escapeHTML`) per prevenire attacchi Cross-Site Scripting (XSS).
- **Iframe Sandbox:** Qualsiasi contenuto sensibile o di anteprima dinamica viene isolato all'interno di un `<iframe>` protetto con restrizioni di sandbox (`sandbox=""`) per prevenire l'esecuzione di script non autorizzati.
- **Nessuna dipendenza superflua:** Riduciamo al minimo le librerie esterne per limitare la superficie di attacco complessiva del blog.

Grazie per aiutarci a mantenere Sapori Svelati un luogo sicuro per tutti gli appassionati di cibo e cultura!
