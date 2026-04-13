/**
 * Catalog filtering logic for Sapori Svelati
 */

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('#article-search');
    const articles = document.querySelectorAll('#catalog-grid article');
    const noResults = document.querySelector('#no-results');
    const grid = document.querySelector('#catalog-grid');

    let currentFilter = 'all';
    let searchTerm = '';

    // Function to filter articles
    const filterArticles = () => {
        let visibleCount = 0;

        articles.forEach(article => {
            const categories = article.getAttribute('data-category').split(' ');
            const title = article.querySelector('h3').textContent.toLowerCase();
            const text = article.querySelector('p').textContent.toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);
            const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                article.style.display = 'flex';
                // Trigger reveal animation if not already active
                setTimeout(() => article.classList.add('active'), 50);
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        // Toggle no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            grid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            grid.style.display = 'grid';
        }
    };

    // Filter button click events
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update filter and run
            currentFilter = button.getAttribute('data-filter');
            filterArticles();
        });
    });

    // Search input event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            filterArticles();
        });
    }

    // Check for URL parameters (to link from homepage categories)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${catParam}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }

    // Initial run to ensure animations trigger
    filterArticles();
});

function resetFilters() {
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
    
    const searchInput = document.querySelector('#article-search');
    if (searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
}
