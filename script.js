document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main.container");
  const sections = container.querySelectorAll("section");
  const menuIcon = document.getElementById("menu-icon");
  const menu = document.getElementById("menu");
  const links = menu.querySelectorAll("a");

  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const targetSection = document.querySelector(`.${targetId}, #${targetId}`);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      // Fecha o menu após clique em mobile
      if (window.innerWidth <= 600) {
        menu.classList.remove("show");
      }
    });
  });

  // Ajusta altura de cada section
  const setSectionHeights = () => {
    const height = window.innerHeight;
    sections.forEach(section => {
      section.style.height = height + "px";
    });
  };

  setSectionHeights();
  window.addEventListener("resize", setSectionHeights);
  
  let currentIndex = 0;
  let isThrottled = false;

  container.addEventListener("wheel", (event) => {
    if (isThrottled) return;
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
    }, 800); // evita scrolls múltiplos

    const direction = event.deltaY > 0 ? 1 : -1;
    currentIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
  });
});
