import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Image Generator — Powered by NexaAPI',
  description:
    'Generate stunning AI images with Flux Pro, Stable Diffusion, and 50+ models. Powered by NexaAPI — 5× cheaper than official pricing.',
  keywords: 'AI image generator, Flux Pro, Stable Diffusion, NexaAPI, text to image',
  openGraph: {
    title: 'AI Image Generator — Powered by NexaAPI',
    description: 'Generate stunning AI images with 50+ models at 1/5 the official price.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
