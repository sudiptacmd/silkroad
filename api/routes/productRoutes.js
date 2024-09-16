import express from "express";

import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT product.*, user.shop_name FROM user, product WHERE user.user_id = product.user_id;";
  console.log("REQUEST RECIEVED");

  db.query(sql, (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    
    return res.json(r);
  });
});

//POST HOY NA
router.post("/new", (req, res) => {
  const product = req.body;
  if (req.session.vendor === 1) {
    
    const sql =
      "INSERT INTO Product (`name`,`user_id`,`photo`,`description`,`category`,`post_type`,`buy_price`,`bid_starting_price`,`bid_end_time`) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [
      product.product_name,
      req.session.userId,
      product.photo,
      product.description,
      product.category,
      product.post_type,
      product.buy_price,
      product.bid_starting_price,
      product.bid_end_time,
    ];
    db.query(sql, values, (e, r) => {
      if (e) {
        console.error(e);
        return res.json({ success: false, message: e.message });
      }
      return res.json({ success: true, message: "Product added successfully" });
    });
  } else {
    return res.json({ success: false, message: "Not authorized to post" });
  }
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql = "SELECT product.*, user.shop_name FROM user, product WHERE user.user_id = product.user_id AND product_id = ?";

  db.query(sql, [productId], (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve product" });
    }

    if (r.length > 0) {
      return res.json(r[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  });
});

export default router;
