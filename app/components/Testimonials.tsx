import SectionHeader from "./SectionHeader";

type Theme = { primary: string; background: string; text: string };

type TestimonialsProps = {
  items: { quote: string; author: string }[];
  theme: Theme;
};

export default function Testimonials({ items, theme }: TestimonialsProps) {
  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Testimonials" heading="What people say" theme={theme} />

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-50 rounded-2xl p-8 flex flex-col"
            >
              {/* Big decorative quote mark in the theme accent */}
              <span
                className="text-5xl leading-none font-serif mb-4"
                style={{ color: theme.primary }}
              >
                &ldquo;
              </span>
              <p className="text-zinc-700 leading-relaxed mb-6 flex-grow">
                {item.quote}
              </p>
              <p className="font-semibold" style={{ color: theme.text }}>
                {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}