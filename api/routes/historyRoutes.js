import express from "express";

import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const userId = req.session.userId;
    const historySql = "SELECT ci.*, p.*, u.shop_name FROM cart c JOIN cart_item ci ON c.cart_id = ci.cart_id JOIN product p ON p.product_id = ci.prod_id JOIN user u ON u.user_id = c.user_id WHERE c.user_id = 2 AND c.status = 'PAI';";
    db.query(historySql, [userId],(e, r) => {
        if (e) {
        console.error(e);
        return res.json({ message: e.message });
        }
        return res.json(r);
    });
});

export default router;

