const cards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => observer.observe(card));

const topNav = document.querySelector("#top-nav");
const navScrollLimit = 600;

window.addEventListener("scroll", () => {
  if (!topNav) return;

  if (window.scrollY > navScrollLimit) {
    topNav.classList.add("nav-hidden");
  } else {
    topNav.classList.remove("nav-hidden");
  }
});

document.querySelectorAll(".muted-video").forEach((wrapper) => {
  const video = wrapper.querySelector("video");
  const playButton = wrapper.querySelector(".play-button");

  if (!video || !playButton) return;

  playButton.addEventListener("click", async () => {
    try {
      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  });

  video.addEventListener("click", () => {
    if (!video.paused) {
      video.pause();
    }
  });

  video.addEventListener("play", () => {
    playButton.classList.add("is-hidden");
  });

  video.addEventListener("pause", () => {
    playButton.classList.remove("is-hidden");
  });

  video.addEventListener("ended", () => {
    playButton.classList.remove("is-hidden");
  });
});