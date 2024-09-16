import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/fetchcart", (req, res) => {
  const fetchCartSql =
    'SELECT * FROM Cart WHERE user_id = ? AND status = "UNP"';
  db.query(fetchCartSql, [req.session.userId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, cart: result });
  });
});

export default router;
