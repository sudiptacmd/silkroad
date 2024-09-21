import express from "express";

import db from "../db.js";

const router = express.Router();


router.post("/", (req, res) => {
  const searchVal = req.body.search;
  console.log(searchVal);

  

  const sql = "SELECT p.* FROM product p JOIN user u ON p.user_id = u.user_id WHERE p.name LIKE ? OR p.category LIKE ? OR u.shop_name LIKE ?";
  const values = `%${searchVal}%`;
  

  db.query(sql, [values, values, values], (e, r) => {
    if (e) {
      console.error(e);
      console.log(e)
      return res.status(500).json({ message: "Failed to retrieve products" });
    }
    console.log(r);
    return res.json(r);
  });
});


export default router;