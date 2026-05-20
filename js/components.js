/**
 * components.js — Sapori Svelati
 * Inietta header, footer, newsletter e cookie modal in ogni pagina.
 * Per funzionare, l'elemento <html> deve avere l'attributo data-root
 * che indica il percorso relativo alla root del progetto.
 *   - Pagine in root (es. index.html):        data-root="./"
 *   - Pagine in /pages/ (es. articolo-x.html): data-root="../"
 */

(function () {
    // Legge il percorso base dall'attributo data-root dell'elemento html
    const root = document.documentElement.dataset.root || './';

    // ──────────────────────────────────────────────
    // HEADER
    // ──────────────────────────────────────────────
    function buildHeader() {
        const isPages = root.startsWith('..');
        const homeLink = isPages ? `${root}index.html` : `${root}index.html`;
        const catLink  = isPages ? `${root}catalogo.html` : `${root}catalogo.html`;

        return `
<header id="header" role="banner">
    <div class="container">
        <nav role="navigation" aria-label="Menu principale">
            <a href="${homeLink}" class="logo" aria-label="Sapori Svelati Home">
                <img src="${root}assets/images/brand/logo.svg" alt="" width="48" height="48">
                Sapori Svelati
            </a>
            <button class="mobile-menu-toggle" aria-label="Apri menu" aria-expanded="false"
                aria-controls="primary-navigation">
                <span class="hamburger"></span>
            </button>
            <ul class="nav-links" id="primary-navigation">
                <li><a href="${homeLink}#home">Home</a></li>
                <li><a href="${homeLink}#curiosita">Curiosità</a></li>
                <li><a href="${homeLink}#categorie">Categorie</a></li>
                <li><a href="${catLink}">Catalogo</a></li>
            </ul>
        </nav>
    </div>
</header>`;
    }

    // ──────────────────────────────────────────────
    // FOOTER
    // ──────────────────────────────────────────────
    function buildFooter() {
        return `
<footer role="contentinfo">
    <div class="container">
        <div class="footer-content">
            <div class="footer-info">
                <div class="footer-logo">Sapori Svelati</div>
                <p>Esploriamo la cultura gastronomica con amore e curiosità. Unisciti alla nostra comunità di appassionati.</p>
                <p class="footer-contact"><i class="fa-solid fa-envelope" aria-hidden="true"></i> <a href="mailto:saporisvelati@gmail.com">saporisvelati@gmail.com</a></p>
                <div class="social-links">
                    <a href="https://www.facebook.com/people/Sapori-Svelati/61559931303682/" target="_blank" rel="noopener" aria-label="Seguici su Facebook"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/sapori_svelati/" target="_blank" rel="noopener" aria-label="Seguici su Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                    <a href="https://www.threads.net/@sapori_svelati" target="_blank" rel="noopener" aria-label="Seguici su Threads"><i class="fa-brands fa-threads" aria-hidden="true"></i></a>
                    <a href="https://whatsapp.com/channel/0029VafIwEFCcW4nPDdq6u3R" target="_blank" rel="noopener" aria-label="Seguici su WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="footer-links">
                <h4>Esplora</h4>
                <ul>
                    <li><a href="${root}index.html">Home</a></li>
                    <li><a href="${root}catalogo.html">Catalogo Articoli</a></li>
                    // <li><a href="${root}brandbook.html">Brandbook &amp; Identity</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Legale</h4>
                <ul>
                    <li><a href="${root}privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="${root}cookie-policy.html">Cookie Policy</a></li>
                    <li><a href="${root}termini-condizioni.html">Termini e Condizioni</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 Sapori Svelati. Tutti i diritti riservati. Created by Zhenyun Hu.
        </div>
    </div>
</footer>`;
    }

    // ──────────────────────────────────────────────
    // NEWSLETTER (commentata/disabilitata)
    // Per riattivarla su tutto il sito: rimuovi il return '' qui sotto
    // ──────────────────────────────────────────────
    function buildNewsletter() {
        // return ''; // ← Decommenta questa riga per nasconderla ovunque
        return `
<!-- Newsletter Section (Temporaneamente disabilitata) -->`;

        /* CODICE NEWSLETTER — da riattivare quando il backend sarà online
        return \`
<section id="newsletter" style="margin-top: 5rem;">
    <div class="container">
        <div class="newsletter reveal">
            <h2>Iscriviti alla Lettera dei Sapori</h2>
            <p>Ricevi ogni settimana una storia inedita, una ricetta dimenticata e curiosità che non troverai altrove.</p>
            <form class="newsletter-form" aria-labelledby="newsletter-title">
                <label for="newsletter-email" class="sr-only">Il tuo indirizzo email</label>
                <input type="email" id="newsletter-email" placeholder="Il tuo indirizzo email" required aria-required="true">
                <button type="submit" class="btn">Iscriviti</button>
            </form>
        </div>
    </div>
</section>\`;
        */
    }

    // ──────────────────────────────────────────────
    // COOKIE MODAL
    // ──────────────────────────────────────────────
    function buildCookieModal() {
        return `
<div class="cookie-modal" id="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
    <div class="cookie-modal-header">
        <div class="cookie-icon" aria-hidden="true">🍪</div>
        <h4 id="cookie-title">Privacy &amp; Cookie</h4>
    </div>
    <p>Usiamo i cookie per migliorare la navigazione e analizzare il traffico in modo anonimo. Puoi accettare, rifiutare o consultare la <a href="${root}cookie-policy.html">Cookie Policy</a>.</p>
    <div class="cookie-buttons">
        <button class="cookie-btn-accept" id="accept-cookies">✓ Accetta</button>
        <button class="cookie-btn-reject" id="reject-cookies">Nega</button>
        <a href="${root}cookie-policy.html" class="cookie-btn-details">Info</a>
    </div>
</div>`;
    }

    // ──────────────────────────────────────────────
    // INIEZIONE DEI COMPONENTI
    // ──────────────────────────────────────────────
    function inject(id, html, position = 'replace') {
        const el = document.getElementById(id);
        if (!el) return;
        if (position === 'replace') {
            el.outerHTML = html;
        } else {
            el.insertAdjacentHTML(position, html);
        }
    }

    // Inietta nell'ordine corretto
    inject('site-header', buildHeader());
    inject('site-newsletter', buildNewsletter());
    inject('site-cookie-modal', buildCookieModal());
    inject('site-footer', buildFooter());

})();
