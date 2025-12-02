document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // Controle de Tabs (Login/Criar Conta)
    // =========================================
    const tabs = document.querySelectorAll('.tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Verifica se há parâmetro na URL para abrir tab específica
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');
    const selectedPlan = urlParams.get('plano');

    // Função para trocar de tab
    function switchTab(tabName) {
        tabs.forEach(tab => {
            if (tab.dataset.form === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        if (tabName === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }

    // Event listeners para as tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.form);
            // Atualiza a URL sem recarregar a página
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('tab', tab.dataset.form);
            window.history.pushState({}, '', newUrl);
        });
    });

    // Ativa a tab correta baseado na URL
    if (activeTab) {
        switchTab(activeTab);
    }

    // =========================================
    // Validação de Formulários
    // =========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;
            
            // Validação básica
            if (!email || !password) {
                showError('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Por favor, insira um e-mail válido.');
                return;
            }
            
            if (password.length < 6) {
                showError('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            
            // Aqui você pode adicionar a lógica de autenticação
            console.log('Form submitted:', { email, password });
        });
    });

    // =========================================
    // Recuperação de Senha
    // =========================================
    const forgotPasswordLink = document.querySelector('.forgot-password');
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.querySelector('#loginEmail').value;
            
            if (!email) {
                showError('Por favor, insira seu e-mail para recuperar a senha.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Aqui você pode adicionar a lógica de recuperação de senha
            showSuccess('Instruções de recuperação de senha foram enviadas para seu e-mail.');
        });
    }

    // =========================================
    // Funções Auxiliares
    // =========================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Adiciona nova mensagem
        document.querySelector('.logo-container').after(errorDiv);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Remove mensagens anteriores
        document.querySelectorAll('.success-message').forEach(el => el.remove());
        
        // Adiciona nova mensagem
        document.querySelector('.logo-container').after(successDiv);
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => successDiv.remove(), 5000);
    }

    // =========================================
    // Preenche plano selecionado se existir
    // =========================================
    if (selectedPlan && signupForm) {
        const planInput = document.createElement('input');
        planInput.type = 'hidden';
        planInput.name = 'selectedPlan';
        planInput.value = selectedPlan;
        signupForm.appendChild(planInput);

        // Adiciona indicador visual do plano selecionado
        const planIndicator = document.createElement('div');
        planIndicator.className = 'selected-plan';
        planIndicator.textContent = `Plano selecionado: ${selectedPlan}`;
        signupForm.insertBefore(planIndicator, signupForm.firstChild);
    }
}); 