import express from "express";

import db from "../db.js";

const router = express.Router();


router.post("/", (req, res) => {
  const searchVal = req.body.search;
  console.log(searchVal);
  const sql = "SELECT * FROM product WHERE name LIKE ?";
  const values = `%${searchVal}%`;
  

  db.query(sql, [values], (e, r) => {
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