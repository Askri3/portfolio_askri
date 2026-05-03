// ============================================
// PORTFOLIO - ELIES ASKRI
// Script principal avec optimisations
// ============================================

// === Configuration ===
const CONFIG = {
  nbCommandLines: 12,
  carouselIcons: [
    { src: 'icones/cisco.png', alt: 'Cisco', label: 'Cisco' },
    { src: 'icones/Microsoft.png', alt: 'Microsoft', label: 'Microsoft' },
    { src: 'icones/PS.png', alt: 'PowerShell', label: 'PowerShell' },
    { src: 'icones/VB.png', alt: 'VirtualBox', label: 'VirtualBox' },
    { src: 'icones/VMWARE.png', alt: 'VMware', label: 'VMware' },
    { src: 'icones/veeam.png', alt: 'Veeam', label: 'Veeam' },
    { src: 'icones/putty_icon.png', alt: 'PuTTY', label: 'PuTTY' },
    { src: 'icones/azure_icon.png', alt: 'Azure', label: 'Azure' },
    { src: 'icones/logmein.png', alt: 'LogMeIn', label: 'LogMeIn' }
  ],
  commands: [
    'whoami',
    'ipconfig /all',
    'Get-NetIPAddress',
    'nmap -sS 192.168.1.0/24',
    'Invoke-WebRequest -Uri http://example.com',
    'Get-Process | Where-Object {$_.CPU -gt 100}',
    'msfconsole -q -x "use exploit/windows/smb/ms17_010_eternalblue"',
    'Test-Connection -ComputerName 8.8.8.8',
    'Get-LocalUser',
    'netstat -ano',
    'Get-Service | Where-Object {$_.Status -eq "Running"}',
    'powershell -nop -w hidden -c "IEX (New-Object Net.WebClient).DownloadString(...)"',
    'arp -a',
    'Get-EventLog -LogName Security -Newest 5',
    'Get-Content C:\\Windows\\System32\\drivers\\etc\\hosts',
    'Get-WmiObject Win32_ComputerSystem',
    'Get-ChildItem -Recurse | Select-String "password"',
    'Get-Help Invoke-Command',
    'Get-HotFix',
    'Get-Command *net*'
  ]
};

// === Variables globales ===
let cmdLines = [];
let resizeTimeout;
let currentLanguage = 'fr';

const LANGUAGE_STORAGE_KEY = 'portfolioLanguage';

const PORTFOLIO_TRANSLATIONS = {
  fr: {
    pageTitle: 'Portfolio BTS SIO SISR - Eliès ASKRI',
    metaDescription: 'Portfolio de Eliès ASKRI, étudiant en BTS SIO SISR spécialisé en administration systèmes et réseaux, cybersécurité et infrastructures IT.',
    toggleLabel: 'English',
    toggleFlag: '🇬🇧',
    toggleAria: 'Switch portfolio to English',
    headerTitle: 'Portfolio - Eliès ASKRI',
    headerSubtitle: 'Étudiant en BTS SIO, option SISR',
    nav: {
      presentation: 'Présentation',
      bts: 'BTS SIO SISR',
      dashboard: 'Dashboard',
      skills: 'Compétences',
      projects: 'Projets',
      companies: 'Mes entreprises',
      situations: 'Situations E6',
      watch: 'Veille',
      summary: 'Tableau de synthèse',
      cv: 'CV',
      contact: 'Contact'
    },
    presentation: {
      title: 'Présentation',
      heroTitle: 'Eliès ASKRI',
      heroSubtitle: 'Étudiant en BTS SIO, option SISR • Administration systèmes et réseaux • Support IT • Cybersécurité',
      cards: {
        profileTitle: 'Mon profil',
        profileItems: [
          'Étudiant orienté systèmes, réseaux et infrastructures IT',
          'Appétence forte pour l\'administration Windows Server et Active Directory',
          'Expérience concrète en support utilisateurs, déploiement et maintenance'
        ],
        showcaseTitle: 'Ce que montre ce portfolio',
        showcaseItems: [
          'Mon niveau technique en systèmes et réseaux',
          'Mes projets académiques, professionnels et personnels',
          'Mes situations E6, mes documents BTS et mes expériences terrain'
        ]
      },
      ctaTitle: 'Accès rapide',
      ctaText: 'Accédez directement aux éléments les plus utiles pour la lecture du portfolio.',
      ctaButtons: ['Voir mon CV', 'Voir mes projets', 'Me contacter']
    },
    bts: {
      title: 'BTS SIO - Option SISR',
      intro: 'Le <strong>BTS SIO, option SISR</strong> prépare aux métiers liés à l\'infrastructure, aux systèmes, aux réseaux, à la continuité de service et à la sécurisation des environnements informatiques en entreprise.',
      cardTitles: ['Ce que couvre l\'option SISR', 'Compétences développées', 'Mise en pratique', 'Débouchés visés'],
      cardItems: [
        [
          'Déploiement et administration de serveurs',
          'Configuration d\'infrastructures réseaux',
          'Virtualisation et services d\'annuaire',
          'Sauvegarde, supervision et sécurisation'
        ],
        [
          'Compétences réseaux',
          'Compétences systèmes',
          'Support technique',
          'Documentation technique'
        ],
        [
          'TP d\'infrastructure et projets encadrés',
          'Stage et alternance en environnement réel',
          'Situations professionnelles E6',
          'Veille technologique et tableau de synthèse'
        ],
        [
          'Administrateur systèmes et réseaux junior',
          'Technicien support ou technicien systèmes',
          'Technicien infrastructure / proximité',
          'Évolution vers la cybersécurité et le cloud'
        ]
      ]
    },
    dashboard: {
      title: 'Dashboard',
      cardTitles: ['Compétences', 'Projets', 'Mes entreprises', 'Situations E6', 'Veille technologique'],
      cardItems: [
        ['Pôle réseaux et pôle systèmes', 'AD, GPO, virtualisation et sauvegarde', 'Certifications et outils techniques'],
        ['Projet académique d\'infrastructure', 'Expériences concrètes en entreprise', 'Homelab personnel en progression'],
        ['Deux environnements professionnels distincts', 'Support, déploiement et administration', 'Active Directory et accompagnement utilisateurs'],
        ['Réalisation 1 : routage inter-VLAN', 'Réalisation 2 : Active Directory', 'Schémas et fiches E6 disponibles'],
        ['Cybersécurité et incidents majeurs', 'Fuites de données et data breach', 'Flux RSS spécialisés et veille continue']
      ],
      action: 'Ouvrir la section'
    },
    skills: {
      title: 'Compétences',
      cardTitles: ['Compétences Réseaux', 'Compétences Systèmes'],
      networkItems: [
        'VLAN et segmentation logique du réseau',
        'Routage, routage inter-VLAN et configuration des routeurs',
        'Configuration Cisco, switching et administration des switches',
        'Adressage IP et DHCP',
        'Diagnostic réseau, pare-feu et utilisation de PuTTY',
        'Haute disponibilité réseau',
        'Conception d’un plan d’infrastructure réseau',
        'Gestion des autorisations d’accès aux ressources réseaux et aux applications'
      ],
      systemsItems: [
        'Windows Server, AD DS',
        'Installation et configuration d’un serveur Windows 2022',
        'Installation et configuration de clients Windows et Linux',
        'GPO, gestion des utilisateurs et déploiement de postes',
        'Gestion de Microsoft Office 365',
        'Création, modification et désactivation de comptes utilisateurs dans Active Directory',
        'Virtualisation : VMware, Hyper-V, VirtualBox et Proxmox',
        'Environnements Azure et support en production',
        'Backup Veeam, restauration des données',
        'Maintenance et assistance technique aux clients à distance',
        'Diagnostic et résolution des pannes matérielles',
        'Analyse des difficultés techniques remontées par les utilisateurs',
        'Installation, maintenance et déploiement à distance des logiciels',
        'Gestion et mise à jour du stock informatique'
      ],
      certificationsTitle: 'Certifications',
      certifications: [
        {
          title: 'CISCO Introduction to Cybersecurity',
          subtitle: 'CISCO — Obtenu le 12/2024'
        },
        {
          title: 'Certification ANSSI (en cours)',
          subtitle: 'ANSSI — Sécurité des systèmes d\'information'
        }
      ],
      toolsTitle: 'Outils et environnements manipulés'
    },
    projects: {
      title: 'Projets',
      intro: '<strong>Mes projets</strong> traduisent ma capacité à concevoir, documenter, déployer et maintenir des solutions techniques dans un cadre académique, professionnel et personnel.',
      cardTitles: [
        'Parc informatique pharmaceutique',
        'Support technique VVIP',
        'IT Support',
        'Homelab',
        'Approfondir l\'aspect technique'
      ],
      cardItems: [
        [
          '<strong>Contexte :</strong> projet de cours',
          '<strong>Objectif :</strong> concevoir un parc informatique complet',
          '<strong>Apport :</strong> architecture réseau, documentation et organisation du SI',
          '<strong>Outil principal :</strong> Cisco'
        ],
        [
          '<strong>Contexte :</strong> stage en entreprise',
          '<strong>Objectif :</strong> assurer le support de proximité pour des utilisateurs exigeants',
          '<strong>Apport :</strong> réactivité, accompagnement et continuité de service',
          '<strong>Outils :</strong> Windows Server, AD, FRESH, AnyDesk'
        ],
        [
          '<strong>Contexte :</strong> alternance',
          '<strong>Objectif :</strong> assurer le support utilisateurs et le bon fonctionnement du SI',
          '<strong>Apport :</strong> suivi d\'incidents, administration courante et interventions à distance',
          '<strong>Outils :</strong> ServiceNow, LogMeIn, Azure, BYBLOS'
        ],
        [
          '<strong>Statut :</strong> en construction',
          '<strong>Objectif :</strong> progresser hors cadre scolaire',
          '<strong>Axes :</strong> virtualisation, réseaux et serveurs'
        ],
        [
          'Deux réalisations directement exploitables pour le jury',
          'Schémas et fiches E6 disponibles'
        ]
      ],
      buttons: [
        'Télécharger le projet',
        'Voir l\'expérience liée',
        'Voir l\'expérience liée',
        'Consulter les situations E6'
      ]
    },
    cv: {
      title: 'CV',
      intro: 'Le CV reste consultable directement dans le portfolio et téléchargeable pour une lecture plus détaillée.',
      buttons: ['Ouvrir le PDF', 'Télécharger le CV']
    },
    summary: {
      title: 'Tableau de synthèse',
      intro: 'Le tableau de synthèse regroupe les compétences et activités couvertes pendant le BTS. Il reste accessible en aperçu et en téléchargement.',
      buttons: ['Ouvrir le PDF', 'Télécharger le tableau']
    },
    watch: {
      title: 'Veille Technologique',
      intro: 'En tant que professionnel IT, il est essentiel de rester informé des dernières tendances technologiques. Pour cela, j\'utilise un <strong>gestionnaire d\'information</strong> qui me permet de centraliser et organiser mes sources de veille.',
      toolTitle: 'Mon outil de veille : Inoreader',
      toolCaption: 'Interface de gestion des flux RSS',
      toolDescription: '<strong>Inoreader</strong> est un gestionnaire d\'information puissant qui permet d\'agréger des flux RSS provenant de multiples sources. Grâce à cet outil, je peux suivre efficacement l\'actualité en cybersécurité, les nouvelles technologies et les meilleures pratiques en infrastructure IT.',
      themesTitle: 'Mes thèmes de veille',
      themeTitles: ['Cybersécurité', 'Infrastructure IT', 'Intelligence Artificielle'],
      themeTexts: [
        'Vulnérabilités, nouvelles menaces, bonnes pratiques de sécurité, outils de protection et actualités des incidents de sécurité majeurs.',
        'Administration systèmes et réseaux, virtualisation, cloud computing, solutions de sauvegarde et gestion d\'Active Directory.',
        'IA appliquée à la cybersécurité, détection d\'anomalies, automatisation des tâches IT et outils comme Darktrace.'
      ],
      extraTitle: 'Autre sujet de veille',
      extraText: '<strong>Fuites de bases de données en France</strong> — BreachForums, saisies FBI/DOJ, et comment protéger vos données personnelles.',
      extraButton: 'Découvrir cette veille',
      rssTitle: 'Flux RSS en temps réel',
      rssText: '<strong>Actualités en direct</strong> — Cybersécurité, Infrastructure IT et Intelligence Artificielle. Recevez les dernières news sans actualiser.',
      rssButton: 'Accéder aux flux RSS'
    },
    situations: {
      title: 'Situations Professionnelles - Épreuve E6',
      intro: '<strong>Ces deux situations professionnelles</strong> structurent la partie E6 du portfolio et mettent en évidence des compétences directement attendues par le jury BTS SIO SISR.',
      cardTitles: ['Réalisation 1 - Routage', 'Réalisation 2 - Active Directory'],
      figureCaption: 'Schéma cliquable pour affichage détaillé.',
      cardItems: [
        [
          '<strong>Contexte :</strong> configuration et mise en place du routage réseau',
          '<strong>Compétences :</strong> administration réseau, VLAN et DHCP',
          '<strong>Apport :</strong> lecture d\'architecture, segmentation et communication entre sous-réseaux'
        ],
        [
          '<strong>Contexte :</strong> déploiement et gestion d\'Active Directory',
          '<strong>Compétences :</strong> administration systèmes, GPO et gestion des utilisateurs',
          '<strong>Apport :</strong> structuration de l\'annuaire, gestion des droits et logique de domaine'
        ]
      ],
      button: 'Télécharger la fiche E6'
    },
    contact: {
      title: 'Contact',
      cardTitles: ['Email', 'LinkedIn', 'Téléphone'],
      texts: [
        'Pour un échange professionnel ou une demande d\'information.',
        'Mon profil et mon parcours en un coup d\'oeil.',
        'Disponible pour échanger rapidement.'
      ],
      buttons: ['Envoyer un email', 'Voir LinkedIn', 'Appeler']
    },
    companies: {
      title: 'Mes entreprises',
      items: [
        [
          '<strong>Contexte :</strong> cabinet d\'avocats d\'affaires à Paris et Bruxelles',
          '<strong>Périmètre IT :</strong> transformation numérique, parc et cybersécurité',
          '<strong>Missions :</strong> masterisation, déploiement, support N1/N2, serveurs, AD',
          '<strong>Technologies :</strong> Windows Server, Active Directory, FreshPortal, Veeam, PowerShell'
        ],
        [
          '<strong>Contexte :</strong> groupe international multi-sites',
          '<strong>Périmètre IT :</strong> support de proximité et outils métiers',
          '<strong>Missions :</strong> support N1/N2/N3, logs, cybersécurité, AD',
          '<strong>Technologies :</strong> ServiceNow, LogMeIn, Azure, BYBLOS, Salesforce, Microsoft Entra ID, Active Directory'
        ]
      ]
    },
    footer: {
      line1: 'Eliès ASKRI - Étudiant en BTS SIO, option SISR à l\'IPSSI',
      line2: 'Email : <a href="mailto:askri.elies@gmail.com">askri.elies@gmail.com</a> | LinkedIn : <a href="https://www.linkedin.com/in/elies-askri" target="_blank" rel="noopener">Eliès ASKRI</a> | Téléphone : 06 01 49 53 05',
      line3: '© 2025 Eliès ASKRI - Tous droits réservés'
    }
  },
  en: {
    pageTitle: 'Eliès ASKRI | BTS SIO SISR Portfolio',
    metaDescription: 'Portfolio of Eliès ASKRI, a BTS SIO SISR student specializing in systems and network administration, cybersecurity, and IT infrastructure.',
    toggleLabel: 'Français',
    toggleFlag: '🇫🇷',
    toggleAria: 'Switch the portfolio back to French',
    headerTitle: 'Portfolio - Eliès ASKRI',
    headerSubtitle: 'BTS SIO student - Network and Systems Infrastructure Solutions specialization',
    nav: {
      presentation: 'Overview',
      bts: 'BTS SIO SISR',
      dashboard: 'Dashboard',
      skills: 'Skills',
      projects: 'Projects',
      companies: 'Professional Experience',
      situations: 'E6 Case Studies',
      watch: 'Technology Watch',
      summary: 'Skills Matrix',
      cv: 'CV',
      contact: 'Contact'
    },
    presentation: {
      title: 'Overview',
      heroTitle: 'Eliès ASKRI',
      heroSubtitle: 'BTS SIO student specializing in Network and Systems Infrastructure Solutions, with a strong focus on systems administration, networking, IT support, and cybersecurity',
      cards: {
        profileTitle: 'Profile',
        profileItems: [
          'Student focused on systems, networks, and IT infrastructure',
          'Strong interest in Windows Server and Active Directory administration',
          'Hands-on experience in user support, workstation deployment, and operational maintenance'
        ],
        showcaseTitle: 'What This Portfolio Covers',
        showcaseItems: [
          'My technical skill set in systems and networking',
          'My academic, professional, and personal projects',
          'My E6 scenarios, BTS documentation, and real-world experience'
        ]
      },
      ctaTitle: 'Quick Access',
      ctaText: 'Jump straight to the sections that matter most.',
      ctaButtons: ['View My CV', 'View My Projects', 'Contact Me']
    },
    bts: {
      title: 'BTS SIO - Network and Systems Infrastructure Solutions specialization',
      intro: 'The <strong>BTS SIO - Network and Systems Infrastructure Solutions specialization</strong> prepares students for roles focused on infrastructure, systems, networking, service continuity, and the security of enterprise IT environments.',
      cardTitles: ['What the SISR Track Covers', 'Core Skills Developed', 'Hands-on Learning', 'Typical Career Paths'],
      cardItems: [
        [
          'Server deployment and administration',
          'Network infrastructure configuration',
          'Virtualization and directory services',
          'Backup, monitoring, and security'
        ],
        [
          'Network skills',
          'Systems skills',
          'Technical support',
          'Technical documentation'
        ],
        [
          'Infrastructure labs and supervised technical projects',
          'Internships and apprenticeships in real business environments',
          'Professional E6 scenarios',
          'Technology watch and skills matrix'
        ],
        [
          'Junior systems and network administrator',
          'IT support or systems support technician',
          'Infrastructure or field support technician',
          'A strong stepping stone toward cybersecurity and cloud roles'
        ]
      ]
    },
    dashboard: {
      title: 'Dashboard',
      cardTitles: ['Skills', 'Projects', 'Professional Experience', 'E6 Case Studies', 'Technology Watch'],
      cardItems: [
        ['Networking and systems expertise', 'AD, GPO, virtualization, and backup', 'Certifications and hands-on tools'],
        ['Academic infrastructure work', 'Business-focused technical experience', 'An evolving homelab environment'],
        ['Two very different professional settings', 'Support, deployment, and administration', 'Active Directory and end-user support'],
        ['Scenario 1: inter-VLAN routing', 'Scenario 2: Active Directory', 'Diagrams and E6 reports available'],
        ['Cybersecurity and major incidents', 'Data breach monitoring', 'Specialized RSS feeds and continuous watch']
      ],
      action: 'Open section'
    },
    skills: {
      title: 'Skills',
      cardTitles: ['Network Skills', 'Systems Skills'],
      networkItems: [
          'VLANs and logical network segmentation',
          'Routing, inter-VLAN routing, and router configuration',
          'Cisco configuration, switching, and switch administration',
          'IP addressing and DHCP',
          'Network troubleshooting, firewall configuration, and PuTTY usage',
          'Network high availability',
          'Designing a network infrastructure plan',
          'Managing access permissions for network resources and applications'
      ],
      systemsItems: [
          'Windows Server and AD DS',
          'Installing and configuring Windows Server 2022',
          'Installing and configuring Windows and Linux client machines',
          'GPOs, user management, and workstation deployment',
          'Managing Microsoft 365',
          'Creating, updating, and disabling user accounts in Active Directory',
          'Virtualization with VMware, Hyper-V, VirtualBox, and Proxmox',
          'Azure environments and production support',
          'Veeam backup and data recovery',
          'Remote maintenance and technical support for clients',
          'Diagnosing and resolving hardware issues',
          'Analyzing technical issues reported by users',
          'Remote software installation, maintenance, and deployment',
          'IT inventory management and stock updates'
      ],
      certificationsTitle: 'Certifications',
      certifications: [
        {
          title: 'CISCO Introduction to Cybersecurity',
          subtitle: 'CISCO — earned in December 2024'
        },
        {
          title: 'ANSSI Certification (in progress)',
          subtitle: 'ANSSI — Information systems security'
        }
      ],
      toolsTitle: 'Tools and Environments Used'
    },
    projects: {
      title: 'Projects',
      intro: '<strong>My projects</strong> show how I approach technical design, documentation, deployment, and day-to-day operations across academic, professional, and personal settings.',
      cardTitles: [
        'Pharmaceutical IT Infrastructure',
        'VVIP Technical Support',
        'IT Support',
        'Homelab',
        'Technical Deep Dive'
      ],
      cardItems: [
        [
          '<strong>Context:</strong> academic project',
          '<strong>Goal:</strong> design a complete IT environment for a pharmaceutical company',
          '<strong>What it demonstrates:</strong> network design, technical documentation, and infrastructure planning',
          '<strong>Main tool:</strong> Cisco'
        ],
        [
          '<strong>Context:</strong> company internship',
          '<strong>Goal:</strong> deliver white-glove proximity support for high-priority users',
          '<strong>What it demonstrates:</strong> responsiveness, user support, and service continuity',
          '<strong>Tools:</strong> Windows Server, AD, FRESH, AnyDesk'
        ],
        [
          '<strong>Context:</strong> apprenticeship',
          '<strong>Goal:</strong> support end users and keep the IT environment running smoothly',
          '<strong>What it demonstrates:</strong> incident handling, day-to-day administration, and remote support',
          '<strong>Tools:</strong> ServiceNow, LogMeIn, Azure, BYBLOS'
        ],
        [
          '<strong>Status:</strong> in progress',
          '<strong>Goal:</strong> keep building skills beyond the classroom',
          '<strong>Focus:</strong> virtualization, networking, and server administration'
        ],
        [
          'Two case studies ready to support the BTS assessment',
          'Technical diagrams and E6 reports available'
        ]
      ],
      buttons: [
        'Download the Project',
        'View Related Experience',
        'View Related Experience',
        'Explore the E6 Case Studies'
      ]
    },
    cv: {
      title: 'CV',
      intro: 'My CV can be viewed directly in the portfolio and downloaded for a closer look.',
      buttons: ['Open PDF', 'Download CV']
    },
    summary: {
      title: 'Skills Matrix',
      intro: 'This summary table brings together the skills and activities covered during the programme. It remains available both for preview and download.',
      buttons: ['Open PDF', 'Download Skills Matrix']
    },
    watch: {
      title: 'Technology Watch',
      intro: 'Keeping up with technology is essential in IT. I rely on an <strong>information management tool</strong> that helps me centralize, filter, and organize the sources I follow.',
      toolTitle: 'My Watch Tool: Inoreader',
      toolCaption: 'RSS feed management interface',
      toolDescription: '<strong>Inoreader</strong> is a powerful RSS and information management platform. It helps me track cybersecurity news, infrastructure topics, and emerging technologies in a structured way.',
      themesTitle: 'My Watch Topics',
      themeTitles: ['Cybersecurity', 'IT Infrastructure', 'Artificial Intelligence'],
      themeTexts: [
        'Vulnerabilities, emerging threats, security best practices, protective tooling, and major security incidents.',
        'Systems and network administration, virtualization, cloud computing, backup solutions, and Active Directory management.',
        'AI applied to cybersecurity, anomaly detection, IT automation, and platforms such as Darktrace.'
      ],
      extraTitle: 'Another Watch Topic',
      extraText: '<strong>Data breaches in France</strong> — BreachForums, FBI/DOJ takedowns, and practical ways to protect personal data.',
      extraButton: 'Explore This Topic',
      rssTitle: 'Live RSS Feeds',
      rssText: '<strong>Live updates</strong> — cybersecurity, infrastructure, and AI news brought together in one place, without manual refresh.',
      rssButton: 'Open the RSS Feed Hub'
    },
    situations: {
      title: 'Professional Scenarios - E6 Assessment',
      intro: '<strong>These two professional scenarios</strong> form the backbone of the E6 section and showcase skills that are directly relevant to the BTS SIO SISR assessment board.',
      cardTitles: ['Case Study 1 - Routing', 'Case Study 2 - Active Directory'],
      figureCaption: 'Click the diagram to view it in full size.',
      cardItems: [
        [
          '<strong>Context:</strong> routing configuration and network setup',
          '<strong>Skills:</strong> network administration, VLANs, and DHCP',
          '<strong>What it demonstrates:</strong> architecture analysis, segmentation, and communication between subnets'
        ],
        [
          '<strong>Context:</strong> Active Directory deployment and management',
          '<strong>Skills:</strong> systems administration, GPOs, and user management',
          '<strong>What it demonstrates:</strong> directory design, permissions management, and domain logic'
        ]
      ],
      button: 'Download the E6 Report'
    },
    contact: {
      title: 'Contact',
      cardTitles: ['Email', 'LinkedIn', 'Phone'],
      texts: [
          'For professional enquiries or further information.',
          'A concise overview of my background and experience.',
          'Available for a quick call if needed.'
      ],
      buttons: ['Send an Email', 'View LinkedIn', 'Call']
    },
    companies: {
      title: 'Professional Experience',
      items: [
        [
          '<strong>Context:</strong> a business law firm operating in Paris and Brussels',
          '<strong>IT scope:</strong> digital transformation, device fleet management, and cybersecurity',
          '<strong>Responsibilities:</strong> workstation imaging, deployment, L1/L2 support, servers, and Active Directory',
          '<strong>Technologies:</strong> Windows Server, Active Directory, FreshPortal, Veeam, PowerShell'
        ],
        [
          '<strong>Context:</strong> an international multi-site retail group',
          '<strong>IT scope:</strong> proximity support and business-critical tools',
          '<strong>Responsibilities:</strong> L1/L2/L3 support, log handling, cybersecurity, and Active Directory',
          '<strong>Technologies:</strong> ServiceNow, LogMeIn, Azure, BYBLOS, Salesforce, Microsoft Entra ID, Active Directory'
        ]
      ]
    },
    footer: {
      line1: 'Eliès ASKRI - BTS SIO student, Network and Systems Infrastructure Solutions specialization, IPSSI',
      line2: 'Email: <a href="mailto:askri.elies@gmail.com">askri.elies@gmail.com</a> | LinkedIn: <a href="https://www.linkedin.com/in/elies-askri" target="_blank" rel="noopener">Eliès ASKRI</a> | Phone: 06 01 49 53 05',
      line3: '© 2025 Eliès ASKRI - All rights reserved'
    }
  }
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === 'string') {
    element.textContent = value;
  }
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === 'string') {
    element.innerHTML = value;
  }
}

function setTextList(selector, values) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    if (values[index] !== undefined) {
      element.textContent = values[index];
    }
  });
}

function setHTMLList(selector, values) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    if (values[index] !== undefined) {
      element.innerHTML = values[index];
    }
  });
}

function updateLanguageToggle(lang) {
  const toggle = document.getElementById('language-toggle');
  if (!toggle) return;

  const toggleFlag = toggle.querySelector('.language-toggle-flag');
  const toggleText = toggle.querySelector('.language-toggle-text');

  if (toggleFlag) {
    toggleFlag.textContent = PORTFOLIO_TRANSLATIONS[lang].toggleFlag;
  }

  if (toggleText) {
    toggleText.textContent = PORTFOLIO_TRANSLATIONS[lang].toggleLabel;
  }

  toggle.setAttribute('aria-label', PORTFOLIO_TRANSLATIONS[lang].toggleAria);
}

function applyPortfolioLanguage(lang) {
  const translation = PORTFOLIO_TRANSLATIONS[lang] || PORTFOLIO_TRANSLATIONS.fr;
  const metaDescription = document.querySelector('meta[name="description"]');

  currentLanguage = lang;
  document.documentElement.lang = lang === 'en' ? 'en' : 'fr';
  document.title = translation.pageTitle;

  if (metaDescription) {
    metaDescription.setAttribute('content', translation.metaDescription);
  }

  setText('header h1', translation.headerTitle);
  setText('header p', translation.headerSubtitle);

  setText('nav a[data-section="presentation"]', translation.nav.presentation);
  setText('nav a[data-section="bts-sio"]', translation.nav.bts);
  setText('nav a[data-section="dashboard"]', translation.nav.dashboard);
  setText('nav a[data-section="competences"]', translation.nav.skills);
  setText('nav a[data-section="projets"]', translation.nav.projects);
  setText('nav a[data-section="entreprise"]', translation.nav.companies);
  setText('nav a[data-section="situations"]', translation.nav.situations);
  setText('nav a[data-section="veille"]', translation.nav.watch);
  setText('nav a[data-section="tableau"]', translation.nav.summary);
  setText('nav a[data-section="cv"]', translation.nav.cv);
  setText('nav a[data-section="contact"]', translation.nav.contact);

  setText('#presentation h2', translation.presentation.title);
  setText('#presentation .hero-title', translation.presentation.heroTitle);
  setText('#presentation .hero-subtitle', translation.presentation.heroSubtitle);
  setText('#presentation .section-grid article:nth-of-type(1) h3', translation.presentation.cards.profileTitle);
  setHTMLList('#presentation .section-grid article:nth-of-type(1) li', translation.presentation.cards.profileItems);
  setText('#presentation .section-grid article:nth-of-type(2) h3', translation.presentation.cards.showcaseTitle);
  setHTMLList('#presentation .section-grid article:nth-of-type(2) li', translation.presentation.cards.showcaseItems);
  setText('#presentation .cta-section h3', translation.presentation.ctaTitle);
  setText('#presentation .cta-section p', translation.presentation.ctaText);
  setTextList('#presentation .button-soft-row .button-soft', translation.presentation.ctaButtons);

  setText('#bts-sio h2', translation.bts.title);
  setHTML('#bts-sio .alert-banner p', translation.bts.intro);
  setTextList('#bts-sio .section-grid article h3', translation.bts.cardTitles);
  setHTMLList('#bts-sio .section-grid article:nth-of-type(1) li', translation.bts.cardItems[0]);
  setHTMLList('#bts-sio .section-grid article:nth-of-type(2) li', translation.bts.cardItems[1]);
  setHTMLList('#bts-sio .section-grid article:nth-of-type(3) li', translation.bts.cardItems[2]);
  setHTMLList('#bts-sio .section-grid article:nth-of-type(4) li', translation.bts.cardItems[3]);

  setText('#dashboard h2', translation.dashboard.title);
  setTextList('#dashboard .dashboard-shortcut h3', translation.dashboard.cardTitles);
  setHTMLList('#dashboard .dashboard-shortcut:nth-of-type(1) li', translation.dashboard.cardItems[0]);
  setHTMLList('#dashboard .dashboard-shortcut:nth-of-type(2) li', translation.dashboard.cardItems[1]);
  setHTMLList('#dashboard .dashboard-shortcut:nth-of-type(3) li', translation.dashboard.cardItems[2]);
  setHTMLList('#dashboard .dashboard-shortcut:nth-of-type(4) li', translation.dashboard.cardItems[3]);
  setHTMLList('#dashboard .dashboard-shortcut:nth-of-type(5) li', translation.dashboard.cardItems[4]);
  setTextList('#dashboard .dashboard-card-action', [translation.dashboard.action, translation.dashboard.action, translation.dashboard.action, translation.dashboard.action, translation.dashboard.action]);

  setText('#competences h2', translation.skills.title);
  setText('#competences .section-grid article:nth-of-type(1) h3', translation.skills.cardTitles[0]);
  setText('#competences .section-grid article:nth-of-type(2) h3', translation.skills.cardTitles[1]);
  setHTMLList('#competences .section-grid article:nth-of-type(1) li', translation.skills.networkItems);
  setHTMLList('#competences .section-grid article:nth-of-type(2) li', translation.skills.systemsItems);
  setText('#competences > h3', translation.skills.certificationsTitle);
  setText('#competences .certification-item:nth-of-type(1) strong', translation.skills.certifications[0].title);
  setText('#competences .certification-item:nth-of-type(1) span', translation.skills.certifications[0].subtitle);
  setText('#competences .certification-item:nth-of-type(2) strong', translation.skills.certifications[1].title);
  setText('#competences .certification-item:nth-of-type(2) span', translation.skills.certifications[1].subtitle);
  setText('#competences .tools-showcase h4', translation.skills.toolsTitle);

  setText('#projets h2', translation.projects.title);
  setHTML('#projets .alert-banner p', translation.projects.intro);
  setTextList('#projets .projects-layout article h3', translation.projects.cardTitles);
  setHTMLList('#projets .project-card-academic li', translation.projects.cardItems[0]);
  setHTMLList('#projets .project-card-vvip li', translation.projects.cardItems[1]);
  setHTMLList('#projets .project-card-itsupport li', translation.projects.cardItems[2]);
  setHTMLList('#projets .project-card-homelab li', translation.projects.cardItems[3]);
  setHTMLList('#projets .project-cta-card li', translation.projects.cardItems[4]);
  setText('#projets .project-card-academic .project-inline-link', translation.projects.buttons[0]);
  setText('#projets .project-card-vvip .project-inline-link', translation.projects.buttons[1]);
  setText('#projets .project-card-itsupport .project-inline-link', translation.projects.buttons[2]);
  setText('#projets .project-cta-card .project-inline-link', translation.projects.buttons[3]);

  setText('#cv h2', translation.cv.title);
  setText('#cv .alert-banner p', translation.cv.intro);
  setTextList('#cv .document-actions .button-soft', translation.cv.buttons);

  setText('#tableau h2', translation.summary.title);
  setText('#tableau .alert-banner p', translation.summary.intro);
  setTextList('#tableau .document-actions .button-soft', translation.summary.buttons);

  setText('#veille h2', translation.watch.title);
  setHTML('#veille .veille-intro p', translation.watch.intro);
  setText('#veille .veille-tool-section h3', translation.watch.toolTitle);
  setText('#veille .tool-caption', translation.watch.toolCaption);
  setHTML('#veille .veille-tool-description p', translation.watch.toolDescription);
  setText('#veille .veille-topics h3', translation.watch.themesTitle);
  setTextList('#veille .veille-grid h4', translation.watch.themeTitles);
  setHTMLList('#veille .veille-grid > div:nth-of-type(1) p', [translation.watch.themeTexts[0]]);
  setHTMLList('#veille .veille-grid > div:nth-of-type(2) p', [translation.watch.themeTexts[1]]);
  setHTMLList('#veille .veille-grid > div:nth-of-type(3) p', [translation.watch.themeTexts[2]]);
  setText('#veille .autre-sujet-card h4', translation.watch.extraTitle);
  setHTML('#veille .autre-sujet-card p', translation.watch.extraText);
  setText('#veille .autre-sujet-card .watch-link-label', translation.watch.extraButton);
  setText('#veille .flux-rss-card h4', translation.watch.rssTitle);
  setHTML('#veille .flux-rss-card p', translation.watch.rssText);
  setText('#veille .flux-rss-card .watch-link-label', translation.watch.rssButton);

  setText('#situations h2', translation.situations.title);
  setHTML('#situations .alert-banner p', translation.situations.intro);
  setTextList('#situations .situation-card-panel h3', translation.situations.cardTitles);
  setTextList('#situations .situation-card-panel figcaption', [translation.situations.figureCaption, translation.situations.figureCaption]);
  setHTMLList('#situations .situation-card-panel:nth-of-type(1) li', translation.situations.cardItems[0]);
  setHTMLList('#situations .situation-card-panel:nth-of-type(2) li', translation.situations.cardItems[1]);
  setTextList('#situations .project-inline-link', [translation.situations.button, translation.situations.button]);

  setText('#contact h2', translation.contact.title);
  setTextList('#contact .info-card h3', translation.contact.cardTitles);
  setTextList('#contact .contact-mini-text', translation.contact.texts);
  setTextList('#contact .contact-small-link', translation.contact.buttons);

  setText('#entreprise h2', translation.companies.title);
  setHTMLList('#entreprise .company-info-card:nth-of-type(1) li', translation.companies.items[0]);
  setHTMLList('#entreprise .company-info-card:nth-of-type(2) li', translation.companies.items[1]);

  setText('footer p:nth-of-type(1)', translation.footer.line1);
  setHTML('footer p:nth-of-type(2)', translation.footer.line2);
  setText('footer p:nth-of-type(3)', translation.footer.line3);

  updateLanguageToggle(lang);
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

function initLanguageToggle() {
  const toggle = document.getElementById('language-toggle');
  if (!toggle) return;

  currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'fr';
  applyPortfolioLanguage(currentLanguage);

  toggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    applyPortfolioLanguage(currentLanguage);
  });
}

// ============================================
// NAVIGATION - Gestion des sections
// ============================================

function showSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (!targetSection) return;

  // Retirer la classe active de tous les liens de navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });

  // Ajouter la classe active au lien cliqué
  const activeLink = document.querySelector(`nav a[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }

  // Cacher toutes les sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.remove('active');
  });

  // Afficher la section demandée
  targetSection.classList.add('active');

  localStorage.setItem('lastSection', sectionId);

  if (window.location.hash !== `#${sectionId}`) {
    history.replaceState(null, '', `#${sectionId}`);
  }
}

function getInitialSection() {
  const hashSection = window.location.hash.replace('#', '');
  const storedSection = localStorage.getItem('lastSection');

  if (hashSection && document.getElementById(hashSection)) {
    localStorage.removeItem('lastSection');
    return hashSection;
  }

  if (storedSection && document.getElementById(storedSection)) {
    localStorage.removeItem('lastSection');
    return storedSection;
  }

  return 'presentation';
}

// ============================================
// CAROUSEL - Génération dynamique
// ============================================

function generateCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  track.innerHTML = '';

  // Générer les icônes 2 fois pour l'effet de boucle infinie
  for (let iteration = 0; iteration < 2; iteration++) {
    CONFIG.carouselIcons.forEach(icon => {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'tech-icon';

      const img = document.createElement('img');
      img.src = icon.src;
      img.alt = icon.alt;
      img.loading = 'lazy';

      const span = document.createElement('span');
      span.textContent = icon.label;

      iconDiv.appendChild(img);
      iconDiv.appendChild(span);
      track.appendChild(iconDiv);
    });
  }
}

// ============================================
// BACKGROUND ANIMATION - Commandes défilantes
// ============================================

function createCmdLine(text, y) {
  const div = document.createElement('div');
  div.className = 'cmd-line';
  div.textContent = text;
  div.style.top = y + 'px';
  return div;
}

function randomCmd() {
  return CONFIG.commands[Math.floor(Math.random() * CONFIG.commands.length)];
}

function setupCmdBg() {
  const bg = document.getElementById('cmd-bg');
  if (!bg) return;

  bg.innerHTML = '';
  cmdLines = [];
  const h = window.innerHeight;

  for (let i = 0; i < CONFIG.nbCommandLines; i++) {
    const y = Math.round(i * (h / CONFIG.nbCommandLines));
    const cmd = randomCmd();
    const cmdLine = createCmdLine('PS C:> ' + cmd, y);
    bg.appendChild(cmdLine);
    cmdLines.push(cmdLine);
  }
}

function animateCmdBg() {
  const h = window.innerHeight;

  cmdLines.forEach(cmdLine => {
    let y = parseFloat(cmdLine.style.top);
    y += 0.25 + Math.random() * 0.15;

    if (y > h) {
      y = -24;
      cmdLine.textContent = 'PS C:> ' + randomCmd();
    }

    cmdLine.style.top = y + 'px';
  });

  requestAnimationFrame(animateCmdBg);
}

// ============================================
// DEBOUNCING - Optimisation resize
// ============================================

function debounce(func, delay) {
  return function(...args) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// ============================================
// EVENT LISTENERS
// ============================================

function initEventListeners() {
  // Navigation - Click sur les liens
  document.querySelectorAll('nav a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  document.querySelectorAll('[data-section-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section-link');
      showSection(sectionId);
    });
  });

  // Dashboard - Click sur les cartes
  document.querySelectorAll('.card[data-section], .dashboard-shortcut[data-section]').forEach(card => {
    card.addEventListener('click', () => {
      const sectionId = card.getAttribute('data-section');
      showSection(sectionId);
    });

    // Accessibilité - Rendre les cartes navigables au clavier
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sectionId = card.getAttribute('data-section');
        showSection(sectionId);
      }
    });
  });

  // Resize avec debouncing
  window.addEventListener('resize', debounce(setupCmdBg, 250));

  window.addEventListener('hashchange', () => {
    const sectionId = window.location.hash.replace('#', '');
    if (sectionId && document.getElementById(sectionId)) {
      showSection(sectionId);
    }
  });
}

// ============================================
// INITIALISATION
// ============================================

function init() {
  // Générer le carousel
  generateCarousel();

  // Initialiser le background animé
  setupCmdBg();
  requestAnimationFrame(animateCmdBg);

  // Initialiser les event listeners
  initEventListeners();

  // Initialiser la bascule de langue du portfolio principal
  initLanguageToggle();

  // Afficher la dernière section demandée ou celle présente dans l'URL
  showSection(getInitialSection());
}

// Lancement au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
