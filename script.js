//for nav bar bg
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > window.innerHeight * 0.8) {
      nav.classList.add('nav-scrolled');
  } else {
      nav.classList.remove('nav-scrolled');
  }
});

