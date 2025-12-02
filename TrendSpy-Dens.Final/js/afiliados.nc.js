// Animação suave ao carregar os elementos
document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        document.querySelector('h1'),
        document.querySelector('.subtitle'),
        ...document.querySelectorAll('.benefit-item'),
        document.querySelector('.illustration'),
        document.querySelector('.cta-buttons')
    ];

    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(12px)';
            element.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
});

// Efeito hover nos botões
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-1px)';
        button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Prevenção de clique nos links ainda não implementados
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Adiciona feedback visual ao clicar
        const button = e.target;
        button.style.transform = 'translateY(1px)';
        setTimeout(() => {
            button.style.transform = 'translateY(0)';
        }, 100);
        alert('Esta funcionalidade será implementada em breve!');
    });
});