import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function CartProducts(props) {
  
  const { product, type } = props;
  const navigate = useNavigate();

  const total = product.quantity * product.buy_price;

  const decreaseItem = async (e) => {
    e.preventDefault();
    if (product.quantity > 1) {
      try {
        axios
          .post("http://localhost:5100/cartView/decrementProd", [product.product_id, product.cart_id])
          .then((r) => {
            console.log(r);
          })
          .catch((e) => console.log(e));
      } catch (error) {
        console.log(error);
      }
    }

    if (product.quantity === 1) {
      try {
        await axios
          .post("http://localhost:5100/cartView/removeProd", [product.product_id, product.cart_id])
          .then((r) => {
            console.log(r);
          })
          .catch((e) => console.log(e));
      }
      catch (error) {
        console.log(error);
      }
    }
  };
  const increaseItem = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/cartView/incrementProd", [product.product_id, product.cart_id])
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }

  }


  const removeItem = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:5100/cartView/removeProd", [product.product_id, product.cart_id])
        .then((r) => {
          console.log(r);
          
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }

  }





  return (
    <div className="flex flex-row items-center justify-between p-2">
      <Link to={"/product/" + product.product_id}>
        <div>
          <img src={product.photo} alt="" className="w-[100px] h-[100px] object-contain" />
        </div>
        <div>
          <p>{product.name}</p>
        </div>
      </Link>

      <div>
        <p className="font-bold text-green-2 text-lg" >{product.shop_name}</p>
      </div>
      <div>
      <p> BDT {total}</p>
      
      </div>

      <div className="flex flex-row items-center">
        <button
          onClick={decreaseItem}
          className="ml-2 mr-2 p-1 bg-green-1 hover:bg-green-2 rounded text-white text-center text-lg">
          -
        </button>

        <p className="ml-2 mr-2 text-center font-bold">{product.quantity}</p>

        <button
          onClick={increaseItem}
          className="ml-2 mr-2 p-1 bg-green-1 hover:bg-green-2 rounded text-white text-center text-lg"
        >
          +
        </button>
      </div>


      <button
        onClick={removeItem}
        className="ml-2 mr-2 p-1 bg-red-1 hover bg-red-2 rounded text-white font-bold text-center text-lg"
      >
        Remove
      </button>

    </div>
  );
}
