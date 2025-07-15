document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".nav-btn");
    const themeBtn = document.getElementById('themeBtn');
    const calculators = document.querySelectorAll(".calculator-section");

    // Theme toggle functionality
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeBtn.textContent = document.body.classList.contains('light-mode') ? 'Dark Mode' : 'Light Mode';
    });

    // Navigation pills functionality
    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Deactivate all pills
            navButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Hide all calculators
            calculators.forEach(section => section.classList.add("hidden"));

            // Show the selected calculator
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).classList.remove("hidden");
        });
    });
});
