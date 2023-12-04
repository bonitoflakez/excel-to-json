import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

const uri = 'mongodb+srv://exceltojsonuser:exceltojsonuser@exceltojson.su3ewrw.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error while connecting to database", error);
  }
};

export { connectDB };
