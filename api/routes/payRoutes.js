import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/pay", (req, res) => {
  const cartId = req.body;
  const paysql = "UPDATE Cart SET status = 'PAI' WHERE cart_id = ?";
  db.query(paysql, [cartId], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
  });
  const newCartsql = "INSERT INTO Cart (user_id, status) VALUES (?, 'ONG')";
    db.query(newCartsql, [req.session.userId], (err, result) => {
        if (err) {
        return res.json({ success: false, message: err.message });
        }
    });
});

export default router;