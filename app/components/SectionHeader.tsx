type Theme = { primary: string; background: string; text: string };

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  theme: Theme;
};

export default function SectionHeader({ eyebrow, heading, theme }: SectionHeaderProps) {
  return (
    <>
      <p
        className="text-sm font-semibold tracking-widest uppercase mb-3"
        style={{ color: theme.primary }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-14"
        style={{ color: theme.text }}
      >
        {heading}
      </h2>
    </>
  );
}