export default {
  apps: [
    {
      name: 'nuxt-app',
      script: '.output/server/index.mjs',
      cwd: '/srv/gdyunzhu.com',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8000,
        HOST: '127.0.0.1'
      },
      error_file: '/var/log/pm2/nuxt-app-error.log',
      out_file: '/var/log/pm2/nuxt-app-out.log',
      log_file: '/var/log/pm2/nuxt-app-combined.log',
      time: true
    }
  ]
};
