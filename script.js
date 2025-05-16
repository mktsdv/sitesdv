document.addEventListener('DOMContentLoaded', () => {
    let sectionHeight = window.innerHeight * 0.8;
    let isScrolling = false;
    let startY = 0;
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');

    menuIcon.addEventListener('click', function() {
        menu.classList.toggle('active')});

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

      updateCarousel();
      resetAutoRotate();

      carousel.addEventListener("mouseenter", () => clearInterval(autoRotateInterval));
      carousel.addEventListener("mouseleave", resetAutoRotate);

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

document.addEventListener('DOMContentLoaded', async () => {
      const track = document.getElementById("carousel-track");
      const dotsContainer = document.getElementById("dots-container");
      let currentIndex = 0;
      let autoRotateInterval;

      const imageBaseUrl = "https://raw.githubusercontent.com/mktsdv/sitesdv/main/img/";

      async function fetchImageListFromGitHub() {
        const apiUrl = "https://api.github.com/repos/mktsdv/sitesdv/contents/img";
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data
            .filter(file => file.type === "file" && /\.(jpe?g|png|gif|webp)$/i.test(file.name))
            .map(file => file.name);
        } catch (error) {
          console.error("Erro ao buscar imagens do GitHub:", error);
          return [];
        }
      }

      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      function updateCarousel(slides, dots) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }

      function rotateCarousel(slides, dots, direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateCarousel(slides, dots);
        resetAutoRotate(slides, dots);
      }

      function resetAutoRotate(slides, dots) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => rotateCarousel(slides, dots, 1), 10000);
      }

      const imageNames = await fetchImageListFromGitHub();
      const shuffledImages = shuffle(imageNames);

      shuffledImages.forEach((name, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        const img = document.createElement("img");
        img.src = imageBaseUrl + name;
        img.alt = `Foto ${index + 1}`;
        slide.appendChild(img);
        track.appendChild(slide);

        const dot = document.createElement("span");
        dot.className = "dot";
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      });

      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");

      resetAutoRotate(slides, dots);

      const carouselWrapper = document.getElementById("photo-carousel");
      carouselWrapper.addEventListener("mouseenter", () => clearInterval(autoRotateInterval));
      carouselWrapper.addEventListener("mouseleave", () => resetAutoRotate(slides, dots));

      document.getElementById("prev").addEventListener("click", () => rotateCarousel(slides, dots, -1));
      document.getElementById("next").addEventListener("click", () => rotateCarousel(slides, dots, 1));
    });
