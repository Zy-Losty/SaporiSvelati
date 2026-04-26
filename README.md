# 🍽️ Sapori Svelati — Svelare l'Anima del Cibo

<div align="center">

[![Sapori Svelati](assets/images/brand/logo.svg)](https://zy-losty.github.io/SaporiSvelati/)

**Un viaggio narrativo attraverso la storia, la cultura e le tradizioni del mondo gastronomico.**

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-A0522D?style=for-the-badge&logo=github)](https://zy-losty.github.io/SaporiSvelati/)
[![Licenza](https://img.shields.io/badge/Licenza-MIT-78866B?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Panoramica

**Sapori Svelati** è un blog gastronomico premium che esplora le storie nascoste dietro ingredienti iconici, tradizioni culinarie millenarie e cocktail leggendari. Ogni articolo unisce narrazione, storia e scienza in un formato moderno e accessibile.

Il sito è costruito con tecnologie web standard (HTML5, CSS3 Vanilla, JavaScript), senza framework pesanti, con un'architettura modulare basata su componenti JavaScript iniettati dinamicamente.

---

## 🚀 Funzionalità Principali

| Feature | Descrizione |
|---|---|
| 📖 **18 Articoli Narrativi** | Approfondimenti su eccellenze come Wagyu, cocktail classici, ingredienti esotici e tradizioni millenarie |
| 🔍 **Catalogo con Filtri** | Sistema di filtraggio dinamico per categoria (Storia, Cultura, Alimenti, Curiosità, Tradizioni) con ricerca live |
| 🍪 **Cookie Banner GDPR** | Banner consenso cookie con pulsanti Accetta/Nega conforme al Regolamento UE 2016/679 |
| 📊 **Tracking Privacy-Conform** | Google Analytics e Meta Pixel attivati solo su esplicito consenso dell'utente |
| 📱 **Design Responsive** | Layout ottimizzato per mobile, tablet e desktop con micro-animazioni fluide |
| ♿ **Accessibilità** | Markup semantico HTML5, skip links, aria-labels e gestione focus da tastiera |
| ⚡ **Performance** | Zero dipendenze frontend pesanti, componenti lazy-loaded, immagini ottimizzate |

---

## 📁 Struttura del Progetto

```text
SaporiSvelati/
├── 📁 assets/
│   └── images/
│       ├── brand/          # Logo SVG
│       ├── articoli/       # Immagini degli articoli
│       └── home/           # Immagini homepage
├── 📁 css/
│   ├── base.css            # Design system globale (variabili, header, footer, cookie)
│   ├── home.css            # Stili homepage e catalogo
│   ├── article.css         # Stili pagine articolo
│   └── catalogo.css        # Stili griglia e filtri catalogo
├── 📁 js/
│   ├── components.js       # Iniezione Header, Footer, Newsletter, Cookie Modal
│   ├── main.js             # Animazioni, scroll reveal, parallax, cookie logic
│   └── catalogo.js         # Logica filtri e ricerca
├── 📁 pages/               # 18 articoli del blog
│   ├── articolo-wagyu.html
│   ├── articolo-via-spezie.html
│   ├── articolo-dry-martini.html
│   └── ... (15 altri articoli)
├── index.html              # Homepage
├── catalogo.html           # Pagina catalogo con filtri
├── privacy-policy.html     # Informativa Privacy (GDPR)
├── cookie-policy.html      # Informativa Cookie
└── termini-condizioni.html # Termini e Condizioni
```

---

## 🌐 Come Visualizzare il Sito

Il sito è una Single Page Application (SPA) concettuale basata su file statici. Può essere visualizzato aprendo `index.html` in qualsiasi browser moderno o servito tramite GitHub Pages.