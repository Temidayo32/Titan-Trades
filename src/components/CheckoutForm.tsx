import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAppStore } from "@/stores/AppContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalAmount = useAppStore((state) => state.getTotalAmount());

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/checkout", {
        amount: totalAmount * 100,
        paymentMethodId: paymentMethod!.id,
      });

      const { clientSecret } = response.data;

      const confirmResult = await stripe.confirmCardPayment(clientSecret);

      if (confirmResult.error) {
        setErrorMessage(confirmResult.error.message || "Payment failed");
      } else if (confirmResult.paymentIntent.status === 'succeeded') {
        window.location.href = '/payment-success';
      } else {
        setErrorMessage('Payment confirmation failed. Please try again.');
      }

    } catch (error) {
        console.log(error)
      setErrorMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement
        className="p-4 border rounded"
        options={{
          style: {
            base: {
              color: "#fff",
              fontSize: "16px",
              letterSpacing: "0.025em",
              "::placeholder": {
                color: "#888",
              },
            },
          },
        }}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
