/**
 * SAPORI SVELATI - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Background Transition & Reading Progress ---
    const header = document.getElementById('header');
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    header.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        // Scrolled background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress calculate
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.getElementById('primary-navigation');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Hero Parallax Effect ---
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight * 1.5) { // Optimization
                parallaxImg.style.transform = `translateY(${scrollPos * 0.3}px)`;
            }
        });
    }

    // --- Newsletter Form Submission ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            // Animation for visual feedback
            const btn = newsletterForm.querySelector('.newsletter-btn');
            const originalText = btn.textContent;
            
            btn.textContent = 'Grazie!';
            btn.style.background = '#78866B';
            newsletterForm.querySelector('input').value = '';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // --- Micro-interactions on Cards ---
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Additional custom JS behavior
        });
    });

    // --- Cookie Modal Logic ---
    const cookieModal = document.getElementById('cookie-modal');
    const acceptBtn = document.getElementById('accept-cookies');

    if (cookieModal) {
        // Show after 2 seconds
        setTimeout(() => {
            if (!localStorage.getItem('cookiesAccepted')) {
                cookieModal.classList.add('active');
            }
        }, 2000);

        acceptBtn.addEventListener('click', () => {
            cookieModal.classList.remove('active');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }

    // --- Dynamic Page Title (Alt Tab Engagement) ---
    let originalTitle = document.title;
    let titleInterval = null;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Save title if not already saved during an interval
            if (!titleInterval) {
                originalTitle = document.title;
                const titles = ['Ritorna 🍕', 'Non dimenticarmi 🍷'];
                let index = 0;
                titleInterval = setInterval(() => {
                    document.title = titles[index];
                    index = (index + 1) % titles.length;
                }, 1000);
            }
        } else {
            if (titleInterval) {
                clearInterval(titleInterval);
                titleInterval = null;
                document.title = originalTitle;
            }
        }
    });
});
