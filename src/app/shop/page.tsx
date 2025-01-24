"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import GreenHeader from "../components/green-header";

import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer";

interface Product {
  _id: string;
  product: string;
  price: number;
  inventory: number;
  imageUrl: string;
}

interface CartItem {
  _id: string;
  product: string;
  price: number;
  quantity: number;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Toast Notifications
  const notify = (message: string, type: "success" | "info", id: string) => {
    toast.dismiss(id); // Dismiss previous toast with the same ID
    toast[type](message, { toastId: id });
  };

  useEffect(() => {
    async function getData() {
      const data = await client.fetch(`
        *[_type == "product"][0..19]{
          _id,
          product,
          "imageUrl": productImage.asset->url,
          price,
          inventory
        }
      `);
      setProducts(data);
    }
    getData();
  }, []);

  const handleAddToCart = (productId: string) => {
    const product = products.find((item) => item._id === productId);

    if (product) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });

      notify(`${product.product} added to cart! ✅`, "success", productId);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    notify("Product removed from cart.", "info", `remove-${productId}`);
  };

  const handleConfirmOrder = () => {
    setCart([]);
    notify("Your order has been confirmed! 🎉", "success", "confirm-order");
  };

  return (
    <div>
      <GreenHeader />
      <Navbar />

      {/* Shop Header */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Shop</h1>
          <p className="text-gray-600 mt-2">Find the best products for your needs</p>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <Link href={`/product/${product._id}`}>
                <Image
                  src={urlFor(product.imageUrl).url()}
                  alt={product.product}
                  width={250}
                  height={200}
                  className="rounded-md"
                />
              </Link>
              <h3 className="text-lg font-semibold mt-2">{product.product}</h3>
              <p className="text-blue-600 font-bold">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center p-4 border rounded-lg bg-white"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">{item.product}</h4>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleConfirmOrder}
                className="mt-6 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      
      <Footer/>

      <ToastContainer />
    </div>
  );
}
