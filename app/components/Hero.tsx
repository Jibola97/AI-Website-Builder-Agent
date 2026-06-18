type Theme = {
  primary: string;
  background: string;
  text: string;
};

type HeroProps = {
  businessName: string;
  tagline: string;
  theme: Theme;
};

export default function Hero({ businessName, tagline, theme }: HeroProps) {
  return (
    <section
      className="flex flex-col items-center justify-center text-center py-24 px-6"
      style={{
        background: `linear-gradient(to bottom, ${theme.background}, #ffffff)`,
      }}
    >
      <h1
        className="text-5xl font-bold mb-4"
        style={{ color: theme.text }}
      >
        {businessName}
      </h1>
      <p className="text-xl text-zinc-600 max-w-xl">{tagline}</p>
      <button
        className="mt-8 px-6 py-3 text-white rounded-full font-medium transition hover:opacity-90"
        style={{ backgroundColor: theme.primary }}
      >
        Order Now
      </button>
    </section>
  );
}