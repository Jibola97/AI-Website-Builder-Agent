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
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden"
      style={
        heroImage
          ? undefined
          : { background: `linear-gradient(to bottom, ${theme.background}, #ffffff)` }
      }
    >
      {/* Background photo + directional gradient (darker at the bottom where text sits) */}
      {heroImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </>
      )}

      {/* Content sits above the overlays */}
      <div className="relative z-10 max-w-4xl">
        <h1
          className="text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6"
          style={{ color: heroImage ? "#ffffff" : theme.text }}
        >
          {businessName}
        </h1>
        <p
          className={`text-xl md:text-2xl max-w-xl mb-10 ${
            heroImage ? "text-zinc-200" : "text-zinc-600"
          }`}
        >
          {tagline}
        </p>
        <button
          className="px-8 py-4 text-white rounded-full font-semibold text-lg transition hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: theme.primary }}
        >
          Order Now
        </button>
      </div>
    </section>
  );
}