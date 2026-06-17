
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const authLinks = document.querySelector('.auth-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authLinks.classList.toggle('active');
});

// LOGIN DESIGN
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (rememberMe) {
        alert(`Email: ${email}\nRemember Me: On`);
    } else {
        alert(`Email: ${email}\nRemember Me: Off`);
    }
    
});


// SINGUP DESIGN
function validateForm() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('error-message');

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return false;
    }

    errorMessage.textContent = ""; // Clear any previous error messages
    return true;
}


// baner sliding

// let currentIndex = 0;
// function showSlide(index) {
//     const slides = document.querySelector('.banner-slide');
//     const totalSlides = slides.children.length;
//     if (index >= totalSlides) {
//         currentIndex = 0;
//     } else if (index < 0) {
//         currentIndex = totalSlides - 1;
//     } else {
//         currentIndex = index;
//     }
//     const offset = -currentIndex * 100 / totalSlides;
//     slides.style.transform = `translateX(${offset}%)`;
// }

// function nextSlide() {
//     showSlide(currentIndex + 1);
// }

// function prevSlide() {
//     showSlide(currentIndex - 1);
// }

// setInterval(() => {
//     nextSlide();
// }, 3000);


// TESTIMONIAL DESIGN 



// clock countdown
function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    let remainingTime = 24 * 60 * 60; // 24 hours in seconds

    const timerInterval = setInterval(() => {
        let hours = Math.floor(remainingTime / 3600);
        let minutes = Math.floor((remainingTime % 3600) / 60);
        let seconds = remainingTime % 60;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        countdownElement.innerHTML = `${hours}:${minutes}:${seconds}`;

        remainingTime--;

        if (remainingTime < 0) {
        countdownElement.innerHTML = "Game Over";
        clearInterval(timerInterval);

        setTimeout(() => {
            remainingTime = 24 * 60 * 60;
            startCountdown();
        }, 2000); // 2 seconds delay before restarting
        }
    }, 1000);
    }

    startCountdown();





