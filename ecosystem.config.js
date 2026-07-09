module.exports = {
  apps: [{
    name: 'note-gen-docs',
    script: 'server.js',
    cwd: '/root/note-gen-docs/current',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      NODE_OPTIONS: '--max-old-space-size=2048'
    },
    autorestart: true,
    watch: false,
    max_memory_restart: '2G'
  }]
};
