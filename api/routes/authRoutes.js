import express from "express";

import db from "../db.js";

const router = express.Router();

//LOGIN[POST]
router.post("/login", (req, res) => {
  const login = req.body;
  const sql = "SELECT * FROM User where email = ? AND password = ?";
  db.query(sql, [login.email, login.password], (e, r) => {
    if (e) return res.json({ message: e.message });
    if (r.length > 0) {
      console.log("LOGIN SUCCESS");
      return res.json({ loggedIn: true });
    } else {
      console.log("LOGIN FAIL");
      return res.json({ loggedIn: false });
    }
  });
});

//SIGN-UP[POST]
router.post("/signup", (req, res) => {
  const reg = req.body;
  const sql =
    "INSERT INTO User (`email`, `password`, `firstName`, `lastName`, `photo`, `address`, `phone`, `NID`, `vendor`) VALUES (?,?,?,?,?,?,?,?,?)";
  const values = [
    reg.email,
    reg.password,
    reg.firstName,
    reg.lastName,
    reg.photo,
    reg.address,
    reg.phone,
    reg.NID,
    reg.vendor === "1" ? 1 : 0,
  ];
  console.log(values);
  db.query(sql, values, (e, r) => {
    if (e) return r.json({ message: e.message });
    return res.json(r);
  });
});

export default router;
