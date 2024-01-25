// File: deploy-api.js
require('dotenv').config()
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3003;

const upload = multer({ dest: '/var/www' });

app.get('/', async (req, res) => {
    try {
        res.send('NodeJS Sample Project Yow!');
    } catch (err) {
        res.status(400).json({ message: 'Something went wrong', err })
    }
});

app.post('/ssl', async (req, res) => {
    const { subdomain } = req.body;
    try {

        const filePerm = spawn('certbot', ['--nginx', '-d', `${subdomain}.bugtech.solutions`]);

        res.send('Ssl Certified Successful');
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Something went wrong', err })

    }

});

app.post('/deploy/react', upload.single('build'), async (req, res) => {
    const { subdomain } = req.body;
    try {

        // Unzip the build file
        const unzipPath = path.join("/var/www", subdomain);
        await fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: unzipPath }));

        const godaddyConfig = {
            apiKey: 'fYWBbWKGFakp_CiigC76J7BgpjCmydCvLHH',
            secret: '46qcQqxFxfWPMMbj3XoCvy',
            domain: 'bugtech.solutions',
            records: [
                {
                    type: 'CNAME',
                    name: subdomain,
                    data: 'bugtech.solutions',
                    ttl: 600
                },
            ]
        };

        fs.writeFileSync('config.json', JSON.stringify(godaddyConfig, null, 2));



        // Write Nginx server block config
        const nginxConfig = `
                    server {
                        listen 80;
                        listen [::]:80;
                
                        # SSL configuration
                        #
                        # listen 443 ssl default_server;
                        # listen [::]:443 ssl default_server;
                        #
                        # Note: You should disable gzip for SSL traffic.
                        # See: https://bugs.debian.org/773332
                        #
                        # Read up on ssl_ciphers to ensure a secure configuration.
                        # See: https://bugs.debian.org/765782
                        #
                        # Self signed certs generated by the ssl-cert package
                        # Don't use them in a production server!
                        #
                        # include snippets/snakeoil.conf;
                
                        root ${unzipPath};
                    index index.html index.htm index.nginx-debian.html;
                
                        server_name ${subdomain}.bugtech.solutions;
                
                        location / {
                                # First attempt to serve request as file, then
                                # as directory, then fall back to displaying a 404.
                                try_files $uri $uri/ /index.html;
                        }
                
                }
              `;






        const nginxConfigPath = `/etc/nginx/sites-available/${subdomain}.bugtech.solutions`;
        const siteEnabledPath = `/etc/nginx/sites-enabled/${subdomain}.bugtech.solutions`;
        fs.writeFileSync(nginxConfigPath, nginxConfig);
        if (fs.existsSync(siteEnabledPath)) {
            // Remove the existing symbolic link
            fs.unlinkSync(siteEnabledPath);
            console.log(`Existing symbolic link removed: ${siteEnabledPath}`);
        }



        const filePerm = spawn('chown', ['www-data:www-data', unzipPath]);
        // Create symbolic link to enable the site
        filePerm.stdout.on('data', (data) => console.log(`Site Enabled: ${data}`));
        filePerm.stderr.on('data', (data) => console.error(`Site Enable Error: ${data}`));


        const enableSite = spawn('ln', ['-s', nginxConfigPath, siteEnabledPath]);
        // Create symbolic link to enable the site
        enableSite.stdout.on('data', (data) => console.log(`Site Enabled: ${data}`));
        enableSite.stderr.on('data', (data) => console.error(`Site Enable Error: ${data}`));

        // Update GoDaddy DNS records
        const updateDns = spawn('godaddy-dns', ['-c', 'config.json']);
        updateDns.stdout.on('data', (data) => console.log(`GoDaddy DNS Update: ${data}`));
        updateDns.stderr.on('data', (data) => console.error(`GoDaddy DNS Update Error: ${data}`));

        // Reload Nginx
        const reloadNginx = spawn('service', ['nginx', 'reload']);
        reloadNginx.stdout.on('data', (data) => console.log(`Nginx Reloaded: ${data}`));
        reloadNginx.stderr.on('data', (data) => console.error(`Nginx Reload Error: ${data}`));

        res.send('Deployment Successful');
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Something went wrong', err })

    }

});

app.post('/deploy/node', upload.single('zipFile'), async (req, res) => {
    const { projectName } = req.body;
    try {

    let rand = new  Math.floor(Math.random()*10);
    let hostName = `${projectName}-${rand}${rand}-api`;

        // Unzip the build file
        const unzipPath = path.join("/var/www", hostName);
        await fs.createReadStream(req.file.path).pipe(unzipper.Extract({ path: hostName }));

        // Write Nginx server block config
        const nginxConfig = `
                    server {
                        listen 80;
                        listen [::]:80;
                
                        # SSL configuration
                        #
                        # listen 443 ssl default_server;
                        # listen [::]:443 ssl default_server;
                        #
                        # Note: You should disable gzip for SSL traffic.
                        # See: https://bugs.debian.org/773332
                        #
                        # Read up on ssl_ciphers to ensure a secure configuration.
                        # See: https://bugs.debian.org/765782
                        #
                        # Self signed certs generated by the ssl-cert package
                        # Don't use them in a production server!
                        #
                        # include snippets/snakeoil.conf;
                
                        # root ${unzipPath};
                        # index index.html index.htm index.nginx-debian.html ;
                
                        server_name ${hostName}.bugtech.solutions;
                
                        location / {
                            proxy_pass http://localhost:3500; #whatever port your app runs on
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade $http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host $host;
                            proxy_cache_bypass $http_upgrade;
                        }
                }
              `;






        const nginxConfigPath = `/etc/nginx/sites-available/${hostName}.bugtech.solutions`;
        const siteEnabledPath = `/etc/nginx/sites-enabled/${hostName}.bugtech.solutions`;
        fs.writeFileSync(nginxConfigPath, nginxConfig);
        if (fs.existsSync(siteEnabledPath)) {
            // Remove the existing symbolic link
            fs.unlinkSync(siteEnabledPath);
            fs.unlinkSync(req.file.path);

            console.log(`Existing symbolic link removed: ${siteEnabledPath}`);
        }



        const godaddyConfig = {
            apiKey: 'fYWBbWKGFakp_CiigC76J7BgpjCmydCvLHH',
            secret: '46qcQqxFxfWPMMbj3XoCvy',
            domain: 'bugtech.solutions',
            records: [
                {
                    type: 'CNAME',
                    name: hostName,
                    data: 'bugtech.solutions',
                    ttl: 600
                },
            ]
        };

        fs.writeFileSync('config.json', JSON.stringify(godaddyConfig, null, 2));





        const filePerm = spawn('chown', ['www-data:www-data', unzipPath]);
        // Create symbolic link to enable the site
        filePerm.stdout.on('data', (data) => console.log(`Site Enabled: ${data}`));
        filePerm.stderr.on('data', (data) => console.error(`Site Enable Error: ${data}`));


        const enableSite = spawn('ln', ['-s', nginxConfigPath, siteEnabledPath]);
        // Create symbolic link to enable the site
        enableSite.stdout.on('data', (data) => console.log(`Site Enabled: ${data}`));
        enableSite.stderr.on('data', (data) => console.error(`Site Enable Error: ${data}`));

        const reloadNginx = spawn('service', ['nginx', 'reload']);
        reloadNginx.stdout.on('data', (data) => console.log(`Nginx Reloaded: ${data}`));
        reloadNginx.stderr.on('data', (data) => console.error(`Nginx Reload Error: ${data}`));

        // Update GoDaddy DNS records
        const updateDns = spawn('godaddy-dns', ['-c', 'config.json']);
        updateDns.stdout.on('data', (data) => console.log(`GoDaddy DNS Update: ${data}`));
        updateDns.stderr.on('data', (data) => console.error(`GoDaddy DNS Update Error: ${data}`));

        // Reload Nginx
        const reloadNginx1 = spawn('service', ['nginx', 'reload']);
        reloadNginx1.stdout.on('data', (data) => console.log(`Nginx Reloaded: ${data}`));
        reloadNginx1.stderr.on('data', (data) => console.error(`Nginx Reload Error: ${data}`));

        res.send('Deployment Successful');
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Something went wrong', err })

    }

});

app.listen(port, () => console.log(`Deployment API listening at http://localhost:${port}`));
