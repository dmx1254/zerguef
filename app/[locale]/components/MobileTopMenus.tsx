"use client";

import React from "react";
import LanguageAndCurrency from "./LanguageAndCurrency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { useScopedI18n } from "@/locales/client";

const MobileTopMenus = () => {
  const tScope = useScopedI18n("navbar");
  const { data: session, status } = useSession();
  return (
    <div className="sm:hidden w-full flex px-4 py-1 bg-[#363A3D] items-center justify-between md:hidden">
      <div className="flex-1">
        {session?.user ? (
          <Link href="/profile" className="cursor-pointer">
            <Image
              src="/defaultuser.png"
              alt="use"
              height={70}
              width={70}
              className="h-8 w-8 object-cover object-center rounded-full"
            />
          </Link>
        ) : (
          <Link
            href="/signin"
            className="flex items-center gap-1 p-3 transition-colors cursor-pointer rounded-[10px] hover:shadow-link text-white hover:text-yellow-600"
          >
            <CiUser size={24} className="-mt-1" />
            <span className="hidden sm:flex text-base">
              {tScope("account")}
            </span>
          </Link>
        )}
      </div>

      <LanguageAndCurrency isShowBg={false} />
    </div>
  );
};

export default MobileTopMenus;
