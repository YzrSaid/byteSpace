document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll(".main-navbar a");

  navbarLinks.forEach((link) => {
    if (window.location.pathname === link.getAttribute("href")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Function to toggle the dropdown menu for specific ID
function toggleDropdown(id) {
  // Close all other dropdowns first
  const dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    if (dropdowns[i].id !== id) {
      dropdowns[i].classList.remove("show");
    }
  }

  // Toggle the selected dropdown
  const dropdownMenu = document.getElementById(id);
  dropdownMenu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (
    !event.target.closest(".dropdown-toggle") &&
    !event.target.closest(".dropdown-content")
  ) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};

function handleNavbarBackground() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("navbar-logo");
  const activeLinkUnderline = document.querySelector(
    ".main-navbar .active::after"
  );
  const links = document.querySelectorAll(".main-navbar a");
  const loginBtn = document.querySelector(".login-btn");

  if (window.scrollY > 0) {
    navbar.classList.add("navbar-white");
    logo.src = "/assets/images/byteSpace-logo (blue).png";

    const activeLink = document.querySelector(".main-navbar .active");
    activeLink.style.setProperty("--active-link-underline-color", "#061b38");

    links.forEach((link) => {
      link.style.color = "#061b38";
    });

    loginBtn.style.color = "white";
    loginBtn.style.backgroundColor = "#061b38";
  } else {
    navbar.classList.remove("navbar-white");
    logo.src = "/assets/images/byteSpace-logo.png";

    // change the navbar a and activeLinkUnderline to white
    const activeLink = document.querySelector(".main-navbar .active");
    activeLink.style.setProperty("--active-link-underline-color", "white");

    links.forEach((link) => {
      link.style.color = "white";
    });

    loginBtn.style.color = "#061b38";
    loginBtn.style.backgroundColor = "white";
  }
}

// Override default anchor behavior to scroll with offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});


window.addEventListener("scroll", handleNavbarBackground);

// This is for navbar links
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const navbarLinks = document.querySelectorAll(".main-navbar a");
  if (navbarLinks.length === 0) return;

  const sections = document.querySelectorAll(
    "#first-div, #second-div, #third-div"
  );
  const hasSections = sections.length > 0;

  const navbarHeight = navbar.offsetHeight;

  function removeActiveClass() {
    navbarLinks.forEach((link) => {
      link.classList.remove("active");
    });
  }

  function addActiveClass(link) {
    link.classList.add("active");
  }

  // For scroll behavior, only add listener if the sections exist
  if (hasSections) {
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const link = document.querySelector(
          `.main-navbar a[href="#${sectionId}"]`
        );
        if (entry.isIntersecting && link) {
          removeActiveClass();
          addActiveClass(link);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    sections.forEach((section) => observer.observe(section));
  } else {
    // No scroll sections: Set based on current URL
    const currentPath = window.location.pathname;

    removeActiveClass();

    navbarLinks.forEach((link) => {
      const page = link.getAttribute("data-page");
      if (!page) return;

      const fullMatch = `/${page}` === currentPath;
      const isFeaturesDropdown =
        page === "features" &&
        [
          "/extension-check",
          "/file-integrity-checker",
          "/malware-scan",
        ].includes(currentPath);

      if (fullMatch || isFeaturesDropdown) {
        addActiveClass(link);
      }
    });
  }
});

// this is for the scrolltotop btn
// Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show or hide the button based on scroll position
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Scroll to the top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
}

function toggleNavbar() {
  const navbar = document.querySelector(".main-navbar");
  navbar.classList.toggle("active");
}

// This is for the stars effect:
const starCount = 150; // Number of stars
const starsContainer = document.querySelector(".stars"); // Get the stars container element

// Function to generate stars
function generateStars() {
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random size
    const size = Math.random() * 3 + 1; // Between 1px and 4px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random position
    const xPosition = Math.random() * window.innerWidth; // Random X position
    const yPosition = Math.random() * window.innerHeight; // Random Y position
    star.style.left = `${xPosition}px`;
    star.style.top = `${yPosition}px`;

    // Random animation duration
    const duration = Math.random() * 1.5 + 1; // Between 1s and 2.5s
    star.style.animationDuration = `${duration}s`;

    // Append the star to the container
    starsContainer.appendChild(star);
  }
}

// Generate stars when the page loads
window.onload = generateStars;
