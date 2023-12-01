import express from "express";
import router from "./routes.js";
import { connectDB } from "./connection.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

// API routes
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
