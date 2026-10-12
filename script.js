const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const revealTargets = document.querySelectorAll(".project-card, .about-layout, .stats, .contact h2");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((target) => {
  target.classList.add("reveal");
  revealObserver.observe(target);
});

const reviewTrack = document.querySelector(".review-track");
const reviewCards = document.querySelectorAll(".review-card");
const reviewCount = document.querySelector(".carousel-count b");
const carouselButtons = document.querySelectorAll(".carousel-button");
let activeReview = 0;

const showReview = (index) => {
  activeReview = (index + reviewCards.length) % reviewCards.length;
  reviewTrack.style.transform = `translateX(-${activeReview * 100}%)`;
  reviewCount.textContent = String(activeReview + 1).padStart(2, "0");
};

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => showReview(activeReview + Number(button.dataset.direction)));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showReview(activeReview - 1);
  if (event.key === "ArrowRight") showReview(activeReview + 1);
});
