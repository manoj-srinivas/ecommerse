'use strict'

import mongoose from "mongoose"
import Bluebird from "bluebird"
import colors from 'colors';


mongoose.Promise = Bluebird
mongoose.set("debug",true)

mongoose.connection.on("connected", ()=>{
    console.log(colors.magenta('MongoDB is connected'))
})

mongoose.connection.on("error",(error) => {
    console.log(`Could not connect to MongoDB because of ${error}`)
    process.exit(-1)
})

const connectToMongoDB = async() => {

    // const connectingString  = `${process.env.PROTOCOL}${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    const connectingString=(process.env.MONGO_URL)
    mongoose.connect(connectingString, {
        maxPoolSize: 10
    })
// console.log(connectingString);
}

export default connectToMongoDB