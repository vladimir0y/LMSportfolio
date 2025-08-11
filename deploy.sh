#!/bin/bash

# Deployment script for LMS Portfolio
echo "🚀 Starting deployment process..."

# Navigate to frontend directory
cd frontend

# Clean install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run build to check for any issues
echo "🔨 Building project..."
npm run build

# If build succeeds, deploy
if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo "🌐 Deploying to Vercel..."
    vercel --prod
else
    echo "❌ Build failed! Please fix the errors above."
    exit 1
fi
