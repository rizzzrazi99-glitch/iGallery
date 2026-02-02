const OS_DATA = {
    kali: {
        id: 'kali',
        name: 'Kali Linux',
        version: '2025.4',
        accent: '#6366f1',
        description: 'Advanced penetration testing and security auditing distribution. Features a vast collection of tools for digital forensics and ethical hacking.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        architectures: {
            '64bit': { label: '64-bit', note: 'RECOMMENDED', download: 'https://cdimage.kali.org/kali-2025.4/kali-linux-2025.4-installer-amd64.iso' },
            'VMBox': { label: 'VMBox', note: 'Legacy (2023.4)', download: 'https://cdimage.kali.org/kali-2025.4/kali-linux-2025.4-virtualbox-amd64.7z' },
            'Edition': { label: 'Edition', note: 'Legacy (2023.4)', download: 'https://cdimage.kali.org/kali-2025.4/kali-linux-2025.4-virtualbox-amd64.7z' },
            'arm64': { label: 'Apple Silicon', note: 'M1/M2/M3', download: 'https://cdimage.kali.org/kali-2025.4/kali-linux-2025.4-installer-arm64.iso' }
        }
    },
    macos: {
        id: 'macos',
        name: 'macOS Sequoia',
        version: '15.2',
        accent: '#5e0e0eff',
        description: 'The worlds most advanced desktop operating system, optimized for artistic expression and seamless creative workflows.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.88-1.58 3.5-4.03 3.5-6.94 0-4.14-3.36-7.5-7.5-7.5-1.12 0-2.17.25-3.11.7.45-1.57 1.83-2.7 3.5-2.7 2.07 0 3.75 1.68 3.75 3.75 0 1.12-.51 2.12-1.3 2.78 1.12-.13 2.25-.13 3.37 0 .1-.56.13-1.13.13-1.71C14.34 5.36 11.45 2.5 8 2.5 4.55 2.5 1.66 5.36 1.66 8.87c0 2.39 1.32 4.47 3.26 5.56C2.98 15.52 1.66 17.6 1.66 19.99c0 3.51 2.89 6.37 6.34 6.37 1.88 0 3.58-.83 4.74-2.15-1.12.13-2.25.13-3.37 0 .28.48.56.96.84 1.44z"></path></svg>',
        architectures: {
            'full-installer': { label: 'Full-Installer', note: 'Universal', download: 'https://swcdn.apple.com/content/downloads/47/16/089-70987-A_PWKNKEFQ1D/sjlq45liw0g5lor3a6i89vz7paml1xpq6w/InstallAssistant.pkg' },
            
        }
    },
    ubuntu: {
        id: 'ubuntu',
        name: 'Ubuntu Desktop',
        version: '24.04.1 LTS',
        accent: '#e95420',
        description: 'The world\'s most popular open-source OS for developers and enterprise. Stable, secure, and ready for production.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="14.65" y1="14.65" x2="19.07" y2="19.07"></line><line x1="4.93" y1="4.93" x2="9.35" y2="9.35"></line></svg>',
        architectures: {
            'Intel': { label: 'Intel', note: 'Standard', download: 'https://ubuntu.com/download/desktop/thank-you?version=24.04.3&architecture=amd64&lts=true' },
            'arm64': { label: 'ARM64', note: 'Live Server', download: 'https://ubuntu.com/download/desktop/thank-you?version=24.04.3&architecture=amd64&lts=trueo' }
        }
    },
    windows: {
        id: 'windows',
        name: 'Windows 10',
        version: '23H2',
        accent: '#00a4ef',
        description: 'The next generation of computing. Optimized for performance, gaming, and a modern digital experience.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8"></rect><rect x="13" y="3" width="8" height="8"></rect><rect x="3" y="13" width="8" height="8"></rect><rect x="13" y="13" width="8" height="8"></rect></svg>',
        architectures: {
            'win10x64': { label: '64-bit (x64)', note: 'Assistant', download: 'https://software.download.prss.microsoft.com/dbazure/Win10_22H2_English_x64v1.iso?t=ac75adc6-b34d-4590-aef0-268b7121e8f0&P1=1769912680&P2=601&P3=2&P4=qHSckP9OPgNz7IC4WhzeeAVv1eY%2flmmjCFAbm083g1aR0vJlIgbXtSMwGHuYPjeMFWHB8w4Lr3Ol12qwpDS7SFo%2b8EQ0hv7DT2wy9MknttdBIvnTFXZIS2k69E6hMWgrvH8B5rFAjDdcolTcKliLbveNHRWhuxFIVfUr%2fzq%2fsA4PfbJNmC8akhdNfQB6%2bADZhTEd8FQ1YEmT0OiFUbh0ml3iqgRHW5rb%2bs1gtj%2f2224H%2b5UAZLTQK70zHHlhPBWX4Kq0Z0STmgja2lU1PaolDABpmc%2bNcwRvDVfa5pEh7BlM2ci4iJQSeBNiFwaTXTOEJV2VDGwR17hvxkRlKVBuEA%3d%3d' },
            'win10x32': { label: '32-bit (x32)', note: 'Installation Page', download: 'https://software.download.prss.microsoft.com/dbazure/Win10_22H2_English_x32v1.iso?t=ac75adc6-b34d-4590-aef0-268b7121e8f0&P1=1769912680&P2=601&P3=2&P4=DdyiTXvlGQI0LqD1mQDkDMdSXsSyy8VcAb1glyxZ2pH5DeSNb9g2I6H8RZctjRqWoCfoD52%2bnAOw8fCrmtkjpudqni9TGx6r8XT15apiIGXVnCXyzV2mAW9L2S1jUMWpZWHMlcAH2SKP6EBxk6Xt8yP2710XClySmQEDLH0YNAMuiL5u%2fBGV9jKMZPolyIRWbt1%2fnPVuVC%2fskF0Hy%2fT12vuiFQTWewlc8W%2bD6JT1JnkCwgyi6sMGN3pAXttl3kTarL3Wuao8MWzrgblbWtXuBMqfX9IB2saJdE2%2b4WvTJu6UfsQXl9cieh%2fkZuV58VVSoA%2bMLGKa2MO8WRw5emxhnA%3d%3d' }
        }
    },
    parrot: {
        id: 'parrot',
        name: 'Parrot Security',
        version: '7.0',
        user: 'user',
        password: 'parrot',
        accent: '#20e98c',
        description: 'A complete all-in-one environment for pentesting, privacy, digital forensics, reverse engineering and development.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8l-4 4-4-4"></path><path d="M12 12V4"></path><path d="M20 20H4"></path></svg>',
        architectures: {
            'amd64': { label: '64-bit Security', note: 'FULL', download: 'https://deb.parrot.sh/parrot/iso/7.0/Parrot-security-7.0_amd64.iso' },
            'arm64': { label: 'ARM64', note: 'Installation Page', download: 'https://deb.parrot.sh/parrot/iso/7.0/Parrot-security-7.0_arm64.utm.zip' }
        }
    }
};
