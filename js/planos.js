document.addEventListener('DOMContentLoaded', function() {
    try {
        // Inicializa todas as funcionalidades de scroll
        ScrollUtils.initAllScrollFeatures();

        // =========================================
        // Menu Mobile
        // =========================================
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!mobileMenuBtn || !navLinks) {
            console.warn('Elementos do menu mobile não encontrados');
        } else {
            // Toggle do menu mobile
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            });

            // Fecha menu mobile ao clicar em um link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // =========================================
        // Animações dos Cards de Planos
        // =========================================
        const planosContainer = document.querySelector('.planos-container');
        const planoCards = document.querySelectorAll('.plano-card');

        if (!planosContainer || planoCards.length === 0) {
            console.warn('Elementos dos cards de planos não encontrados');
        } else {
            planoCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    planoCards.forEach(c => c.classList.remove('destacado'));
                    card.classList.add('destacado');
                });

                // Adiciona interação por foco para acessibilidade
                card.addEventListener('focus', () => {
                    planoCards.forEach(c => c.classList.remove('destacado'));
                    card.classList.add('destacado');
                });
            });

            // Remove destaque ao sair da área dos cards
            planosContainer.addEventListener('mouseleave', () => {
                planoCards.forEach(card => card.classList.remove('destacado'));
            });
        }

        // =========================================
        // Seleção de Período
        // =========================================
        const periodoButtons = document.querySelectorAll('.periodo-btn');
        const precosMensais = document.querySelectorAll('.preco-mensal');
        const precosAnuais = document.querySelectorAll('.preco-anual');

        if (periodoButtons.length === 0) {
            console.warn('Botões de período não encontrados');
        } else {
            // Garante que um período esteja sempre selecionado
            if (!Array.from(periodoButtons).some(btn => btn.classList.contains('active'))) {
                periodoButtons[0].classList.add('active');
                mostrarPrecos('mensal');
            }

            periodoButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove classe ativa de todos os botões
                    periodoButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    
                    // Adiciona classe ativa ao botão clicado
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');

                    // Mostra/esconde preços baseado no período selecionado
                    mostrarPrecos(button.dataset.periodo);
                });
            });
        }

        // Função auxiliar para mostrar/esconder preços
        function mostrarPrecos(periodo) {
            if (periodo === 'mensal') {
                precosMensais.forEach(preco => preco.style.display = 'block');
                precosAnuais.forEach(preco => preco.style.display = 'none');
            } else {
                precosMensais.forEach(preco => preco.style.display = 'none');
                precosAnuais.forEach(preco => preco.style.display = 'block');
            }
        }

    } catch (error) {
        console.error('Erro ao inicializar a página de planos:', error);
    }
}); 