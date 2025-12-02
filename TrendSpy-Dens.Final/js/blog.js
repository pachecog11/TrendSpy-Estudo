document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os recursos de scroll
    ScrollUtils.initAllScrollFeatures();

    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fecha o menu mobile ao clicar em um link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Fecha o menu mobile ao redimensionar a tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            navLinks.classList.remove('active');
        }
    });

    // Animação dos cards de blog
    const blogCards = document.querySelectorAll('.blog-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });

    // Filtro de categorias
    const categoryLinks = document.querySelectorAll('.categories-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove a classe active de todos os links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            filterPosts(category);
        });
    });

    function filterPosts(category) {
        const posts = document.querySelectorAll('.blog-card');
        
        posts.forEach(post => {
            if (category === 'all') {
                post.style.display = 'block';
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 100);
            } else {
                const postCategory = post.getAttribute('data-category');
                if (postCategory === category) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 500);
                }
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Aqui você pode adicionar a lógica para enviar o email para seu backend
                showToast('Obrigado por se inscrever!', 'success');
                emailInput.value = '';
            } else {
                showToast('Por favor, insira um email válido.', 'error');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}); 