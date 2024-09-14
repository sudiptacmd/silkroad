import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/new", (req, res) => {
  const product = req.body;
  console.log(product);
});

export default router;
