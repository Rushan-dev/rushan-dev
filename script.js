(function () {
  const nav = document.getElementById("navbar");
  const toggle = document.getElementById("toggle");
  const symbol = document.getElementById("toggle-symbol");
  const mobilePanel = document.getElementById("mobilePanel");
  const mobileLinks = mobilePanel.querySelectorAll("li");

  let lastScroll = window.pageYOffset || 0;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Scroll handler
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset || 0;

      if (isMobile()) {
        nav.classList.remove("transparent");
        nav.classList.add("black-bg");

        if (currentScroll > lastScroll && currentScroll > 20) {
          nav.classList.add("hidden");
          nav.classList.remove("visible");

          if (mobilePanel.classList.contains("open")) {
            mobilePanel.classList.remove("open");
            symbol.textContent = "<>";
            toggle.setAttribute("aria-expanded", "false");
          }
        } else {
          nav.classList.add("visible");
          nav.classList.remove("hidden");
        }
      } else {
        if (currentScroll <= 0) {
          nav.classList.add("transparent", "visible");
          nav.classList.remove("black-bg", "hidden", "coding-flicker");
        } else if (currentScroll > lastScroll) {
          nav.classList.add("hidden");
          nav.classList.remove("visible", "coding-flicker");
        } else {
          nav.classList.add("visible", "black-bg", "coding-flicker");
          nav.classList.remove("hidden", "transparent");
        }
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );

  // Toggle mobile menu
  toggle.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    symbol.textContent = isOpen ? "X" : "<>";

    if (isOpen) {
      mobileLinks.forEach((li, i) => {
        li.style.animation = "none";
        setTimeout(() => {
          li.style.animation = "";
        }, i * 100);
      });
    }
  });

  // Click outside to close mobile menu
  document.addEventListener("click", (e) => {
    if (isMobile() && mobilePanel.classList.contains("open")) {
      const inside = nav.contains(e.target) || mobilePanel.contains(e.target);
      if (!inside) {
        mobilePanel.classList.remove("open");
        symbol.textContent = "<>";
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Handle resize
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      nav.classList.remove("hidden");
      nav.classList.add("visible", "black-bg");
      mobilePanel.classList.remove("open");
      symbol.textContent = "<>";
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// Enable tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 15,
  speed: 300,
  glare: true,
  "max-glare": 0.2,
  gyroscope: true,
});

// Click = zoom in, then smooth back out
const boxes = document.querySelectorAll(".icon-box");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Add zoom class
    box.classList.add("clicked");

    // Remove after animation
    setTimeout(() => {
      box.classList.remove("clicked");
    }, 300); // Match the CSS transition duration
  });
});

const heading = document.getElementById("interactive-heading");

// Smaller max tilt angle for subtle effect
const maxTilt = 7;

function getCenter(elem) {
  const rect = elem.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 1500,
    y: rect.top + rect.height / 1500,
  };
}

window.addEventListener("mousemove", (e) => {
  const center = getCenter(heading);

  const relX = (e.clientX - center.x) / (heading.offsetWidth / 2);
  const relY = (center.y - e.clientY) / (heading.offsetHeight / 2);

  const clampX = Math.max(-1, Math.min(1, relX));
  const clampY = Math.max(-1, Math.min(1, relY));

  const rotateX = clampY * maxTilt;
  const rotateY = clampX * maxTilt;

  heading.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

heading.addEventListener("mouseleave", () => {
  heading.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg)`;
});

gsap.registerPlugin(ScrollTrigger);

// Function to split text into spans for stagger animation
function splitText(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const text = el.dataset.text || el.innerText;
    el.innerHTML = "";
    text.split("").forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      el.appendChild(span);
    });
  });
}

splitText("h1[data-text]");

// Parallax background effect
document.querySelectorAll(".section").forEach((section) => {
  const speed = section.dataset.speed;
  if (speed) {
    gsap.to(section, {
      backgroundPositionY: () => `${-window.innerHeight * speed}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        scrub: true,
      },
    });
  }
});

// Section 2 - Fade + stagger letters
gsap.from("#section2", {
  scrollTrigger: { trigger: "#section2", start: "top 80%" },
  y: 40,
  opacity: 0,
  stagger: 0.05,
  duration: 0.6,
  ease: "power3.out",
});

// Section 3 - Slide in letters from left
gsap.from("#section3", {
  scrollTrigger: { trigger: "#section3", start: "top 80%" },
  x: -50,
  opacity: 0,
  stagger: 0.04,
  duration: 0.5,
  ease: "back.out(1.7)",
});

// Section 4 - Zoom in letters
gsap.from("#section4", {
  scrollTrigger: { trigger: "#section4", start: "top 80%" },
  y: 80,
  opacity: 0,
  stagger: 0.05,
  duration: 2,
  ease: "power3.out",
});

// Section 5 - 3D rotation of letters
gsap.from("#section5", {
  scrollTrigger: { trigger: "#section5", start: "top 80%" },
  y: 80,
  opacity: 0,
  stagger: 0.05,
  duration: 2,
  ease: "power3.out",
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  // Check the vertical scroll position
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Show the button when scrolled down 200px, hide it otherwise
  if (scrollTop > 150) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }

  // Update progress indicator
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollToTopBtn.style.setProperty(
    "--scroll-percentage",
    `${scrollPercentage}%`
  );
});

// Smooth scroll to top on button click
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("load", () => {
  // Remove preloader after the page is fully loaded
  const preloader = document.getElementById("preloader");
  const fadeInElements = document.querySelectorAll(".fade-in");

  // Hide preloader after 2 seconds (or adjust this based on your need)
  setTimeout(() => {
    preloader.style.display = "none"; // Hide preloader
    // Apply fade-in effect to all fade-in elements
    fadeInElements.forEach((element) => {
      element.classList.add("visible");
    });
  }, 2000); // Adjust timing as needed for preloader duration
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const nav = document.getElementById("navbar");
  const fadeInElements = document.querySelectorAll(".fade-in"); // other elements

  setTimeout(() => {
    preloader.style.display = "none"; // hide preloader
    nav.classList.add("fade-visible"); // fade in nav

    // fade in other elements
    fadeInElements.forEach((el) => el.classList.add("visible"));
  }, 2000); // adjust duration as needed
});

$(document).ready(function () {
  var windowWidth = $(window).width();

  if (windowWidth <= 768) { // mobile view breakpoint
    $("#section1").ripples({
      resolution: 180,
      dropRadius: 15,
      perturbance: 0.02,
    });
  } else { // desktop
    $("#section1").ripples({
      resolution: 300,
      dropRadius: 20,
      perturbance: 0.04,
    });
  }
});

document.addEventListener("scroll", () => {
  const picElement = document.querySelector(".alltop");

  if (window.scrollY > 25) {
    // Apply the scroll-right class if scrolled more than 100px
    picElement.classList.add("scroll-right");
  } else {
    // Remove the scroll-right class if scrolled back to top
    picElement.classList.remove("scroll-right");
  }
});

document.addEventListener("scroll", () => {
  const picElement = document.querySelector(".pic");

  if (window.scrollY > 25) {
    // Apply the scroll-right class if scrolled more than 100px
    picElement.classList.add("scroll-right");
  } else {
    // Remove the scroll-right class if scrolled back to top
    picElement.classList.remove("scroll-right");
  }
});

document.addEventListener("scroll", () => {
  const picElement = document.querySelector(".rushan");

  if (window.scrollY > 25) {
    // Apply the scroll-right class if scrolled more than 100px
    picElement.classList.add("scroll-right");
  } else {
    // Remove the scroll-right class if scrolled back to top
    picElement.classList.remove("scroll-right");
  }
});

document.addEventListener("scroll", () => {
  const picElement = document.querySelector(".pic2");

  if (window.scrollY > 250) {
    // Apply the scroll-right class if scrolled more than 100px
    picElement.classList.add("scroll-left");
  } else {
    // Remove the scroll-right class if scrolled back to top
    picElement.classList.remove("scroll-left");
  }
});

document.addEventListener("scroll", () => {
  const picElement = document.querySelector(".profile");

  if (window.scrollY > 250) {
    // Apply the scroll-right class if scrolled more than 100px
    picElement.classList.add("scroll-left");
  } else {
    // Remove the scroll-right class if scrolled back to top
    picElement.classList.remove("scroll-left");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const skillFills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percentage = fill.getAttribute("data-percent");
        fill.style.width = `${percentage}%`;
      }
    });
  });

  skillFills.forEach((fill) => {
    observer.observe(fill);
  });
});

const roles = [
  "Graphic Designer",
  "UI/UX Designer",
  "Web Designer",
  "App Developer",
  "Software Developer",
];

const roleElement = document.querySelector("#rotating-role span");
let roleIndex = 0;

setInterval(() => {
  // Remove fade
  roleElement.classList.remove("show");

  // After fade out, change text and fade back in
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.textContent = roles[roleIndex];
    roleElement.classList.add("show");
  }, 2000); // Match transition duration
}, 4000); // Change every 3 seconds

// Handle description reveal and zoom + tilt
document.querySelectorAll(".chooseme-list li").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("hovered");
  });

  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 3;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * -12;

    item.style.transform = `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("hovered");
    item.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
  });
});

function isMobile() {
  return window.innerWidth <= 768;
}

document.addEventListener("DOMContentLoaded", () => {
  const iconBoxes = document.querySelectorAll(".icon-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(iconBoxes).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 150); // stagger 150ms each
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  iconBoxes.forEach((box) => observer.observe(box));
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".video-wrap video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play(); // Play when visible
        } else {
          video.pause(); // Pause when out of view
        }
      });
    },
    { threshold: 0.5 }
  ); // 50% of section visible triggers

  observer.observe(document.querySelector(".contact-section"));
});

const bgDiv = document.getElementById("particles-bg");
const starCount = 1000;
const stars = [];
let width = bgDiv.clientWidth;
let height = bgDiv.clientHeight;
const depth = 1800;

// Mouse position
const mouse = { x: 0, y: 0 };
bgDiv.addEventListener("mousemove", (e) => {
  const rect = bgDiv.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left - width / 2) / 10; // control movement strength
  mouse.y = (e.clientY - rect.top - height / 2) / 10;
});
bgDiv.addEventListener("mouseleave", () => {
  mouse.x = 0;
  mouse.y = 0;
});

// Create stars
for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  bgDiv.appendChild(star);
  stars.push({
    el: star,
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * depth,
  });
}

// Resize handler
function resize() {
  width = bgDiv.clientWidth;
  height = bgDiv.clientHeight;
}
window.addEventListener("resize", resize);

// Animate stars
function animate() {
  const centerX = width / 2;
  const centerY = height / 2;

  stars.forEach((s) => {
    // Move forward
    s.z -= 4; // speed
    if (s.z <= 0) {
      s.z = depth;
      s.x = Math.random() * width - width / 2;
      s.y = Math.random() * height - height / 2;
    }

    // Apply mouse interaction offset
    const offsetX = s.x + (mouse.x * (depth - s.z)) / depth;
    const offsetY = s.y + (mouse.y * (depth - s.z)) / depth;

    // Perspective projection
    const k = 600 / s.z;
    const x = offsetX * k + centerX;
    const y = offsetY * k + centerY;
    const size = (1 - s.z / depth) * 3; // closer stars bigger
    s.el.style.transform = `translate(${x}px, ${y}px)`;
    s.el.style.width = size + "px";
    s.el.style.height = size + "px";
    s.el.style.opacity = 1 - s.z / depth;
  });

  requestAnimationFrame(animate);
}

animate();

// Initialize EmailJS
(function () {
  emailjs.init("aDD3KPJxcMyZ8dfhj"); // 👉 Replace with your EmailJS Public Key
})();

// Handle form submit
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // stop form from refreshing page

    emailjs.sendForm("service_r9rbe5n", "template_aybgaiv", this).then(
      function () {
        alert("✅ Message sent successfully!");
        document.getElementById("contact-form").reset(); // clear form
      },
      function (error) {
        console.error("❌ Failed...", error);
        alert("Message failed to send. Please try again later.");
      }
    );
  });

window.addEventListener("DOMContentLoaded", () => {
  const icon = document.querySelector(".code-icon");
  icon.classList.add("animate");
});

