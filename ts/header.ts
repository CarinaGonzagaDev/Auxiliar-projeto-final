// ts/header.ts

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('login-menu-btn');
    const dropdownMenu = document.getElementById('login-dropdown');
    const userActionsContainer = document.querySelector('.user-actions');
    const mainNav = document.querySelector('.main-nav ul');

    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // Usuário está LOGADO
        // Esconde o botão "Entrar" e o dropdown
        if (menuButton) menuButton.style.display = 'none';
        if (dropdownMenu) dropdownMenu.style.display = 'none';

        // Adiciona "Meus Favoritos" ao menu de navegação
        if (mainNav) {
            const favoritesLi = document.createElement('li');
            favoritesLi.innerHTML = '<a href="#">Meus Favoritos</a>';
            mainNav.appendChild(favoritesLi);
        }

        // Adiciona o botão "Sair"
        if (userActionsContainer) {
            const logoutButton = document.createElement('button');
            logoutButton.id = 'logout-btn';
            logoutButton.className = 'login-btn'; // Reutiliza o estilo do botão
            logoutButton.textContent = 'Sair';
            userActionsContainer.appendChild(logoutButton);
        }

    } else {
        // Usuário NÃO está logado
        // Lógica para o menu dropdown do botão "Entrar"
        if (menuButton && dropdownMenu) {
            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });
        }
    }
    
    // Fecha o menu se o usuário clicar fora
    window.addEventListener('click', () => {
        if (dropdownMenu && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });
});