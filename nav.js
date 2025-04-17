document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__links a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').replace('#', '');
      window.location.href = `${target}.html`; // Redirect to the corresponding file
    });
  });
});
