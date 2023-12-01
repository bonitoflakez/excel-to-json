import express from "express";
import { deleteData, fetchData, sendData } from "./controller.js";

const router = express.Router();

router.get("/fetch", fetchData);
router.post("/send", sendData);
router.delete("/delete", deleteData);

export default router;
