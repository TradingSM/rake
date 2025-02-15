document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            // Hide all sections
            document.querySelectorAll(".calculator-section").forEach(section => {
                section.classList.add("hidden");
            });

            // Show the selected calculator
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).classList.remove("hidden");
        });
    });
});
