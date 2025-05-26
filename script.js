
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main.container");
  const sections = container.querySelectorAll("section");
  const menuIcon = document.getElementById("menu-icon");
  const menu = document.getElementById("menu");
  const links = menu.querySelectorAll("a");
  const images = document.querySelectorAll(".gallery-img");
    let current = 0;

    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    }, 3000); // troca a cada 3 segundos
  });

  // Menu hambúrguer
  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Navegação suave pelos links do menu
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const targetSection = document.querySelector(`.${targetId}, #${targetId}`);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      if (window.innerWidth <= 600) {
        menu.classList.remove("show");
      }
    });
  });

  // Scroll entre seções com controle de índice
  let currentIndex = 0;
  let isThrottled = false;

  document.addEventListener("wheel", (event) => {
    if (isThrottled) return;
    isThrottled = true;

    setTimeout(() => isThrottled = false, 800);

    const direction = event.deltaY > 0 ? 1 : -1;
    currentIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
  });
});