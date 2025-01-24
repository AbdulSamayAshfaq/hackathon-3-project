import Footer from "@/app/components/footer";
import { client } from "@/sanity/lib/client";
import React from "react";

interface Product {
  _id: string;
  product: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  imageUrl: string;
  description: string;
}

const ProductPage = async ({ params: { id } }: { params: { id: string } }) => {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    product,
    description,
    "imageUrl": productImage.asset->url,
    price,
    tags,
    discountPercentage,
    isNew
  }`;

  const product: Product | null = await client.fetch(query, { id });

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.product}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.product}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

