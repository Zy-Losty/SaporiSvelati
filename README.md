# 🍽️ Sapori Svelati — Svelare l'Anima del Cibo

[![Sapori Svelati Logo](assets/images/brand/logo.svg)](https://zy-losty.github.io/SaporiSvelati/)

**Sapori Svelati** è un'applicazione web completa per la divulgazione gastronomica indipendente. Esplora la storia, la cultura e le curiosità del mondo alimentare con un'interfaccia premium e un sistema integrato di newsletter.

---

## ✨ Caratteristiche Principali

- 📖 **Articoli Narrativi**: Approfondimenti su eccellenze come il *Wagyu*, cocktail classici e tradizioni millenarie.
- 🔍 **Catalogo Dinamico**: Sistema di filtraggio intelligente per navigazione tra categorie (Storia, Cultura, Alimenti, Curiosità).
- 📧 **Newsletter Pro**: Sistema di iscrizione integrato con gestione backend, salvataggio dati GDPR compliant e invio email automatizzato.
- 🔐 **Admin Dashboard**: Pannello di controllo privato per gestire gli iscritti, visualizzare l'archivio delle campagne e comporre newsletter con anteprima live.
- 📱 **Design Responsive**: Esperienza ottimizzata per ogni dispositivo con estetica moderna e micro-animazioni fluide.
- 🎨 **Estetica Premium**: Interfaccia curata nei minimi dettagli con un approccio ispirato ai magazine di alta cucina.

## 🛠️ Stack Tecnologico

### Frontend
- **HTML5 & Vanilla JavaScript**: Struttura semantica e logica fluida senza framework pesanti.
- **CSS3 (Modular Architecture)**: Stili organizzati in moduli per massima manutenibilità.
- **Font Awesome & Google Fonts**: Iconografia e tipografia scelta per un impatto visivo professionale.

### Backend (NEW)
- **Node.js & Express**: Motore server performante e scalabile.
- **SQLite/JSON Storage**: Sistema di memorizzazione dati locale e leggero per iscritti e campagne inviate.
- **Nodemailer**: Gestione professionale degli invii delle newsletter.
- **Express-Session**: Sicurezza e gestione dell'autenticazione per l'area amministrativa.

## 📁 Struttura del Progetto

```text
SaporiSvelati/
├── admin/           # Interfaccia pannello di controllo
├── assets/          # Immagini, loghi e media
├── css/             # Stili CSS modulari
├── js/              # Script frontend (Newsletter, Filtri, Animazioni)
├── pages/           # Singoli articoli del blog
├── database.js      # Gestore database newsletter
├── server.js        # Motore server backend
├── package.json     # Metadati e dipendenze
└── start-backend.bat # Avvio rapido per Windows
```

## 🚀 Come Visualizzare e Gestire il Progetto

### Hosting Statico (GitHub Pages)
Le funzioni di navigazione e lettura articoli sono attive staticamente.

### Funzioni Backend (Newsletter & Admin)
Per avviare il backend completo sul proprio PC:
1. Installa [Node.js](https://nodejs.org/).
2. Avvia **`start-backend.bat`**.
3. Apri: `http://localhost:3000` (Sito) o `http://localhost:3000/admin` (Pannello)

---

<div align="center">
  <p>Created with <strong>antigravity</strong> by <strong>Zhenyun Hu</strong></p>
  <p>
    <a href="https://www.threads.net/@sapori_svelati">Threads</a> •
    <a href="https://www.instagram.com/sapori_svelati/">Instagram</a> • 
    <a href="https://www.facebook.com/people/Sapori-Svelati/61559931303682/">Facebook</a> • 
    <a href="https://whatsapp.com/channel/0029VafIwEFCcW4nPDdq6u3R">WhatsApp</a>
  </p>
</div>