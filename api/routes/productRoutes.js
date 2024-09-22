import express from "express";

import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT product.*, user.shop_name FROM user, product WHERE user.user_id = product.user_id AND product.status = 'APP' ";

  console.log("REQUEST RECIEVED");

  db.query(sql, (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve products" });
    }

    return res.json(r);
  });
});

//POST HOY NA
router.post("/new", (req, res) => {
  const product = req.body;
  if (req.session.vendor === 1) {
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

// Delete Post??

router.post("/productdelete", (req, res) => {
  const productId = req.body.prodID;
  const userId = req.session.userId;

  if (req.session.vendor !== 1) {
    return res.status(403).json({
      success: false,
      message:
        "You are not authorized to delete the product./n Delete Failed!!!",
    });
  }

  const sql =
    "UPDATE Cart SET status = 'PAI' WHERE product_id = ? and user_id = ?";

  db.query(sql, [productId, userId], (e, r) => {
    if (e) {
      console.error(e);
      return res
        .status(500)
        .json({ success: false, message: "Product deletion failed!" });
    }

    if (r.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Product successfully deleted!",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found or not authorized to delete!",
      });
    }
  });
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const sql =
    "SELECT Product.*, User.shop_name, User.shop_logo FROM User, Product WHERE User.user_id = Product.user_id AND product_id = ?";

  db.query(sql, [productId], (e, r) => {
    if (e) {
      console.error(e);
      return res.status(500).json({ message: "Failed to retrieve product" });
    }

    if (r.length > 0) {
      return res.json(r[0]);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  });
});
router.get("/sellInfo", (req, res) => {
  const { prodId } = req.body;
  const sellsql =
    "SELECT SUM(ci.quantity) as sell quantity FROM cart_item ci JOIN cart c ON ci.cart_id = c.cart_id WHERE c.status = 'PAI' AND ci.prod_id = ?;";
  db.query(sellsql, [prodId], (e, r) => {
    if (e) {
      console.error(e);
      return res.json({ message: e.message });
    }
    return res.json(r);
  });
});

export default router;
