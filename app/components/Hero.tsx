type Theme = {
  primary: string;
  background: string;
  text: string;
};

type HeroProps = {
  businessName: string;
  tagline: string;
  theme: Theme;
  heroImage?: string;
};

export default function Hero({ businessName, tagline, theme, heroImage }: HeroProps) {
  // If we have a real photo, lay it under a dark overlay so text stays readable.
  // Otherwise fall back to the soft themed gradient.
  const backgroundStyle = heroImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(to bottom, ${theme.background}, #ffffff)`,
      };

  // Text colour: white over a photo, themed dark colour over the gradient.
  const headingColor = heroImage ? "#ffffff" : theme.text;
  const taglineClass = heroImage ? "text-zinc-100" : "text-zinc-600";

  return (
    <section
      className="flex flex-col items-center justify-center text-center py-32 px-6"
      style={backgroundStyle}
    >
      <h1 className="text-5xl font-bold mb-4" style={{ color: headingColor }}>
        {businessName}
      </h1>
      <p className={`text-xl max-w-xl ${taglineClass}`}>{tagline}</p>
      <button
        className="mt-8 px-6 py-3 text-white rounded-full font-medium transition hover:opacity-90"
        style={{ backgroundColor: theme.primary }}
      >
        Order Now
      </button>
    </section>
  );
}