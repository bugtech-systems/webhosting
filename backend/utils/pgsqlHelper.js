require('dotenv').config()
const { Pool } = require('pg');
const { exec } = require('child_process');
let storagePath = process.env.STORAGE_PATH;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'colposcopy_dev',
  password: 'Wildcrack@420',
  port: 5432,
});

// Execute shell script to create PostgreSQL user and database
function executeScript() {
  const scriptPath = `${storagePath}/create_user_database.sh`; // Update with your script path
  const command = `bash ${scriptPath} ${pool.options.user} ${pool.options.password}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${stderr}`);
    } else {
      console.log(`Script output: ${stdout}`);
    }
  });
}




module.exports = {
    executeScript: executeScript
}