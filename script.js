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

// ============================================
// NAVIGATION - Gestion des sections
// ============================================

function showSection(sectionId) {
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
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
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

  // Dashboard - Click sur les cartes
  document.querySelectorAll('.card[data-section]').forEach(card => {
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

  // Afficher la section "présentation" par défaut
  showSection('presentation');
}

// Lancement au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
