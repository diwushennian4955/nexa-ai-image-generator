import { NextResponse } from 'next/server';

/**
 * GET /api/models
 * Returns the list of supported image generation models.
 * This is a static list — update as NexaAPI adds new models.
 */
export async function GET() {
  const models = [
    {
      id: 'flux-pro-1.1',
      name: 'Flux Pro 1.1',
      provider: 'Black Forest Labs',
      description: 'State-of-the-art photorealistic quality',
      price_per_image: 0.004,
      category: 'image',
    },
    {
      id: 'flux-schnell',
      name: 'Flux Schnell',
      provider: 'Black Forest Labs',
      description: 'Ultra-fast generation, great for prototyping',
      price_per_image: 0.001,
      category: 'image',
    },
    {
      id: 'stable-diffusion-3.5',
      name: 'Stable Diffusion 3.5',
      provider: 'Stability AI',
      description: 'High quality, highly customizable',
      price_per_image: 0.003,
      category: 'image',
    },
    {
      id: 'playground-v2.5',
      name: 'Playground v2.5',
      provider: 'Playground AI',
      description: 'Aesthetic, artistic style generation',
      price_per_image: 0.002,
      category: 'image',
    },
    {
      id: 'sdxl-turbo',
      name: 'SDXL Turbo',
      provider: 'Stability AI',
      description: 'Real-time generation, near-instant results',
      price_per_image: 0.001,
      category: 'image',
    },
    {
      id: 'dreamshaper-xl',
      name: 'DreamShaper XL',
      provider: 'Lykon',
      description: 'Versatile, great for creative concepts',
      price_per_image: 0.002,
      category: 'image',
    },
  ];

  return NextResponse.json({ models });
}
