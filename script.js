document.addEventListener('DOMContentLoaded', () => {
    let sectionHeight = window.innerHeight * 0.8;
    let isScrolling = false;
    let startY = 0;

    ///////////// Carrossel seção inicial

  const carousel = document.getElementById("carousel");
  const cards = document.querySelectorAll(".card");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let autoRotateInterval;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function rotateCarousel(direction) {
    currentIndex = (currentIndex + direction + cards.length) % cards.length;
    updateCarousel();
    resetAutoRotate();
  }

  function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => rotateCarousel(1), 10000);
  }

  // Inicialização
  updateCarousel();
  resetAutoRotate();

  // Hover pausa
  carousel.addEventListener("mouseenter", () => clearInterval(autoRotateInterval));
  carousel.addEventListener("mouseleave", resetAutoRotate);

  // Botões
  document.querySelector(".controls button:nth-child(1)").addEventListener("click", () => rotateCarousel(-1));
  document.querySelector(".controls button:nth-child(2)").addEventListener("click", () => rotateCarousel(1));
});



    // Atualiza altura das seções em redimensionamento
    window.addEventListener('resize', () => {
        sectionHeight = window.innerHeight * 0.8;
    });

    // MENU MOBILE
    if (menuIcon && menu) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflito com o click do documento
            menu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    }

    // FUNÇÃO DE ROLAGEM (comum para desktop e mobile)
    function scrollToSection(direction) {
        const scrollPosition = main.scrollTop;
        const currentSection = Math.round(scrollPosition / sectionHeight);
        const totalSections = main.children.length;

        let nextSection = currentSection + direction;
        nextSection = Math.max(0, Math.min(totalSections - 1, nextSection));

        main.scrollTo({
            top: nextSection * sectionHeight,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    // SCROLL DESKTOP (roda no scroll normal do mouse)
    main.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        isScrolling = true;

        const direction = e.deltaY > 0 ? 1 : -1;
        scrollToSection(direction);
    });

    // SCROLL MOBILE (por swipe)
    main.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    main.addEventListener('touchmove', (e) => {
        if (isScrolling) return;

        const currentY = e.touches[0].clientY;
        const deltaY = startY - currentY;

        if (Math.abs(deltaY) > 50) {
            isScrolling = true;
            const direction = deltaY > 0 ? 1 : -1;
            scrollToSection(direction);
        }
    });

    // OPCIONAL: prevenir scroll padrão da página se necessário
    // document.body.style.overflow = 'hidden';
// CARROSSEL DE FOTOS
let currentIndex = 0;

function moverCarrossel(direction) {
    const container = document.querySelector('.carrossel-container');
    const items = document.querySelectorAll('.carrossel-item');
    const totalItems = items.length;

    currentIndex = (currentIndex + direction + totalItems) % totalItems;

    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
}