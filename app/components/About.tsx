import SectionHeader from "./SectionHeader";

type Theme = { primary: string; background: string; text: string };

type AboutProps = { text: string; theme: Theme };

export default function About({ text, theme }: AboutProps) {
  return (
    <section className="py-24 px-6 md:px-16 bg-zinc-50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start">
        {/* Left column: the section header */}
        <div>
          <SectionHeader eyebrow="About" heading="Our story" theme={theme} />
        </div>

        {/* Right column: the body text, given room to breathe */}
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
}