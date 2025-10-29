import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(() => import('@/components/WeatherWidget'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Weather Module Federation Demo</h1>
      <p>This module can be consumed by other applications via Module Federation</p>
      <WeatherWidget />
    </main>
  );
}
