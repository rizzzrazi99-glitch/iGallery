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
        if (entranceTitle) entranceTitle.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        if (entranceNote) entranceNote.classList.add('fade-in');
    }, 800);

    setTimeout(() => {
        if (entranceBtn) entranceBtn.classList.add('fade-in');
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
    if (entranceBtn) {
        entranceBtn.addEventListener('click', () => {
            document.body.classList.add('gallery-open');

            // Remove entrance from DOM after transition
            setTimeout(() => {
                entrance.style.display = 'none';
            }, 1200);
        });
    }

    // Parallax effect for cards
    const items = document.querySelectorAll('.nav-card, .nav-card-protected');
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

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal-text, .welcome-divider');
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Protected Card Interaction (Password Vault)
    const protectedLink = document.querySelector('.protected-link');
    const vaultModal = document.getElementById('vault-modal');
    const vaultInput = document.getElementById('vault-password');
    const vaultSubmit = document.getElementById('vault-submit');
    const modalClose = document.getElementById('modal-close');

    // Direct Access Protection
    if (window.location.pathname === '/downloads') {
        if (!localStorage.getItem('vault_unlocked')) {
            window.location.href = '/';
        }
    }

    if (protectedLink && vaultModal) {
        protectedLink.addEventListener('click', (e) => {
            e.preventDefault();
            vaultModal.classList.add('active');
            setTimeout(() => vaultInput.focus(), 500);
        });

        const closeVault = () => {
            vaultModal.classList.remove('active');
            vaultInput.value = '';
            vaultInput.classList.remove('input-error');
        };

        modalClose.addEventListener('click', closeVault);

        vaultSubmit.addEventListener('click', () => {
            const password = vaultInput.value;
            // The secret key
            if (password === 'igallery2026') {
                vaultSubmit.textContent = 'DECRYPTING...';
                vaultSubmit.style.background = '#10b981';

                // Set unlock flag
                localStorage.setItem('vault_unlocked', 'true');
                document.cookie = "vault_unlocked=true; path=/; max-age=3600"; // 1 hour session

                setTimeout(() => {
                    window.location.href = '/downloads';
                }, 1000);
            } else {
                vaultInput.classList.add('input-error');
                setTimeout(() => vaultInput.classList.remove('input-error'), 500);
            }
        });

        vaultInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') vaultSubmit.click();
        });

        // Close on backdrop click
        vaultModal.addEventListener('click', (e) => {
            if (e.target === vaultModal) closeVault();
        });
    }

    // Navbar scroll interaction
    window.addEventListener('scroll', () => {
        if (document.body.classList.contains('gallery-open')) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(12, 12, 14, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.padding = '1.5rem 5vw';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.padding = '2.5rem 5vw';
            }
        }
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
