require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const nodemailer = require('nodemailer');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default password

// --- EMAIL CONFIGURATION ---
// Istruzioni: Quando avrai l'account Resend.com
// 1. host: "smtp.resend.com"
// 2. port: 465
// 3. user: "resend"
// 4. pass: "INCOLLA_QUI_LA_TUA_CHIAVE_API"
let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mario.rossi@ethereal.email', // Inseriremo credenziali reali qui
        pass: 'password_temporanea'
    }
});

// Configure Ethereal for testing automatically on start
nodemailer.createTestAccount((err, account) => {
    if (!err && process.env.NODE_ENV !== 'production') {
        console.log('✅ Utilizzando Ethereal Email per il test. Credenziali test create.');
        transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'sapori-svelati-segreto-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '..', 'public')));

// ==========================================
// PUBLIC API (Frontend)
// ==========================================

// Iscrizione Newsletter
app.post('/api/subscribe', async (req, res) => {
    const { email, privacy } = req.body;
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email non valida.' });
    }
    if (!privacy) {
        return res.status(400).json({ error: 'Devi accettare la Privacy Policy.' });
    }

    try {
        await db.addSubscriber(email);
        res.json({ message: 'Iscrizione completata con successo! Benvenuto in Sapori Svelati.' });
    } catch (err) {
        if (err.message === 'Email already subscribed') {
            res.json({ message: 'Questa email è già iscritta alla nostra newsletter. Grazie!' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Errore durante l\'iscrizione. Riprova più tardi.' });
        }
    }
});

// Disiscrizione (One-Click)
app.get('/api/unsubscribe/:token', async (req, res) => {
    const token = req.params.token;
    const success = await db.unsubscribe(token);
    
    if (success) {
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Disiscrizione completata</h2>
                <p>Non riceverai più email da Sapori Svelati. Ci dispiace vederti andare via!</p>
                <a href="/">Torna alla Home</a>
            </div>
        `);
    } else {
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>Link non valido</h2>
                <p>Il link di disiscrizione non è valido o sei già stato rimosso.</p>
                <a href="/">Torna alla Home</a>
            </div>
        `);
    }
});


// ==========================================
// ADMIN DASHBOARD & API
// ==========================================

// Protezione delle rotte Admin (Middleware)
function requireAuth(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Non autorizzato' });
    }
}

// Login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Password errata' });
    }
});

// Logout
app.post('/api/admin/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Controllo stato login
app.get('/api/admin/check', (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Ottieni iscritti
app.get('/api/admin/subscribers', requireAuth, async (req, res) => {
    const subs = await db.getAllSubscribers();
    res.json(subs);
});

// Elimina un iscritto
app.delete('/api/admin/subscribers/:id', requireAuth, async (req, res) => {
    await db.deleteSubscriber(req.params.id);
    res.json({ success: true });
});

// Ottieni catalogo campagne
app.get('/api/admin/campaigns', requireAuth, async (req, res) => {
    const campaigns = await db.getCampaigns();
    res.json(campaigns);
});

// Invia Newsletter
app.post('/api/admin/send', requireAuth, async (req, res) => {
    const { subject, htmlContent, isTest } = req.body;

    if (!subject || !htmlContent) {
        return res.status(400).json({ error: 'Oggetto e contenuto sono obbligatori.' });
    }

    try {
        const baseUrl = req.protocol + '://' + req.get('host');
        let recipients = [];
        let infoData = null;

        if (isTest) {
            // Invio di prova all'amministratore (una sola finta mail)
            const testEmail = 'admin@saporisvelati.test';
            const htmlWithUnsubscribe = htmlContent + `<br><hr><p style="font-size:12px; color:#888;">Questo è un invio di prova. Nessun link di disiscrizione reale.</p>`;
            
            infoData = await transporter.sendMail({
                from: '"Sapori Svelati" <newsletter@saporisvelati.test>',
                to: testEmail,
                subject: '[TEST] ' + subject,
                html: htmlWithUnsubscribe
            });
            console.log("Email inviata. Preview URL: %s", nodemailer.getTestMessageUrl(infoData));

        } else {
            // Invio reale a tutti gli iscritti attivi
            recipients = await db.getActiveSubscribers();
            
            if (recipients.length === 0) {
                return res.status(400).json({ error: 'Nessun iscritto attivo a cui inviare.' });
            }

            for (const sub of recipients) {
                const unsubscribeUrl = `${baseUrl}/api/unsubscribe/${sub.token}`;
                const htmlWithUnsubscribe = htmlContent + `
                    <br><hr>
                    <p style="font-size:12px; color:#888; text-align:center;">
                        Ricevi questa email perché sei iscritto alla Lettera dei Sapori.<br>
                        Se non desideri più ricevere queste comunicazioni, <a href="${unsubscribeUrl}">disiscriviti qui</a>.
                    </p>
                `;

                infoData = await transporter.sendMail({
                    from: '"Sapori Svelati" <newsletter@saporisvelati.test>', // Cambieremo questo con l'email reale
                    to: sub.email,
                    subject: subject,
                    html: htmlWithUnsubscribe
                });
            }

            // Traccia la campagna nel catalogo
            await db.trackCampaign(subject, htmlContent, recipients.length);
        }

        // Se stiamo usando Ethereal (test) Node restituisce un URL per visualizzare l'email inviata
        const previewUrl = nodemailer.getTestMessageUrl(infoData);
        
        res.json({ 
            success: true, 
            message: isTest ? 'Email di prova inviata!' : `Newsletter inviata a ${recipients.length} iscritti!`,
            previewUrl: previewUrl || null
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Si è verificato un errore durante l\'invio. Controlla i log.' });
    }
});

// No explicit /admin route needed, handled by express.static from public/admin/index.html

// START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Sapori Svelati Server in esecuzione su http://localhost:${PORT}`);
});
