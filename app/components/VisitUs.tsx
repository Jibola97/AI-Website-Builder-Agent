import SectionHeader from "./SectionHeader";

type Theme = { primary: string; background: string; text: string };

type VisitUsProps = {
  hours: { day: string; time: string }[];
  phone: string;
  email: string;
  address: string;
  theme: Theme;
  background: string;
};

export default function VisitUs({ hours, phone, email, address, theme, background }: VisitUsProps) {
  return (
    <section className={`py-24 px-6 md:px-16 ${background}`}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Visit Us" heading="Find us & opening times" theme={theme} />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: opening hours */}
          <div>
            <h3 className="text-lg font-bold mb-5" style={{ color: theme.text }}>
              Opening Hours
            </h3>
            <div className="flex flex-col gap-3">
              {hours.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-zinc-200 pb-2"
                >
                  <span className="font-medium text-zinc-900">{entry.day}</span>
                  <span className="text-zinc-600">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact details */}
          <div>
            <h3 className="text-lg font-bold mb-5" style={{ color: theme.text }}>
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4 text-zinc-700">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                  Address
                </p>
                <p>{address}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                  Phone
                </p>
                <p>{phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400 mb-1">
                  Email
                </p>
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}