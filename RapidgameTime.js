document.addEventListener("DOMContentLoaded", function () {
    const countdownContainers = document.querySelectorAll(".countdown-container");

    countdownContainers.forEach(container => {
        initializeCountdown(container);
    });

    function initializeCountdown(container) {
        const nextDrawTime = calculateNextDrawTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = nextDrawTime - now;

            if (distance < 0) {
                return; // Stop updating if time has passed.
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const timeSections = container.querySelectorAll(".time-section .time-value");
            timeSections[0].textContent = String(hours).padStart(2, "0");
            timeSections[1].textContent = String(minutes).padStart(2, "0");
            timeSections[2].textContent = String(seconds).padStart(2, "0");
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    function calculateNextDrawTime() {
        const now = new Date();
        const nextDrawTime = new Date();
        nextDrawTime.setHours(18, 30, 0, 0);

        if (now > nextDrawTime) {
            nextDrawTime.setDate(nextDrawTime.getDate() + 1);
        }

        return nextDrawTime.getTime();
    }
});
