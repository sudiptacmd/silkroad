import express from "express";
import db from "../db.js";


const router = express.Router();


router.get("/:shopId", (req, res) => {
  const shopId = req.params.shopId;
  const sql = "SELECT product.*, user.shop_name, user.shop_logo FROM Product, User WHERE product.user_id = ? AND user.user_id = ?";

  db.query(sql, [shopId, shopId],(e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    
    return res.json(r);
  });
});


export default router;