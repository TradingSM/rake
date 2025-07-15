document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".nav-btn");
    const themeBtn = document.getElementById('themeBtn');
    const calculators = document.querySelectorAll(".calculator-section");
    const themeMetaTag = document.querySelector('meta[name="theme-color"]');

    // Theme toggle
    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        themeBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
        themeMetaTag.setAttribute('content', isLight ? '#ff4c4c' : '#00c6ff');
    });

    // Navigation pills
    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            navButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            calculators.forEach(section => section.classList.add("hidden"));
            const targetId = this.getAttribute("data-target");
            document.getElementById(targetId).classList.remove("hidden");
        });
    });
});
