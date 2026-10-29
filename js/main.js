/**
 * PATCO GESIGN — Logique JavaScript interactive
 * Support multipage, filtres portfolio, calculateur de devis, modales et WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gestion de la navigation mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // 2. Détection de la page active pour le menu
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.classList.add('text-white');
      link.classList.add('font-bold');
    }
  });

  // 3. Filtres du Portfolio (sur index.html et portfolio.html)
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterBtns.forEach((b) => {
          b.classList.remove('bg-[#2563EB]', 'text-white', 'border-[#2563EB]');
          b.classList.add('bg-white/5', 'text-neutral-400', 'border-white/10');
        });

        // Activer le bouton cliqué
        btn.classList.remove('bg-white/5', 'text-neutral-400', 'border-white/10');
        btn.classList.add('bg-[#2563EB]', 'text-white', 'border-[#2563EB]');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 4. Modale de détail de projet
  const projectModal = document.getElementById('project-modal');
  const projectModalClose = document.getElementById('project-modal-close');
  const openProjectBtns = document.querySelectorAll('.open-project-btn');

  // Données des projets pour la modale
  const projectsData = {
    'proj-kanya': {
      title: 'Kanya Cacao & Café',
      category: 'Branding & Identité',
      client: 'Kanya Terroirs Ivoire',
      year: '2026',
      image: 'assets/images/project-branding.jpg',
      tools: ['Adobe Illustrator', 'Photoshop', 'Figma', '3D Packaging'],
      problem: 'Le client manquait d’une identité forte capable de rivaliser avec les grandes marques internationales tout en valorisant le patrimoine culturel ivoirien.',
      solution: 'Conception d’un monogramme royal stylisé, choix d’une palette bleu nuit profond et or subtil, et création de gabarits conformes aux normes internationales.',
      result: '+240% de commandes corporate en pré-lancement et référencement dans 6 boutiques gastronomiques à Abidjan.'
    },
    'proj-afripay': {
      title: 'AfriPay Web App & Dashboard',
      category: 'Développement Web',
      client: 'AfriPay Technologies',
      year: '2026',
      image: 'assets/images/project-web.jpg',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel API'],
      problem: 'Les commerçants avaient du mal à suivre leurs flux multi-opérateurs à cause d’interfaces lourdes et inadaptées aux connexions mobiles instables.',
      solution: 'Création d’un dashboard ultra-rapide en dark mode #0B1F3A avec graphiques interactifs en bleu cobalt #2563EB et synchronisation temps réel.',
      result: 'Temps de chargement inférieur à 0.8s, adoption par plus de 120 marchands ouest-africains au 1er trimestre.'
    },
    'proj-nzassa': {
      title: 'Festival Afro-Futur N’Zassa',
      category: 'Design graphique & Affiches',
      client: 'Collectif N’Zassa Pulse',
      year: '2025',
      image: 'assets/images/project-poster.jpg',
      tools: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
      problem: 'Nécessité de marquer les esprits avec une esthétique résolument futuriste, vivante et fière de ses racines ivoiriennes.',
      solution: 'Composition typographique audacieuse, textures vibrantes combinant bleu cobalt #2563EB, bleu nuit #0B1F3A et symboles contemporains.',
      result: 'Campagne virale sur les réseaux sociaux et affichage urbain 4x3 couvert par les médias culturels majeurs.'
    },
    'proj-ayaglow': {
      title: 'Aya Glow Skincare — Campagne Réseaux',
      category: 'Réseaux sociaux',
      client: 'Aya Glow Laboratoires',
      year: '2025',
      image: 'assets/images/project-branding.jpg',
      tools: ['Figma', 'Photoshop', 'Canva Pro'],
      problem: 'Visuels hétérogènes, manque de constance dans la charte graphique et faible conversion des followers en acheteurs.',
      solution: 'Mise en place d’une grille éditoriale esthétique, gabarits modulables et visuels avant/après valorisants.',
      result: '+180% de taux d’engagement et triplement des commandes passées via WhatsApp Business.'
    },
    'proj-ivoirebtp': {
      title: 'Ivoire BTP & Architecture — Site Vitrine',
      category: 'Développement Web',
      client: 'Cabinet Ivoire BTP',
      year: '2025',
      image: 'assets/images/creative-workspace.jpg',
      tools: ['React', 'Tailwind CSS', 'PHP', 'SEO Local'],
      problem: 'Leur ancien site internet était obsolète, non adapté aux téléphones portables et invisible sur Google Côte d’Ivoire.',
      solution: 'Refonte totale avec design minimaliste en bleu cobalt et fond nuit, optimisation SEO pour les requêtes « architecte Abidjan » et vitesse instantanée.',
      result: 'Première page Google en 6 semaines et 14 demandes de devis qualifiées reçues le premier mois.'
    }
  };

  openProjectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-id');
      const data = projectsData[projId];

      if (data && projectModal) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-category').textContent = data.category;
        document.getElementById('modal-client').textContent = data.client;
        document.getElementById('modal-year').textContent = data.year;
        document.getElementById('modal-image').src = data.image;
        document.getElementById('modal-problem').textContent = data.problem;
        document.getElementById('modal-solution').textContent = data.solution;
        document.getElementById('modal-result').textContent = data.result;

        const toolsContainer = document.getElementById('modal-tools');
        if (toolsContainer) {
          toolsContainer.innerHTML = '';
          data.tools.forEach((tool) => {
            const span = document.createElement('span');
            span.className = 'px-2.5 py-1 text-xs rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#38BDF8]';
            span.textContent = tool;
            toolsContainer.appendChild(span);
          });
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (projectModalClose && projectModal) {
    projectModalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 5. Gestion du formulaire de Devis interactif (devis.html)
  const quoteForm = document.getElementById('quote-form');
  const quoteSuccess = document.getElementById('quote-success');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('q-name')?.value || '';
      const email = document.getElementById('q-email')?.value || '';
      const phone = document.getElementById('q-phone')?.value || '';
      const projectType = document.getElementById('q-type')?.value || '';
      const budget = document.getElementById('q-budget')?.value || '';
      const delay = document.getElementById('q-delay')?.value || '';
      const desc = document.getElementById('q-desc')?.value || '';

      const waText = encodeURIComponent(
        `*Demande de Devis — Patco Gesign*\n\n` +
        `👤 *Nom :* ${name}\n` +
        `📧 *Email :* ${email}\n` +
        `📱 *Téléphone :* ${phone}\n` +
        `🎯 *Projet :* ${projectType}\n` +
        `💰 *Budget :* ${budget}\n` +
        `⏱️ *Délai :* ${delay}\n\n` +
        `📝 *Description :*\n${desc}`
      );

      const waBtn = document.getElementById('quote-whatsapp-link');
      if (waBtn) {
        waBtn.href = `https://wa.me/2250759142041?text=${waText}`;
      }

      const clientNameSpan = document.getElementById('success-client-name');
      if (clientNameSpan) clientNameSpan.textContent = name;

      const projectTypeSpan = document.getElementById('success-project-type');
      if (projectTypeSpan) projectTypeSpan.textContent = projectType;

      quoteForm.classList.add('hidden');
      if (quoteSuccess) quoteSuccess.classList.remove('hidden');
    });
  }

  // 6. Gestion du formulaire de contact simple (contact.html)
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name')?.value || '';
      const phone = document.getElementById('c-phone')?.value || '';
      const message = document.getElementById('c-message')?.value || '';

      const waText = encodeURIComponent(
        `*Nouveau message de contact — Patco Gesign*\n\n` +
        `👤 *Nom :* ${name}\n` +
        `📱 *Téléphone :* ${phone}\n\n` +
        `💬 *Message :*\n${message}`
      );

      const waBtn = document.getElementById('contact-whatsapp-link');
      if (waBtn) {
        waBtn.href = `https://wa.me/2250759142041?text=${waText}`;
      }

      contactForm.classList.add('hidden');
      if (contactSuccess) contactSuccess.classList.remove('hidden');
    });
  }

  // 7. Modale Code Source (disponible partout)
  const sourceModal = document.getElementById('source-modal');
  const openSourceBtns = document.querySelectorAll('.open-source-modal-btn');
  const closeSourceBtn = document.getElementById('source-modal-close');

  if (openSourceBtns && sourceModal) {
    openSourceBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        sourceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  if (closeSourceBtn && sourceModal) {
    closeSourceBtn.addEventListener('click', () => {
      sourceModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    sourceModal.addEventListener('click', (e) => {
      if (e.target === sourceModal) {
        sourceModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
