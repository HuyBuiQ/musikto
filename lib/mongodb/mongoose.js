import mongoose from "mongoose"
let isConnected = false

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)
}

if (isConnected) {
    console.log("MongoDB is already connected")


}
try {
    await mongoose.connect(process.env.MONGODB_URL, {
        dbName: "Musikto",

    });
    isConnected = true;
    console.log("MongoDB is connected")
} catch (error) {
    console.log(error)


}