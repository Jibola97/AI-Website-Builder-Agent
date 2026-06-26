import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function fetchImage(
  query: string,
  fallbackQuery?: string,
  orientation: string = "squarish"
): Promise<string | undefined> {
  const search = async (q: string) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          q
        )}&per_page=1&orientation=${orientation}`,
        { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` } }
      );
      const data = await res.json();
      return data.results?.[0]?.urls?.regular;
    } catch {
      return undefined;
    }
  };

  return (await search(query)) ?? (fallbackQuery ? await search(fallbackQuery) : undefined);
}

// The exact shape we require back. If the AI's output doesn't match, it fails validation.
const BusinessSchema = z.object({
  businessName: z.string(),
  tagline: z.string(),
  styleName: z.enum(["bold", "elegant", "playful"]),
  heroCta: z.string(),
  menuEyebrow: z.string(),
  menuHeading: z.string(),
  imageTheme: z.string(),
  theme: z.object({
    primary: z.string(),
    background: z.string(),
    text: z.string(),
  }),
  sections: z.array(
    z.enum(["menu", "about", "hours", "contact", "gallery", "testimonials"])
  ),
  menu: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      description: z.string(),
    })
  ),
  about: z.string(),
  hours: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
    })
  ),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.string(),
  }),
  gallery: z.array(
    z.object({
      caption: z.string(),
      image: z.string().optional(),
    })
  ),
  testimonials: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
    })
  ),
});

function buildPrompt(description: string) {
  return `You are a website content generator. Based on the business description below, return ONLY valid JSON (no markdown, no backticks, no explanation) with this exact shape:
{
  "businessName": string,
  "tagline": string,
  "styleName": string,  // pick ONE visual style that best fits this industry: "bold" (heavy, modern, high-energy — food, fitness, trades), "elegant" (refined, serif, minimal — hotels, salons, fine dining, luxury), or "playful" (friendly, rounded, approachable — kids, cafés, casual brands). Return exactly one of these three lowercase words.
  "heroCta": string,  // the hero button label, industry-appropriate. e.g. restaurant "Order Now", hotel "Book a Room", gym "Shop Now", salon "Book Appointment"
  "menuEyebrow": string,  // small label above the main offerings heading. e.g. restaurant "Menu", hotel "Rooms", gym "Products", salon "Services"
  "menuHeading": string,  // the main offerings heading. e.g. restaurant "What we serve", hotel "Our Rooms", gym "Shop the range", salon "Our Services"
  "imageTheme": string,  // a short generic phrase describing this business's visual style for stock photos, e.g. "fine dining restaurant", "luxury hotel lobby", "modern barbershop"
  "theme": { "primary": string, "background": string, "text": string },  // hex colours suited to this industry. primary = accent (buttons, prices), background = soft hero tint, text = dark readable colour for headings
  "sections": string[],  // ordering of sections, chosen from: "menu", "about", "hours", "contact", "gallery", "testimonials". Order them in the way that best suits this type of business.
  "menu": [ { "name": string, "price": string, "description": string } ],
  "about": string,  // 2-3 sentence paragraph about the business
  "hours": [ { "day": string, "time": string } ],  // 7 entries, Monday to Sunday
  "contact": { "phone": string, "email": string, "address": string }
  "gallery": [ { "caption": string } ],  // 3-6 short captions describing photos this business would show (e.g. "Freshly cut fade", "Our cosy interior")
  "testimonials": [ { "quote": string, "author": string } ],  // 2-3 realistic but fictional customer reviews
}
Generate 4-6 menu items appropriate to the business. Prices in GBP. Make contact details realistic but fictional. Choose the section order that makes most sense for this industry.
Choose theme colours that suit the industry's mood (e.g. warm and appetising for food, calm and elegant for beauty, bold and professional for trades). Use valid 6-digit hex codes like "#e11d48".
Always include all of these in the sections array: "menu", "about", "hours", "contact", "gallery", "testimonials". Order them to best suit the industry.
Business description: ${description}`;
}

async function generateOnce(description: string) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1500,
    messages: [{ role: "user", content: buildPrompt(description) }],
  });

  let text = (response.content[0] as { text: string }).text;
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const parsed = JSON.parse(text);        // may throw if not valid JSON
  return BusinessSchema.parse(parsed);     // may throw if shape is wrong
}

export async function POST(request: Request) {
  const { description } = await request.json();

  // Try up to 2 times: if the first response is malformed, retry once.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const data = await generateOnce(description);

      // Enrich each gallery item with a real Unsplash photo based on its caption
      if (data.gallery && data.gallery.length > 0) {
        for (const item of data.gallery) {
  item.image = await fetchImage(`${data.imageTheme} ${item.caption}`, data.imageTheme);
}
      }

      // Fetch a wide hero background image based on the business's visual theme
      const heroImage = await fetchImage(data.imageTheme, "business storefront", "landscape");

      return NextResponse.json({ ...data, heroImage });
    } catch (err) {
      console.log(`Attempt ${attempt} failed:`, err);
      if (attempt === 2) {
        return NextResponse.json(
          { error: "Could not generate valid website data. Please try again." },
          { status: 500 }
        );
      }
    }
  }
}
