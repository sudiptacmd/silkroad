import express from "express";
import db from "../db.js";


const router = express.Router();
let cartId = 0;

router.get("/", (req, res) => {
  const userId = req.session.userId;
  const cartsql = "SELECT * FROM cart WHERE user_id = ? AND status = 'UNP'";

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    db.query(cartsql, [userId],(e, r) => {
      if (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
      }

      
      cartId = r[0].cart_id;
    });
    const cart_item = "SELECT cart_item.*, product.*, user.shop_name FROM cart_item, product, user WHERE cart_id = ? AND cart_item.prod_id = product.product_id AND product.user_id = user.user_id";
      db.query(cart_item, [cartId],(e, r) => {
          if (e) {
          console.error(e);
          return res.status(500).json({ message: e.message });
          }
          console.log(r);
          return res.json(r);
      });
    }
});

router.post("/decrementProd", (req, res) => {
  const data = req.body;

  const delsql = "UPDATE cart_item SET quantity = quantity - 1 WHERE cart_id = ? AND prod_id = ?";
  db.query(delsql, [data[1], data[0]], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    console.log("decre");
    return res.json({ success: true, message: "Product quantity decremented" });
  });
});

router.post("/incrementProd", (req, res) => {
  const data = req.body;
  
  const sql = "UPDATE cart_item SET quantity = quantity + 1 WHERE cart_id = ? AND prod_id = ?";
  db.query(sql, [data[1], data[0]], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    
    console.log("incre");
    return res.json({ success: true, message: "Product quantity incremented" });
  });
});

router.post("/removeProd", (req, res) => {
  const data = req.body;
  console.log(data);
  
  
  const sql = "DELETE FROM cart_item WHERE cart_id = ? AND prod_id = ?";
  db.query(sql, [data[1], data[0]], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: err.message });
    }
    console.log("removed");
    return res.json({ success: true, message: "Product removed from cart" });

    });
});

export default router;