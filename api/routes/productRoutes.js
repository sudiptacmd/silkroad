import express from "express";

import db from "../db.js";

const router = express.Router();

//POST HOY NA
router.post("/new", (req, res) => {
  const product = req.body;
  if (req.session.vendor === 1) {
    console.log(product);
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

export default router;
