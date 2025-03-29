import React from "react";
import { usePaystackPayment } from 'react-paystack';

const PaystackButtonWrapper = ({ userEmail, amount, courseId, onSuccessCallback }) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: amount * 100, // in kobo (100 NGN = 10000)
    publicKey,
  };

  const onSuccess = async (reference) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/students/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or use your auth context
        },
        body: JSON.stringify({ reference: reference.reference, courseId }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccessCallback();
      } else {
        console.error("Verification failed", data.message);
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
    }
  };

  const onClose = () => {
    console.log('Transaction was not completed');
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button onClick={() => initializePayment(onSuccess, onClose)} className="bg-green-600 text-white px-4 py-2 rounded">
      Pay with Paystack
    </button>
  );
};

export default PaystackButtonWrapper;