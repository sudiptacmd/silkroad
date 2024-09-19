import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/delProd", (req, res) => {
  const prodID = req.body;
  const delsql = "DELETE FROM Product WHERE product_id = ?";
  db.query(delsql, [prodID], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
  });
});
export default router;
