type Theme = { primary: string; background: string; text: string };

type AboutProps = { text: string; theme: Theme };

export default function About({ text, theme }: AboutProps) {
  return (
    <section className="py-20 px-6 max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6" style={{ color: theme.text }}>About Us</h2>
      <p className="text-lg text-zinc-600 leading-relaxed">{text}</p>
    </section>
  );
}