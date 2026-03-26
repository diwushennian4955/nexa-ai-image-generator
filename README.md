# ⚡ NexaAPI × Vercel — AI Image Generator Template

> A production-ready Next.js app that lets you generate AI images using 50+ models via NexaAPI.  
> Deploy to Vercel in **one click** — no backend setup required.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdiwushennian4955%2Fnexa-ai-image-generator&env=NEXAAPI_KEY&envDescription=Get%20your%20free%20NexaAPI%20key%20at%20https%3A%2F%2Fnexa-api.com&envLink=https%3A%2F%2Fnexa-api.com&project-name=nexaapi-image-generator&repository-name=nexaapi-image-generator)

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎨 **6 AI Models** | Flux Pro 1.1, Flux Schnell, SD 3.5, Playground v2.5, SDXL Turbo, DreamShaper XL |
| 📐 **4 Aspect Ratios** | Square (1:1), Landscape (16:9), Portrait (9:16), Standard (4:3) |
| 🖼️ **Batch Generation** | Generate 1–4 images per request |
| 💾 **One-Click Download** | Download generated images directly from the browser |
| 🔒 **Secure API Proxy** | Your NexaAPI key stays on the server — never exposed to clients |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |
| 🌙 **Dark Theme** | Easy on the eyes, modern UI |

---

## 🚀 One-Click Deploy

### Step 1: Get a NexaAPI Key

1. Go to [nexa-api.com](https://nexa-api.com)
2. Sign up for a free account
3. Copy your API key from the dashboard

### Step 2: Deploy to Vercel

Click the button below — Vercel will ask for your `NEXAAPI_KEY` during setup:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdiwushennian4955%2Fnexa-ai-image-generator&env=NEXAAPI_KEY&envDescription=Get%20your%20free%20NexaAPI%20key%20at%20https%3A%2F%2Fnexa-api.com&envLink=https%3A%2F%2Fnexa-api.com&project-name=nexaapi-image-generator&repository-name=nexaapi-image-generator)

That's it! Your AI image generator will be live at `https://your-project.vercel.app` in ~2 minutes.

---

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- A NexaAPI key ([get one free](https://nexa-api.com))

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/diwushennian4955/nexa-ai-image-generator
cd vercel-image-generator

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local and set your NEXAAPI_KEY

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
nexaapi-image-generator/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts        # POST /api/generate — proxies to NexaAPI
│   │   └── models/
│   │       └── route.ts        # GET /api/models — returns model list
│   ├── globals.css             # Global styles + CSS variables
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main UI — prompt input, model selector, gallery
│   └── page.module.css         # Component styles
├── public/                     # Static assets
├── .env.example                # Environment variable template
├── .gitignore
├── next.config.js              # Next.js configuration
├── package.json
├── tsconfig.json
└── vercel.json                 # Vercel deployment configuration
```

---

## 🔧 API Reference

### `POST /api/generate`

Generate one or more images from a text prompt.

**Request Body:**

```json
{
  "prompt": "A majestic dragon over a cyberpunk city",
  "negative_prompt": "blurry, low quality",
  "model": "flux-pro-1.1",
  "width": 1024,
  "height": 1024,
  "num_images": 1
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `prompt` | string | ✅ | — | Text description of the image |
| `negative_prompt` | string | ❌ | — | What to exclude from the image |
| `model` | string | ✅ | — | Model ID (see supported models below) |
| `width` | number | ❌ | 1024 | Image width in pixels (256–2048) |
| `height` | number | ❌ | 1024 | Image height in pixels (256–2048) |
| `num_images` | number | ❌ | 1 | Number of images to generate (1–4) |

**Response:**

```json
{
  "images": [
    "https://cdn.nexa-api.com/generated/abc123.png"
  ],
  "model": "flux-pro-1.1",
  "prompt": "A majestic dragon over a cyberpunk city"
}
```

### `GET /api/models`

Returns the list of supported image generation models.

```json
{
  "models": [
    {
      "id": "flux-pro-1.1",
      "name": "Flux Pro 1.1",
      "provider": "Black Forest Labs",
      "description": "State-of-the-art photorealistic quality",
      "price_per_image": 0.004,
      "category": "image"
    }
  ]
}
```

---

## 🎨 Supported Models

| Model ID | Name | Provider | Price/Image |
|----------|------|----------|-------------|
| `flux-pro-1.1` | Flux Pro 1.1 | Black Forest Labs | $0.004 |
| `flux-schnell` | Flux Schnell | Black Forest Labs | $0.001 |
| `stable-diffusion-3.5` | Stable Diffusion 3.5 | Stability AI | $0.003 |
| `playground-v2.5` | Playground v2.5 | Playground AI | $0.002 |
| `sdxl-turbo` | SDXL Turbo | Stability AI | $0.001 |
| `dreamshaper-xl` | DreamShaper XL | Lykon | $0.002 |

> All models are available via [NexaAPI](https://nexa-api.com) — **5× cheaper** than official pricing.

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXAAPI_KEY` | ✅ | Your NexaAPI API key. Get one at [nexa-api.com](https://nexa-api.com) |

### Setting Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add `NEXAAPI_KEY` with your API key value
4. Redeploy the project

---

## 🖼️ Screenshots

### Main Interface
```
┌─────────────────────────────────────────────────────────────┐
│  ⚡ NexaAPI                    AI Image Generator  Get API Key│
├─────────────────────────────────────────────────────────────┤
│                                                              │
│           Generate AI Images Instantly                       │
│      50+ models · OpenAI-compatible · 5× cheaper            │
│                                                              │
│  ┌──────────────────────┐  ┌────────────────────────────┐   │
│  │ PROMPT               │  │                            │   │
│  │ [text area...]       │  │   🎨 Gallery               │   │
│  │                      │  │                            │   │
│  │ MODEL                │  │   Generated images appear  │   │
│  │ [model grid...]      │  │   here after generation    │   │
│  │                      │  │                            │   │
│  │ ASPECT RATIO         │  │                            │   │
│  │ [ratio buttons...]   │  │                            │   │
│  │                      │  │                            │   │
│  │ ⚡ Generate Image    │  │                            │   │
│  └──────────────────────┘  └────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Customization

### Add More Models

Edit `app/api/models/route.ts` to add new models from the [NexaAPI model catalog](https://nexa-api.com).

### Change the Theme

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --accent: #6366f1;          /* Primary color */
  --bg-primary: #0a0a0f;      /* Page background */
  --bg-card: #1a1a26;         /* Card background */
}
```

### Add Authentication

To restrict access to your deployment, add an auth layer using [NextAuth.js](https://next-auth.js.org/) or [Clerk](https://clerk.com/).

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🔗 Links

- **NexaAPI**: [nexa-api.com](https://nexa-api.com) — Get your API key
- **NexaAPI Docs**: [nexa-api.com/docs](https://nexa-api.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

<p align="center">
  Built with ❤️ using <a href="https://nexa-api.com">NexaAPI</a> · 50+ Models · 5× Cheaper Than Official
</p>
