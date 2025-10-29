# MF Weather - Module Federation Weather Widget

A Next.js 15 application that serves as a remote module for Module Federation, displaying a 5-day weather forecast using Material-UI.

## Features

- ✅ Next.js 15 with TypeScript
- ✅ Module Federation support via @module-federation/nextjs-mf
- ✅ Material-UI (MUI) design system
- ✅ 5-day weather forecast
- ✅ Real-time weather data from Open-Meteo API (no API key required)
- ✅ Responsive design
- ✅ Ready to be consumed as a federated module

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Module Federation

This application exposes a `WeatherWidget` component that can be consumed by other applications.

### Configuration

The module is configured in `next.config.js`:

- **Module Name**: `weather`
- **Exposed Component**: `./WeatherWidget` → `./components/WeatherWidget.tsx`
- **Remote Entry**: `static/chunks/remoteEntry.js`

### Consuming the Module

To consume this module in another Next.js application with Module Federation:

1. Add this remote to your `next.config.js`:

```javascript
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        remotes: {
          weather: 'weather@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        // ... other config
      })
    );
    return config;
  },
};
```

2. Use the component in your application:

```tsx
import dynamic from 'next/dynamic';

const WeatherWidget = dynamic(() => import('weather/WeatherWidget'), {
  ssr: false,
});

export default function MyPage() {
  return (
    <div>
      <WeatherWidget />
    </div>
  );
}
```

## Weather Data

The widget uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. This API:

- Requires no API key
- Provides free weather forecasts
- Is GDPR compliant
- Default location: New York, NY (can be customized)

## Technologies

- **Next.js 15**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Material-UI**: UI component library
- **@module-federation/nextjs-mf**: Module Federation for Next.js
- **Emotion**: CSS-in-JS styling (MUI dependency)

## Shared Dependencies

The following dependencies are shared across federated modules:

- `react`
- `react-dom`
- `@mui/material`
- `@emotion/react`
- `@emotion/styled`

## License

ISC
