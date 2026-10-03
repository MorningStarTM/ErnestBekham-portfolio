// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  root.setAttribute("data-theme", "light");
}

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ===== Mobile menu =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll('.mobile-menu a[data-nav], .mobile-menu a.btn').forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

// ===== Header scroll state + progress bar =====
const header = document.getElementById("site-header");
const progressBar = document.getElementById("progress-bar");
const backToTop = document.getElementById("back-to-top");

function onScroll() {
  const scrolled = window.scrollY;
  header.classList.toggle("scrolled", scrolled > 10);
  backToTop.classList.toggle("visible", scrolled > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-links a[data-nav]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => navObserver.observe(section));

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el, i) => {
  el.style.setProperty("--d", i % 6);
  revealObserver.observe(el);
});

// ===== Typed role text =====
const roles = [
  "Reinforcement Learning",
  "Motion & Pose Foundation Models",
  "Computer Vision",
  "LLMs & Agentic Systems",
  "Power Grid AI",
];

const roleTextEl = document.getElementById("role-text");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!roleTextEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    roleTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    roleTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();
