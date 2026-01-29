document.addEventListener('DOMContentLoaded', () => {
    const entrance = document.getElementById('entrance');
    const entranceBtn = document.querySelector('.entrance-btn');
    const entranceTitle = document.querySelector('.entrance-title');

    // Entrance Animations
    setTimeout(() => {
        entranceTitle.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        entranceBtn.classList.add('fade-in');
    }, 1000);

    // Unlock Interaction
    entranceBtn.addEventListener('click', () => {
        document.body.classList.add('gallery-open');

        // Remove entrance from DOM after transition
        setTimeout(() => {
            entrance.style.display = 'none';
        }, 1200);
    });

    // Parallax effect for cards
    const items = document.querySelectorAll('.nav-card');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        items.forEach(item => {
            if (isInViewport(item)) {
                const img = item.querySelector('img');
                if (img) img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
            }
        });
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
