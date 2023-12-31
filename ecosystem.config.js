module.exports = {
  apps: [{
    name: 'next-app',
    script: 'npm',
    args: "start",
    cwd: "/var/www/next-app/",
    instances: 2,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
    }
  }]
};
