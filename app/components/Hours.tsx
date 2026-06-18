type Theme = { primary: string; background: string; text: string };

type HoursProps = { hours: { day: string; time: string }[]; theme: Theme };

export default function Hours({ hours, theme }: HoursProps) {
  return (
    <section className="py-20 px-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: theme.text }}>
        Opening Hours
      </h2>
      <div className="flex flex-col gap-3">
        {hours.map((entry, index) => (
          <div key={index} className="flex justify-between border-b border-zinc-200 pb-2">
            <span className="font-medium text-zinc-900">{entry.day}</span>
            <span className="text-zinc-600">{entry.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}