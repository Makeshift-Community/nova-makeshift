module.exports = {
  apps: [
    {
      name: "nova-makeshift",
      script: "dist/server.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
