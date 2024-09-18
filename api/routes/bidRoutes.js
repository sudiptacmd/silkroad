import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/bid", (req, res) => {
  const bid = req.body;

  if (req.session.userId) {
    
    const sql = "INSERT INTO Bids (bid_on, bid_by, amount) VALUES(?,?,?)";
    const values = [bid.product_id, req.session.userId, bid.amount];

    db.query(sql, values, (e, r) => {
      if (e) {
        console.error(e);
        return res.json({ success: false, message: e.message });
      }
      return res.json({ success: true, message: "Successfully Bidding Done!" });
    });
  } else {
    console.log("Not authorized to bid, Login First As a Buyer");
    return res.json({
      success: false,
      message: "Not authorized to bid, Login First As a Buyer",
    });
  }
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  
  const sql = "SELECT MAX(amount) AS max FROM bids WHERE bid_on = ?";
  db.query(sql, [productId], (e, r) => {
    if (e) {
      console.error(e);
      return res.json({ success: false, message: e.message });
    }
    
    return res.json(r[0]);
  });
});


export default router;
