// hero section changing title
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

const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  const originalButtonText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formNotice.textContent = "";

  try {
    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: new FormData(contactForm),
      }
    );

    const result = await response.json();

    if (response.ok && result.success) {
      formNotice.textContent =
        "Your message has been sent successfully!";

      contactForm.reset();
    } else {
      formNotice.textContent =
        result.message || "Failed to send your message. Please try again.";
    }
  } catch (error) {
    formNotice.textContent =
      "Something went wrong. Please check your connection and try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});
