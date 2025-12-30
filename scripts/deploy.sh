#!/bin/bash

set -e

APP_NAME="note-gen-docs"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/var/backups/$APP_NAME"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 Starting deployment for $APP_NAME..."

# Create backup directory if not exists
mkdir -p $BACKUP_DIR

# Backup current deployment
if [ -d "$APP_DIR/.next" ]; then
    echo "📦 Creating backup..."
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C $APP_DIR .next
    
    # Keep only last 5 backups
    cd $BACKUP_DIR
    ls -t backup_*.tar.gz | tail -n +6 | xargs -r rm
fi

# Extract new deployment
echo "📂 Extracting deployment package..."
cd $APP_DIR
tar -xzf /tmp/deploy.tar.gz
rm /tmp/deploy.tar.gz

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Reload PM2
echo "🔄 Reloading PM2..."
pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
pm2 save

echo "✅ Deployment completed successfully!"
echo "📊 Application status:"
pm2 status $APP_NAME
