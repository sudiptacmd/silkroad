import express from "express";

import db from "../db.js";

const router = express.Router();

// Route to get all QnA data
router.get('/qnaView', async (req, res) => {
    product_id = req.body;
    const qnaViewSql = 'SELECT * FROM qna WHERE product_id = ?';
    db.query(qnaViewSql, [product_id], (err, result) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }
        return res.json(result);
    });
});

export default router;