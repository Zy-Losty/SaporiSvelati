document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        // Change the default HTML if we need a privacy checkbox and it's not there
        // For dynamic injection, we look if the privacy checkbox exists, if not we add it.
        if (!form.querySelector('.privacy-group')) {
            form.style.flexWrap = 'wrap';
            const checkboxId = `privacy-check-${Math.random().toString(36).substring(7)}`;
            const privacyHtml = `
                <div class="privacy-group" style="flex-basis: 100%; margin-top: 15px; text-align: center; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 5px; color: rgba(255,255,255,0.9);">
                    <input type="checkbox" id="${checkboxId}" name="privacy" required checked style="width: auto; margin: 0; cursor: pointer; padding: 0;">
                    <label for="${checkboxId}" style="line-height: 1.4; cursor: pointer; margin: 0;">
                        Ho letto e accetto la <a href="privacy-policy.html" style="color: #ffffff; text-decoration: underline; font-weight: bold;">Privacy Policy</a>.
                    </label>
                </div>
                <div class="feedback-message" style="display: none; flex-basis: 100%; margin-top: 10px; font-weight: bold; text-align: center;"></div>
            `;
            form.insertAdjacentHTML('beforeend', privacyHtml);
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, privacy })
                });

                const data = await res.json();

                feedbackMsg.style.padding = '10px 15px';
                feedbackMsg.style.borderRadius = '8px';
                feedbackMsg.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                feedbackMsg.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

                if (res.ok) {
                    feedbackMsg.style.color = '#16a34a'; // Success green
                    feedbackMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + data.message;
                    emailInput.value = '';
                    privacyCheck.checked = false;
                } else {
                    feedbackMsg.style.color = '#dc2626'; // Error red
                    feedbackMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ' + (data.error || 'Errore durante l\'iscrizione.');
                }
            } catch (err) {
                feedbackMsg.style.padding = '10px 15px';
                feedbackMsg.style.borderRadius = '8px';
                feedbackMsg.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                feedbackMsg.style.color = '#dc2626';
                feedbackMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Impossibile contattare il server. Riprova più tardi.';
            }

            // Restore UI
            feedbackMsg.style.display = 'block';
            btn.disabled = false;
            btn.innerText = 'Iscriviti';
        });
    });
});
