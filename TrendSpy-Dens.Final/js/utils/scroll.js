// Função para scroll suave
function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Função de easing para suavizar o scroll
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Função para inicializar o scroll suave em todos os links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link para outra página com âncora, não previne o comportamento padrão
            if (href.includes('.html#')) return;
            
            e.preventDefault();
            smoothScroll(href);
        });
    });
}

// Função para atualizar o header ao rolar
function initHeaderScroll() {
    const header = document.querySelector('header') || document.querySelector('.cabecalho');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Adiciona classe quando rola para baixo
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
            header.classList.add('scrollado'); // Para compatibilidade com classes existentes
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('scrollado');
        }

        // Esconde/mostra header baseado na direção do scroll
        if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    });
}

// Função para observar elementos e adicionar animações
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('visivel'); // Para compatibilidade com classes existentes
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll([
        '.hero-content',
        '.feature-list li',
        '.feature-image',
        '.plano-card',
        '.secao-introducao',
        '.faq-section',
        '.accordion-item',
        '.container-imagem-criadores',
        '.container-texto-criadores',
        '.container-imagem-produtos',
        '.container-texto-produtos',
        '.container-imagem-videos',
        '.container-texto-videos'
    ].join(','));

    animateElements.forEach(el => observer.observe(el));
}

// Inicializa todas as funcionalidades de scroll
function initAllScrollFeatures() {
    initSmoothScroll();
    initHeaderScroll();
    initScrollAnimations();
}

// Exporta as funções para uso em outros arquivos
window.ScrollUtils = {
    smoothScroll,
    initSmoothScroll,
    initHeaderScroll,
    initScrollAnimations,
    initAllScrollFeatures
}; 