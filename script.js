document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("main.container");
  const sections = container.querySelectorAll("section");

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
