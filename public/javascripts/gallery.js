document.addEventListener('DOMContentLoaded', () => {
    const entrance = document.getElementById('entrance');
    const entranceBtn = document.querySelector('.entrance-btn');
    const entranceTitle = document.querySelector('.entrance-title');

    const entranceNote = document.querySelector('.entrance-note');
    const navbar = document.querySelector('.navbar');

    // Entrance Animations
    setTimeout(() => {
        if (navbar) navbar.classList.add('fade-in');
    }, 200);

    setTimeout(() => {
        entranceTitle.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        if (entranceNote) entranceNote.classList.add('fade-in');
    }, 800);

    setTimeout(() => {
        entranceBtn.classList.add('fade-in');
    }, 1200);

    // Special Interaction: Magnetic Effect & Depth
    const magneticElements = [entranceBtn, document.querySelector('.logo-text'), entranceTitle];

    magneticElements.forEach(el => {
        if (!el) return;
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const multiplier = el === entranceTitle ? 0.15 : 0.35;
            el.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;

            if (el === entranceBtn) {
                el.style.boxShadow = `${-x * 0.1}px ${-y * 0.1}px 30px rgba(99, 102, 241, 0.5)`;
            }
            if (el === entranceTitle) {
                el.style.textShadow = `${-x * 0.05}px ${-y * 0.05}px 15px rgba(255, 255, 255, 0.2)`;
            }
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
            el.style.boxShadow = '';
            el.style.textShadow = '';
        });
    });

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
