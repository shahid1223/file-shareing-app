const express = require('express');
const router = express.Router();
const File = require('../models/File');

router.get('/files/:uuid', async (req, res) => {
    try {
        const file = await File.findOne(
            {
                uuid: req.params.uuid
            }
        );

        if (!file) {
            return res.render('download', { error: 'file not found' })
        };

        res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/api/downloade/${file.uuid}`
        })

    } catch (error) {
        console.error(error.message);
        return res.render('download', { error: 'Something went wrong.' })
    }
});

module.exports = router