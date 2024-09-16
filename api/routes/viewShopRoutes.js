import express from "express";
import db from "../db.js";


const router = express.Router();


router.get("/:shopId", (req, res) => {
  const shopId = req.params.shopId;
  const sql = "SELECT * FROM Product WHERE user_id = ?";

  db.query(sql, [shopId],(e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    console.log(r);
    return res.json(r);
  });
});


export default router;