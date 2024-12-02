"use client";
import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/stores/AppContext';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const cartItems = useAppStore((state) => state.cart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Shopping Cart</h1>
      <div className="shadow-lg rounded-lg p-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Category: {item.category}</p>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-12 p-1 border rounded text-gray-900"
              />
              <span className="text-xl font-semibold">
                ${item.totalPrice.toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-2xl font-semibold">
            Total: $
            {cartItems.reduce(
              (total, item) => total + item.totalPrice,
              0
            ).toFixed(2)}
          </h2>
          <Link href="/checkout">
            <button className="mt-4 bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
