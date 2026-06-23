type Theme = { primary: string; background: string; text: string };

type GalleryProps = {
  items: { caption: string; image?: string }[];
  theme: Theme;
};

export default function Gallery({ items, theme }: GalleryProps) {
  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow + heading, matching the Menu treatment */}
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-3"
          style={{ color: theme.primary }}
        >
          Gallery
        </p>
        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-14"
          style={{ color: theme.text }}
        >
          A closer look
        </h2>

        {/* Image grid with hover-reveal captions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: theme.background }}
                />
              )}

              {/* Caption overlay — fades in on hover */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium p-4">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}