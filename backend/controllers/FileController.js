require('dotenv').config();
const path = require('path');
const File = require('../models/FileModel');
const axios = require('axios');
const cheerio = require('cheerio');
const { getFiles } = require('../utils/helpers');


module.exports = {
    uploadFile: async (req, res) => {
        let { projectName } = req.query;
        try {
            const file = new File({ projectName, filename: req.file.filename, path: req.file.path, user: req.user?._id, host: process.env.DOMAIN_HOST });
            await file.save();

            res.status(201).json({ message: 'File uploaded successfully', file: req.file });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message });
        }
    },
    getUrlMetadata: async (req, res) => {
        const url = req.query.url;

        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const title = $('head title').text();
            const description = $('meta[name="description"]').attr('content') || '';
            const image = $('meta[property="og:image"]').attr('content') || '';

            res.json({ title, description, image });
        } catch (error) {
            console.error('Error fetching URL:', error.message);

            let errorMessage = 'Error fetching URL metadata.';
            if (error.response && error.response.status) {
                errorMessage += ` Status: ${error.response.status}}`;
            }

            res.status(500).json({ error: errorMessage });
        }

    },
    getFiles: async (req, res) => {
        let user = req.user;
        try {
            let sites = await File.find({ user: user._id, isDeleted: false })

            res.status(200).json(sites)

        } catch (error) {

            res.status(500).json({ error: 'Something went wrong!' });
        }
    },
    deleteSite: async (req, res) => {
        let user = req.user;
        let { projectName } = req.body;
        try {
            let site = await File.findOne({ user: user._id, projectName, isDeleted: false })

            if (!site) return res.status(404).json({ message: 'Site not found!' })

            site.isDeleted = true;
            site.save();
            res.status(200).json({ message: 'Site Deleted!' })

        } catch (error) {

            res.status(500).json({ error: 'Something went wrong!' });
        }
    },
    getFolderFiles: async (req, res) => {
        let folderPath = req.query.path;

        try {
            if (!folderPath) return res.status(404).json({ message: 'Folder Path is required!' });

            let filePath = path.join(process.cwd(), "uploads", folderPath)
            let contents = await getFiles(filePath, [])
            res.status(200).json(contents)

        } catch (error) {
            res.status(500).json({ error: 'Something went wrong!' });
        }
    },
    checkAvailability: async (req, res) => {
        let { projectName } = req.body;
        try {
            console.log(req.body, 'RES BODY', !projectName)
            if (!projectName) {
                return res.status(200).json({ availability: false })
            }

            let available = await File.findOne({ $and: [{ projectName: projectName }, { isDeleted: false }] })

            console.log(available, 'IS AVAILABLE')

            res.status(200).json({ availability: available ? false : true })

        } catch (error) {

            res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    secureSsl: async (req, res) => {
        let { projectName } = req.body;

        if (!projectName) return res.status(404).json({ message: 'projectName is required!' })


        let site = await File.findOne({ projectName, isDeleted: false, ssl: false });
        if (!site) return res.status(404).json({ error: 'Site not found!' });


        axios.post('https://bugtech.solutions/api/ssl', { subdomain: projectName })
            .then(a => {
                site.ssl = true;
                site.save();
                return res.status(200).json({ message: 'Ssl Secured!', data: a.data })
            })
            .catch(err => {
                res.status(500).json({ error: 'Something went wrong!' });
            })
    }
};
