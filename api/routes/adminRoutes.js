import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {

  // shop wfa products show korbe
  const sql = "SELECT product.*, user.shop_name, user.user_id FROM Product, User WHERE product.user_id = User.user_id AND (product.status = 'WFA' OR product.status = 'APP' OR product.status = 'DEL')";

  // const sql = "SELECT product.* FROM Product WHERE status = 'WFA' OR status = 'APP'";
  db.query(sql, (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    
    return res.json(r);
  });

});
router.post("/delete/:id", (req, res) => {
  // otro product delete hobe
  const id = req.params.id;
  const sql = "UPDATE Product SET status = 'WFA' WHERE product_id = ? AND status = 'APP'";
  db.query(sql, [id], (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to delete product" });
    }

    return res.json({ success: true, message: "Product deleted" });

  });
});

router.post("/approve/:id", (req, res) => {
  // otro product approve hobe
  const id = req.params.id;
  const sql = "UPDATE Product SET status = 'APP' WHERE product_id = ?";
  db.query(sql, [id], (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to approve product" });
    }

    return res.json({ success: true, message: "Product approved" });

  });
});
export default router;
