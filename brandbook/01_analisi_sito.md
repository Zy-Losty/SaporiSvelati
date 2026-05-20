# 🔍 Analisi Tecnica e UX/UI del Sito Web

Questo documento fornisce un'analisi approfondita del sito web **Sapori Svelati**, esaminando l'architettura tecnica, l'esperienza utente (UX/UI), le performance, l'accessibilità (A11y), l'ottimizzazione per i motori di ricerca (SEO) e la conformità legale (GDPR).

---

## 1. UX/UI & Layout: L'Esperienza Visiva

Il sito web si distingue per un'interfaccia elegante, calda e immersiva che richiama i ricettari d'epoca e i taccuini di viaggio, pur mantenendo un'usabilità moderna.

### Palette Colori e Impatto Visivo
L'uso dei colori è estremamente mirato ed evocativo, allineato con il tema della cultura culinaria e storica:
*   **Crema Pergamena (`--canvas`: `#FFF8E7`)**: Usato come sfondo primario, arricchito da una texture delicata (`paper-fibers.png`). Riduce l'affaticamento visivo rispetto al bianco puro ed evoca storicità e artigianalità.
*   **Terracotta Bruciata (`--primary`: `#A0522D`)**: Colore primario per i titoli, i pulsanti e gli elementi interattivi. Evoca calore, terra, spezie e cottura tradizionale.
*   **Espresso Scuro (`--text`: `#3B3131`)**: Colore del testo principale. Rispetto al nero assoluto, offre un contrasto morbido e naturale sulla pergamena, migliorando la leggibilità.
*   **Verde Salvia Antico (`--accent`: `#78866B`)**: Utilizzato per dettagli, tag di categoria ed elementi di accento secondari. Richiama la freschezza degli ingredienti naturali, delle erbe aromatiche e della sostenibilità.

### Micro-Interazioni e Animazioni Fluid
Il sito implementa diverse animazioni sofisticate che elevano il feeling dell'applicazione:
*   **Scroll Reveal (`.reveal`)**: Gli elementi appaiono con una transizione fluida e un leggero blur quando entrano nel viewport. La logica è gestita in modo efficiente tramite `IntersectionObserver` in JavaScript.
*   **Barra di Progresso di Lettura (`.reading-progress`)**: Una sottile barra color terracotta si espande sotto l'header man mano che l'utente scorre la pagina, offrendo un feedback visivo immediato sulla lunghezza dell'articolo.
*   **Engagement "Alt-Tab"**: Una chicca di micro-interazione in `js/main.js` rileva quando l'utente cambia scheda nel browser, alternando dinamicamente il titolo del tab tra *"Ritorna 🍕"* e *"Non dimenticarmi 🍷"* per stimolare la curiosità ed invitare al rientro sul sito.
*   **Menu Hamburger Mobile**: Transizione fluida in tre fasi per la trasformazione dell'icona del menu su dispositivi mobili, con blocco dello scroll del body quando il menu è attivo per evitare disorientamento.

---

## 2. Architettura Tecnica: Semplice, Modulare e Veloce

Il sito web adotta una filosofia costruttiva **Vanilla** (HTML5 puro, CSS3 e JavaScript nativo), dimostrando come si possano ottenere risultati straordinari senza l'ausilio di framework pesanti.

### Iniezione Dinamica dei Componenti (`js/components.js`)
Per ottimizzare la manutenzione ed evitare la duplicazione del codice HTML nelle 18 pagine di articoli, il progetto adotta una struttura modulare intelligente basata su file JavaScript:
*   L'elemento `<html>` di ciascuna pagina specifica un attributo `data-root` (`./` per la root, `../` per la cartella `/pages/`).
*   Il file `js/components.js` legge questo attributo ed inietta dinamicamente gli elementi comuni a tutte le pagine:
    *   **Header** con logo e navigazione coordinata.
    *   **Footer** con informazioni di contatto, canali social e link legali.
    *   **Cookie Consent Modal** per la gestione del consenso.
    *   **Newsletter** (predisposta e facilmente attivabile).

Questo approccio ibrido unisce i vantaggi di velocità SEO delle pagine statiche alla manutenibilità tipica delle Single Page Application (SPA).

---

## 3. SEO e Accessibilità (A11y)

### Ottimizzazione SEO
Il sito web rispetta i massimi standard SEO per l'indicizzazione biologica:
*   **Tag Titolo e Meta Description**: Ogni articolo possiede meta tag descrittivi univoci che riassumono accuratamente il contenuto narrativo (es. *"Scopri il segreto della marmorizzazione perfetta del Wagyu..."*).
*   **Gerarchia dei Titoli (Headings)**: Utilizzo strutturato di un singolo tag `<h1>` per pagina, seguito da `<h2>` e `<h3>` per organizzare logicamente il testo.
*   **Dati Semantici**: Uso di tag HTML5 strutturati (`<article>`, `<section>`, `<header>`, `<main>`, `<footer>`, `<nav>`) che facilitano la comprensione della struttura del sito da parte dei crawler di Google.

### Accessibilità (A11y)
Il design include accorgimenti specifici per supportare utenti con disabilità motorie o visive:
*   **Skip Link**: Un link invisibile a inizio pagina (`Salta al contenuto principale`) che si attiva tramite tasto TAB, consentendo a chi usa screen reader di saltare direttamente al testo dell'articolo senza scorrere la navigazione.
*   **Stati di Focus Evidenti (`:focus-visible`)**: Un contorno verde salvia ad alto contrasto (`outline: 3px solid var(--accent)`) che si attiva solo durante la navigazione da tastiera, preservando l'estetica visiva per gli utenti mouse ma garantendo massima accessibilità.
*   **Attributi ARIA**: Gestione corretta degli stati tramite `aria-expanded`, `aria-controls` e `aria-labelledby` nei menu a comparsa e nei popup di consenso.

---

## 4. Conformità Legale e Privacy (GDPR)

Il sito web adotta un approccio rigoroso alla privacy dell'utente, conforme al Regolamento UE 2016/679 (GDPR):
*   **Banner Cookie Opt-in Attivo**: Al primo accesso, il banner dei cookie (`.cookie-modal`) impedisce l'attivazione dei codici di tracciamento finché l'utente non ha espresso un consenso esplicito.
*   **Tracciamento Condizionale**: Google Analytics (`G-LW84VKE7ND`) e Meta Pixel (`8412795355467525`) vengono caricati in memoria **solo** nel caso in cui l'utente prema il pulsante *"✓ Accetta"*. In caso di rifiuto, nessun cookie di terza parte viene installato.
*   **Pagine Legali Dedicate**: Sono presenti tre informative distinte, dettagliate e facilmente accessibili dal footer:
    1.  `privacy-policy.html` (Informativa sulla privacy).
    2.  `cookie-policy.html` (Informativa specifica sull'uso dei cookie).
    3.  `termini-condizioni.html` (Termini di utilizzo del portale).

---

## Conclusioni dell'Analisi

> [!TIP]
> **Punti di Forza Strategici:**
> *   Ottimizzazione eccezionale delle performance grazie all'uso di codice nativo senza dipendenze esterne.
> *   Brand identity coerente in tutte le sezioni visive e interattive (palette e tipografia).
> *   Architettura tecnica sostenibile e facilmente scalabile per l'aggiunta di nuovi articoli.
> 
> **Opportunità di Miglioramento:**
> *   L'iniezione dinamica di Header e Footer tramite JavaScript è ottima per la manutenzione, ma per una SEO estrema si potrebbe valutare in futuro un processo di build statico (es. con un generatore statico leggero) in modo che i motori di ricerca vedano i tag di navigazione direttamente nel codice sorgente HTML grezzo senza dover eseguire Javascript.
