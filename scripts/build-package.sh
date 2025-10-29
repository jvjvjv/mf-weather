#!/bin/bash

# Build the Next.js app with Module Federation
echo "Building Next.js app with Module Federation..."
npm run build

# Create dist directory
echo "Creating dist directory..."
rm -rf dist
mkdir -p dist

# Copy the federated module files
echo "Copying federated module files..."
cp -r .next/static dist/

# Copy the remoteEntry.js to root of dist
echo "Setting up remoteEntry..."
cp .next/static/chunks/remoteEntry.js dist/remoteEntry.js

# Create a simple package info file
echo "Creating module info..."
cat > dist/remote-entry.json << EOF
{
  "name": "@jvjvjv/weather",
  "remoteEntry": "./remoteEntry.js",
  "exposedModules": {
    "./WeatherWidget": "Exposed weather widget component"
  }
}
EOF

echo "✅ Build complete! Package ready for publishing."
echo "📦 Output directory: ./dist"
