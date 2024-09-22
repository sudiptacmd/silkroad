import express from "express";
import db from "../db.js";

const router = express.Router();

// UPDATE PRODUCT [if necessary]
router.put("/product/update/:productId", (req, res) => {
  const productId = req.params.productId;
  const userId = req.session.userId;
  const updatedProduct = req.body;
  
  if (req.session.vendor !== 1) {
    return res.status(403).json({ success: false, message: "You are not authorized to update products" });
  }
  
  const sql = `
    UPDATE product 
    SET 
      name = ?, 
      photo = ?, 
      description = ?, 
      category = ?, 
      post_type = ?, 
      buy_price = ?, 
      bid_starting_price = ?, 
      bid_end_time = ? 
    WHERE product_id = ? AND user_id = ?`;
  
  const values = [
    updatedProduct.name,
    updatedProduct.photo,
    updatedProduct.description,
    updatedProduct.category,
    updatedProduct.post_type,
    updatedProduct.buy_price,
    updatedProduct.bid_starting_price,
    updatedProduct.bid_end_time,
    productId,
    userId
  ];

  db.query(sql, values, (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ success: false, message: "Failed to update the product." });
    }
    if (r.affectedRows > 0) {
      return res.json({ success: true, message: "Product updated successfully!" });
    } else {
      return res.status(404).json({ success: false, message: "Product not found to update!" });
    }
  });
});

export default router;