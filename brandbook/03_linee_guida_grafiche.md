# 🎨 Linee Guida Grafiche e Visual Design

Questo capitolo del brandbook definisce le linee guida visive ufficiali per **Sapori Svelati**. L'obiettivo è garantire la massima coerenza visiva su qualsiasi touchpoint (sito web, social media, newsletter, stampati).

---

## 1. Il Logo Istituzionale

Il logo di **Sapori Svelati** è una composizione geometrica complessa ed estremamente elegante, realizzata in formato vettoriale (`SVG`) per garantire la massima nitidezza a qualsiasi risoluzione.

```
                  [ 🍽️ Logo Sapori Svelati ]
                 Composizione lineare organica 
              in colore Terracotta Bruciata (#A0522D)
```

### Concetto Visivo del Logo
Il logo rappresenta in modo stilizzato e astratto l'incontro tra:
1.  **L'elemento culinario**: Linee fluide che richiamano stoviglie e strumenti del cuoco.
2.  **L'elemento narrativo/storico**: Il dipanarsi di una pergamena o lo scorrere del tempo.
3.  **La complessità degli aromi**: Cerchi e onde concentriche che simboleggiano la diffusione dei profumi e dei sapori.

### Regole di Utilizzo del Logo

*   **Colore Istituzionale**: Il logo deve essere presentato nel colore primario **Terracotta Bruciata (`#A0522D`)** sullo sfondo **Crema Pergamena (`#FFF8E7`)**.
*   **Variante Monocromatica**: Su sfondi scuri (come nel footer, in cui lo sfondo è *Espresso Scuro*), il logo deve essere riprodotto in versione **Crema Pergamena (`#FFF8E7`)** o bianca pura ad alta opacità.
*   **Area di Rispetto**: Attorno al logo deve essere sempre mantenuto uno spazio libero pari al 25% dell'altezza totale del logo stesso, privo di testi, immagini o altri elementi grafici di disturbo.
*   **Dimensione Minima**:
    *   *Web/Digitale*: Larghezza minima di **32px** (es. nella barra di navigazione mobile).
    *   *Stampa*: Larghezza minima di **15mm**.

### Utilizzi Non Consentiti
*   ❌ Non ruotare o inclinare il logo.
*   ❌ Non alterare le proporzioni larghezza/altezza.
*   ❌ Non utilizzare colori diversi da quelli previsti dalla palette istituzionale.
*   ❌ Non aggiungere ombre, sfumature o effetti tridimensionali non approvati.

---

## 2. La Tavolozza Colori

I colori di Sapori Svelati sono stati selezionati per evocare una sensazione di calore naturale, artigianalità e storicità. Di seguito sono riportate le specifiche tecniche per l'uso digitale e tipografico:

| Colore | Campione | Codice HEX | Codice RGB | Codice HSL | Significato Psicologico & Ruolo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Crema Pergamena** | `     ` | `#FFF8E7` | `rgb(255, 248, 231)` | `hsl(42, 100%, 95%)` | Lo sfondo naturale del brand. Evoca carta antica, taccuini storici, accoglienza e morbidezza visiva. |
| **Terracotta Bruciata**| `     ` | `#A0522D` | `rgb(160, 82, 45)` | `hsl(19, 56%, 40%)` | Il colore della passione e del fuoco. Richiama spezie calde, argilla, mattoni di forni antichi. Colore primario per bottoni e titoli. |
| **Espresso Scuro** | `     ` | `#3B3131` | `rgb(59, 49, 49)` | `hsl(0, 9%, 21%)` | L'eleganza del caffè e del cioccolato fondente. Offre un contrasto leggibile e riposante per gli occhi, ideale per il testo principale. |
| **Verde Salvia Antico**| `     ` | `#78866B` | `rgb(120, 134, 107)` | `hsl(91, 11%, 47%)` | La freschezza della natura e delle erbe aromatiche. Usato per i dettagli, i tag di categoria e i tocchi di design secondari. |

### Contrasto e Accessibilità (WCAG 2.1)
*   Il testo in **Espresso Scuro** (`#3B3131`) su sfondo **Crema Pergamena** (`#FFF8E7`) supera ampiamente lo standard di contrasto **AAA** (contrasto > 9:1), garantendo una lettura impeccabile per chiunque.
*   I testi in **Terracotta Bruciata** (`#A0522D`) su sfondo crema devono essere utilizzati a dimensioni grandi (titoli, almeno 18pt bold) per soddisfare lo standard di contrasto **AA**.

---

## 3. Tipografia Istituzionale

La tipografia di Sapori Svelati unisce un font serif classico e scultoreo ad un sans-serif geometrico moderno e pulito.

```
[ TITOLO ]  -->  Playfair Display (Serif Elegante)
[ CORPO ]   -->  Montserrat (Sans-Serif Leggibile)
```

### Font per i Titoli (Headings): **Playfair Display**
*   **Famiglia**: Serif (con grazie).
*   **Carattere**: Elegante, editoriale, classico ma dinamico.
*   **Utilizzo**: Tag `<h1>`, `<h2>`, `<h3>`, grandi citazioni ed elementi identificativi del brand.
*   **CSS**: `font-family: 'Playfair Display', serif;`

### Font per il Corpo del Testo (Body): **Montserrat**
*   **Famiglia**: Sans-Serif (bastoni).
*   **Carattere**: Estremamente leggibile su schermi piccoli e grandi, geometrico, pulito.
*   **Utilizzo**: Testi descrittivi, articoli di blog, didascalie, menu e pulsanti.
*   **CSS**: `font-family: 'Montserrat', sans-serif;`

### Gerarchia Tipografica per il Web

Per garantire un'impaginazione fluida su qualsiasi schermo, Sapori Svelati utilizza le funzioni CSS `clamp()` per definire dimensioni tipografiche fluide responsive:

*   **Titolo Principale (H1)**: `clamp(2.5rem, 8vw, 4.5rem)` – Peso: 700 / 900.
*   **Titolo Sezione (H2)**: `clamp(2rem, 5vw, 3rem)` – Peso: 700.
*   **Titolo Sotto-sezione (H3)**: `clamp(1.5rem, 3vw, 2.2rem)` – Peso: 600.
*   **Corpo Testo (Body)**: `clamp(1rem, 1vw + 0.5rem, 1.125rem)` – Peso: 400 (Regular) per la lettura, 600 (Semi-bold) per elementi importanti.
*   **Didascalie e Tag (Small)**: `0.85rem` – Peso: 500 / 600.

---

## 4. Stile Visivo delle Immagini e Texture

Sapori Svelati non utilizza immagini patinate, asettiche o fredde. La direzione artistica per la fotografia e i visual prevede:

1.  **Tonalità Calde ed Evocative**: Le immagini devono prediligere colori caldi, luci naturali o soffuse (effetto chiaroscuro o luce da taverna/cucina antica).
2.  **Sfondi Scuri ed Eleganti**: I piatti e i cocktail (es. il *Dry Martini* o il *Wagyu*) spiccano se fotografati su sfondi scuri, rustici (legno massiccio, pietra lavica, metallo brunito) per dare un senso di tridimensionalità e preziosità.
3.  **Texture Organiche**: L'uso costante della texture `paper-fibers.png` in background sul sito web aggiunge una piacevole granularità tattile digitale, eliminando l'effetto "piatto" degli schermi moderni.
4.  **Iconografia Minimalista**: L'iconografia si affida alla libreria *FontAwesome 6 Pro/Free*, prediligendo icone a linee sottili o piene classiche in colore Verde Salvia o Terracotta (es. clessidre antiche per la categoria *Storia*, mappamondi per *Cultura*).

---

## Conclusioni Visive

> [!TIP]
> **La Regola del 70/20/10:**
> Per mantenere l'equilibrio cromatico visivo nei layout grafici, applicare la proporzione:
> *   **70%** di colore dominante: **Crema Pergamena** (spazi bianchi e sfondi).
> *   **20%** di colore secondario: **Espresso Scuro** (testi, linee di separazione ed elementi strutturali).
> *   **10%** di colore di accento: **Terracotta Bruciata** e **Verde Salvia Antico** (pulsanti, link, tag, icone).
