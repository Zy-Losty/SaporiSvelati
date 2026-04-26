# 🍽️ Sapori Svelati — Svelare l'Anima del Cibo

<div align="center">

[![Sapori Svelati](assets/images/brand/logo.svg)](https://zy-losty.github.io/SaporiSvelati/)

**Un viaggio narrativo attraverso la storia, la cultura e le tradizioni del mondo gastronomico.**

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-A0522D?style=for-the-badge&logo=github)](https://zy-losty.github.io/SaporiSvelati/)
[![Licenza](https://img.shields.io/badge/Licenza-MIT-78866B?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Panoramica

**Sapori Svelati** è un blog gastronomico premium che esplora le storie nascoste dietro ingredienti iconici, tradizioni culinarie millenarie e cocktail leggendari. Dal Wagyu al curry, dalla via delle spezie al Dry Martini: ogni articolo unisce narrazione, storia e scienza in un formato moderno e accessibile.

Il sito è costruito con tecnologie web standard (HTML5, CSS3 Vanilla, JavaScript), senza framework pesanti, con un'architettura modulare basata su componenti JavaScript iniettati dinamicamente.

---

## 🚀 Funzionalità Principali

| Feature | Descrizione |
|---|---|
| 📖 **18 Articoli Narrativi** | Approfondimenti su eccellenze come Wagyu, cocktail classici, ingredienti esotici e tradizioni millenarie |
| 🔍 **Catalogo con Filtri** | Sistema di filtraggio dinamico per categoria (Storia, Cultura, Alimenti, Curiosità, Tradizioni) con ricerca live |
| 🍪 **Cookie Banner GDPR** | Banner consenso cookie con pulsanti Accetta/Nega conforme al Regolamento UE 2016/679 |
| 📊 **Google Analytics** | Tracciamento anonimo delle visite tramite Google Tag (G-LW84VKE7ND) |
| 📧 **Sistema Newsletter** | Backend Node.js con gestione iscritti, invio email con Nodemailer e pannello admin privato |
| 🔐 **Admin Dashboard** | Pannello di controllo con autenticazione per gestire iscritti e inviare campagne email |
| 📱 **Design Responsive** | Layout ottimizzato per mobile, tablet e desktop con micro-animazioni fluide |
| ♿ **Accessibilità** | Markup semantico HTML5, skip links, aria-labels e gestione focus da tastiera |
| ⚡ **Performance** | Zero dipendenze frontend pesanti, componenti lazy-loaded, immagini ottimizzate |

---

## 🛠️ Stack Tecnologico

### Frontend (Static — GitHub Pages)
- **HTML5** — Struttura semantica con articoli, sezioni e markup accessibile
- **CSS3 Vanilla** (Architettura Modulare) — `base.css`, `home.css`, `article.css`, `catalogo.css`, `admin.css`
- **JavaScript Vanilla** — `components.js` (iniezione componenti), `main.js` (animazioni/interazioni), `catalogo.js` (filtri)
- **Font Awesome 6.5** — Iconografia
- **Google Fonts** — Tipografia: *Playfair Display* (titoli) + *Montserrat* (corpo)

### Backend (Opzionale — Self-hosted / Render)
- **Node.js + Express** — Server REST per newsletter e admin
- **SQLite / JSON Storage** — Memorizzazione iscritti e archivio campagne
- **Nodemailer** — Invio email automatizzato
- **Express-Session** — Autenticazione area amministrativa

---

## 📁 Struttura del Progetto

```text
SaporiSvelati/
├── 📁 admin/               # Pannello di controllo admin
│   └── index.html
├── 📁 assets/
│   └── images/
│       ├── brand/          # Logo SVG
│       ├── articoli/       # Immagini degli articoli
│       └── home/           # Immagini homepage
├── 📁 css/
│   ├── base.css            # Design system globale (variabili, header, footer, cookie)
│   ├── home.css            # Stili homepage e catalogo
│   ├── article.css         # Stili pagine articolo
│   ├── catalogo.css        # Stili griglia e filtri catalogo
│   └── admin.css           # Stili pannello admin
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
├── termini-condizioni.html # Termini e Condizioni
├── server.js               # Backend Express (newsletter + admin)
├── database.js             # Gestore database newsletter
├── package.json            # Dipendenze Node.js
└── start-backend.bat       # Avvio rapido backend su Windows
```

---

## 🌐 Come Visualizzare il Sito

### Versione Statica (GitHub Pages)
Il sito è pubblicato e accessibile direttamente:

👉 **[https://zy-losty.github.io/SaporiSvelati/](https://zy-losty.github.io/SaporiSvelati/)**

Tutte le funzionalità di navigazione, lettura articoli, filtri e cookie banner sono operative senza alcuna configurazione.

### Versione Completa con Backend (Newsletter + Admin)

Per attivare il sistema newsletter e il pannello admin, avvia il server locale:

**Prerequisiti:** [Node.js](https://nodejs.org/) installato

```bash
# Installa le dipendenze
npm install

# Avvia il server
node server.js
```

Oppure su Windows, fai doppio click su **`start-backend.bat`**.

Il sito sarà disponibile su:
- **Sito:** `http://localhost:3000`
- **Admin:** `http://localhost:3000/admin`

### Deploy su Render (Backend sempre online)

Per rendere il backend accessibile da qualsiasi dispositivo:

1. Vai su [Render.com](https://render.com/) e connetti il repository GitHub
2. Crea un **Web Service** con:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
3. (Opzionale) Aggiungi la variabile d'ambiente `ADMIN_PASSWORD` per personalizzare la password admin
4. Il sito sarà disponibile su un URL tipo `https://sapori-svelati-xyz.onrender.com`

---

## 📜 Conformità Legale

Il sito è conforme al Regolamento GDPR (UE 2016/679):
- 🍪 **Cookie Banner** con consenso esplicito (Accetta / Nega)
- 📄 **Privacy Policy** con dettaglio dei dati raccolti e diritti dell'utente
- 📄 **Cookie Policy** con tabella dei cookie utilizzati
- 📄 **Termini e Condizioni** d'uso

---

## 🤝 Contribuire

Questo è un progetto personale, ma i suggerimenti sono benvenuti! Apri una **Issue** per segnalare bug o proporre nuovi contenuti.

---

<div align="center">
  <p>Made with ❤️ and <strong>Antigravity</strong> by <strong>Zhenyun Hu</strong></p>
  <p>
    <a href="https://www.threads.net/@sapori_svelati">Threads</a> •
    <a href="https://www.instagram.com/sapori_svelati/">Instagram</a> •
    <a href="https://www.facebook.com/people/Sapori-Svelati/61559931303682/">Facebook</a> •
    <a href="https://whatsapp.com/channel/0029VafIwEFCcW4nPDdq6u3R">WhatsApp</a>
  </p>
</div>