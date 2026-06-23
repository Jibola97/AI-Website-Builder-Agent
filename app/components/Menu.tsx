type Theme = { primary: string; background: string; text: string };

type MenuItem = { name: string; price: string; description: string };

type MenuProps = { items: MenuItem[]; theme: Theme };

export default function Menu({ items, theme }: MenuProps) {
  return (
    <section
      className="py-24 px-6 md:px-16"
      style={{ backgroundColor: `${theme.background}40` }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow + heading, left-aligned to match the hero */}
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-3"
          style={{ color: theme.primary }}
        >
          Menu
        </p>
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-14"
          style={{ color: theme.text }}
        >
          What we serve
        </h2>

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