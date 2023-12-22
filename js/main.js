const numbers = [18939, 44137, 44137, 44137, 48418];

function initSwipers() {
    const swiper = new Swiper(".swiper", {
        // Optional parameters
        direction: "horizontal",
        simulateTouch: true,
        loop: true,
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    const programSwiper = new Swiper(".program-swiper", {
        // Optional parameters
        direction: "horizontal",
        simulateTouch: true,
        loop: true,
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const newsSwiper = new Swiper(".news-swiper", {
        // Optional parameters
        direction: "horizontal",
        simulateTouch: true,
        loop: true,
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

function handlePartnerOnResize(partnersSwiper) {
    if (window.innerWidth > 997 && partnersSwiper.enabled) {
        document.querySelector(".partners-swiper").classList.add("d-none");
        document.querySelector(".partners-swiper").classList.remove("d-flex");
        document.querySelector(".partner-swiper-disabled").classList.add("d-flex");
        document
            .querySelector(".partner-swiper-disabled")
            .classList.remove("d-none");
    } else if (window.innerWidth < 997 && partnersSwiper.enabled) {
        document.querySelector(".partners-swiper").classList.add("d-flex");
        document.querySelector(".partners-swiper").classList.remove("d-none");
        document.querySelector(".partner-swiper-disabled").classList.add("d-none");
        document
            .querySelector(".partner-swiper-disabled")
            .classList.remove("d-flex");
    }
}

function initPartnerSwiper() {
    const partnersSwiper = new Swiper(".partners-swiper", {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        simulateTouch: true,
        slidesPerView: 4,
        autoplay: {
            delay: 2000,
        },
        breakpoints: {
            // when window width is >= 320px
            220: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 320px
            320: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });
    this.handlePartnerOnResize(partnersSwiper);
    window.addEventListener("resize", () => {
        this.handlePartnerOnResize(partnersSwiper);
    });
}
// Function to be executed when the target element comes into view
function onEntry(entry) {
    entry.forEach((change) => {
        if (change.isIntersecting) {
            // Do something when the target element is in view
            // Replace this with your desired action
            console.log("Target element is now visible");
            document.querySelector("#number-wrapper").classList.remove("d-none");
            // Run your JS script here
            odometer1.innerHTML = numbers[0];
            odometer2.innerHTML = numbers[1];
            odometer3.innerHTML = numbers[2];
            odometer4.innerHTML = numbers[3];
            odometer5.innerHTML = numbers[4];
        }
    });
}

// Create an intersection observer instance
const observer = new IntersectionObserver(onEntry, {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin
    threshold: 0.5, // 0-1, percentage of the element's visibility required to trigger the callback
});

// Get the target element
const target = document.querySelector("#numbers");

// Start observing the target element
if (target) {
    observer.observe(target);
}

function scrollTop() {
    window.addEventListener("scroll", function() {
        const scrollToTop = document.getElementById("scroll-top");
        if (
            document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200
        ) {
            scrollToTop.style.display = "flex";
        } else {
            scrollToTop.style.display = "none";
        }
    });

    document.getElementById("scroll-top").addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (
      window.location.pathname.includes("index") ||
      window.location.pathname == "/" ||
      window.location.pathname == "/ryadah/"
    ) {
      initSwipers();
      initPartnerSwiper();
    }
    scrollTop();
    const loader = document.querySelector(".loader");
    // Hide the loader once the content is fully loaded
    window.onload = function() {
        loader.style.display = "none";
    };

    activateCurrentPath();
});

function activateCurrentPath() {
    const currentPath = window.location.pathname;
    setTimeout(() => {
        const navLinks = [
            ...document.querySelectorAll(".navbar-nav .nav-link"),
            ...document.querySelectorAll(".dropdown-menu .dropdown-item"),
        ];
        navLinks.forEach((link) => {
            if (currentPath.includes(link.getAttribute("href"))) {
                link.classList.add("active");
            }
        });
    }, 1);
}