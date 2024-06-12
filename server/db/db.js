const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    } catch (error) {
        console.log('Db connection failed',error);
        process.exit(1);
    }
};
module.exports = connectDB