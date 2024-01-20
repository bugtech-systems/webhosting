const cron = require('node-cron');
const { exec } = require('child_process');

// Define the cron schedule (every 10 minutes)
const cronSchedule = '*/10 * * * * *';

// Command to restart PostgreSQL service
const restartPostgresCommand = 'systemctl restart postgresql';

// Create a cron job
cron.schedule(cronSchedule, () => {
  console.log('Restarting PostgreSQL service...');
  
  // Execute the command to restart PostgreSQL
  exec(restartPostgresCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`PostgreSQL service restarted successfully: ${stdout}`);
  });
}, {
  scheduled: true,
  timezone: 'America/New_York', // Specify your timezone (e.g., 'America/New_York')
});

console.log('Cron job server started.');
