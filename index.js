import express from "express";
import router from "./routes.js";
import { DataModel } from "./schema.js";
import { connectDB } from "./connection.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());

connectDB();

// API routes
app.use("/api", router);

app.get("/cert", async (req, res) => {
  try {
    const fetch_result = await DataModel.find({});

    if (fetch_result.length === 0) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    res.render("pages/index", {
      fetch_data: fetch_result,
    });
  } catch (error) {
    console.error("Error while rendering certificate:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
