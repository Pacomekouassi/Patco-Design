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
const PRELOADER_MIN_TIME = 1800; // durée minimale d'affichage (ms)
const PRELOADER_MAX_TIME = 4000; // il ne bloque jamais plus longtemps (ms)

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
    result: "Un visuel prêt à diffuser, cohérent avec l’image de l’entreprise.",
  },
  "proj-rahim": {
    title: "Rahim Store",
    category: "Design graphique & Affiches",
    client: "Rahim Store",
    year: "2026",
    image: "assets/images/Rahim_Store.jpg",
    tools: ["Photoshop"],
    problem:
      "Disposer d’un visuel publicitaire percutant, adapté au format carré des réseaux sociaux.",
    solution:
      "Création d’une affiche 1080 x 1080 px mettant en avant l’offre de la boutique avec une mise en page lisible.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-mobilemart": {
    title: "Mobilemart",
    category: "Design graphique & Affiches",
    client: "Mobilemart",
    year: "2026",
    image: "assets/images/Mobilemart.jpg",
    tools: ["Photoshop"],
    problem:
      "Promouvoir l’activité de Mobilemart avec un visuel moderne pour les réseaux sociaux.",
    solution:
      "Création d’une affiche 1080 x 1080 px avec une hiérarchie claire des informations.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-aziz-logo": {
    title: "Abdoul Aziz Store — Logo",
    category: "Branding & Identité",
    client: "Abdoul Aziz Store",
    year: "2026",
    image: "assets/images/Logo_Abdoul_Aziz.jpg",
    tools: ["Adobe Illustrator"],
    problem:
      "Le client avait besoin d’un logo simple et professionnel pour identifier sa boutique.",
    solution:
      "Conception d’un logo vectoriel lisible, facile à décliner sur affiches, réseaux sociaux et supports imprimés.",
    result: "Un logo vectoriel livré dans tous les formats utiles.",
  },
  "proj-aziz-flyer": {
    title: "Abdoul Aziz Store — Flyer",
    category: "Design graphique & Affiches",
    client: "Abdoul Aziz Store",
    year: "2026",
    image: "assets/images/Flyer-Aziz.jpg",
    tools: ["Photoshop"],
    problem:
      "Présenter clairement les produits et services de la boutique sur les réseaux sociaux.",
    solution:
      "Création d’un flyer carré 1080 x 1080 px, structuré et cohérent avec le logo.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-maquis": {
    title: "Maquis Class A",
    category: "Design graphique & Affiches",
    client: "Maquis Class A",
    year: "2026",
    image: "assets/images/Maquis-resto.jpg",
    tools: ["Photoshop"],
    problem: "Attirer l’attention des passants et valoriser l’offre du maquis.",
    solution:
      "Création d’une affiche grand format (2 m x 1 m) lisible de loin et fidèle à l’ambiance de l’établissement.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-carte-patco": {
    title: "Carte de visite Patco Design",
    category: "Branding & Identité",
    client: "Patco Design",
    year: "2026",
    image: "assets/images/Carte-de-visite.jpg",
    tools: ["Photoshop"],
    problem:
      "Disposer d’une carte de visite professionnelle reflétant l’identité de la marque.",
    solution:
      "Création d’une carte au format 85 x 55 mm, aux couleurs de la charte Patco Design.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-kone-comara": {
    title: "Koné et Comara",
    category: "Design graphique & Affiches",
    client: "Koné et Comara",
    year: "2026",
    image: "assets/images/Design_1.jpg",
    tools: ["Photoshop"],
    problem: "Concevoir un support imprimable compact et lisible.",
    solution: "Création d’une affiche au format A6, prête pour l’impression.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
  },
  "proj-elyon": {
    title: "Elyon Business",
    category: "Design graphique & Affiches",
    client: "Elyon Business",
    year: "2026",
    image: "assets/images/Exercice-1.jpg",
    tools: ["Photoshop"],
    problem:
      "Communiquer sur l’activité d’Elyon Business avec un visuel soigné.",
    solution:
      "Création d’une affiche publicitaire 1080 x 1080 px adaptée aux réseaux sociaux.",
    result: "Un visuel prêt à diffuser, cohérent avec l’image du client.",
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
/** Menu mobile : tiroir latéral à droite. */
function initMobileMenu() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  if (!drawer || !overlay || !openBtn || !closeBtn) return;

  const setMenu = (open) => {
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) closeBtn.focus();
  };

  openBtn.addEventListener("click", () => setMenu(true));
  closeBtn.addEventListener("click", () => setMenu(false));
  overlay.addEventListener("click", () => setMenu(false));
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenu(false);
  });
}

/** Met en surbrillance le lien de la page courante (et uniquement celui-là). */
function initActiveNav() {
  // Nom du fichier courant, sans ".html", pour gérer aussi les URL propres
  const normalize = (path) =>
    (path.split("/").pop() || "index").replace(/\.html$/i, "").toLowerCase() ||
    "index";

  const currentPage = normalize(window.location.pathname);

  document.querySelectorAll(".nav-link, .drawer-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // On ignore les ancres et les liens externes
    const target = normalize(href.split("#")[0].split("?")[0]);
    if (target !== currentPage) return;

    link.classList.add("active");
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
            // On retire les styles inline pour ne pas bloquer l'effet de survol
            item.style.opacity = "";
            item.style.transform = "";
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

/* ==========================================================================
   ANIMATION DE FOND DU HERO (réseau de particules)
   ========================================================================== */

function initHeroBackground() {
  const canvas = document.getElementById("hero-bg");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const parent = canvas.parentElement;
  const LINK_DISTANCE = 130;
  const MOUSE_RADIUS = 160;
  const mouse = { x: -9999, y: -9999 };

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;
  let visible = true;

  function resize() {
    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Moins de particules sur petit écran, pour rester fluide
    const count = Math.min(90, Math.floor((width * height) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.8,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      // Légère fuite devant la souris
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * 0.6;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
      ctx.fill();
    }

    // Lignes entre particules proches
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DISTANCE) {
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.35 * (1 - d / LINK_DISTANCE)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId === null && visible && !document.hidden) loop();
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  parent.addEventListener("mousemove", (e) => {
    const rect = parent.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  parent.addEventListener("mouseleave", () => {
    mouse.x = mouse.y = -9999;
  });

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start(),
  );

  // On met l'animation en pause quand le hero n'est plus à l'écran
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }).observe(parent);

  resize();
  start();
}

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
  initHeroBackground();
});
