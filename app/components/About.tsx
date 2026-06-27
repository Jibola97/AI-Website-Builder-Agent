import SectionHeader from "./SectionHeader";
import { SiteStyle } from "./styles";


type Theme = { primary: string; background: string; text: string };

type AboutProps = { text: string; theme: Theme; background: string; style: SiteStyle };

export default function About({ text, theme, background, style }: AboutProps) {
  return (
    <section className={`${style.sectionSpacing} px-6 md:px-16 ${background}`}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16 items-start">
        {/* Left column: the section header */}
        <div>
          <SectionHeader eyebrow="About" heading="Our story" theme={theme} style={style} />
        </div>

        {/* Right column: the body text, given room to breathe */}
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
}