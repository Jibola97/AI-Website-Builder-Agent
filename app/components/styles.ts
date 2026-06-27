// The style library. Each style is a closed set of literal Tailwind classes.
// Because every class is written as a literal string here, Tailwind sees them
// at build time and never purges them — the same reason we avoid dynamic
// classnames elsewhere. The AI only SELECTS a style name; it never emits classes.

export type SiteStyle = {
  headingFont: string; // font family for headings
  headingWeight: string; // weight + tracking for the big headings
  cardRadius: string; // corner rounding on cards / image tiles
  buttonRadius: string; // corner rounding on buttons (often differs from cards)
  sectionSpacing: string; // vertical breathing room per section
  cardFill: string; // how cards are filled (solid tint vs outlined)
};

export type StyleName = "bold" | "elegant" | "playful";

export const STYLES: Record<StyleName, SiteStyle> = {
  // BOLD — matches your CURRENT site exactly. If anything looks different
  // for this style after wiring, the wiring is wrong, not the design.
  bold: {
    headingFont: "font-sans",
    headingWeight: "font-extrabold tracking-tight",
    cardRadius: "rounded-xl",
    buttonRadius: "rounded-full",
    sectionSpacing: "py-24",
    cardFill: "bg-zinc-50",
  },

  // ELEGANT — editorial, calm, luxury. Serif headings, lighter weight,
  // sharp corners, airier spacing, outlined cards instead of filled.
  elegant: {
    headingFont: "font-serif",
    headingWeight: "font-medium tracking-normal",
    cardRadius: "rounded-none",
    buttonRadius: "rounded-none",
    sectionSpacing: "py-32",
    cardFill: "bg-white border border-zinc-200",
  },

  // PLAYFUL — friendly, warm, casual (cafés, ice cream, juice bars).
  // Rounded Poppins headings set it apart from bold's geometric sans;
  // big corner rounding and tighter vertical rhythm add energy.
  playful: {
    headingFont: "font-playful",
    headingWeight: "font-extrabold tracking-tight",
    cardRadius: "rounded-3xl",
    buttonRadius: "rounded-full",
    sectionSpacing: "py-16",
    cardFill: "bg-zinc-50",
  },
};
