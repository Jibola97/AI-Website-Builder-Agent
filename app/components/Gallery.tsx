type Theme = { primary: string; background: string; text: string };

type GalleryProps = {
  items: { caption: string; image?: string }[];
  theme: Theme;
};

export default function Gallery({ items, theme }: GalleryProps) {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: theme.text }}>
        Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.caption}
                className="aspect-square rounded-lg object-cover w-full"
              />
            ) : (
              <div
                className="aspect-square rounded-lg"
                style={{ backgroundColor: theme.background }}
              />
            )}
            <p className="text-sm text-zinc-500 mt-2 text-center">{item.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}