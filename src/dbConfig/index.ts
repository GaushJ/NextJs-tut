import mongoose from "mongoose";

export function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("connected to the database successfully")
        })

        connection.on('error', (error) => {
            console.log("something went wrong", error);
            process.exit();
        })
    } catch (error) {
        console.log(error)
    }
}