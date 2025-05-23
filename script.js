var isOpen = false;
///////////////// MENU MOBILE

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');

    menuIcon.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
});
/////////// MODO DESKTOP
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    let isScrolling = false;
    let sectionHeight = window.innerHeight * 0.8; // 80vh

    // Recalcula a altura da seção quando a janela é redimensionada
    window.addEventListener('resize', () => {
        sectionHeight = window.innerHeight * 0.8;
    });

    main.addEventListener('scroll', () => {
        if (isScrolling) return;
        isScrolling = true;

        requestAnimationFrame(() => {
            const scrollPosition = main.scrollTop;
            const currentSection = Math.round(scrollPosition / sectionHeight);

            main.scrollTo({
                top: currentSection * sectionHeight,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isScrolling = false;
            }, 500); // Ajuste o tempo conforme necessário
        });
    });
});

//////////// MODO MOBILE

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    let sectionHeight = window.innerHeight * 0.8; // 80vh
    let startY = 0; // Posição inicial do toque
    let isScrolling = false;

    // Recalcula a altura da seção quando a janela é redimensionada
    window.addEventListener('resize', () => {
        sectionHeight = window.innerHeight * 0.8;
    });

    // Detecta o início do toque
    main.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY; // Armazena a posição Y inicial do toque
    });

    // Detecta o movimento do toque
    main.addEventListener('touchmove', (e) => {
        if (isScrolling) return; // Evita múltiplos eventos de scroll
        isScrolling = true;

        const currentY = e.touches[0].clientY; // Posição Y atual do toque
        const deltaY = startY - currentY; // Diferença entre a posição inicial e atual

        // Verifica se o movimento foi significativo (para evitar scrolls acidentais)
        if (Math.abs(deltaY) > 50) {
            const scrollPosition = main.scrollTop;
            const currentSection = Math.round(scrollPosition / sectionHeight);

            // Determina a direção do scroll (para cima ou para baixo)
            if (deltaY > 0 && currentSection < main.children.length - 1) {
                // Scroll para a próxima seção
                main.scrollTo({
                    top: (currentSection + 1) * sectionHeight,
                    behavior: 'smooth'
                });
            } else if (deltaY < 0 && currentSection > 0) {
                // Scroll para a seção anterior
                main.scrollTo({
                    top: (currentSection - 1) * sectionHeight,
                    behavior: 'smooth'
                });
            }
        }

        // Reseta o estado de scrolling após um pequeno intervalo
        setTimeout(() => {
            isScrolling = false;
        }, 500); // Ajuste o tempo conforme necessário
    });
});