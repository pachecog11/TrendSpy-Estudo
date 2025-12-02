document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades de scroll
    ScrollUtils.initAllScrollFeatures();

    // =========================================
    // Menu Mobile
    // =========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Toggle do menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fecha menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // =========================================
    // Funcionalidade de Busca
    // =========================================
    const searchInput = document.querySelector('.search-input');
    const faqSections = document.querySelectorAll('.faq-section');

    if (searchInput) {
        let noResultsMessage = document.createElement('p');
        noResultsMessage.className = 'no-results-message text-center mt-4';
        noResultsMessage.style.color = 'var(--text-muted)';
        noResultsMessage.style.display = 'none';
        noResultsMessage.textContent = 'Nenhuma pergunta encontrada para sua busca.';
        searchInput.parentElement.after(noResultsMessage);

        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let hasResults = false;

            // Se o campo de busca estiver vazio, mostra todas as seções
            if (searchTerm === '') {
                faqSections.forEach(section => section.style.display = '');
                document.querySelectorAll('.accordion-item').forEach(item => item.style.display = '');
                noResultsMessage.style.display = 'none';
                return;
            }

            faqSections.forEach(section => {
                let sectionHasResults = false;
                const items = section.querySelectorAll('.accordion-item');

                items.forEach(item => {
                    const question = item.querySelector('.accordion-button').textContent.toLowerCase();
                    const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
                    
                    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                        item.style.display = '';
                        sectionHasResults = true;
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Mostra/esconde a seção baseado nos resultados
                section.style.display = sectionHasResults ? '' : 'none';
            });

            // Mostra/esconde mensagem de "nenhum resultado"
            noResultsMessage.style.display = hasResults ? 'none' : 'block';
        }, 300));
    }
});

// Função de debounce para melhorar performance da busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
} 