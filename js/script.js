
document.addEventListener('DOMContentLoaded', function() {
    // Navegação entre páginas
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    function showPage(pageId) {
        // Esconde todas as páginas
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        
        // Remove a classe ativa de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostra a página selecionada
        const selectedPage = document.getElementById(pageId);
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
        }
        
        // Adiciona classe ativa ao link clicado
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Atualiza a URL com o hash
        window.location.hash = pageId;
    }
    
    // Adiciona listeners para os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Verifica se há um hash na URL para carregar a página correta
    function checkHash() {
        const hash = window.location.hash.substr(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        } else {
            showPage('home');
        }
    }
    
    // Verifica o hash inicial
    checkHash();
    
    // Detecta mudanças no hash
    window.addEventListener('hashchange', checkHash);
    
    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetPage = this.closest('[data-page]') ? this.closest('[data-page]').getAttribute('data-page') : null;
            
            if (targetPage && targetPage !== document.querySelector('.page:not(.hidden)').id) {
                showPage(targetPage);
                setTimeout(() => {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
