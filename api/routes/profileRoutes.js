// show user page
import express from "express";

import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sqlQuery = "SELECT * FROM User";

  db.query(sqlQuery, (e, r) => {
    if (e) {
      console.error(e);
      return res.json({ message: "Failed to show User page" });
    }

    return res.json(r);
  });
});

//update

router.post("/update-user/:userId", (req, res) => {
  const update = req.body;
  const userId = req.params.userId;

  const sql =
    "UPDATE User SET email = ?, password = ?, firstName = ?, lastName = ?, photo = ?, address = ?, phone = ?, shop_name = ?, shop_logo = ? WHERE user_id = ?";

  const values = [
    req.session.userId,
    update.email,
    update.password,
    update.firstName,
    update.lastName,
    update.photo,
    update.address,
    update.phone,
    update.shop_name,
    update.shop_logo,
  ];

  db.query(sql, values, (e, r) => {
    if (e) {
      console.log(e);
      return res.json({ success: false, message: err.message });
    }
    return res.json({ success: true, message: "User updated successfully" });
  });
});


export default router;