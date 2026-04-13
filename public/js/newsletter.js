document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        // Change the default HTML if we need a privacy checkbox and it's not there
        // For dynamic injection, we look if the privacy checkbox exists, if not we add it.
        if (!form.querySelector('.privacy-group')) {
            const btn = form.querySelector('button[type="submit"]');
            const privacyHtml = `
                <div class="privacy-group" style="margin-top: 15px; text-align: left; font-size: 0.85rem; display: flex; align-items: flex-start; gap: 10px;">
                    <input type="checkbox" id="privacy-check-${Math.random().toString(36).substring(7)}" name="privacy" required style="width: auto; margin-top: 3px;">
                    <label for="privacy" style="color: #64748b; line-height: 1.4;">
                        Ho letto e accetto la <a href="/privacy-policy.html" style="color: var(--primary); text-decoration: underline;">Privacy Policy</a>.
                    </label>
                </div>
                <div class="feedback-message" style="display: none; margin-top: 10px; font-weight: bold;"></div>
            `;
            btn.insertAdjacentHTML('beforebegin', privacyHtml);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const privacyCheck = form.querySelector('input[type="checkbox"][name="privacy"]');
            const btn = form.querySelector('button[type="submit"]');
            const feedbackMsg = form.querySelector('.feedback-message');
            
            const email = emailInput.value;
            const privacy = privacyCheck.checked;
            
            // UI State
            btn.disabled = true;
            btn.innerText = 'Invio in corso...';
            feedbackMsg.style.display = 'none';

            try {
                // Point to our new API endpoint
                const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, privacy })
                });

                const data = await res.json();

                if (res.ok) {
                    feedbackMsg.style.color = '#16a34a'; // Success green
                    feedbackMsg.innerText = data.message;
                    emailInput.value = '';
                    privacyCheck.checked = false;
                } else {
                    feedbackMsg.style.color = '#dc2626'; // Error red
                    feedbackMsg.innerText = data.error || 'Errore durante l\'iscrizione.';
                }
            } catch (err) {
                feedbackMsg.style.color = '#dc2626';
                feedbackMsg.innerText = 'Impossibile contattare il server. Riprova più tardi.';
            }

            // Restore UI
            feedbackMsg.style.display = 'block';
            btn.disabled = false;
            btn.innerText = 'Iscriviti';
        });
    });
});
