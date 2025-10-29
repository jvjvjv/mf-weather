import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(() => import('@/components/WeatherWidget'), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          marginBottom: '2rem' 
        }}>
          <h1 style={{ marginTop: 0 }}>Weather Widget - Module Federation Remote</h1>
          <p>This is a standalone weather widget that can be consumed by other applications using Module Federation.</p>
          
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px', 
            margin: '1rem 0' 
          }}>
            <p style={{ margin: '0.5rem 0' }}><strong>Module Name:</strong> weather</p>
            <p style={{ margin: '0.5rem 0' }}><strong>Exposed Component:</strong> ./WeatherWidget</p>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Remote Entry:</strong> {typeof window !== 'undefined' ? window.location.origin : '[your-url]'}/_next/static/chunks/remoteEntry.js
            </p>
          </div>
          
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            See the README.md file for integration instructions.
          </p>
        </div>
        
        <WeatherWidget />
      </div>
    </main>
  );
}

// Disable static generation for this page
export const dynamicParams = true;
export const revalidate = 0;
