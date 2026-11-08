/**
 * PATCO DESIGN — Logique JavaScript du site
 * Header/footer partagés, écran de chargement, navigation, filtres portfolio,
 * modales de projet, loupe d'image, statistiques animées,
 * formulaires (devis et contact : envoi par email via Web3Forms).
 *
 * Chargé avec : <script type="module" src="js/main.js"></script>
 */

/* ==========================================================================
   CONFIGURATION
   ========================================================================== */

const WHATSAPP_NUMBER = "2250759142041";

// Envoi des formulaires par email (Web3Forms) — clé publique
const WEB3FORMS_KEY = "6e627269-51af-4792-adb1-c7cb22efdb29";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

// Chemins des composants partagés (relatifs aux pages HTML)
const HEADER_URL = "components/header.html";
const FOOTER_URL = "components/footer.html";

// Écran de chargement
const PRELOADER_MIN_TIME = 5000; // durée minimale d'affichage (ms)
const PRELOADER_MAX_TIME = 6000; // il ne bloque jamais plus longtemps (ms)

// Données des projets affichés dans la modale
const projectsData = {
  "proj-kanya": {
    title: "Kanya Cacao & Café",
    category: "Branding & Identité",
    client: "Kanya Terroirs Ivoire",
    year: "2026",
    image: "assets/images/project-branding.jpg",
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "3D Packaging"],
    problem:
      "Le client manquait d’une identité forte capable de rivaliser avec les grandes marques internationales tout en valorisant le patrimoine culturel ivoirien.",
    solution:
      "Conception d’un monogramme royal stylisé, choix d’une palette bleu nuit profond et or subtil, et création de gabarits conformes aux normes internationales.",
    result:
      "+240% de commandes corporate en pré-lancement et référencement dans 6 boutiques gastronomiques à Abidjan.",
  },
  "proj-afripay": {
    title: "AfriPay Web App & Dashboard",
    category: "Développement Web",
    client: "AfriPay Technologies",
    year: "2026",
    image: "assets/images/project-web.jpg",
    tools: ["React", "TypeScript", "Tailwind CSS", "Laravel API"],
    problem:
      "Les commerçants avaient du mal à suivre leurs flux multi-opérateurs à cause d’interfaces lourdes et inadaptées aux connexions mobiles instables.",
    solution:
      "Création d’un dashboard ultra-rapide en dark mode #0B1F3A avec graphiques interactifs en bleu cobalt #2563EB et synchronisation temps réel.",
    result:
      "Temps de chargement inférieur à 0.8s, adoption par plus de 120 marchands ouest-africains au 1er trimestre.",
  },
  "proj-nzassa": {
    title: "Festival Afro-Futur N’Zassa",
    category: "Design graphique & Affiches",
    client: "Collectif N’Zassa Pulse",
    year: "2025",
    image: "assets/images/project-poster.jpg",
    tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
    problem:
      "Nécessité de marquer les esprits avec une esthétique résolument futuriste, vivante et fière de ses racines ivoiriennes.",
    solution:
      "Composition typographique audacieuse, textures vibrantes combinant bleu cobalt #2563EB, bleu nuit #0B1F3A et symboles contemporains.",
    result:
      "Campagne virale sur les réseaux sociaux et affichage urbain 4x3 couvert par les médias culturels majeurs.",
  },
  "proj-4pro": {
    title: "4_PRO_ELECTRICIAL",
    category: "Design graphique & Affiches",
    client: "4 PRO ELECTRICIAL",
    year: "2025",
    image: "assets/images/Flyer_4_PRO_ELECTRICIAL.jpg",
    tools: ["Adobe Illustrator", "Photoshop"],
    problem:
      "Promouvoir une gamme de matériels de sécurité et d’équipements électriques avec un visuel clair et professionnel pour les réseaux sociaux.",
    solution:
      "Création d’une affiche moderne mettant en valeur les caméras de surveillance, les clôtures électriques et les accessoires.",
    result:
      "Un visuel prêt à diffuser, cohérent avec l’image de l’entreprise.",
  },
  "proj-ayaglow": {
    title: "Aya Glow Skincare — Campagne Réseaux",
    category: "Réseaux sociaux",
    client: "Aya Glow Laboratoires",
    year: "2025",
    image: "assets/images/project-branding.jpg",
    tools: ["Figma", "Photoshop", "Canva Pro"],
    problem:
      "Visuels hétérogènes, manque de constance dans la charte graphique et faible conversion des followers en acheteurs.",
    solution:
      "Mise en place d’une grille éditoriale esthétique, gabarits modulables et visuels avant/après valorisants.",
    result:
      "+180% de taux d’engagement et triplement des commandes passées via WhatsApp Business.",
  },
  "proj-ivoirebtp": {
    title: "Ivoire BTP & Architecture — Site Vitrine",
    category: "Développement Web",
    client: "Cabinet Ivoire BTP",
    year: "2025",
    image: "assets/images/creative-workspace.jpg",
    tools: ["React", "Tailwind CSS", "PHP", "SEO Local"],
    problem:
      "Leur ancien site internet était obsolète, non adapté aux téléphones portables et invisible sur Google Côte d’Ivoire.",
    solution:
      "Refonte totale avec design minimaliste en bleu cobalt et fond nuit, optimisation SEO pour les requêtes « architecte Abidjan » et vitesse instantanée.",
    result:
      "Première page Google en 6 semaines et 14 demandes de devis qualifiées reçues le premier mois.",
  },
};

/* ==========================================================================
   OUTILS
   ========================================================================== */

/** Écrit un texte dans un élément s'il existe. */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/** Lit la valeur d'un champ de formulaire (chaîne vide s'il n'existe pas). */
function getValue(id) {
  return document.getElementById(id)?.value || "";
}

/** Construit un lien WhatsApp avec un message pré-rempli. */
function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Charge un fichier HTML partagé (header, footer) dans un conteneur. */
async function loadComponent(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(`Impossible de charger ${url} :`, error);
  }
}

/* ==========================================================================
   ÉCRAN DE CHARGEMENT
   Indépendant du reste : même si une autre partie du script échoue,
   l'écran de chargement se retire toujours.
   ========================================================================== */

function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const startTime = Date.now();
  let hidden = false;

  const hidePreloader = () => {
    if (hidden) return;
    hidden = true;

    const wait = Math.max(0, PRELOADER_MIN_TIME - (Date.now() - startTime));
    setTimeout(() => {
      preloader.classList.add("preloader--done");
      // Retire l'élément du DOM après le fondu
      setTimeout(() => preloader.remove(), 600);
    }, wait);
  };

  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener("load", hidePreloader);
  }

  // Sécurité : sur connexion lente, on ne bloque jamais plus longtemps
  setTimeout(hidePreloader, PRELOADER_MAX_TIME);
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

/** Menu mobile : ouverture, fermeture, fermeture au clic sur un lien. */
function initMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;

  openBtn?.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  closeBtn?.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

/** Met en surbrillance le lien de la page courante (et uniquement celui-là). */
function initActiveNav() {
  // Nom du fichier courant, sans ".html", pour gérer aussi les URL propres
  const normalize = (path) =>
    (path.split("/").pop() || "index").replace(/\.html$/i, "").toLowerCase() ||
    "index";

  const currentPage = normalize(window.location.pathname);

  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // On ignore les ancres et les liens externes
    const target = normalize(href.split("#")[0].split("?")[0]);
    if (target !== currentPage) return;

    link.classList.add("active", "text-white", "font-bold");

    if (link.classList.contains("mobile-nav-link")) {
      link.classList.remove("text-neutral-300");
      link.classList.add("bg-white/5");
    }
  });
}

/* ==========================================================================
   PORTFOLIO : FILTRES
   ========================================================================== */

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".portfolio-filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-card-item");
  if (filterBtns.length === 0 || portfolioItems.length === 0) return;

  const inactiveClasses = ["bg-white/5", "text-neutral-400", "border-white/10"];
  const activeClasses = ["bg-[#2563EB]", "text-white", "border-[#2563EB]"];

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Tous les boutons repassent en inactif
      filterBtns.forEach((b) => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });

      // Le bouton cliqué devient actif
      btn.classList.remove(...inactiveClasses);
      btn.classList.add(...activeClasses);

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const visible = filterValue === "all" || category === filterValue;

        if (visible) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(10px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   MODALES (projet et code source)
   ========================================================================== */

function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/** Branche l'ouverture/fermeture d'une modale (bouton, clic extérieur, Échap). */
function bindModalClosing(modal, closeBtn) {
  closeBtn?.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal(modal);
    }
  });
}

function initProjectModal() {
  const projectModal = document.getElementById("project-modal");
  if (!projectModal) return;

  const openBtns = document.querySelectorAll(".open-project-btn");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const data = projectsData[btn.getAttribute("data-project-id")];
      if (!data) return;

      setText("modal-title", data.title);
      setText("modal-category", data.category);
      setText("modal-client", data.client);
      setText("modal-year", data.year);
      setText("modal-problem", data.problem);
      setText("modal-solution", data.solution);
      setText("modal-result", data.result);

      const image = document.getElementById("modal-image");
      if (image) {
        image.src = data.image;
        image.alt = data.title;
      }

      const toolsContainer = document.getElementById("modal-tools");
      if (toolsContainer) {
        toolsContainer.innerHTML = "";
        data.tools.forEach((tool) => {
          const span = document.createElement("span");
          span.className =
            "px-2.5 py-1 text-xs rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 text-[#38BDF8]";
          span.textContent = tool;
          toolsContainer.appendChild(span);
        });
      }

      openModal(projectModal);
    });
  });

  bindModalClosing(
    projectModal,
    document.getElementById("project-modal-close"),
  );
}

function initSourceModal() {
  const sourceModal = document.getElementById("source-modal");
  if (!sourceModal) return;

  document.querySelectorAll(".open-source-modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(sourceModal);
    });
  });

  bindModalClosing(sourceModal, document.getElementById("source-modal-close"));
}

/* ==========================================================================
   FORMULAIRES (envoi par email + lien WhatsApp en option)
   ========================================================================== */

/** Envoie les champs à Web3Forms, qui les transmet par email. */
async function sendToEmail(fields) {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      from_name: "Site Patco Design",
      ...fields,
    }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Échec de l'envoi");
  }
}

/** Affiche (ou masque) un message d'erreur sous le bouton d'envoi. */
function showFormError(form, message) {
  let box = form.querySelector(".form-error");
  if (!box) {
    box = document.createElement("p");
    box.className =
      "form-error text-xs text-red-400 text-center bg-red-500/10 border border-red-500/30 rounded-xl p-3";
    form.querySelector('button[type="submit"]').after(box);
  }
  box.textContent = message || "";
  box.classList.toggle("hidden", !message);
}

/** Gère l'envoi : bouton bloqué pendant l'envoi, erreur claire en cas d'échec. */
function bindEmailForm(form, buildPayload, onSuccess) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const label = submitBtn.querySelector("span");
  const originalLabel = label.textContent;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Piège anti-spam : un robot remplit ce champ caché, pas un visiteur
    if (form.querySelector('[name="website"]')?.value) return;

    showFormError(form, "");
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-60", "cursor-not-allowed");
    label.textContent = "Envoi en cours...";

    try {
      await sendToEmail(buildPayload());
      onSuccess();
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      showFormError(
        form,
        "L'envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-moi directement sur WhatsApp.",
      );
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-60", "cursor-not-allowed");
      label.textContent = originalLabel;
    }
  });
}

/** Formulaire de devis (devis.html) */
function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  const success = document.getElementById("quote-success");

  bindEmailForm(
    form,
    () => ({
      subject: `Nouvelle demande de devis — ${getValue("q-type")}`,
      name: getValue("q-name"),
      email: getValue("q-email"),
      telephone: getValue("q-phone"),
      type_de_projet: getValue("q-type"),
      budget: getValue("q-budget"),
      delai: getValue("q-delay"),
      message: getValue("q-desc"),
    }),
    () => {
      const name = getValue("q-name");
      const projectType = getValue("q-type");

      const waMessage =
        `*Demande de Devis — Patco Design*\n\n` +
        `👤 *Nom :* ${name}\n` +
        `📧 *Email :* ${getValue("q-email")}\n` +
        `📱 *Téléphone :* ${getValue("q-phone")}\n` +
        `🎯 *Projet :* ${projectType}\n` +
        `💰 *Budget :* ${getValue("q-budget")}\n` +
        `⏱️ *Délai :* ${getValue("q-delay")}\n\n` +
        `📝 *Description :*\n${getValue("q-desc")}`;

      const waBtn = document.getElementById("quote-whatsapp-link");
      if (waBtn) waBtn.href = buildWhatsAppLink(waMessage);

      setText("success-client-name", name);
      setText("success-project-type", projectType);

      form.classList.add("hidden");
      success?.classList.remove("hidden");
      success?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  );
}

/** Formulaire de contact (contact.html) */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const success = document.getElementById("contact-success");

  bindEmailForm(
    form,
    () => ({
      subject: `Nouveau message de contact — ${getValue("c-name")}`,
      name: getValue("c-name"),
      telephone: getValue("c-phone"),
      message: getValue("c-message"),
    }),
    () => {
      const waText =
        `*Nouveau message de contact — Patco Design*\n\n` +
        `👤 *Nom :* ${getValue("c-name")}\n` +
        `📱 *Téléphone :* ${getValue("c-phone")}\n\n` +
        `💬 *Message :*\n${getValue("c-message")}`;

      const waBtn = document.getElementById("contact-whatsapp-link");
      if (waBtn) waBtn.href = buildWhatsAppLink(waText);

      form.classList.add("hidden");
      success?.classList.remove("hidden");
    },
  );
}

/* ==========================================================================
   STATISTIQUES ANIMÉES (accueil et à propos)
   ========================================================================== */

function animateCount(el, delay = 0) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;

  setTimeout(() => {
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ralentit vers la fin
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, delay);
}

function initStatsAnimation() {
  const statCards = document.querySelectorAll(".stat-card");
  if (statCards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const delay =
          parseFloat(card.style.getPropertyValue("--delay")) * 1000 || 0;

        card.classList.add("is-visible");
        card
          .querySelectorAll(".count-up")
          .forEach((el) => animateCount(el, delay));
        observer.unobserve(card);
      });
    },
    { threshold: 0.3 },
  );

  statCards.forEach((card) => observer.observe(card));
}

/* ==========================================================================
   LOUPE & VISIONNEUSE D'IMAGE (galerie du portfolio uniquement)
   ========================================================================== */

function initImageZoom() {
  const images = document.querySelectorAll(
    "#portfolio-grid .portfolio-card-item img",
  );
  if (images.length === 0) return;

  // Création de la visionneuse (une seule pour toute la page)
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Fermer">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <img src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const open = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) close();
  });

  // Ajout de la loupe sur chaque image
  images.forEach((img) => {
    const wrapper = img.parentElement;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "zoom-btn";
    btn.setAttribute("aria-label", `Agrandir l'image : ${img.alt}`);
    btn.innerHTML = `
      <span class="zoom-btn-icon">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-4.35-4.35M11 8v6M8 11h6M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </span>
    `;

    btn.addEventListener("click", () =>
      open(img.currentSrc || img.src, img.alt),
    );
    wrapper.appendChild(btn);
  });
}

/* ==========================================================================
   DÉMARRAGE
   ========================================================================== */

// L'écran de chargement démarre tout de suite, sans dépendre du reste
initPreloader();

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Charger le header et le footer partagés AVANT d'activer le reste,
  //    car le menu mobile et la navigation en dépendent.
  await Promise.all([
    loadComponent("site-header", HEADER_URL),
    loadComponent("site-footer", FOOTER_URL),
  ]);

  // 2. Navigation
  initMobileMenu();
  initActiveNav();

  // 3. Fonctionnalités des pages
  initPortfolioFilters();
  initProjectModal();
  initSourceModal();
  initQuoteForm();
  initContactForm();
  initStatsAnimation();
  initImageZoom();
});