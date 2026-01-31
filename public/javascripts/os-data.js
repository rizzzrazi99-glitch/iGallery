const OS_DATA = {
    kali: {
        id: 'kali',
        name: 'Kali Linux',
        version: '2024.4',
        accent: '#6366f1',
        description: 'Advanced penetration testing and security auditing distribution. Features a vast collection of tools for digital forensics and ethical hacking.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        architectures: {
            '64bit': { label: '64-bit', note: 'RECOMMENDED', download: '#' },
            '32bit': { label: '32-bit', note: '', download: '#' },
            'arm64': { label: 'Apple Silicon', note: 'M1/M2/M3', download: '#' }
        }
    },
    macos: {
        id: 'macos',
        name: 'macOS Sequoia',
        version: '15.2',
        accent: '#ffffff',
        description: 'The worlds most advanced desktop operating system, optimized for artistic expression and seamless creative workflows.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.88-1.58 3.5-4.03 3.5-6.94 0-4.14-3.36-7.5-7.5-7.5-1.12 0-2.17.25-3.11.7.45-1.57 1.83-2.7 3.5-2.7 2.07 0 3.75 1.68 3.75 3.75 0 1.12-.51 2.12-1.3 2.78 1.12-.13 2.25-.13 3.37 0 .1-.56.13-1.13.13-1.71C14.34 5.36 11.45 2.5 8 2.5 4.55 2.5 1.66 5.36 1.66 8.87c0 2.39 1.32 4.47 3.26 5.56C2.98 15.52 1.66 17.6 1.66 19.99c0 3.51 2.89 6.37 6.34 6.37 1.88 0 3.58-.83 4.74-2.15-1.12.13-2.25.13-3.37 0 .28.48.56.96.84 1.44z"></path></svg>',
        architectures: {
            'arm64': { label: 'Apple Silicon', note: 'Universal', download: '#' },
            'intel': { label: 'Intel (x64)', note: 'Legacy', download: '#' }
        }
    },
    ubuntu: {
        id: 'ubuntu',
        name: 'Ubuntu Desktop',
        version: '24.04 LTS',
        accent: '#e95420',
        description: 'The world\'s most popular open-source OS for developers and enterprise. Stable, secure, and ready for production.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="14.65" y1="14.65" x2="19.07" y2="19.07"></line><line x1="4.93" y1="4.93" x2="9.35" y2="9.35"></line></svg>',
        architectures: {
            '64bit': { label: '64-bit', note: 'Standard', download: '#' },
            'arm64': { label: 'ARM64', note: 'IoT/Server', download: '#' }
        }
    },
    windows: {
        id: 'windows',
        name: 'Windows 11',
        version: '23H2',
        accent: '#00a4ef',
        description: 'The next generation of computing. Optimized for performance, gaming, and a modern digital experience.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8"></rect><rect x="13" y="3" width="8" height="8"></rect><rect x="3" y="13" width="8" height="8"></rect><rect x="13" y="13" width="8" height="8"></rect></svg>',
        architectures: {
            'x64': { label: '64-bit (x64)', note: 'PRO/HOME', download: '#' },
            'arm64': { label: 'ARM64', note: 'Surface/Dev', download: '#' }
        }
    },
    parrot: {
        id: 'parrot',
        name: 'Parrot Security',
        version: '6.1',
        accent: '#20e98c',
        description: 'A complete all-in-one environment for pentesting, privacy, digital forensics, reverse engineering and development.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8l-4 4-4-4"></path><path d="M12 12V4"></path><path d="M20 20H4"></path></svg>',
        architectures: {
            '64bit': { label: '64-bit Security', note: 'FULL', download: '#' },
            'home': { label: 'Home Edition', note: 'Lightweight', download: '#' },
            'architect': { label: 'Architect', note: 'Minimal', download: '#' }
        }
    }
};
