module.exports = {
  apps: [{
    name: 'note-gen-docs',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 8080',
    cwd: '/root/note-gen-docs/current',
    exec_mode: 'cluster',
    instances: 2,
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
