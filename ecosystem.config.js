module.exports = {
  apps: [{
    name: 'note-gen-docs',
    script: 'server.js',
    cwd: '/root/note-gen-docs',
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      NODE_OPTIONS: '--max-old-space-size=2048'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G'
  }]
};
