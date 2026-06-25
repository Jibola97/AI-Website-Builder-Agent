"use client";
import VisitUs from "./components/VisitUs";

import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import { useState } from "react";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import About from "./components/About";

type BusinessData = {
  businessName: string;
  tagline: string;
  heroCta: string;
  menuEyebrow: string;
  menuHeading: string;
  heroImage?: string;
  theme: { primary: string; background: string; text: string };
  sections: string[];
  menu: { name: string; price: string; description: string }[];
  about: string;
  hours: { day: string; time: string }[];
  contact: { phone: string; email: string; address: string };
  gallery: { caption: string; image?: string }[];
  testimonials: { quote: string; author: string }[];
};

export default function Home() {
  const [description, setDescription] = useState("");
  const [data, setData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setData(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const result = await res.json();
    if (result.error) {
      alert(result.error);
    } else {
      setData(result);
    }
    setLoading(false);
  }

  function handleReset() {
    setData(null);
    setDescription("");
  }

  function renderSection(section: string, index: number) {
  if (!data) return null;
  const bg = index % 2 === 0 ? "bg-white" : "bg-zinc-50";
  switch (section) {
    case "menu":
      return <Menu key="menu" items={data.menu} eyebrow={data.menuEyebrow} heading={data.menuHeading} theme={data.theme} background={bg} />;
    case "about":
      return <About key="about" text={data.about} theme={data.theme} background={bg} />;
    case "hours":
      return null; // handled by the combined VisitUs section (rendered on "contact")
    case "contact":
      return (
        <VisitUs
          key="visitus"
          hours={data.hours}
          phone={data.contact.phone}
          email={data.contact.email}
          address={data.contact.address}
          theme={data.theme}
          background={bg}
        />
      );
    case "gallery":
      return <Gallery key="gallery" items={data.gallery} theme={data.theme} background={bg} />;
    case "testimonials":
      return (
        <Testimonials key="testimonials" items={data.testimonials} theme={data.theme} background={bg} />
      );
    default:
      return null;
  }
}

  // LOADING STATE
  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-600 text-lg">Generating your website…</p>
      </main>
    );
  }

  // RESULT STATE — form hidden, generated site shown with a reset button
  if (data) {
    return (
      <main>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-zinc-900 transition border border-white/20"
          >
            ← Start over
          </button>
        </div>
        <Hero businessName={data.businessName} tagline={data.tagline} heroCta={data.heroCta} theme={data.theme} heroImage={data.heroImage}/>
        {data.sections.map((section, index) => renderSection(section, index))}
      </main>
    );
  }

  // INPUT STATE — the default form
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-xl w-full px-6">
        <h1 className="text-3xl font-bold mb-2 text-center">
          AI Website Builder
        </h1>
        <p className="text-zinc-500 text-center mb-8">
          Describe your business and we&apos;ll build your site.
        </p>
        <textarea
          className="w-full border border-zinc-300 rounded-lg p-3 mb-4"
          rows={3}
          placeholder="e.g. A cosy hair salon in Manchester specialising in colour and cuts"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={!description.trim()}
          className="w-full px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition disabled:opacity-50"
        >
          Generate Website
        </button>
      </div>
    </main>
  );
}
