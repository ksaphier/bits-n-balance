export interface CategoryMeta {
  label: string;
  brand: string;
  eyebrow: string;
  heroTitleHtml: string;
  heroSubtitle: string;
  metaDescription: string;
  tagline: string;
  footerDisclaimer?: string;
}

const DEFAULT_META = (label: string): CategoryMeta => ({
  label,
  brand: label,
  eyebrow: `Blog de ${label.toLowerCase()}`,
  heroTitleHtml: `${label},<br />explicado simple.`,
  heroSubtitle:
    "Guías claras y directas sobre este tema, sin tecnicismos innecesarios.",
  metaDescription: `Conceptos de ${label.toLowerCase()} explicados de manera simple y directa.`,
  tagline: "Aprende a tu ritmo",
});

export const CATEGORIES: Record<string, CategoryMeta> = {
  finanzas: {
    label: "Finanzas",
    brand: "Inversiones simples",
    eyebrow: "Finanzas desde cero",
    heroTitleHtml: "Entiende antes<br />de invertir.",
    heroSubtitle:
      "Guías claras para conocer los conceptos esenciales del mundo de las inversiones, sin tecnicismos innecesarios.",
    metaDescription:
      "Conceptos de inversión explicados de manera simple y directa.",
    tagline: "Aprende a tu ritmo",
    footerDisclaimer: "No constituye asesoría financiera.",
  },
  recetas: {
    label: "Recetas",
    brand: "Mis Recetas",
    eyebrow: "Recetas",
    heroTitleHtml: "Mis preparaciones favoritas.",
    heroSubtitle: "Simples recetas que me gustan.",
    metaDescription: "Recetas de cocina explicadas de manera simple y directa.",
    tagline: "Aprende a tu ritmo",
    footerDisclaimer: "No constituye asesoría culinaria.",
  },
  salud: {
    label: "Salud",
    brand: "Salud simple",
    eyebrow: "Salud desde cero",
    heroTitleHtml: "Entiende tu salud<br />de manera simple.",
    heroSubtitle:
      "Guías claras para conocer los conceptos esenciales de la salud, sin tecnicismos innecesarios.",
    metaDescription:
      "Conceptos de salud explicados de manera simple y directa.",
    tagline: "Aprende a tu ritmo",
    footerDisclaimer: "No constituye asesoría médica.",
  },
};

export const categoryMeta = (category: string): CategoryMeta =>
  CATEGORIES[category] ??
  DEFAULT_META(category.charAt(0).toUpperCase() + category.slice(1));

export const categoryLabel = (category: string) => categoryMeta(category).label;
