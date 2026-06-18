import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { z } from "zod";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// The exact shape we require back. If the AI's output doesn't match, it fails validation.
const BusinessSchema = z.object({
  businessName: z.string(),
  tagline: z.string(),
  theme: z.object({
    primary: z.string(),
    background: z.string(),
    text: z.string(),
  }),
  sections: z.array(z.enum(["menu", "about", "hours", "contact"])),
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
});

function buildPrompt(description: string) {
  return `You are a website content generator. Based on the business description below, return ONLY valid JSON (no markdown, no backticks, no explanation) with this exact shape:
{
  "businessName": string,
  "tagline": string,
  "theme": { "primary": string, "background": string, "text": string },  // hex colours suited to this industry. primary = accent (buttons, prices), background = soft hero tint, text = dark readable colour for headings
  "sections": string[],  // ordering of sections, chosen from: "menu", "about", "hours", "contact". Order them in the way that best suits this type of business.
  "menu": [ { "name": string, "price": string, "description": string } ],
  "about": string,  // 2-3 sentence paragraph about the business
  "hours": [ { "day": string, "time": string } ],  // 7 entries, Monday to Sunday
  "contact": { "phone": string, "email": string, "address": string }
}
Generate 4-6 menu items appropriate to the business. Prices in GBP. Make contact details realistic but fictional. Choose the section order that makes most sense for this industry.
Choose theme colours that suit the industry's mood (e.g. warm and appetising for food, calm and elegant for beauty, bold and professional for trades). Use valid 6-digit hex codes like "#e11d48".

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
      return NextResponse.json(data);
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