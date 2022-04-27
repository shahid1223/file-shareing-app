const express = require('express');
const router = express.Router();
const uploads = require('../middleware/fileupload');
const File = require('../models/File');
const { v4: uuid4 } = require('uuid');
const sendMail = require('../services/emailServices');

router.post('/files', async (req, res) => {

    // Store files into uploads folder
    uploads(req, res, async (err) => {
        //validate request
        if (!req.file) {
            return res.status(400).json({ error: "File is required ", code: 400 });
        };
        if (err) {
            return res.status(500).json({ error: err.message, code: 500 });
        }
        // store into Database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });
        const resposne = await file.save();
        return res.status(200).json({ file: `${process.env.APP_BASE_URL}/api/files/${resposne.uuid}` })
    })
});

router.post('/files/send', async (req, res) => {
    //validate request
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
        return res.status(400).json({ error: 'All fields are required.', code: 400 });
    };

    //Get data from Database
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
        return res.status(400).json({ error: 'Email already send', code: 400 });
    };

    file.sender = emailFrom;
    file.receiver = emailTo;

    const response = await file.save();

    //send email
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'File Sharing',
        text: `${emailFrom} shared file with you`,
        html: '<h1>hii</h1>'
    });
    res.status(200).json({ msg: "Email sended successfully" })
})

module.exports = router
