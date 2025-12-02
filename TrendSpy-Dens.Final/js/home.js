document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // Header e Menu Mobile
    // =========================================
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Efeito de scroll no header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle do menu mobile
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // =========================================
    // Animações com Intersection Observer
    // =========================================
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('feature-list')) {
                    entry.target.querySelectorAll('li').forEach((li, index) => {
                        setTimeout(() => {
                            li.classList.add('visible');
                        }, index * 200);
                    });
                } else if (entry.target.classList.contains('creators')) {
                    entry.target.querySelectorAll('li').forEach((li, index) => {
                        setTimeout(() => {
                            li.classList.add('visible');
                        }, index * 200);
                    });
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    document.querySelectorAll('.feature-list, .feature-image, .creators').forEach(el => {
        observer.observe(el);
    });

    // =========================================
    // Scroll Suave
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Fecha menu mobile se estiver aberto
                navLinks.classList.remove('active');
            }
        });
    });

    // =========================================
    // Acordeão (FAQ)
    // =========================================
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Inicializa o primeiro item como aberto
    if (accordionItems.length > 0) {
        const firstItem = accordionItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
    }

    // Event listener para os itens do acordeão
    accordionItems.forEach(item => {
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.answer').style.maxHeight = null;
                }
            });

            // Toggle do item atual
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    // Fecha menu mobile ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});