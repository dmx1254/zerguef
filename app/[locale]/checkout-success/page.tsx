"use client";

import React from "react";
import { useScopedI18n } from "@/locales/client";

const CheckoutSuccessPage = () => {
  const tScope = useScopedI18n("cart");
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p
        className="text-xl font-poppins font-semibold max-w-96 text-center p-4 rounded text-green-600"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        {tScope("cartSuccess")}
      </p>
    </div>
  );
};

export default CheckoutSuccessPage;
