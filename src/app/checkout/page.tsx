"use client"
import React from "react";
import { useAppStore } from "@/stores/AppContext";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutPage = () => {
  const totalAmount = useAppStore((state) => state.getTotalAmount());

  if (totalAmount === undefined) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (totalAmount === 0) {
    return (
      <div className="text-center">
        <p>Your cart is empty. Please add items to your cart before proceeding.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="mb-6">
        <p className="text-xl font-medium">Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
