// modul script.js

document.addEventListener('DOMContentLoaded', () => {
    // === Pilih elemen === //
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // === Memeriksa bagian preferensi tema yang disimpan di localStorage ===//
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        body.classList.add('light-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    // === Mengalihkan mode gelap dan terang ===//
    toggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
                localStorage.setItem('theme', 'dark');
        }
    })
})