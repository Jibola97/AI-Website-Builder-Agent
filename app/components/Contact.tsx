type Theme = { primary: string; background: string; text: string };

type ContactProps = { phone: string; email: string; address: string; theme: Theme };

export default function Contact({ phone, email, address, theme }: ContactProps) {
  return (
    <section className="py-20 px-6 max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8" style={{ color: theme.text }}>Get in Touch</h2>
      <div className="flex flex-col gap-3 text-zinc-600">
        <p>{address}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </section>
  );
}