"use client";

import React from "react";
import Image from "next/image";
import colours from "@/images/product-colors.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CardText() {
  const notify = () => toast.success("Item added to cart! ✅");

  return (
    <div className="max-w-xs mx-auto  p-5 space-y-4">
      
      {/* Product Colors */}
      <div className="flex justify-center">
        <Image
          src={colours}
          alt="Available colors"
          className="rounded-full"
          width={100}
          height={20}
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={notify}
        className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all"
      >
        Add to Cart
      </button>

      {/* Toast Notification */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

