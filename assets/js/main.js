/* Boat Service Watermakers — interactions */
(function () {
  "use strict";

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.getElementById("nav");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const toggleMenu = (open) => {
    const willOpen = open ?? !menu.classList.contains("open");
    menu.classList.toggle("open", willOpen);
    burger.classList.toggle("open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());

  // Submenu accordion on mobile
  menu.querySelectorAll(".has-sub > a").forEach((a) => {
    a.addEventListener("click", (e) => {
      if (window.innerWidth <= 880) {
        e.preventDefault();
        a.parentElement.classList.toggle("open");
      }
    });
  });

  // Close menu when a link is tapped + smooth offset scroll
  menu.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      if (!a.parentElement.classList.contains("has-sub") || window.innerWidth > 880) {
        toggleMenu(false);
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".count");
  const runCount = (el) => {
    const target = +el.dataset.to;
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("el-GR");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = (+el.dataset.to).toLocaleString("el-GR")));
  }

  /* ---------- Contact form (front-end only) ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.style.color = "var(--blue-500)";
        status.textContent = "Συμπληρώστε τα υποχρεωτικά πεδία.";
        form.reportValidity();
        return;
      }
      const name = form.elements.name.value.trim().split(" ")[0] || "";
      status.style.color = "#00A901";
      status.textContent = `Ευχαριστούμε${name ? " " + name : ""}! Θα επικοινωνήσουμε σύντομα μαζί σας.`;
      form.reset();
      setTimeout(() => (status.textContent = ""), 6000);
    });
  }

  /* ---------- Footer year ---------- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
