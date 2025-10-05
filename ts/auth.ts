// ts/auth.ts

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout-btn');

    // --- LÓGICA DA PÁGINA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        });
    }

    // --- LÓGICA DA PÁGINA DE CADASTRO ---
    if (registerForm) {
        const termsCheckbox = document.getElementById('terms') as HTMLInputElement;
        const registerButton = document.getElementById('register-button') as HTMLButtonElement;

        // Desabilita o botão de cadastro inicialmente
        registerButton.disabled = true;

        // Habilita/desabilita o botão conforme a checkbox
        termsCheckbox.addEventListener('change', () => {
            registerButton.disabled = !termsCheckbox.checked;
        });

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            if (termsCheckbox.checked) {
                // Simula um cadastro bem-sucedido e faz o login
                console.log('Cadastro bem-sucedido!');
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Você precisa aceitar os termos de uso para se cadastrar.');
            }
        });
    }

    // --- LÓGICA DE LOGOUT (para o header) ---
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.reload();
        });
    }
});