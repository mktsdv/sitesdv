document.addEventListener('DOMContentLoaded', async () => {
      // Elementos principais do carrossel
      const track = document.getElementById("carousel-track");
      const dotsContainer = document.getElementById("dots-container");
      let currentIndex = 0;
      let autoRotateInterval;

      // URL base das imagens
      const imageBaseUrl = "https://raw.githubusercontent.com/mktsdv/sitesdv/main/img/carousel/";

      // Busca lista de imagens do repositório do GitHub
      async function fetchImageListFromGitHub() {
        const apiUrl = "https://api.github.com/repos/mktsdv/sitesdv/contents/img/carousel";
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

      // Embaralha a ordem das imagens
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Atualiza o carrossel com base no índice atual
      function updateCarousel(slides, dots) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
          dot.classList.toggle("active", index === currentIndex);
        });
      }

      // Rotaciona o carrossel manualmente ou automaticamente
      function rotateCarousel(slides, dots, direction) {
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateCarousel(slides, dots);
        resetAutoRotate(slides, dots);
      }

      // Reinicia o intervalo de rotação automática
      function resetAutoRotate(slides, dots) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => rotateCarousel(slides, dots, 1), 10000);
      }

      // Cria e exibe o overlay com a imagem ampliada
      function showZoomOverlay(src, alt) {
        const overlay = document.createElement("div");
        overlay.className = "zoom-overlay";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;

        const closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", () => document.body.removeChild(overlay));

        overlay.appendChild(img);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
      }

      // Busca e embaralha imagens, insere slides e dots
      const imageNames = await fetchImageListFromGitHub();
      const shuffledImages = shuffle(imageNames);

      shuffledImages.forEach((name, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        const img = document.createElement("img");
        img.src = imageBaseUrl + encodeURIComponent(name);
        img.alt = `Foto ${index + 1}`;
        slide.appendChild(img);
        track.appendChild(slide);

        const dot = document.createElement("span");
        dot.className = "dot";
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);

        // Evento de clique para ampliar a imagem
        img.addEventListener("click", () => showZoomOverlay(img.src, img.alt));
      });

      // Inicializa rotação automática
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");
      resetAutoRotate(slides, dots);

      // Pausa rotação automática ao passar o mouse
      const carouselWrapper = document.getElementById("photo-carousel");
      carouselWrapper.addEventListener("mouseenter", () => clearInterval(autoRotateInterval));
      carouselWrapper.addEventListener("mouseleave", () => resetAutoRotate(slides, dots));

      // Controles de navegação manual
      document.getElementById("prev").addEventListener("click", () => rotateCarousel(slides, dots, -1));
      document.getElementById("next").addEventListener("click", () => rotateCarousel(slides, dots, 1));
    });