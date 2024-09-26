// src/utils/dbConnect.js
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();




const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database has been connected")
    }
    catch(err){
        console.log(`error is ${err.message}`);

    }
 
}
export default dbConnect;
