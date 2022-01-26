module.exports = {
  apps: [
    {
      name: 'LoveRead',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/.bin/next',
      args: 'start -p 3022'
    }
  ]
}