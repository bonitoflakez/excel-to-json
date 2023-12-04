import express from "express";
import router from "./routes.js";
import { connectDB } from "./connection.js";
import { renderCert } from "./controller.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());

connectDB();

// API routes
app.use("/api", router);

// render certificates
app.get("/certs", renderCert);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Get Certificates: http://localhost:${port}/certs`);
});
