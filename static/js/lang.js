const translations = {
  en: {
    // Nav
    navAbout: "About",
    navContact: "Contact",

    // Hero
    heroTitle: "Technology & Strategy",
    heroSubtitle: "Expert partnership for ambitious companies building with purpose",
    heroCta: "Request a Free Consultation",

    // Services section
    servicesHeading: "Our Services",

    // Partner section
    partnerHeading: "A Different Kind of Partner",
    partnerText:
      "Kipu was founded on a simple idea: smart decisions need clear direction. We offer strategic support with the discipline of large enterprises and the mindset of founders.",
    partnerCta: "ABOUT US",

    // About page
    aboutHeading: "Our Team",
    aboutSubheading: "Proven Experience, Strategic Clarity",
    aboutIntro:
      "At Kipu, we bring the perspective of those who've built, scaled, and advised companies across industries and stages. Our experience spans Fortune 500 firms, global consultancies, and full startup journeys from idea to exit. We deliver clear, actionable guidance to help leaders move forward with confidence and precision.",
    partnerLabel: "Partner",

    // Contact page
    contactHeading: "Contact",
    contactLine1: "We offer a free consultation for all new clients.",
    contactLine2: "The best way to reach us is via email.",

    // Footer
    footerHome: "Home",
    footerContact: "Contact",
  },

  es: {
    // Nav
    navAbout: "Nosotros",
    navContact: "Contacto",

    // Hero
    heroTitle: "Tecnología y Estrategia",
    heroSubtitle: "Alianza experta para empresas ambiciosas que construyen con propósito",
    heroCta: "Solicitar una Consulta Gratuita",

    // Services section
    servicesHeading: "Nuestros Servicios",

    // Partner section
    partnerHeading: "Un Socio Diferente",
    partnerText:
      "Kipu nació con una idea simple: las decisiones inteligentes requieren dirección clara. Ofrecemos apoyo estratégico con la disciplina de las grandes empresas y la mentalidad de los fundadores.",
    partnerCta: "SOBRE NOSOTROS",

    // About page
    aboutHeading: "Nuestro Equipo",
    aboutSubheading: "Experiencia Comprobada, Claridad Estratégica",
    aboutIntro:
      "En Kipu, aportamos la perspectiva de quienes han construido, escalado y asesorado empresas en distintas industrias y etapas. Nuestra experiencia abarca empresas del Fortune 500, consultoras globales y trayectorias completas de startups desde la idea hasta la salida. Brindamos orientación clara y accionable para que los líderes avancen con confianza y precisión.",
    partnerLabel: "Socio",

    // Contact page
    contactHeading: "Contacto",
    contactLine1: "Ofrecemos una consulta gratuita para todos los nuevos clientes.",
    contactLine2: "La mejor forma de contactarnos es por correo electrónico.",

    // Footer
    footerHome: "Inicio",
    footerContact: "Contacto",
  },
};

function setLanguage(lang) {
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.innerText = translations[lang][key];
    }
  });

  // Toggle lang-specific blocks (bios, service cards)
  document.querySelectorAll("[data-lang]").forEach(function (el) {
    el.style.display = el.getAttribute("data-lang") === lang ? "" : "none";
  });

  // Sync both toggle buttons
  ["lang-toggle", "lang-toggle-mobile"].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) {
      btn.innerText = lang === "en" ? "ES" : "EN";
      btn.setAttribute("data-current-lang", lang);
    }
  });

  localStorage.setItem("kipuai-lang", lang);
  document.documentElement.lang = lang === "es" ? "es" : "en";
}

document.addEventListener("DOMContentLoaded", function () {
  var saved = localStorage.getItem("kipuai-lang") || "en";
  setLanguage(saved);

  ["lang-toggle", "lang-toggle-mobile"].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.getElementById("lang-toggle")
          ? document.getElementById("lang-toggle").getAttribute("data-current-lang")
          : "en";
        setLanguage(current === "en" ? "es" : "en");
      });
    }
  });
});
