"use client";

import React, { useEffect } from "react";
import { launchConfetti } from "@/lib/confetti";
import { toast } from "sonner";

const SuccessPage = () => {
  useEffect(() => {
    toast.success("Checkout successful!");
    launchConfetti();
  }, []);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Thank you for your order.</p>
    </div>
  );
};

export default SuccessPage;
