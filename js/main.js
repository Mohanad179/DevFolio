// Change these words to customize the animated title in the hero section.
const roleWords = ["Frontend Developer", "Web Developer", "Software Engineer"];
const typedText = document.querySelector("#typedText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  if (!typedText || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (typedText) typedText.textContent = roleWords[0];
    return;
  }

  const currentWord = roleWords[wordIndex];
  typedText.textContent = currentWord.slice(0, charIndex);

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeRole, 95);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeRole, 1250);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 45);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % roleWords.length;
    setTimeout(typeRole, 250);
  }
}
typeRole();

// Compact navbar on scroll and show the back-to-top button.
const navbar = document.querySelector(".navbar");
const backToTop = document.querySelector("#backToTop");
function handleScroll() {
  const scrolled = window.scrollY > 40;
  navbar?.classList.toggle("scrolled", scrolled);
  backToTop?.classList.toggle("visible", window.scrollY > 450);
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Close the mobile navigation after clicking a section link.
document.querySelectorAll("#navMenu .nav-link:not(.dropdown-toggle)").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#navMenu");
    if (menu?.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Animate the statistic counters when they first enter the viewport.
const counters = document.querySelectorAll(".stat-number");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count) || 0;
    const duration = 1000;
    const start = performance.now();
    function updateCounter(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.floor(progress * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(updateCounter);
    }
    requestAnimationFrame(updateCounter);
    observer.unobserve(element);
  });
}, { threshold: 0.45 });
counters.forEach((counter) => counterObserver.observe(counter));

// This is a front-end demo only; it does not transmit form data anywhere.
const contactForm = document.querySelector("#contactForm");
const formNotice = document.querySelector("#formNotice");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formNotice.textContent = "The form is working on the front end, but messages are not sent. Connect a backend or form service to receive them.";
  formNotice.classList.add("text-primary");
});
