document.addEventListener('DOMContentLoaded', () => {
    
    // Helper to escape HTML and prevent XSS in dynamic text rendering
    function escapeHTML(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/[&<>"']/g, (m) => {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
                default: return m;
            }
        });
    }

    // Elements
    const loginOverlay = document.getElementById('login-overlay');
    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    const navItems = document.querySelectorAll('.nav-item[data-target]');
    const viewSections = document.querySelectorAll('.view-section');
    
    const subsTableBody = document.getElementById('subscribers-table-body');
    const campsTableBody = document.getElementById('campaigns-table-body');
    const totalSubsBadge = document.getElementById('total-subscribers');
    const btnSubsCount = document.getElementById('btn-subs-count');
    
    const htmlInput = document.getElementById('email-html');
    const emailPreview = document.getElementById('email-preview');
    const composeForm = document.getElementById('compose-form');
    const btnTestEmail = document.getElementById('btn-test-email');
    const sendFeedback = document.getElementById('send-feedback');

    // 1. Auth Check
    async function checkAuth() {
        try {
            const res = await fetch('/api/admin/check');
            const data = await res.json();
            if (data.authenticated) {
                showDashboard();
            } else {
                showLogin();
            }
        } catch (e) {
            // Se il server node non sta girando, potremo vedere questo errore
            console.error("Non riesco a contattare il server API locale.");
            showLogin();
        }
    }
    checkAuth();

    // 2. Login Handling
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pwd = document.getElementById('admin-password').value;
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password: pwd })
        });
        
        if (res.ok) {
            showDashboard();
            document.getElementById('admin-password').value = '';
        } else {
            loginError.innerText = 'Password errata.';
        }
    });

    document.getElementById('logout-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        await fetch('/api/admin/logout', { method: 'POST' });
        showLogin();
    });

    function showDashboard() {
        loginOverlay.classList.remove('active');
        dashboard.classList.remove('hidden');
        loadSubscribers();
        loadCampaigns();
    }

    function showLogin() {
        loginOverlay.classList.add('active');
        dashboard.classList.add('hidden');
    }

    // 3. Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            viewSections.forEach(v => v.classList.remove('active'));
            
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Load Data
    async function loadSubscribers() {
        const res = await fetch('/api/admin/subscribers');
        if(!res.ok) return;
        const subs = await res.json();
        
        const activeCount = subs.filter(s => s.status === 'active').length;
        totalSubsBadge.innerText = `${subs.length} Totali (${activeCount} Attivi)`;
        btnSubsCount.innerText = activeCount;

        subsTableBody.innerHTML = '';
        subs.forEach(s => {
            const date = new Date(s.createdAt).toLocaleDateString('it-IT');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(s.email)}</td>
                <td><span class="status-${escapeHTML(s.status)}">${escapeHTML(s.status.toUpperCase())}</span></td>
                <td>${escapeHTML(date)}</td>
                <td>
                    <button class="action-btn" onclick="deleteSub('${escapeHTML(s.id)}')" title="Elimina">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            subsTableBody.appendChild(tr);
        });
    }

    async function loadCampaigns() {
        const res = await fetch('/api/admin/campaigns');
        if(!res.ok) return;
        const camps = await res.json();
        
        campsTableBody.innerHTML = '';
        if(camps.length === 0) {
            campsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#999;">Nessuna email ancora inviata.</td></tr>';
            return;
        }

        camps.forEach(c => {
            const date = new Date(c.sentAt).toLocaleString('it-IT');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(date)}</td>
                <td><strong>${escapeHTML(c.subject)}</strong></td>
                <td>${escapeHTML(String(c.sentCount))}</td>
            `;
            campsTableBody.appendChild(tr);
        });
    }

    window.deleteSub = async function(id) {
        if(confirm('Sicuro di voler eliminare questo iscritto definitivamente?')) {
            await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' });
            loadSubscribers();
        }
    }

    // 5. Email Composer (Live Preview & Send)
    htmlInput.addEventListener('input', () => {
        const content = htmlInput.value;
        if (content.trim() === '') {
            emailPreview.innerHTML = '<p class="placeholder-text">Incolla del codice HTML a sinistra...</p>';
        } else {
            // Per evitare vulnerabilità DOM-based XSS e al contempo mostrare una anteprima
            // fedele del codice HTML (che non dovrebbe eseguire JS, come nei client email),
            // utilizziamo un iframe protetto con l'attributo "sandbox".
            let iframe = emailPreview.querySelector('iframe');
            if (!iframe) {
                emailPreview.innerHTML = '';
                iframe = document.createElement('iframe');
                iframe.setAttribute('sandbox', ''); // Blocca script, form, popups, ecc.
                iframe.style.width = '100%';
                iframe.style.height = '450px';
                iframe.style.border = 'none';
                iframe.style.background = '#ffffff';
                iframe.style.borderRadius = '4px';
                emailPreview.appendChild(iframe);
            }
            iframe.srcdoc = content;
        }
    });

    async function sendEmail(isTest) {
        const subject = document.getElementById('email-subject').value;
        const html = htmlInput.value;

        if (!subject || !html) {
            showFeedback('Compila oggetto e contenuto HTML prima di inviare.', 'error');
            return;
        }

        if (!isTest && !confirm("Sei sicuro di voler inviare a TUTTI gli iscritti attivi?")) {
            return;
        }

        sendFeedback.className = 'feedback-msg success';
        sendFeedback.innerText = 'Invio in corso...';
        sendFeedback.style.display = 'block';

        const res = await fetch('/api/admin/send', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ subject, htmlContent: html, isTest })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            let msg = escapeHTML(data.message);
            if (data.previewUrl) {
                msg += ` <a href="${escapeHTML(data.previewUrl)}" target="_blank">Visualizza Email di Test Inviata</a> (Poiché stiamo usando Ethereal di prova)`;
            }
            showFeedback(msg, 'success', true);
            if (!isTest) {
                loadCampaigns();
                // Clear form
                document.getElementById('email-subject').value = '';
                htmlInput.value = '';
                emailPreview.innerHTML = '<p class="placeholder-text">Incolla del codice HTML a sinistra...</p>';
            }
        } else {
            showFeedback(data.error, 'error');
        }
    }

    btnTestEmail.addEventListener('click', () => sendEmail(true));
    composeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendEmail(false);
    });

    function showFeedback(msg, type, isHtml = false) {
        sendFeedback.className = `feedback-msg ${type}`;
        if (isHtml) sendFeedback.innerHTML = msg;
        else sendFeedback.innerText = msg;
        sendFeedback.style.display = 'block';
        if (type === 'error') {
            setTimeout(() => { sendFeedback.style.display = 'none'; }, 5000);
        }
    }

});
