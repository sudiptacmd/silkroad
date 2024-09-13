import express from "express";

import db from "../db.js";

const router = express.Router();

//SIGN-UP
router.post("/signup", (req, res) => {
  const login = req.body;
  const sql =
    "INSERT INTO User (`email`, `password`, `firstName`, `lastName`, `photo`, `address`, `phone`, `NID`, `vendor`) VALUES (?,?,?,?,?,?,?,?,?)";
  const values = [
    login.email,
    login.password,
    login.firstName,
    login.lastName,
    login.photo,
    login.address,
    login.phone,
    login.NID,
    login.vendor === "1" ? 1 : 0,
  ];
  console.log(values);
  db.query(sql, values, (e, r) => {
    if (e) return r.json({ message: e.message });
    return res.json(r);
  });
});

export default router;
