import express from "express";
import cors from 'cors';
import db from "../db.js";


const router = express.Router();


// router.get('/api/products/:id', (req, res) => {
//   const id = req.params.id;
//   // do something with the id
// });


router.get("/productList", (req, res) =>  {
  const sql = "SELECT * FROM product";
  
  db.query(sql, (e, r) =>{
    if (e) return res.json({error : e});
    console.log(r)
    res.json(r); 
    
    
  });
});

export default router;