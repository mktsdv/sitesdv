document.addEventListener('DOMContentLoaded', () => {
      // === Carrossel de Cards ===
      const cardTrack = document.getElementById("card-carousel-track");
      const cardSlides = cardTrack.querySelectorAll(".slide");
      let cardIndex = 0;

      function updateCardCarousel() {
        cardTrack.style.transform = `translateX(-${cardIndex * 100}%)`;
      }

      document.getElementById("prev-card").addEventListener("click", () => {
        cardIndex = (cardIndex - 1 + cardSlides.length) % cardSlides.length;
        updateCardCarousel();
      });

      document.getElementById("next-card").addEventListener("click", () => {
        cardIndex = (cardIndex + 1) % cardSlides.length;
        updateCardCarousel();
      });
    });

    document.addEventListener('DOMContentLoaded', async () => {
      // === Carrossel de Fotos ===

      const track = document.getElementById("carousel-track");
      const dotsContainer = document.getElementById("dots-container");
      let currentIndex = 0;
      let autoRotateInterval;
      const imageBaseUrl = "https://raw.githubusercontent.com/mktsdv/sitesdv/main/img/carousel/";

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

      function zoomImage(src) {
        const overlay = document.createElement("div");
        overlay.className = "zoom-overlay";
        const img = document.createElement("img");
        img.src = src;
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.className = "close-zoom";
        closeBtn.onclick = () => document.body.removeChild(overlay);
        overlay.appendChild(img);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
      }

      const imageNames = await fetchImageListFromGitHub();
      const shuffledImages = shuffle(imageNames);

      shuffledImages.forEach((name, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        const img = document.createElement("img");
        img.src = imageBaseUrl + encodeURIComponent(name);
        img.alt = `Foto ${index + 1}`;
        img.addEventListener("click", () => zoomImage(img.src));
        slide.appendChild(img);
        track.appendChild(slide);

        const dot = document.createElement("span");
        dot.className = "dot";
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
      });

      const slides = document.querySelectorAll(".photo-carousel-track .slide");
      const dots = document.querySelectorAll(".dots .dot");

      resetAutoRotate(slides, dots);

      const carouselWrapper = document.getElementById("photo-carousel");
      carouselWrapper.addEventListener("mouseenter", () => clearInterval(autoRotateInterval));
      carouselWrapper.addEventListener("mouseleave", () => resetAutoRotate(slides, dots));

      document.getElementById("prev").addEventListener("click", () => rotateCarousel(slides, dots, -1));
      document.getElementById("next").addEventListener("click", () => rotateCarousel(slides, dots, 1));
    });