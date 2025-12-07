#!/bin/bash

# Image Optimization Script for AB AAS App
# This script optimizes all images in the assets folder

echo "🖼️  Starting image optimization..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    echo "Please install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Create backup directory
BACKUP_DIR="assets-backup-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup in $BACKUP_DIR..."
cp -r assets "$BACKUP_DIR"

# Optimize PNG files
echo "🔧 Optimizing PNG files..."
find assets -name "*.png" -type f | while read file; do
    echo "  Processing: $file"
    # Reduce quality and strip metadata
    convert "$file" -strip -quality 85 -resize '100%>' "$file"
done

# Optimize JPG files
echo "🔧 Optimizing JPG files..."
find assets -name "*.jpg" -type f -o -name "*.jpeg" -type f | while read file; do
    echo "  Processing: $file"
    # Reduce quality and strip metadata
    convert "$file" -strip -quality 85 -resize '100%>' "$file"
done

# Optimize WEBP files
echo "🔧 Optimizing WEBP files..."
find assets -name "*.webp" -type f | while read file; do
    echo "  Processing: $file"
    # Reduce quality
    convert "$file" -strip -quality 85 "$file"
done

# Calculate size reduction
ORIGINAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
NEW_SIZE=$(du -sh assets | cut -f1)

echo ""
echo "✅ Optimization complete!"
echo "📊 Original size: $ORIGINAL_SIZE"
echo "📊 New size: $NEW_SIZE"
echo "💾 Backup saved in: $BACKUP_DIR"
echo ""
echo "To restore backup: rm -rf assets && mv $BACKUP_DIR assets"
