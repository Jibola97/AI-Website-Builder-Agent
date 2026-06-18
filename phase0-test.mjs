import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";

// Load the API key from .env.local manually (this is a plain script, not Next.js)
const env = readFileSync(".env.local", "utf-8");
const apiKey = env.match(/ANTHROPIC_API_KEY=(.+)/)[1].trim();

const client = new Anthropic({ apiKey });

// The business we want a website for
const businessDescription = "A chicken shop called Cluckers in London, known for crispy fried chicken and loaded fries. Casual, fun, family-friendly.";

const prompt = `You are a website content generator. Based on the business description below, return ONLY valid JSON (no markdown, no backticks, no explanation) with this exact shape:
{
  "businessName": string,
  "tagline": string,
  "sections": string[]
}
"sections" should be 4-6 short section names suitable for this type of business (e.g. "hero", "menu", "about", "hours", "location", "contact").

Business description: ${businessDescription}`;

console.log("Sending request to Claude...\n");

const response = await client.messages.create({
  model: "claude-sonnet-4-5",
  max_tokens: 1000,
  messages: [{ role: "user", content: prompt }],
});

let text = response.content[0].text;
// Remove markdown code fences if the model wrapped its JSON in them
text = text.replace(/```json/g, "").replace(/```/g, "").trim();console.log("Raw response:\n", text, "\n");

// Try to parse it as JSON to prove it's structured
try {
  const data = JSON.parse(text);
  console.log("Parsed successfully! Structured data:\n");
  console.log("Business name:", data.businessName);
  console.log("Tagline:", data.tagline);
  console.log("Sections:", data.sections.join(", "));
} catch (err) {
  console.log("Could not parse as JSON — we'd add a retry here in Phase 1.");
}
