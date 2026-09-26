/* =========================================================
   ALPHA.HR PORTFOLIO JS
   ========================================================= */


/* YEAR */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* THEME */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("alpha-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  if (themeToggle) {
    themeToggle.textContent = "☀️";
  }
}

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    localStorage.setItem(
      "alpha-theme",
      isDark ? "dark" : "light"
    );

    themeToggle.textContent =
      isDark ? "☀️" : "🌙";

  });

}


/* MOBILE MENU */

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    menuToggle.textContent =
      navMenu.classList.contains("open")
        ? "✕"
        : "☰";

  });

}


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav-link")
  .forEach(link => {

    link.addEventListener("click", () => {

      if (navMenu) {
        navMenu.classList.remove("open");
      }

      if (menuToggle) {
        menuToggle.textContent = "☰";
      }

    });

  });


/* NAVBAR SCROLL */

const navbar =
  document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* REVEAL ANIMATION */

const revealElements =
  document.querySelectorAll(".reveal");

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {
  observer.observe(element);
});


/* ACTIVE NAV */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      "#" + current
    ) {
      link.classList.add("active");
    }

  });

});


/* TYPING EFFECT */

const typingText =
  document.getElementById("typingText");

const roles = [
  "Developer • Creator • Entrepreneur",
  "Web Developer • Builder",
  "Digital Product Creator",
  "Technology Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

  if (!typingText) return;

  const currentRole =
    roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(
        0,
        charIndex + 1
      );

    charIndex++;

    if (charIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeEffect, 1700);

      return;
    }

  } else {

    typingText.textContent =
      currentRole.substring(
        0,
        charIndex - 1
      );

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex =
        (roleIndex + 1) % roles.length;

    }

  }

  setTimeout(
    typeEffect,
    deleting ? 45 : 75
  );

}

typeEffect();


/* PROJECT CARD TILT */

const projectCards =
  document.querySelectorAll(".project-card");

projectCards.forEach(card => {

  card.addEventListener("mousemove", event => {

    if (window.innerWidth < 800) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -2;

    const rotateY =
      ((x - centerX) / centerX) * 2;

    card.style.transform =
      `perspective(700px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});
