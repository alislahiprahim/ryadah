const numbers = [18939, 44137, 44137, 44137, 48418]
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const programSwiper = new Swiper('.program-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

})

const newsSwiper = new Swiper(".news-swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Function to be executed when the target element comes into view
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {

            // Do something when the target element is in view
            // Replace this with your desired action
            console.log('Target element is now visible');
            document.querySelector('#number-wrapper').classList.remove('d-none');
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
    rootMargin: '0px', // No margin
    threshold: 0.5 // 0-1, percentage of the element's visibility required to trigger the callback
});

// Get the target element
const target = document.querySelector('#numbers');

// Start observing the target element
if (target) {
    observer.observe(target);
}