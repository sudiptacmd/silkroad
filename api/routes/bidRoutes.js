import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/bid", (req, res) =>{
  
  const bid = req.body;
  if (req.session.userId === 1 ) {
    console.log(bid)
    const sql = "INSERT INTO Bids ('bid_on', 'bid_by', 'amount') VALUES(?,?,?)";
    const values = [
      bid.product_id,
      req.session.userId,
      bid.amount
    ];

    db.query(sql, values, (e, r)=>{
      if (e) {
        console.error(e);
        console.error(e);
        return res.json({ success: false, message: e.message });
      }
      return res.json({ success: true, message: "Successfully Bidding Done!" });
    });
  } else {
    return res.json({ success: false, message: "Not authorized to bid, Login First" });
  }

});

export default router;