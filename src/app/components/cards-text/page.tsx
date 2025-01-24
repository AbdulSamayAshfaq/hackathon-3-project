"use client";

import React from "react";
import Image from "next/image";
import colours from "@/images/product-colors.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { product } from "@/sanity/schemaTypes/product";
import { Link } from "sanity/router";
import { PHASE_PRODUCTION_SERVER } from "next/dist/shared/lib/constants";

export default function CardText() {
  const notify = () => toast("Item added to cart! ✅");

  return (
    

      
        
      <div className="space-y-3">
      <div className="w-[70px] h-[15px] flex justify-center">
        <Image src={colours} alt="Product colours" />

      </div>
      
      <button
        onClick={notify}
        className="py-[10px]  px-[20px] w-full font-Montserrat font-bold text-[14px] text-white bg-[#23A6F0] rounded-md hover:bg-[#1d91d0] focus:outline-none focus:ring-2 focus:ring-[#23A6F0] focus:ring-offset-2 transition-all"
        >
        Add to Cart
      </button>
      <ToastContainer />
    
    </div>
  );
}

  

