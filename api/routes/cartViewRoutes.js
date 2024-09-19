import express from "express";
import db from "../db.js";


const router = express.Router();
let cartId = '';

router.get("cartView", (req, res) => {
  const userId = req.session.userId;
  const cartsql = "SELECT * FROM cart WHERE user_id = ? AND status = 'UNP';";

  db.query(cartsql, [userId],(e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: e.message });
    }
    
    cartId = r[0].cart_id;
  });
  const cart_item = "SELECT * FROM cart_item WHERE cart_id = ?;";
    db.query(cart_item, [cartId],(e, r) => {
        if (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
        }
        
        return res.json(r);
    });
});


export default router;