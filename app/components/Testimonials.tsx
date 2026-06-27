import SectionHeader from "./SectionHeader";
import { SiteStyle } from "./styles";


type Theme = { primary: string; background: string; text: string };

type TestimonialsProps = {
  items: { quote: string; author: string }[];
  theme: Theme;
  background: string;
  style: SiteStyle;
};

export default function Testimonials({ items, theme, background, style }: TestimonialsProps) {
  return (
    <section className={`${style.sectionSpacing} px-6 md:px-16 ${background}`}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Testimonials" heading="What people say" theme={theme} style={style} />

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${style.cardFill} ${style.cardRadius} p-8 flex flex-col`}
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