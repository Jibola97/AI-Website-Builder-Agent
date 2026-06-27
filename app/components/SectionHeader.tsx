import { SiteStyle } from "./styles";

type Theme = { primary: string; background: string; text: string };

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  theme: Theme;
  style: SiteStyle;
};

export default function SectionHeader({ eyebrow, heading, theme, style }: SectionHeaderProps) {
  return (
    <>
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-3"
        style={{ color: theme.primary }}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-4xl md:text-5xl mb-14 ${style.headingFont} ${style.headingWeight}`}
        style={{ color: theme.text }}
      >
        {heading}
      </h2>
    </>
  );
}