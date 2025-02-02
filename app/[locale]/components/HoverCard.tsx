"use client";

import { useState } from "react";
import { useI18n, useScopedI18n } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { useCartStore, useCartSubtotal } from "@/lib/manage";

const CardHoverCon = () => {
  const tScope = useScopedI18n("navbar");
  const { totalItems, totalAmount, items } = useCartStore();
  const subtotal = useCartSubtotal();
  // console.log(subtotal);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // console.log(totalItems);

  return (
    <HoverCard open={open} onOpenChange={handleOpen}>
      <HoverCardTrigger asChild>
        <button
          className="relative outline-none inline-flex items-center gap-1 p-3 transition-colors cursor-pointer rounded-[10px] hover:shadow-link"
          onClick={handleOpen}
          aria-label="Cart open"
        >
          <Image
            src="/assets/cart.svg"
            alt="account logo"
            width={20}
            height={20}
            className=""
          />
          <span className="sr-only">Cart</span>
          {totalItems > 0 && (
            <span className="flex items-center justify-center text-center absolute h-4 w-4 text-xs bg-yellow-500 text-white rounded-full top-[12%] left-[50%]">
              {totalItems}
            </span>
          )}
        </button>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 bg-[#1A1D21] border-[#45494e]">
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-sm text-white/90">
              {totalItems} {tScope("cartHoverTile")}
            </span>
            <span className="text-base font-bold  text-yellow-500 rounded">
              {subtotal}
            </span>
          </div>
          <Link
            href="/cart"
            className="w-full outline-none text-base p-2 rounded bg-yellow-500 text-white transition-colors hover:opacity-90"
          >
            {tScope("cartHoverBtn")}
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CardHoverCon;
