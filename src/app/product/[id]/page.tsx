"use client"
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/product';
import { CartItem } from '@/stores/AppContext';
import { useAppStore } from '@/stores/AppContext';
import { FaTag, FaRegCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import { MdInventory2 } from "react-icons/md";
import { use } from 'react';

interface ProductProps {
  params: Promise<{ id: string }>;
}

const ProductDetail = ({ params }: ProductProps) => {
  const { id } = use(params);
  const addToCart = useAppStore((state) => state.addToCart);
  
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      totalPrice: product.price * product.quantity,
      addedAt: new Date(),
    };
    addToCart(cartItem);
  };

  return (
    <div className="text-orange-600 rounded-lg shadow-lg max-w-6xl mx-auto p-8 sm:p-12 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">${product.price}</div>
            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white py-3 px-6 rounded-full hover:bg-orange-700 transition duration-300 flex items-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 gap-2">
              <FaTag />
              <span>Category: {product.category}</span>
            </div>
            <div className="flex items-center text-gray-600 gap-2">
              <MdInventory2 />
              <span>Stock: {product.stock}</span>
            </div>
            <div className="flex items-center text-gray-600 gap-2">
              <FaRegCalendarAlt />
              <span>Added on: {new Date(product.addedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
