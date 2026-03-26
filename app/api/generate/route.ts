import { NextRequest, NextResponse } from 'next/server';

// NexaAPI endpoint — OpenAI-compatible images endpoint
const NEXAAPI_BASE = 'https://nexa-api.com';

interface GenerateRequest {
  prompt: string;
  negative_prompt?: string;
  model: string;
  width?: number;
  height?: number;
  num_images?: number;
}

/**
 * POST /api/generate
 * Proxies image generation requests to NexaAPI.
 * The NEXAAPI_KEY environment variable must be set in Vercel.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.NEXAAPI_KEY;

  if (!apiKey || apiKey === 'your_nexaapi_key_here') {
    return NextResponse.json(
      {
        error:
          'NEXAAPI_KEY is not configured. Please set it in your Vercel environment variables. Get a free key at https://nexa-api.com',
      },
      { status: 500 }
    );
  }

  let body: GenerateRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { prompt, negative_prompt, model, width = 1024, height = 1024, num_images = 1 } = body;

  if (!prompt?.trim()) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  // Clamp values for safety
  const safeNumImages = Math.min(Math.max(Number(num_images) || 1, 1), 4);
  const safeWidth = Math.min(Math.max(Number(width) || 1024, 256), 2048);
  const safeHeight = Math.min(Math.max(Number(height) || 1024, 256), 2048);

  try {
    // NexaAPI uses OpenAI-compatible /v1/images/generations endpoint
    const nexaResponse = await fetch(`${NEXAAPI_BASE}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt: prompt.trim(),
        negative_prompt: negative_prompt?.trim() || undefined,
        n: safeNumImages,
        size: `${safeWidth}x${safeHeight}`,
        response_format: 'url',
      }),
    });

    if (!nexaResponse.ok) {
      const errorText = await nexaResponse.text();
      let errorMessage = `NexaAPI error (${nexaResponse.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch {
        // Use status-based message
        if (nexaResponse.status === 401) {
          errorMessage = 'Invalid API key. Please check your NEXAAPI_KEY.';
        } else if (nexaResponse.status === 429) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (nexaResponse.status === 402) {
          errorMessage = 'Insufficient credits. Please top up your NexaAPI account.';
        }
      }
      return NextResponse.json({ error: errorMessage }, { status: nexaResponse.status });
    }

    const nexaData = await nexaResponse.json();

    // Extract image URLs from OpenAI-compatible response format
    // Response: { data: [{ url: "..." }, ...] }
    const images: string[] = (nexaData.data || [])
      .map((item: { url?: string; b64_json?: string }) => item.url || item.b64_json)
      .filter(Boolean);

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images returned from NexaAPI. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ images, model, prompt });
  } catch (err: unknown) {
    console.error('[/api/generate] Error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
