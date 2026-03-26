'use client';

import { useState } from 'react';
import styles from './page.module.css';

// Available models with display info
const MODELS = [
  {
    id: 'flux-pro-1.1',
    name: 'Flux Pro 1.1',
    provider: 'Black Forest Labs',
    description: 'State-of-the-art photorealistic quality',
    price: '$0.004/img',
    badge: '🔥 Popular',
  },
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    provider: 'Black Forest Labs',
    description: 'Ultra-fast generation, great for prototyping',
    price: '$0.001/img',
    badge: '⚡ Fast',
  },
  {
    id: 'stable-diffusion-3.5',
    name: 'Stable Diffusion 3.5',
    provider: 'Stability AI',
    description: 'High quality, highly customizable',
    price: '$0.003/img',
    badge: '',
  },
  {
    id: 'playground-v2.5',
    name: 'Playground v2.5',
    provider: 'Playground AI',
    description: 'Aesthetic, artistic style generation',
    price: '$0.002/img',
    badge: '✨ Aesthetic',
  },
  {
    id: 'sdxl-turbo',
    name: 'SDXL Turbo',
    provider: 'Stability AI',
    description: 'Real-time generation, near-instant results',
    price: '$0.001/img',
    badge: '',
  },
  {
    id: 'dreamshaper-xl',
    name: 'DreamShaper XL',
    provider: 'Lykon',
    description: 'Versatile, great for creative concepts',
    price: '$0.002/img',
    badge: '',
  },
];

const ASPECT_RATIOS = [
  { label: '1:1 Square', value: '1:1', width: 1024, height: 1024 },
  { label: '16:9 Landscape', value: '16:9', width: 1344, height: 768 },
  { label: '9:16 Portrait', value: '9:16', width: 768, height: 1344 },
  { label: '4:3 Standard', value: '4:3', width: 1152, height: 896 },
];

interface GeneratedImage {
  url: string;
  prompt: string;
  model: string;
  timestamp: number;
}

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [numImages, setNumImages] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          negative_prompt: negativePrompt.trim() || undefined,
          model: selectedModel,
          width: aspectRatio.width,
          height: aspectRatio.height,
          num_images: numImages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      // Add new images to the gallery
      const newImages: GeneratedImage[] = data.images.map((url: string) => ({
        url,
        prompt: prompt.trim(),
        model: selectedModel,
        timestamp: Date.now(),
      }));

      setGeneratedImages((prev) => [...newImages, ...prev]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Generation failed. Please try again.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const selectedModelInfo = MODELS.find((m) => m.id === selectedModel);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="https://nexa-api.com" target="_blank" rel="noopener noreferrer" className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span>NexaAPI</span>
          </a>
          <div className={styles.headerRight}>
            <span className={styles.badge}>AI Image Generator</span>
            <a
              href="https://nexa-api.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Get API Key →
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Generate AI Images
            <span className={styles.heroAccent}> Instantly</span>
          </h1>
          <p className={styles.heroSubtitle}>
            50+ models · OpenAI-compatible · 5× cheaper than official pricing
          </p>
        </div>

        {/* Generator Panel */}
        <div className={styles.panel}>
          {/* Left: Controls */}
          <div className={styles.controls}>
            {/* Prompt */}
            <div className={styles.field}>
              <label className={styles.label}>
                Prompt
                <span className={styles.hint}>Cmd+Enter to generate</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="A majestic dragon soaring over a neon-lit cyberpunk city at night, ultra-detailed, cinematic lighting..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={4}
              />
            </div>

            {/* Model Selector */}
            <div className={styles.field}>
              <label className={styles.label}>Model</label>
              <div className={styles.modelGrid}>
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    className={`${styles.modelCard} ${selectedModel === model.id ? styles.modelCardActive : ''}`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className={styles.modelCardTop}>
                      <span className={styles.modelName}>{model.name}</span>
                      {model.badge && <span className={styles.modelBadge}>{model.badge}</span>}
                    </div>
                    <span className={styles.modelProvider}>{model.provider}</span>
                    <span className={styles.modelPrice}>{model.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className={styles.field}>
              <label className={styles.label}>Aspect Ratio</label>
              <div className={styles.ratioRow}>
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.value}
                    className={`${styles.ratioBtn} ${aspectRatio.value === ratio.value ? styles.ratioBtnActive : ''}`}
                    onClick={() => setAspectRatio(ratio)}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              className={styles.advancedToggle}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? '▲' : '▼'} Advanced Options
            </button>

            {showAdvanced && (
              <div className={styles.advancedPanel}>
                {/* Negative Prompt */}
                <div className={styles.field}>
                  <label className={styles.label}>Negative Prompt</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="blurry, low quality, distorted, watermark..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    rows={2}
                  />
                </div>

                {/* Number of Images */}
                <div className={styles.field}>
                  <label className={styles.label}>
                    Number of Images: <strong>{numImages}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={numImages}
                    onChange={(e) => setNumImages(Number(e.target.value))}
                    className={styles.slider}
                  />
                  <div className={styles.sliderLabels}>
                    <span>1</span><span>2</span><span>3</span><span>4</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner} />
                  Generating...
                </>
              ) : (
                <>⚡ Generate Image</>
              )}
            </button>

            {/* Model Info */}
            {selectedModelInfo && (
              <div className={styles.modelInfo}>
                <strong>{selectedModelInfo.name}</strong> — {selectedModelInfo.description}
                <br />
                <span className={styles.textMuted}>
                  {selectedModelInfo.price} via NexaAPI (5× cheaper than official)
                </span>
              </div>
            )}
          </div>

          {/* Right: Gallery */}
          <div className={styles.gallery}>
            {generatedImages.length === 0 ? (
              <div className={styles.galleryEmpty}>
                <div className={styles.galleryEmptyIcon}>🎨</div>
                <p>Your generated images will appear here</p>
                <p className={styles.textMuted}>Enter a prompt and click Generate</p>
              </div>
            ) : (
              <div className={styles.imageGrid}>
                {generatedImages.map((img, idx) => (
                  <div key={idx} className={styles.imageCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.prompt}
                      className={styles.generatedImage}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlay}>
                      <p className={styles.imagePrompt}>{img.prompt}</p>
                      <div className={styles.imageActions}>
                        <span className={styles.imageModel}>{img.model}</span>
                        <a
                          href={img.url}
                          download={`nexaapi-${img.timestamp}.png`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.downloadBtn}
                        >
                          ↓ Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Powered by{' '}
          <a href="https://nexa-api.com" target="_blank" rel="noopener noreferrer">
            NexaAPI
          </a>{' '}
          — Unified AI Inference API · 50+ Models · 5× Cheaper
        </p>
        <p className={styles.textMuted}>
          Deploy your own instance →{' '}
          <a
            href="https://github.com/diwushennian4955/nexa-ai-image-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
