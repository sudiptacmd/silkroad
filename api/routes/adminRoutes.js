import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  // shop wfa products show korbe
});
router.post("/delete/:id", (req, res) => {
  // otro product delete hobe
});
router.post("/approve/:id", (req, res) => {
  // otro product approve hobe
});
export default router;
