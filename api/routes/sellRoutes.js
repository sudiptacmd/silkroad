import express from "express";

import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const prodId = req.body;
    const sellsql = "SELECT SUM(ci.quantity) as sell quantity FROM cart_item ci JOIN cart c ON ci.cart_id = c.cart_id WHERE c.status = 'PAI' AND ci.prod_id = ?;";
    db.query(sellsql, [prodId],(e, r) => {
        if (e) {
        console.error(e);
        return res.json({ message: e.message });
        }
        return res.json(r);
    });
});
export default router;