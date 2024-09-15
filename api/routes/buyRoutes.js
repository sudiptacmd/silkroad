import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/buy", (req, res) => {
  const { productId, quantity } = req.body;
  console.log(productId);
  // Check if a cart exists for the user
  const checkCart =
    'SELECT cart_id FROM Cart WHERE user_id = ? AND status = "ONG"';
  db.query(checkCart, [req.session.userId], (err, results) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }

    let cartId;
    if (results.length > 0) {
      // Cart exists
      cartId = results[0].cart_id;
    } else {
      // No cart exists, create a new cart
      const createCart = 'INSERT INTO Cart (user_id, status) VALUES (?, "ONG")';
      db.query(createCart, [req.session.userId], (err, result) => {
        if (err) {
          return res.json({ success: false, message: err.message });
        }
      });
    }
    //get the cart_id of the newly created cart
    db.query(checkCart, [req.session.userId], (err, results) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }
      cartId = results[0].cart_id;
    });

    // check if the product is already in the cart_item
    const checkCartItem =
      "SELECT * FROM Cart_item WHERE cart_id = ? AND prod_id = ?";
    db.query(checkCartItem, [cartId, productId], (err, result) => {
      if (err) {
        return res.json({ success: false, message: err.message });
      }
      if (result.length > 0) {
        // Product already exists in the cart, update the quantity
        const quantity = result[0].quantity + quant;
        const updateCartItem =
          "UPDATE Cart_item SET quantity = ? WHERE cart_id = ? AND prod_id = ?";
        db.query(
          updateCartItem,
          [quantity, cartId, productId],
          (err, result) => {
            if (err) {
              return res.json({ success: false, message: err.message });
            }
          }
        );
      } else {
        // Product doesn't exist in the cart, insert a new record
        const insertCartItem =
          "INSERT INTO Cart_item (cart_id, prod_id, quantity) VALUES (?, ?, ?)";
        db.query(
          insertCartItem,
          [cartId, productId, quantity],
          (err, result) => {
            if (err) {
              return res.json({ success: false, message: err.message });
            }
          }
        );
      }
      // Redirect to the cart page upon successful update
      res.redirect("/cart");
    });
  });
});

// Export the router
export default router;
