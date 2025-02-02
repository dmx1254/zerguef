"use client";

import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScopedI18n } from "@/locales/client";
import Link from "next/link";

const SheetMenu = () => {
  const tScope = useScopedI18n("navbar");
  return (
    <Sheet>
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
          {[
            { lnk: "djellabas", title: tScope("djel") },
            { lnk: "parfums", title: tScope("parfum") },
            { lnk: "caftans", title: tScope("caf") },
          ].map((item) => (
            <Link
              key={item.lnk}
              href={`/categories/${item.lnk}`}
              className="outline-none w-full text-center rounded-[10px] text-sm cursor-pointer bg-[#EDEDED] p-2"
              // onClick={() => handleActiveJeu(item.slug)}
              aria-label="category"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
