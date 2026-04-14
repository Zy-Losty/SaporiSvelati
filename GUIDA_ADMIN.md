# Guida Accesso Pannello Admin - Sapori Svelati

Per avere il pannello admin accessibile **sempre via web** da qualsiasi dispositivo (telefono, tablet, altro PC), hai bisogno di una piattaforma che "esegua" il tuo codice. 

Dato che **GitHub** non può farlo (mostra solo pagine fisse), la soluzione con il **minor numero di piattaforme possibili** è usare solo due siti: **GitHub** + **Render**.

---

## 🚀 1. Configurazione Iniziale (Si fa una volta sola)

1.  **Vai su [Render.com](https://render.com/)** e clicca su **"GET STARTED"**.
2.  Scegli **"GitHub"** per accedere: in questo modo non devi creare una nuova password, ma usi il tuo account GitHub.
3.  Clicca su **"New"** (pulsante in alto a destra) e scegli **"Web Service"**.
4.  Seleziona il tuo repository **"SaporiSvelati"**.
5.  **Impostazioni:**
    *   **Name:** `sapori-svelati`
    *   **Build Command:** `npm install`
    *   **Start Command:** `node server.js`
6.  **Password Personalizzata (Opzionale):**
    *   Clicca su **"Advanced"**.
    *   Clicca su **"Add Environment Variable"**.
    *   Metti `ADMIN_PASSWORD` come chiave e la tua password come valore.
7.  Clicca su **"Create Web Service"**.

---

## 🌐 2. Come Accedere al Pannello

Una volta completata la configurazione (Render ti darà un link tipo `https://sapori-svelati-xyz.onrender.com`), l'accesso è semplicissimo:

1.  **URL:** Vai su `https://tuo-sito.onrender.com/admin`
2.  **Password:** Inserisci `@Nicola04` (o quella che hai scelto su Render).

---

## 💡 Perché questo è il "minimo possibile"?

*   **GitHub:** È dove scrivi e salvi il codice.
*   **Render:** È il motore che lo fa girare. 
*   **Zero Manutenzione:** Ogni volta che modifichi qualcosa su GitHub, Render aggiorna il sito automaticamente. Non dovrai mai più entrare nel sito di Render se non per cambiare la password.

---

## 🖥️ Alternativa: Accesso Solo Locale (Senza piattaforme extra)

Se NON vuoi usare Render e vuoi accedere all'admin **solo dal tuo PC**:
1.  Apri il terminale nella cartella del progetto.
2.  Scrivi `node server.js`.
3.  Vai su `http://localhost:3000/admin`.
*Nota: In questo modo il sito non sarà visibile agli altri e non potrai accedervi dal telefono.*
