type Theme = { primary: string; background: string; text: string };

type TestimonialsProps = {
  items: { quote: string; author: string }[];
  theme: Theme;
};

export default function Testimonials({ items, theme }: TestimonialsProps) {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: theme.text }}>
        What Our Customers Say
      </h2>
      <div className="flex flex-col gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-lg"
            style={{ backgroundColor: theme.background }}
          >
            <p className="text-lg text-zinc-700 italic mb-3">“{item.quote}”</p>
            <p className="font-medium" style={{ color: theme.primary }}>
              — {item.author}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}