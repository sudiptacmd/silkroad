import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AdminProducts(props) {

  const { product, type } = props;

  const handleApprove = async(e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:5100/admin/approve/${product.product_id}` )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });


    } catch (error) {
      console.log(error);
    }
  };
      
  const handleDelete = async(e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:5100/admin/delete/${product.product_id}` )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    }


  return (
    <div
      key={product.product_id}
      className="flex flex-row gap-5 items-center my-4 "
    >
      <p className="w-8 h-8 p-2 bg-green-1 text-[#fff] text-center rounded">
        {product.product_id}
      </p>
      <Link to={`/product/${product.product_id}`}>

        <img src={product.photo} className="w-16 h-16 origin-contain" />
        <p className="w-72">{product.name}</p>
      </Link>

      <div className="flex flex-col items-center px-2">

        <p>{product.status}</p>

      </div>

      <Link to={`/shop/${product.user_id}`}>

        <p className="font-bold text-green-2 text-lg mx-2"  >{product.shop_name}</p>

      </Link>

      <div className="w-[100px] flex flex-col  items-center px-2">
        { product.status === "WFA" ? (

          <button
            onClick={handleApprove}
            className="p-4 bg-green-1 text-[#fff] rounded"
          >
            Approve
          </button>
              
        ) : (

          <button
            onClick={handleDelete}
            className="p-4 bg-red-1 text-[#fff] rounded"
          >
            Delete
          </button> 
        )

        }

      </div>
    </div>

    // <div className="flex flex-row items-center justify-between p-2">
    //   <Link to={"/product/" + product.product_id}>
    //     <div>
    //       <img src={product.photo} alt="" className="w-[100px] h-[100px] object-contain" />
    //     </div>
    //     <div>
    //       <p>{product.name}</p>
    //     </div>
    //   </Link>




    //   <div>
    //     <p className="font-bold text-green-2 text-lg" >{product.status}</p>

    //   </div>
    // </div>
  )
};
