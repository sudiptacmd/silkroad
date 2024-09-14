import express from "express";

import db from "../db.js";

const router = express.Router();

//POST HOY NA
router.post("/new", (req, res) => {
  const product = req.body;
  if (1 || req.session.vendor === 1) {
    console.log(product);
    const sql =
      "INSERT INTO Product (`name`,`user_id`,`photo`,`description`,`category`,`post_type`,`buy_price`,`bid_starting_price`,`bid_end_time`) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [
      product.product_name,
      req.session.userId || product.user_id,
      product.photo,
      product.description,
      product.category,
      product.post_type,
      product.buy_price,
      product.bid_starting_price,
      product.bid_end_time,
    ];
    db.query(sql, values, (e, r) => {
      //if (e) return res.json({ message: e.message });
      return res.json(r);
    });
  } else {
    return res.json({ success: false, message: "Not authorized to post" });
  }
});

export default router;
