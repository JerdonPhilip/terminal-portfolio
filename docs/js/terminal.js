/**
 * ===========================================================================
 * TERMINAL PORTFOLIO - PROFESSIONAL EDITION v3.0.0
 * ===========================================================================
 * 
 * @description An interactive terminal-style portfolio website that simulates
 *              a command-line interface for displaying professional information.
 *              Built with vanilla JavaScript for maximum compatibility and
 *              zero dependencies.
 * 
 * @author      Jerdon Philip Macaraeg
 * @license     MIT - Free to use, modify, and distribute
 * @version     3.0.0
 * @since       2023
 * @updated     2026-05-16
 * 
 * ===========================================================================
 * CUSTOMIZATION GUIDE
 * ===========================================================================
 * 
 * QUICK START - For New Users:
 * 1. Replace all personal info in the USER_DATA section below
 * 2. Update the project list with your own projects
 * 3. Change color scheme in CSS variables (style section)
 * 4. Add/remove commands as needed
 * 
 * FILE STRUCTURE NEEDED:
 * ├── index.html (terminal interface)
 * ├── styles.css (terminal styling)
 * ├── terminal.js (this file)
 * └── assets/
 *     ├── files/
 *     │   └── YOUR-RESUME.pdf
 *     └── images/ (if needed)
 * 
 * ===========================================================================
 */

// ===========================================================================
// DOM ELEMENT REFERENCES
// ===========================================================================
// TIP: If you change element IDs in HTML, update them here
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const cursor = document.getElementById('cursor');
const sendBtn = document.getElementById('sendBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const quickCommandsPanel = document.getElementById('quickCommandsPanel');
const quickCommandsClose = document.getElementById('quickCommandsClose');
const overlay = document.getElementById('overlay');
const swipeHint = document.getElementById('swipeHint');

// State management
let commandHistory = [];
let historyIndex = -1;
let isMobile = window.innerWidth <= 768;

// ===========================================================================
// USER DATA - CUSTOMIZE THIS SECTION
// ===========================================================================
// TIP: Replace all values with your own information
// TIP: Keep the HTML span tags for styling, just change the text content

const USER_DATA = {
    // Personal Information
    name: 'Jerdon Philip Macaraeg',
    title: 'Full-Stack Developer | QA Specialist | Entrepreneur',
    location: '#81 Tambac, Malasiqui, Pangasinan',
    phone: '09168745394',
    email: 'jerdonphilipmacaraeg@gmail.com',
    shortBio: 'Experienced Full-Stack Engineer, QA professional...',

    // Professional Status
    available: true, // Set to false if not looking for work
    responseTime: '24 hours',

    // Social Links
    social: {
        facebook: 'https://www.facebook.com/Philip.Je.Mac',
        instagram: 'https://www.instagram.com/simple_jerdzz',
        github: 'https://github.com/JerdonPhilip',
        linkedin: '' // Add your LinkedIn if you have one
    },

    // Resume
    resumeFile: 'assets/files/YOUR-RESUME.pdf', // CHANGE THIS to your resume path

    // Terminal Info
    terminalVersion: '3.0.0',
    buildDate: '2026.05.16',
    kernel: 'JavaScript ES2024',
    shell: 'bash 5.2',

    // Project List - Add, remove, or modify projects here
    projects: [
        {
            id: 1,
            name: 'Cross-Company Inventory Tracking System',
            type: 'Desktop Application',
            technologies: ['Electron', 'Tailwind CSS', 'PostgreSQL'],
            testing: 'Playwright E2E Automation',
            role: 'Lead Software Engineer (Sole Developer)',
            status: 'development', // Options: 'development', 'deployed', 'active'
            description: 'Unified logistics system connecting Sakura Steel Development Corp and GT Sakura Trading Surplus Mall.',
            link: null, // Set to URL string if public, null if private
            isProprietary: true
        },
        {
            id: 2,
            name: 'Wedding Landing Page',
            type: 'Single-Page Application',
            technologies: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
            status: 'deployed',
            description: 'Wedding Event Hub — Garden-themed digital invitation and guest management platform with interactive photo gallery and maps.',
            link: 'https://lumen-lens-ph.github.io/christopher-jhohanna-wedding/',
            isProprietary: false
        },
        {
            id: 3,
            name: 'Task Management App',
            type: 'Productivity Application',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Vue', 'Tailwind CSS'],
            status: 'development',
            description: 'Organize tasks, set deadlines, and track progress with an intuitive interface.',
            link: 'docs/assets/html/maintenance/maintenance.html',
            isProprietary: false
        },
        {
            id: 4,
            name: 'Lumen Lens Studios',
            type: 'Photography Business',
            role: 'Founder & Lead Photographer',
            status: 'active',
            description: 'Professional photography services for weddings, portraits, and events.',
            link: null,
            isProprietary: false
        }
    ],

    // Skills - Organized by category
    skills: {
        frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'AngularJS', 'Tailwind CSS', 'Bootstrap', 'Responsive & Mobile-First Design'],
        backend: ['Node.js', 'Express.js', 'PHP', 'Python', 'Java', 'Electron (Desktop Apps)', 'RESTful API Development', 'npm', 'Sequelize ORM'],
        databases: ['MySQL', 'PostgreSQL', 'SQLite'],
        qa: ['Manual Testing', 'Playwright (E2E Automation)', 'Postman (API Testing)', 'Browser DevTools Auditing', 'Google Lighthouse Audits'],
        design: ['Wireframing & Mockups', 'User Flows & Process Flows', 'Adobe Photoshop', 'Adobe Lightroom', 'Photography'],
        devops: ['Git & GitHub', 'CI/CD Pipelines', 'Azure DevOps'],
        operations: ['Project Management', 'Business Operations', 'Professional Communication'],
        languages: ['English', 'Tagalog']
    },

    // Work Experience
    experience: [
        {
            title: 'Lead Software Engineer (Freelance)',
            company: 'Sakura Steel Development Corp & GT Sakura Trading Surplus Mall',
            period: 'January 2026 - Present',
            highlights: [
                'Directing full-stack development of a cross-company Inventory Tracking System...',
                'Architecting a scalable desktop application utilizing Electron and modern JavaScript.',
                'Designing front-end UX with Tailwind CSS for a clean, utility-driven, consistent interface.',
                'Full project lifecycle ownership as the sole developer.',
                'Integrating Playwright for automated E2E testing and QA.'
            ]
        },
        {
            title: 'Business Manager / Operations Lead',
            company: "Donato's Space Rental",
            period: 'February 2026 - Present',
            highlights: [
                'Oversee daily operations and tenant relations for a local rental property business.',
                'Manage end-to-end leasing workflows, contracts, payment tracking, and maintenance scheduling.'
            ]
        },
        // Add more experience entries following the same structure
    ],

    // Education
    education: {
        degree: 'Bachelor of Science in Information Technology',
        school: 'University of Pangasinan - PHINMA',
        location: 'Dagupan City, Pangasinan',
        relevantCourses: [
            'Software Engineering',
            'Database Management Systems',
            'Web Development',
            'Quality Assurance & Testing',
            'Project Management'
        ]
    },

    // Awards and Achievements
    awards: [
        {
            title: 'Rookie of the Year',
            organization: 'Almont Business Connect Inc.',
            description: 'Awarded for outstanding performance and exceptional contributions during the first year of employment.'
        },
        {
            title: 'Key Achievements',
            items: [
                'Led physician orders validation and complete printing workflow',
                'Developed patient calendar sticky note feature from scratch',
                'Managed CI/CD pipelines ensuring smooth Azure cloud deployments',
                'Founded and built Lumen Lens Studios photography brand'
            ]
        }
    ]
};

// ===========================================================================
// STYLE HELPERS - Customize terminal appearance
// ===========================================================================
// TIP: Change these to modify the look of different output types

const STYLES = {
    colors: {
        success: '#00ff00',  // Green - for successful messages
        error: '#ff4444',    // Red - for error messages
        warning: '#ffaa00',  // Orange - for warnings
        info: '#00aaff',     // Blue - for informational text
        dim: '#666666',      // Gray - for less important text
        highlight: '#ffffff' // White - for important text
    },

    // Status indicators
    statusIcons: {
        active: '●',
        development: '●',
        deployed: '●'
    }
};

// ===========================================================================
// COMMAND OUTPUT FUNCTIONS
// ===========================================================================
// TIP: Each function generates HTML output for a specific command
// TIP: Modify these to change what displays when commands are run

/**
 * Displays the welcome banner when terminal first loads
 * TIP: Customize ASCII art or replace with simple welcome message
 */
function showBanner() {
    const banner = `
<span class="ascii-banner">
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       ██╗███████╗██████╗ ██████╗  ██████╗ ███╗   ██╗     ║
║       ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║     ║
║       ██║█████╗  ██████╔╝██║  ██║██║   ██║██╔██╗ ██║     ║
║ ██    ██║██╔══╝  ██╔══██╗██║  ██║██║   ██║██║╚██╗██║     ║
║ ╚═██████║███████╗██║  ██║██████╔╝╚██████╔╝██║ ╚████║     ║
║   ╚═════╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝     ║
║      ██████╗ ██╗  ██╗██╗██╗     ██╗██████╗               ║
║      ██╔══██╗██║  ██║██║██║     ██║██╔══██╗              ║
║      ██████╔╝███████║██║██║     ██║██████╔╝              ║
║      ██╔═══╝ ██╔══██║██║██║     ██║██╔═══╝               ║
║      ██║     ██║  ██║██║███████╗██║██║                   ║
║      ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝╚═╝                   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
</span>
<span class="output-dim">╔══════════════════════════════════════════════════════════╗</span>
<span class="output-dim">║  Portfolio Terminal v${USER_DATA.terminalVersion} | ${USER_DATA.title}  ║</span>
<span class="output-dim">╚══════════════════════════════════════════════════════════╝</span>
<span class="output-success">●</span> <span class="output-highlight">Welcome to ${USER_DATA.name}'s Interactive Portfolio</span>
<span class="output-success">●</span> Type <span class="output-info">help</span> to explore available commands
<span class="output-success">●</span> Use <span class="output-info">↑↓</span> arrows for command history
<span class="output-success">●</span> Press <span class="output-info">Tab</span> for autocomplete`;

    addOutput(banner, 'success');
}

/**
 * Displays help menu with all available commands
 * TIP: Add new commands here when you add them to the commands registry
 */
function showHelp() {
    const helpText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📋 Available Commands</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-warning">📁 Profile & Information</span>
  <span class="output-success">about</span>       • Professional summary and background
  <span class="output-success">whoami</span>      • Display current user identity
  <span class="output-success">contact</span>     • Contact details and location
  <span class="output-success">social</span>      • Social media and network links

<span class="output-warning">🛠️ Skills & Experience</span>
  <span class="output-success">skills</span>      • Technical skills and proficiencies
  <span class="output-success">experience</span>  • Professional work history
  <span class="output-success">education</span>   • Academic background
  <span class="output-success">awards</span>      • Honors and recognitions

<span class="output-warning">📂 Projects</span>
  <span class="output-success">projects</span>    • Featured portfolio projects
  <span class="output-success">ls</span>          • List all projects (file view)

<span class="output-warning">🔧 System</span>
  <span class="output-success">neofetch</span>    • System information display
  <span class="output-success">date</span>        • Current date and time
  <span class="output-success">version</span>     • Terminal version information
  <span class="output-success">clear</span>       • Clear terminal screen
  <span class="output-success">banner</span>      • Display welcome banner

<span class="output-warning">📄 Actions</span>
  <span class="output-success">resume</span>      • Download resume (PDF)
  <span class="output-success">showresume</span>  • View resume in terminal

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">💡 Pro Tips:</span>
<span class="output-dim">• Use TAB for autocomplete | ↑↓ for command history</span>
<span class="output-dim">• Try aliases: h=help, a=about, p=projects, c=contact</span>
<span class="output-dim">• On mobile? Tap the menu button for quick commands</span>`;

    addOutput(helpText, '');
}

/**
 * Displays about/portfolio summary
 * TIP: Update the long description text with your own summary
 */
function showAbout() {
    // Use template literal with USER_DATA for dynamic content
    const aboutText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">👨‍💻 Professional Profile</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Identity</span>
<span class="output-dim">├─</span> <span class="output-success">Name:</span>     ${USER_DATA.name}
<span class="output-dim">├─</span> <span class="output-success">Role:</span>     ${USER_DATA.title}
<span class="output-dim">├─</span> <span class="output-success">Location:</span> ${USER_DATA.location}
<span class="output-dim">├─</span> <span class="output-success">Phone:</span>    ${USER_DATA.phone}
<span class="output-dim">└─</span> <span class="output-success">Email:</span>    <span class="link" onclick="window.location.href='mailto:${USER_DATA.email}'">${USER_DATA.email}</span>

<span class="output-highlight">Professional Summary</span>
${USER_DATA.shortBio}

<span class="output-highlight">Current Status</span>
<span class="output-${USER_DATA.available ? 'success' : 'warning'}">● ${USER_DATA.available ? 'Active' : 'Unavailable'}</span> — ${USER_DATA.available ? 'Open to freelance & full-time opportunities' : 'Not currently looking'}

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">For detailed skills, type: skills</span>
<span class="output-dim">For work history, type: experience</span>`;

    addOutput(aboutText, '');
}

/**
 * Displays skills matrix from USER_DATA
 * TIP: This function automatically reads from USER_DATA.skills
 */
function showSkills() {
    let skillsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🛠️ Technical Skills Matrix</span>
<span class="divider">──────────────────────────────────────────────────────────</span>
`;

    // Dynamically generate skills from USER_DATA
    const categoryIcons = {
        frontend: '🎨',
        backend: '⚙️',
        databases: '🗄️',
        qa: '🧪',
        design: '🎯',
        devops: '🔧',
        operations: '📊',
        languages: '🌐'
    };

    const categoryNames = {
        frontend: 'Frontend Development',
        backend: 'Backend & Desktop',
        databases: 'Database Systems',
        qa: 'Quality Assurance',
        design: 'UI/UX & Creative',
        devops: 'DevOps & Tools',
        operations: 'Operations',
        languages: 'Languages'
    };

    // Iterate through skills categories
    for (const [category, skills] of Object.entries(USER_DATA.skills)) {
        skillsText += `
<span class="output-warning">${categoryIcons[category] || '•'} ${categoryNames[category] || category}</span>`;

        skills.forEach((skill, index) => {
            const isLast = index === skills.length - 1;
            skillsText += `
<span class="output-dim">${isLast ? '└─' : '├─'}</span> ${skill}`;
        });

        skillsText += '\n';
    }

    skillsText += `
<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(skillsText, '');
}

/**
 * Displays work experience
 * TIP: Modify USER_DATA.experience array to add/remove jobs
 */
function showExperience() {
    let experienceText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">💼 Professional Experience</span>
<span class="divider">──────────────────────────────────────────────────────────</span>
`;

    USER_DATA.experience.forEach(job => {
        experienceText += `
<span class="output-warning">${job.title}</span>
<span class="output-dim">${job.company}</span>
<span class="output-dim">${job.period}</span>`;

        job.highlights.forEach(highlight => {
            experienceText += `
<span class="output-info">• ${highlight}</span>`;
        });

        experienceText += '\n';
    });

    experienceText += `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">Type projects to see featured work | Type awards for recognitions</span>`;

    addOutput(experienceText, '');
}

/**
 * Displays education information
 */
function showEducation() {
    const educationText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🎓 Education</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">${USER_DATA.education.degree}</span>
<span class="output-success">${USER_DATA.education.school}</span>
<span class="output-dim">${USER_DATA.education.location}</span>

<span class="output-highlight">Relevant Coursework</span>
${USER_DATA.education.relevantCourses.map((course, index) =>
        `<span class="output-dim">${index === USER_DATA.education.relevantCourses.length - 1 ? '└─' : '├─'}</span> ${course}`
    ).join('\n')}

<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(educationText, '');
}

/**
 * Displays awards and achievements
 */
function showAwards() {
    let awardsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🏆 Honors & Recognitions</span>
<span class="divider">──────────────────────────────────────────────────────────</span>
`;

    USER_DATA.awards.forEach(award => {
        awardsText += `
<span class="output-highlight">${award.title}</span>
<span class="output-success">${award.organization || ''}</span>`;

        if (award.description) {
            awardsText += `
<span class="output-dim">${award.description}</span>`;
        }

        if (award.items) {
            award.items.forEach(item => {
                awardsText += `
<span class="output-dim">├─</span> ${item}`;
            });
        }

        awardsText += '\n';
    });

    awardsText += `
<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(awardsText, '');
}

/**
 * Displays projects from USER_DATA.projects array
 * TIP: Add/remove projects by modifying the projects array in USER_DATA
 */
function showProjects() {
    let projectsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📁 Featured Projects</span>
<span class="divider">──────────────────────────────────────────────────────────</span>
`;

    USER_DATA.projects.forEach(project => {
        const statusClass = project.status === 'deployed' || project.status === 'active' ? 'success' : 'warning';

        projectsText += `
<span class="output-warning">[${project.id}] ${project.name}</span>
<span class="output-dim">├─ Type:</span>        ${project.type}
${project.role ? `<span class="output-dim">├─ Role:</span>        ${project.role}\n` : ''}
<span class="output-dim">├─ Technologies:</span> ${project.technologies ? project.technologies.join(', ') : 'N/A'}
${project.testing ? `<span class="output-dim">├─ Testing:</span>      ${project.testing}\n` : ''}
<span class="output-dim">├─ Status:</span>       <span class="output-${statusClass}">● ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
<span class="output-dim">├─ Description:</span>  ${project.description}`;

        // Handle project links
        if (project.link) {
            if (project.isProprietary) {
                projectsText += `
<span class="output-dim">└─ Link:</span>         <span class="link" onclick="addOutput('🔒 Proprietary software. Contact for details.', 'warning')">Request Access →</span>`;
            } else {
                projectsText += `
<span class="output-dim">└─ URL:</span>         <span class="link" onclick="window.open('${project.link}')">Launch Project →</span>`;
            }
        }

        projectsText += '\n';
    });

    projectsText += `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">💡 Click on project links to explore further</span>`;

    addOutput(projectsText, '');
}

/**
 * Displays contact information
 */
function showContact() {
    const contactText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📧 Contact Information</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Primary Contact</span>
<span class="output-dim">├─</span> <span class="output-success">📱 Phone:</span>    ${USER_DATA.phone}
<span class="output-dim">├─</span> <span class="output-success">📧 Email:</span>    <span class="link" onclick="window.location.href='mailto:${USER_DATA.email}'">${USER_DATA.email}</span>
<span class="output-dim">└─</span> <span class="output-success">📍 Address:</span>  ${USER_DATA.location}

<span class="output-highlight">Professional Status</span>
<span class="output-dim">└─</span> <span class="output-${USER_DATA.available ? 'success' : 'warning'}">Available:</span>  ${USER_DATA.available ? 'Freelance & Full-time opportunities' : 'Not currently available'}

<span class="output-highlight">Quick Actions</span>
<span class="output-dim">├─</span> Type <span class="output-info">social</span> for social media links
<span class="output-dim">├─</span> Type <span class="output-info">resume</span> to download my CV
<span class="output-dim">└─</span> Type <span class="output-info">experience</span> for work history

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">I typically respond within ${USER_DATA.responseTime}</span>`;

    addOutput(contactText, '');
}

/**
 * Displays social media links
 */
function showSocial() {
    const { social } = USER_DATA;
    let socialText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🌐 Social Networks</span>
<span class="divider">──────────────────────────────────────────────────────────</span>
`;

    const links = [
        { label: 'Facebook', url: social.facebook, icon: '📘' },
        { label: 'Instagram', url: social.instagram, icon: '📷' },
        { label: 'GitHub', url: social.github, icon: '💻' },
        { label: 'LinkedIn', url: social.linkedin, icon: '💼' }
    ];

    links.forEach((link, index) => {
        if (link.url) {
            const isLast = index === links.length - 1 || !links.slice(index + 1).some(l => l.url);
            socialText += `
<span class="output-dim">${isLast ? '└─' : '├─'}</span> <span class="output-success">${link.icon} ${link.label}:</span>  <span class="link" onclick="window.open('${link.url}')">${link.url.replace('https://', '')}</span>`;
        }
    });

    socialText += `

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">Click any link to open in new tab</span>`;

    addOutput(socialText, '');
}

/**
 * Displays system info (like neofetch command)
 */
function showNeofetch() {
    const neofetchText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<div class="neofetch-container">
<div class="neofetch-ascii">
    ████████████      ████████████
  ████████████████  ████████████████
██████████████████████████████████████
██████████████████████████████████████
██████████████████████████████████████
██████████              ██████████
  ██████    ██  ██      ██████
    ████    ██  ██    ████
      ██    ██████    ██
</div>
<div class="neofetch-info">
<span class="label">user@portfolio</span>
<span class="output-dim">──────────────────────────</span>
<span class="label">Name:</span>     <span class="value">${USER_DATA.name}</span>
<span class="label">Role:</span>     <span class="value">${USER_DATA.title}</span>
<span class="label">OS:</span>       <span class="value">Web Developer OS v${USER_DATA.terminalVersion}</span>
<span class="label">Kernel:</span>   <span class="value">${USER_DATA.kernel}</span>
<span class="label">Shell:</span>    <span class="value">${USER_DATA.shell}</span>
<span class="label">Uptime:</span>   <span class="value">Since 2023</span>
<span class="label">Packages:</span>  <span class="value">${USER_DATA.projects.length}+ projects completed</span>
<span class="label">CPU:</span>      <span class="value">Brain v1.0 @ 100% creative</span>
<span class="label">Testing:</span>  <span class="value">Playwright + Manual QA</span>
<span class="label">Theme:</span>    <span class="value">Matrix Green Professional</span>
</div>
</div>
<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(neofetchText, '');
}

/**
 * Handles resume download
 * TIP: Change the file path in USER_DATA.resumeFile
 */
function downloadResume() {
    addOutput('', '');
    addOutput('📥 Preparing resume download...', 'info');
    addOutput('├─ File: RESUME.pdf', 'dim');
    addOutput('├─ Format: PDF Document', 'dim');
    addOutput(`├─ Candidate: ${USER_DATA.name}`, 'dim');
    addOutput(`├─ Role: ${USER_DATA.title}`, 'dim');

    setTimeout(() => {
        window.open(USER_DATA.resumeFile, '_blank');
        addOutput('└─ ✅ Download initiated successfully!', 'success');
    }, 800);
}

/**
 * Displays resume content in terminal
 * TIP: Update this with your actual resume content
 */
function showResume() {
    // This is a simplified view - you can customize the layout
    const resumeText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📄 RESUME - ${USER_DATA.name.toUpperCase()}</span>
<span class="divider">══════════════════════════════════════════════════════════</span>

<span class="output-highlight">CONTACT</span>
${USER_DATA.location} | ${USER_DATA.phone} | ${USER_DATA.email}

<span class="output-highlight">SUMMARY</span>
${USER_DATA.shortBio}

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">Type resume to download PDF version | Type contact to get in touch</span>`;

    addOutput(resumeText, '');
}

/**
 * Displays current user identity
 */
function showWhoami() {
    addOutput(USER_DATA.name.toLowerCase().replace(/\s+/g, ''), 'success');
    addOutput(USER_DATA.title, 'dim');
    addOutput(`Location: ${USER_DATA.location}`, 'dim');
}

/**
 * Displays current date and time
 */
function showDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    addOutput(now.toLocaleDateString('en-US', options), 'info');
}

/**
 * Displays terminal version info
 */
function showVersion() {
    addOutput('╔════════════════════════════════════╗', 'success');
    addOutput(`║  Portfolio Terminal v${USER_DATA.terminalVersion}        ║`, 'success');
    addOutput(`║  Build: ${USER_DATA.buildDate}                ║`, 'success');
    addOutput(`║  Kernel: ${USER_DATA.kernel}        ║`, 'success');
    addOutput(`║  Author: ${USER_DATA.name}   ║`, 'success');
    addOutput('╚════════════════════════════════════╝', 'success');
    addOutput(USER_DATA.title, 'dim');
}

/**
 * Lists projects in file tree format
 */
function listProjects() {
    let listText = `
<span class="output-success">~/projects/</span>`;

    USER_DATA.projects.forEach((project, index) => {
        const isLast = index === USER_DATA.projects.length - 1;
        const projectSlug = project.name.toLowerCase().replace(/\s+/g, '-');

        listText += `
<span class="output-dim">${isLast ? '└──' : '├──'}</span> <span class="output-info">${projectSlug}/</span>`;
    });

    const deployed = USER_DATA.projects.filter(p => p.status === 'deployed').length;
    const dev = USER_DATA.projects.filter(p => p.status === 'development').length;
    const active = USER_DATA.projects.filter(p => p.status === 'active').length;

    listText += `

<span class="output-dim">${USER_DATA.projects.length} projects | ${dev} in development | ${deployed} deployed | ${active} active</span>`;

    addOutput(listText, '');
}

/**
 * Clears the terminal screen and shows banner again
 */
function clearTerminal() {
    terminalOutput.innerHTML = '';
    showBanner();
}

/**
 * Easter egg - sudo command response
 */
function sudoCommand() {
    addOutput('╔════════════════════════════════════╗', 'warning');
    addOutput('║  🔒 Access Denied                 ║', 'warning');
    addOutput('║  Root access not required.        ║', 'warning');
    addOutput('║  All features are available to    ║', 'warning');
    addOutput('║  you without elevated privileges. ║', 'warning');
    addOutput('╚════════════════════════════════════╝', 'warning');
}

/**
 * Easter egg - exit command response (doesn't actually exit)
 */
function exitCommand() {
    addOutput('Logging out...', 'warning');
    setTimeout(() => {
        addOutput('', '');
        addOutput('╔════════════════════════════════════╗', 'info');
        addOutput('║  Session not terminated. 😊       ║', 'info');
        addOutput('║  Feel free to continue exploring  ║', 'info');
        addOutput(`║  ${USER_DATA.name}'s              ║`, 'info');
        addOutput('║  professional portfolio.          ║', 'info');
        addOutput('╚════════════════════════════════════╝', 'info');
        addOutput('', '');
        addOutput('Type <span class="output-info">help</span> to see available commands', 'dim');
    }, 1000);
}

// ===========================================================================
// COMMANDS REGISTRY
// ===========================================================================
// TIP: Add new commands here by creating a function above and registering it

/**
 * Main commands mapping - Maps command names to their functions
 * TIP: To add a custom command:
 * 1. Create a function like showCustom()
 * 2. Add 'custom': showCustom to this object
 * 3. Add help text in showHelp()
 */
const commands = {
    'help': showHelp,
    'about': showAbout,
    'skills': showSkills,
    'projects': showProjects,
    'contact': showContact,
    'resume': downloadResume,
    'showresume': showResume,
    'neofetch': showNeofetch,
    'clear': clearTerminal,
    'whoami': showWhoami,
    'social': showSocial,
    'banner': showBanner,
    'ls': listProjects,
    'date': showDate,
    'experience': showExperience,
    'education': showEducation,
    'awards': showAwards,
    'version': showVersion,
    'sudo': sudoCommand,
    'exit': exitCommand
};

/**
 * Command aliases - Shortcuts for commands
 * TIP: Add your own shortcuts here
 */
const aliases = {
    'h': 'help',
    'a': 'about',
    's': 'skills',
    'p': 'projects',
    'c': 'contact',
    'r': 'resume',
    'sr': 'showresume',
    'neo': 'neofetch',
    'clr': 'clear',
    'w': 'whoami',
    'bye': 'exit',
    'exp': 'experience',
    'edu': 'education',
    'aw': 'awards',
    'v': 'version'
};

// ===========================================================================
// CORE TERMINAL FUNCTIONS
// ===========================================================================
// TIP: These handle the actual terminal behavior - modify with caution

/**
 * Adds formatted output to the terminal
 * @param {string} text - HTML string to display
 * @param {string} className - CSS class for styling (success, error, warning, info, dim)
 */
function addOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = `output-line output-${className}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/**
 * Adds command echo (shows what user typed)
 * @param {string} command - The command user entered
 */
function addCommandEcho(command) {
    const echo = `
<span class="command-history">┌─[<span class="prompt-user">user</span>@<span class="prompt-host">portfolio</span>]─[<span class="prompt-path">~</span>]</span>
<span class="command-history">└──╼ $ ${escapeHtml(command)}</span>`;
    addOutput(echo, 'dim');
}

/**
 * Sanitizes HTML to prevent XSS
 * @param {string} text - Raw text to sanitize
 * @returns {string} - Sanitized HTML string
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================================================================
// INITIALIZATION
// ===========================================================================

/**
 * Initializes the terminal application
 */
function init() {
    showBanner();
    detectMobile();
    setupEventListeners();

    // Hide swipe hint after 5 seconds
    if (swipeHint) {
        setTimeout(() => {
            swipeHint.style.opacity = '0';
            swipeHint.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                swipeHint.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

/**
 * Detects if device is mobile and shows/hides mobile menu button
 */
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = isMobile ? 'flex' : 'none';
    }
}

/**
 * Sets up all event listeners for the terminal
 */
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    if (quickCommandsClose) {
        quickCommandsClose.addEventListener('click', closeMobileMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Quick command buttons (mobile panel)
    document.querySelectorAll('.quick-command-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const command = this.dataset.command;
            executeCommand(command);
            closeMobileMenu();
        });
    });

    // Send button
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const input = terminalInput.value;
            if (input.trim()) {
                executeCommand(input);
                terminalInput.value = '';
            }
        });
    }

    // Terminal input keyboard handler
    if (terminalInput) {
        terminalInput.addEventListener('keydown', handleInputKeydown);
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        detectMobile();
        if (terminalInput) terminalInput.focus();
    });

    // Click on terminal output focuses input
    if (terminalOutput) {
        terminalOutput.addEventListener('click', (e) => {
            if (!e.target.closest('.link')) {
                terminalInput.focus();
            }
        });
    }

    // Swipe gestures for mobile
    setupSwipeGestures();

    // Window control buttons
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            addOutput('Window minimize is disabled in web version', 'dim');
        });
    }
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => { });
            } else {
                document.exitFullscreen();
            }
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            addOutput('To close, navigate away from this page', 'dim');
            addOutput('Thank you for visiting! 😊', 'info');
        });
    }
}

// ===========================================================================
// INPUT HANDLING
// ===========================================================================

/**
 * Handles keyboard input in the terminal
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleInputKeydown(e) {
    if (e.key === 'Enter') {
        const input = this.value;
        executeCommand(input);
        this.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = this.value.toLowerCase();

        if (!input) return;

        const allCommands = [...Object.keys(commands), ...Object.keys(aliases)];
        const matches = allCommands.filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.value = matches[0];
            this.dataset.lastTabInput = '';
        } else if (matches.length > 1) {
            if (!this.dataset.lastTabInput || this.dataset.lastTabInput !== input) {
                addOutput('', '');
                addOutput('Did you mean:', 'info');
                matches.forEach(match => {
                    addOutput(`  • ${match}`, 'dim');
                });
                addOutput('', '');
                this.dataset.lastTabInput = input;
            } else {
                const currentMatch = this.value;
                const currentIndex = matches.indexOf(currentMatch);
                const nextIndex = (currentIndex + 1) % matches.length;
                this.value = matches[nextIndex];
            }
        }
    } else {
        this.dataset.lastTabInput = '';
    }
}

// ===========================================================================
// MOBILE SUPPORT
// ===========================================================================

/**
 * Sets up swipe gestures for mobile devices
 */
function setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < -50 && quickCommandsPanel && !quickCommandsPanel.classList.contains('active')) {
                openMobileMenu();
            } else if (swipeDistance > 50 && quickCommandsPanel && quickCommandsPanel.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }
}

/**
 * Toggles mobile menu open/closed
 */
function toggleMobileMenu() {
    if (quickCommandsPanel && quickCommandsPanel.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

/**
 * Opens mobile quick commands panel
 */
function openMobileMenu() {
    if (quickCommandsPanel) quickCommandsPanel.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes mobile quick commands panel
 */
function closeMobileMenu() {
    if (quickCommandsPanel) quickCommandsPanel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===========================================================================
// COMMAND EXECUTION ENGINE
// ===========================================================================

/**
 * Executes a terminal command
 * @param {string} input - Raw command input from user
 */
function executeCommand(input) {
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    // Echo the command back to terminal
    addCommandEcho(input);

    // Check for aliases first, then direct commands
    const commandName = aliases[trimmedInput] || trimmedInput;

    if (commands[commandName]) {
        commands[commandName]();
    } else {
        addOutput(`✗ Command not found: <span class="output-error">${escapeHtml(trimmedInput)}</span>`, 'error');
        addOutput('Type <span class="output-info">help</span> to see available commands', 'dim');
    }

    // Update command history
    commandHistory.push(input);
    historyIndex = commandHistory.length;

    // Add spacing and focus input
    addOutput('', '');
    if (terminalInput) terminalInput.focus();
}

// ===========================================================================
// STARTUP
// ===========================================================================

// Start the terminal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        if (terminalInput) terminalInput.focus();
    });
} else {
    init();
    if (terminalInput) terminalInput.focus();
}

// ===========================================================================
// EXPORT FOR MODULE USE (Optional)
// ===========================================================================
// If you want to use this as a module, uncomment below:
// export { commands, USER_DATA, executeCommand, addOutput, clearTerminal };