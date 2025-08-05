#!/bin/bash

echo "🧹 Cleaning and rebuilding Vocoder SDK..."

# Clean all dist directories
echo "🗑️  Cleaning dist directories..."
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true

# Clean node_modules
echo "🗑️  Cleaning node_modules..."
find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true

# Clean pnpm store for this project
echo "🗑️  Cleaning pnpm store..."
pnpm store prune 2>/dev/null || true

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
pnpm install

# Build packages
echo "🔨 Building packages..."
pnpm build

echo "✅ Clean and build complete!"
echo ""
echo "🎯 Next steps:"
echo "1. cd examples/dev-env"
echo "2. ./setup.sh"
echo "3. pnpm dev" 