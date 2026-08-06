const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");

function lockDesktopProjectLayout() {
  const projectPage = document.querySelector(".project-details-page");

  if (!projectPage || !desktopPointer.matches) return;

  /*
    screen.availWidth uses CSS pixels, so Windows display scaling is already
    accounted for. The small allowance prevents the vertical scrollbar and
    browser frame from creating horizontal overflow at 100% browser zoom.
  */
  const availableDesktopWidth = Math.min(
    screen.availWidth,
    window.outerWidth || screen.availWidth
  );
  const layoutWidth = Math.max(900, Math.floor(availableDesktopWidth - 24));
  const layoutPadding = Math.min(124, Math.max(32, layoutWidth * 0.07));

  document.documentElement.style.setProperty(
    "--project-layout-width",
    `${layoutWidth}px`
  );
  document.documentElement.style.setProperty(
    "--project-layout-padding",
    `${layoutPadding}px`
  );
  document.documentElement.classList.add("desktop-project-layout");
}

lockDesktopProjectLayout();

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

let previousScrollPosition = window.scrollY;
let upwardDistance = 0;

const navHidePoint = 600;
const navShowDistance = 80;

window.addEventListener("scroll", () => {
  if (!topNav) return;

  const currentScrollPosition = window.scrollY;
  const scrollDifference = previousScrollPosition - currentScrollPosition;

  if (currentScrollPosition <= navHidePoint) {
    topNav.classList.remove("nav-hidden");
    upwardDistance = 0;
  } else if (scrollDifference > 0) {
    upwardDistance += scrollDifference;

    if (upwardDistance >= navShowDistance) {
      topNav.classList.remove("nav-hidden");
    }
  } else if (scrollDifference < 0) {
    upwardDistance = 0;
    topNav.classList.add("nav-hidden");
  }

  previousScrollPosition = currentScrollPosition;
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
