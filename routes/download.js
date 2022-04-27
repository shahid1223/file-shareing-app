const express = require('express');
const router = express.Router();
const File = require('../models/File');

router.get('/downloade/:uuid', async (req, res) => {
    try {
        const file = await File.findOne(
            {
                uuid: req.params.uuid
            }
        );

        if (!file) {
            return res.render('download', { error: 'file not found' })
        };
        const filename = `${__dirname}/../${file.path}`
        console.log(filename)
        res.download(filename)
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router