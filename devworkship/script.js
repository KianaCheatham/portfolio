const lines = document.querySelectorAll("#stripe-bg line");

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  lines.forEach((line, i) => {
    const offset = (mouseX / window.innerWidth - 0.5) * (30 + i * 10); // wiggle amount
    gsap.to(line, {
      duration: 0.4,
      attr: { x1: `${(i*20)+10}%`, x2: `${(i*20)+10 + offset}%` },
      ease: "easeOut"
    });
  });
});

window.addEventListener("mouseleave", () => {
  // return to normal
  gsap.to(lines, {
    duration: 1,
    attr: (i) => ({ x1: `${(i*20)+10}%`, x2: `${(i*20)+10}%` }),
    ease: "power2.out"
  });
});
