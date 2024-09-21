import express from "express";

import db from "../db.js";

const router = express.Router();

// Route to get all QnA data
router.get("/", async (req, res) => {
  const { product_id } = req.body;
  const qnaViewSql =
    "SELECT qna.*, user.firstName, user.lastName FROM qna INNER JOIN user ON qna.user_id = user.user_id WHERE qna.product_id = ?;";
  db.query(qnaViewSql, [product_id], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }
    console.log(result);
    return res.json(result);
  });
});

// Buyer q
router.post("/", (req, res) => {
  const { question, product_id } = req.body;

  if (!req.session.vendor) {
    const sql = "INSERT INTO QnA (question,user_id,product_id) VALUES (?,?,?)";

    const values = [question, parseInt(req.session.userId), product_id];
    db.query(sql, values, (e, r) => {
      if (e) {
        console.log(e);
        return res.json({ success: false, message: e.message });
      }
      return res.json({
        success: true,
        message: "Question posted successfully",
      });
    });
  } else {
    return res.json({
      success: false,
      message: "Not a buyer: can not ask question",
    });
  }
});

// Seller a
router.post("/answer-question/:qna_id", (req, res) => {
  const { answer } = req.body;
  const { qna_id } = req.params;

  if (req.session.vendor) {
    //if q exists
    const updateQuery = "UPDATE QnA SET answer = ? WHERE qna_id = ?";
    db.query(updateQuery, [answer, qna_id], (e, r) => {
      if (e) {
        console.log("Error updating answer:", e);
        return res.json({
          success: false,
          message: "Error while updating the answer.",
        });
      }
      return res.json({
        success: true,
        message: "Answer posted successfully.",
      });
    });
  }
});

export default router;
