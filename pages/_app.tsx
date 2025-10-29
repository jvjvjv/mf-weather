import type { AppProps } from 'next/app';
import '../styles/globals.css';

// Import MUI providers dynamically to avoid SSR issues
import dynamic from 'next/dynamic';
import { ReactElement, ReactNode } from 'react';

const MuiProvider = dynamic(
  () => import('@/components/MuiProvider'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MuiProvider>
      <Component {...pageProps} />
    </MuiProvider>
  );
}
