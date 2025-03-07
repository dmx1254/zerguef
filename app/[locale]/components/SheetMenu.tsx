"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { categoriesClothes } from "@/lib/utils";
import { useState } from "react";

const SheetMenu = () => {
  const tScope = useScopedI18n("navbar");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="triggering menu opening"
          className="outline-none inline-flex lg:hidden items-center gap-1 p-3 transition-colors cursor-pointer rounded-[10px] hover:shadow-link"
        >
          <Image
            src="/assets/menu-burger.svg"
            alt="account logo"
            width={22}
            height={22}
            className="mt-0.5"
          />
          <span className="sr-only">hamburger menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        className="w-full flex items-center justify-center mx-auto rounded-tl-[30px] rounded-tr-[30px]"
        side="bottom"
      >
        <div className="w-full flex flex-col items-center gap-3">
          {categoriesClothes.map((item) => (
            <Link
              key={item.id}
              href={`/categories/${item.slug}`}
              className="outline-none w-full text-center rounded-[10px] text-sm cursor-pointer bg-[#EDEDED] p-2"
              onClick={() => setIsOpen(false)}
              aria-label="category"
            >
              {tScope(
                item.lnk as
                  | "mikhwar-emarati"
                  | "abaya-femme"
                  | "parfums"
                  | "djellabas"
                  | "caftans"
                  | "folar"
                  | "fm"
                  | "hm"
                  | "et"
              )}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
