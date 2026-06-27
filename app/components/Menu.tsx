import SectionHeader from "./SectionHeader";

import { SiteStyle } from "./styles";

type Theme = { primary: string; background: string; text: string };

type MenuItem = { name: string; price: string; description: string };

type MenuProps = { items: MenuItem[]; eyebrow: string; heading: string; theme: Theme; background: string; style: SiteStyle };

export default function Menu({ items, eyebrow, heading, theme, background, style }: MenuProps) {
  return (
    <section className={`${style.sectionSpacing} px-6 md:px-16 ${background}`}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow={eyebrow} heading={heading} theme={theme} style={style} />

        {/* Two-column grid of items */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start gap-4 pt-5 border-t border-zinc-200"
            >
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span
                className="text-lg font-bold whitespace-nowrap"
                style={{ color: theme.primary }}
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}