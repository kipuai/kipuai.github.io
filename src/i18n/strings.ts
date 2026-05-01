/**
 * Shared microcopy used by Nav, Footer, LanguageToggle, and meta tags.
 * Page-level body copy lives directly in each page file (more editorial,
 * easier to read in context). Only reusable strings live here.
 */

export type Locale = 'en' | 'es';

export const strings = {
  en: {
    siteTitle: 'Kipu',
    siteTagline: 'Strategy and implementation for AI-native companies in Latin America.',
    metaDescription:
      'Kipu partners with leading Latin American enterprises on the strategy, capabilities, and systems that turn AI ambition into measurable outcomes.',

    nav: {
      home: 'Home',
      approach: 'Approach',
      about: 'About',
      contact: 'Contact',
    },

    cta: {
      primary: 'Start with a Readiness Assessment',
      secondary: 'Talk to us',
    },

    footer: {
      copyright: '© 2026 Kipu',
      home: 'Home',
      approach: 'Approach',
      about: 'About',
      contact: 'Contact',
    },

    languageToggle: {
      label: 'ES',
      ariaLabel: 'Cambiar a español',
    },
  },

  es: {
    siteTitle: 'Kipu',
    siteTagline: 'Estrategia e implementación para empresas AI-native en América Latina.',
    metaDescription:
      'Kipu acompaña a empresas líderes de América Latina en la estrategia, las capacidades y los sistemas que convierten la ambición en resultados medibles.',

    nav: {
      home: 'Inicio',
      approach: 'Enfoque',
      about: 'Nosotros',
      contact: 'Contacto',
    },

    cta: {
      primary: 'Comienza con un Readiness Assessment',
      secondary: 'Conversemos',
    },

    footer: {
      copyright: '© 2026 Kipu',
      home: 'Inicio',
      approach: 'Enfoque',
      about: 'Nosotros',
      contact: 'Contacto',
    },

    languageToggle: {
      label: 'EN',
      ariaLabel: 'Switch to English',
    },
  },
} as const;

/** URL paths per locale, keyed by canonical page id. */
export const paths = {
  en: {
    home: '/',
    approach: '/approach/',
    about: '/about/',
    contact: '/contact/',
  },
  es: {
    home: '/es/',
    approach: '/es/enfoque/',
    about: '/es/nosotros/',
    contact: '/es/contacto/',
  },
} as const;

export type PageId = keyof typeof paths.en;

/** Map a current page id + locale to the equivalent path in the other locale. */
export function alternateLocaleUrl(currentLocale: Locale, pageId: PageId): string {
  const otherLocale: Locale = currentLocale === 'en' ? 'es' : 'en';
  return paths[otherLocale][pageId];
}
