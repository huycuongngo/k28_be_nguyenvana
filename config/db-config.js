import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "demo_db" })
    console.log("Mongo connected...")
  } catch (error) {
    console.log("error", error.message)
    process.exit(1)
  }
}

export default connectDB
