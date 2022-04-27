const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, () => {
            console.log(`Connected to mongoDB`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectToMongo;