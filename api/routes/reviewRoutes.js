import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const review = req.body.review;
  if (req.session.userId) {
    const sql =
      "INSERT INTO `Review` (user_id,product_id,rating,content) VALUES(?,?,?,?)";

    const values = [
      req.session.userId,
      review.productId,
      review.rating,
      review.content,
    ];
    db.query(sql, values, (e, r) => {
      if (e) {
        console.error(e);
        return res.json({ success: false, message: e.message });
      }
      return res.json({ success: true, message: "Review posted Successfully" });
    });
  } else {
    return res.json({ success: false, message: "Not logged in" });
  }
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql =
    "SELECT r.*, u.firstName, u.lastName FROM review r JOIN user u ON r.user_id = u.user_id WHERE r.product_id = ?;";

  db.query(sql, [productId], (e, r) => {
    if (e) {
      console.error(e);
      return res.json({ message: "Failed to retrieve review" });
    }
    if (r.length === 0) {
      return res.json({ message: "No reviews found for this product" });
    }
    return res.json(r);
  });
});

export default router;
