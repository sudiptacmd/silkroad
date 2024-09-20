import express from "express";

import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {

    const userId = req.session.userId;
    console.log(userId);

    const paysql = "UPDATE Cart SET status = 'PAI' WHERE user_id = ? AND status = 'UNP'";
    db.query(paysql, [userId], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
      }

      console.log("payed");
    });
    const newCartsql = "INSERT INTO Cart (user_id, status) VALUES (?, 'UNP')";
      db.query(newCartsql, [userId], (err, result) => {
          if (err) {
          return res.json({ success: false, message: err.message });
          }
      });

  }

});

export default router;
