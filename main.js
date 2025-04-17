const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// feature container
ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  interval: 500,
});

// news container
ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  interval: 500,
});

document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.getElementById('navbar');
  if (navbarContainer) {
    fetch('navbar.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load navbar');
        }
        return response.text();
      })
      .then((html) => {
        navbarContainer.innerHTML = html;

        // Initialize initials button after navbar is loaded
        const userInitialsBtn = document.getElementById('user-initials');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const logoutBtn = document.getElementById('logout-btn');

        if (userInitialsBtn) {
          const initials = localStorage.getItem('userInitials') || 'AB';
          userInitialsBtn.style.display = 'flex';
          userInitialsBtn.textContent = initials;

          userInitialsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
          });

          document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !userInitialsBtn.contains(e.target)) {
              dropdownMenu.classList.remove('show');
            }
          });

          logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userInitials');
            window.location.href = 'login.html';
          });
        }
      })
      .catch((error) => console.error('Error loading navbar:', error));
  } else {
    console.error('Navbar container not found');
  }

  // Initialize ScrollReveal animations
  const sr = ScrollReveal({
    origin: 'top',
    distance: '50px',
    duration: 1000,
    delay: 200,
    reset: true,
  });

  sr.reveal('.header__container', { delay: 300 });
  sr.reveal('.booking__container', { delay: 400 });
  sr.reveal('.about__container', { delay: 500 });
  sr.reveal('.room__grid', { delay: 600 });
  sr.reveal('.intro__container', { delay: 700 });
  sr.reveal('.feature__grid', { delay: 800 });
  sr.reveal('.menu__items', { delay: 900 });
  sr.reveal('.news__grid', { delay: 1000 });
});
