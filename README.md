# my-website-builder

An AI-powered website generator. Describe a business in plain English — *"a cosy hair salon in Manchester"* — and it generates a complete, styled, industry-tailored website: choosing a visual style and colour theme, selecting and ordering sections, writing the content, and pulling in real photography.

## The core idea: the AI assembles, it doesn't author

The central design decision is **hybrid block-assembly rather than raw HTML generation.** The AI never writes markup. Instead, the codebase provides a set of hand-built, reusable React block components (Hero, Menu, Gallery, About, Testimonials, etc.), and the AI's job is deliberately narrow: **select** which blocks to use, **order** them, **fill** them with content, and **choose** a style and colour theme.

This matters because letting an LLM emit raw markup is unreliable and hard to validate. Constraining it to a structured selection-and-fill task makes the output predictable while keeping the *variety* an AI is good at. The visual quality is owned by hand-built components; the AI handles the per-business judgement.

## Reliability approach

The AI must return JSON matching a strict **Zod schema**, validated server-side before anything renders. If validation fails, a **retry loop** re-prompts (twice, then returns a clean error). The Anthropic API call is isolated behind a single function so the model or provider can be swapped without touching the rest of the system.

A concrete example of the design pattern used throughout: every new capability (industry-appropriate button labels, visual styles, etc.) is added the same way — extend the schema, instruct the AI to fill the new field, consume it in the components. The AI's freedom is always bounded by a validated contract.

## Design styles

The generator renders in three genuinely distinct visual styles, chosen by the AI to fit the industry. Rather than have the AI improvise styling (unreliable), styles are a **curated library**: each is a closed set of design tokens — heading font, weight, corner radius, button shape, spacing, card treatment — written as literal Tailwind classes. The AI only selects a style *name*; it never emits styling.

- **Bold** — heavy geometric sans, sharp, high-energy (food, fitness, trades)
- **Elegant** — serif headings, light weight, sharp corners, airy spacing (hotels, fine dining, luxury)
- **Playful** — rounded Poppins headings, soft corners (cafés, ice cream, casual brands)

This mirrors how mature site builders create variety — a hand-made library to choose from, not a cleverer prompt.

## Architecture

```
User description
      │
      ▼
/api/generate (server)
  ├─ Build prompt
  ├─ Call Anthropic API
  ├─ Strip markdown fences, parse JSON
  ├─ Validate against Zod schema (retry on failure)
  └─ Enrich with Unsplash photography
      │
      ▼
page.tsx (client)
  ├─ Look up chosen style from the token library
  └─ Map AI-selected sections → hand-built block components
```

- `src/app/api/generate/route.ts` — server-side: prompt construction, Anthropic call, validation, retry, image enrichment
- `src/app/components/` — the hand-built block components and the style token library
- `src/app/page.tsx` — renders blocks in the AI-chosen order, threading the selected style and theme through

## Stack

- **Next.js + TypeScript**
- **Tailwind CSS v4**
- **Anthropic API** (Claude) for content and structured selection
- **Unsplash API** for photography
- **next/font** for typography (including per-style fonts)
- **Zod** for schema validation

## Running locally

```bash
npm install
npm run dev   # http://localhost:3000
```

Requires a `.env.local` with:

```
ANTHROPIC_API_KEY=your_key
UNSPLASH_ACCESS_KEY=your_key
```

## Roadmap

- **User photos** — let businesses upload their own logo/food/space imagery instead of stock
- **Publishing** — give each generated site a real live URL
- **Accounts & billing** — freemium-to-publish model

---

*A personal project exploring reliable, structured use of LLMs for generative UI — constraining the model to validated selection-and-fill tasks rather than open-ended generation.*
