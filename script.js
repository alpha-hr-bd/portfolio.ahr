/* =========================================================
   ALPHA.HR — PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector("header");


    /* =========================
       DARK / LIGHT MODE
    ========================= */

    const savedTheme = localStorage.getItem("alpha-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☀";
        }
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("dark");

            const isDark = body.classList.contains("dark");

            localStorage.setItem(
                "alpha-theme",
                isDark ? "dark" : "light"
            );

            themeToggle.textContent =
                isDark ? "☀" : "☾";

        });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const opened =
                navLinks.classList.contains("active");

            menuToggle.textContent =
                opened ? "✕" : "☰";

        });


        /* Close menu after clicking link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    function handleScroll() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .service, .skill-card, .stat, .contact-box"
        );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

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


    /* =========================
       ACTIVE NAV LINK
    ========================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.id;
            }

        });

        navItems.forEach(link => {

            link.style.color = "";

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.style.color =
                    "var(--primary)";
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) return;

            const target =
                document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       TYPING EFFECT
    ========================= */

    const heroTitle =
        document.querySelector(".hero h2");

    if (heroTitle) {

        const words = [
            "Developer • Creator • Entrepreneur",
            "Web Developer • Builder",
            "Digital Product Creator",
            "Technology Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                heroTitle.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;

                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1600
                    );

                    return;
                }

            } else {

                heroTitle.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 35 : 65
            );

        }

        typeEffect();

    }


    /* =========================
       PROJECT CARD TILT
    ========================= */

    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 850)
                    return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - .5) * -5;

                const rotateY =
                    ((x / rect.width) - .5) * 5;

                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    document.querySelectorAll(
        "footer p"
    ).forEach(p => {

        if (
            p.textContent.includes("2026")
        ) {

            p.textContent =
                p.textContent.replace(
                    "2026",
                    new Date().getFullYear()
                );

        }

    });


    /* =========================
       PAGE LOADED
    ========================= */

    document.body.classList.add(
        "page-loaded"
    );

});
