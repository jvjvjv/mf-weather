# @jvjvjv/weather - Module Federation Weather Widget

A standalone weather widget component built with Next.js 15 and Material-UI, distributed as an NPM package for consumption via Module Federation in micro-frontend architectures.

## Features

- 🌤️ 5-day weather forecast
- 📍 Default location: New York, NY (customizable)
- 🎨 Material-UI styled components
- 🔄 Real-time data from Open-Meteo API (no API key required)
- 📦 Distributed as NPM package
- ✅ TypeScript support
- 🎯 Production-ready
- 📱 Responsive design

## Installation

```bash
npm install @jvjvjv/weather
```

## Quick Start

### For Consumers (Host Applications)

#### Step 1: Install the Package

```bash
npm install @jvjvjv/weather
```

Also ensure you have the peer dependencies:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

#### Step 2: Configure Module Federation

Add this to your Next.js application's `next.config.js`:

```javascript
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          "@jvjvjv/weather": "npm:@jvjvjv/weather",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
          "@mui/material": { singleton: true, requiredVersion: false },
          "@emotion/react": { singleton: true, requiredVersion: false },
          "@emotion/styled": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
```

#### Step 3: Import and Use the Component

```typescript
import dynamic from "next/dynamic";

const WeatherWidget = dynamic(() => import("@jvjvjv/weather/WeatherWidget"), {
  ssr: false,
});

export default function MyPage() {
  return (
    <div>
      <h1>My Application</h1>
      <WeatherWidget />
    </div>
  );
}
```

### For Development (Running the Package Locally)

If you're developing or testing the package itself:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Development mode:**

   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:3000`

3. **Build the package:**
   ```bash
   npm run build:mf
   ```

## Publishing to NPM

See [NPM_PUBLISHING.md](./NPM_PUBLISHING.md) for detailed instructions on publishing this package to NPM.

Quick publish:

```bash
npm run build:mf  # Build the package
npm publish       # Publish to NPM
```

## Package Structure

When published, the package contains:

```
@jvjvjv/weather/
├── dist/
│   ├── remoteEntry.js       # Main entry point
│   ├── static/              # Federated module chunks
│   └── types/
│       └── index.d.ts       # TypeScript definitions
└── README.md
```

## Module Federation Configuration

### Module Name

`@jvjvjv/weather`

### Exposed Modules

| Module Path       | Component     | Description                      |
| ----------------- | ------------- | -------------------------------- |
| `./WeatherWidget` | WeatherWidget | 5-day weather forecast component |

### Shared Dependencies

The following dependencies are shared across federated modules with singleton configuration:

- `react` - UI library
- `react-dom` - React DOM renderer
- `@mui/material` - Material-UI component library
- `@emotion/react` - Emotion styling library
- `@emotion/styled` - Emotion styled components

**Peer Dependencies:**
These should be installed in your host application:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Example Host Application Setup

### 1. Install Dependencies

```bash
# Install the weather widget
npm install @jvjvjv/weather

# Install Module Federation plugin
npm install @module-federation/nextjs-mf

# Ensure peer dependencies are installed
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

- `@emotion/react` - Emotion styling library
- `@emotion/styled` - Emotion styled components

## Example Host Application Setup

Here's a complete example for setting up a host application:

### 1. Install Dependencies

```bash
npm install @module-federation/nextjs-mf
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

### 2. Update next.config.js

```javascript
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "myApp",
        remotes: {
          "@jvjvjv/weather": "npm:@jvjvjv/weather",
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          "react-dom": { singleton: true, requiredVersion: false },
          "@mui/material": { singleton: true, requiredVersion: false },
          "@emotion/react": { singleton: true, requiredVersion: false },
          "@emotion/styled": { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
```

### 3. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "NEXT_PRIVATE_LOCAL_WEBPACK=true next dev -p 3001",
    "build": "NEXT_PRIVATE_LOCAL_WEBPACK=true next build",
    "start": "next start -p 3001"
  }
}
```

### 4. Create a Page Using the Widget

```typescript
// pages/weather.tsx
import dynamic from "next/dynamic";

const WeatherWidget = dynamic(() => import("@jvjvjv/weather/WeatherWidget"), {
  ssr: false,
  loading: () => <p>Loading weather widget...</p>,
});

export default function WeatherPage() {
  return (
    <main>
      <h1>Weather Dashboard</h1>
      <WeatherWidget />
    </main>
  );
}
```

## Troubleshooting

### Common Issues

1. **Module not found error:**

   - Ensure the remote app is running at the specified URL
   - Check that the remote entry path is correct
   - Verify CORS headers are properly configured

2. **Version conflicts:**

   - Make sure both apps use compatible versions of React and shared libraries
   - Set `singleton: true` for shared dependencies

3. **Build errors:**

   - Add `NEXT_PRIVATE_LOCAL_WEBPACK=true` to your scripts
   - Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

4. **Runtime errors:**
   - Check browser console for detailed error messages
   - Ensure all shared dependencies are properly configured
   - Verify the remote entry is accessible (check Network tab)

## Development Tips

- Run the remote app on port 3000 and your host app on a different port (e.g., 3001)
- Use environment variables for different remote URLs in dev/staging/prod
- Test the widget standalone first at `http://localhost:3000`
- Use React DevTools to debug component rendering

## Weather Data

## Weather Data

The widget uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. This API:

- Requires no API key
- Provides free weather forecasts
- Is GDPR compliant
- Has fallback to mock data if the API is unavailable
- Default location: New York, NY (can be customized by modifying the component)

## API Reference

### WeatherWidget Props

The WeatherWidget component currently doesn't accept props and uses a default location (New York, NY). To customize the location, you would need to modify the component to accept location props.

## Technologies

- **Next.js 15**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Material-UI**: UI component library
- **@module-federation/nextjs-mf**: Module Federation for Next.js
- **Emotion**: CSS-in-JS styling (MUI dependency)
- **Webpack 5**: Module bundler with Module Federation support

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
