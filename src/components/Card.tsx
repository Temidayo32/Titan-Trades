"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartItem } from '@/stores/AppContext';
import { useAppStore } from '@/stores/AppContext';

interface ProductProps {
  product: CartItem;
}

const Card: React.FC<ProductProps> = ({ product }) => {
  const addToCart = useAppStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      totalPrice: product.price * product.quantity,
      addedAt: new Date(),
    };
    addToCart(cartItem);
  };

  return (
    <div className="bg-white text-orange-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300">
      <Link href={`/product/${product.id}`} passHref>
        <div className="relative h-64 bg-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      </Link>
      <div className="p-4">
          <h3 className="text-xl font-bold truncate">{product.name}</h3>
          <span className="text-sm text-gray-600">{product.category}</span>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-orange-600 text-white py-2 px-4 rounded-full hover:bg-orange-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
    </div>
  );
};

export default Card;
