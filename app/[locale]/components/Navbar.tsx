"use client";

import React, { useState } from "react";
import Image from "next/image";

import SheetMenu from "./SheetMenu";
import { CiUser } from "react-icons/ci";

import LanguageAndCurrency from "./LanguageAndCurrency";
import { useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useSession } from "next-auth/react";
import SocialMediaDropdown from "./SocialMediaDropdown ";
import ProfilePopover from "./ProfilePopover";
import CardHoverCon from "./HoverCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaSortDown } from "react-icons/fa";
import SocialMedia from "./SocialMedia";
import MobileTopMenus from "./MobileTopMenus";
// import MobileTopMenus from "./MobileTopMenus";

const Navbar = () => {
  const tScope = useScopedI18n("navbar");
  const tScope2 = useScopedI18n("home");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const { data: session } = useSession();

  const djellabas = [
    {
      id: "HG15LP",
      name: tScope("fm"),
      slug: "djellabas-femme",
    },
    {
      id: "KP97LX",
      name: tScope("hm"),
      slug: "djellabas-homme",
    },
    {
      id: "PA37KW",
      name: tScope("et"),
      slug: "djellabas-enfant",
    },
  ];

  // console.log(session);

  // const [scrollPosition, setScrollPosition] = useState<number>(0);

  return (
    !pathname.includes("signin") &&
    !pathname.includes("signup") &&
    !pathname.includes("reset-password") &&
    !pathname.includes("profile") &&
    !pathname.includes("resetpassword") && (
      <>
        <MobileTopMenus />
        <div className="z-50 font-poppins flex  sticky top-0 left-0 right-0 w-full items-center justify-center text-center px-2 md:px-4 bg-[#18191A]">
          <div className="w-full max-w-6xl flex items-center justify-between">
            <div className="flex items-center gap-0">
              <SheetMenu />
              <Link href="/" className="flex items-center justify-center gap-0">
                <Image
                  src="/ibennewapp-logo.png"
                  alt="ibendouma logo"
                  height={70}
                  width={70}
                  className="-ml-4 lg:-ml-2 -mt-1"
                />
                <span className="sr-only">Zarguef logo</span>
                <span className="text-2xl font-extrabold -ml-3 text-white">
                  Zarguef
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4 max-lg:hidden">
              <Link
                href="/categories/mikhwar-emarati"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {tScope("mikhwar-emarati")}
              </Link>
              <Link
                href="/categories/abaya-femme"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {/* {tScope("contact")} */}
                {tScope("abaya")}
              </Link>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger
                  className="flex items-center text-base text-white transition-colors hover:text-yellow-600"
                  onMouseEnter={() => setPopoverOpen(true)}
                >
                  {tScope("djel")} <FaSortDown className="-mt-1.5" />
                </PopoverTrigger>
                <PopoverContent
                  className="max-w-48 shadow-none p-2 bg-[#1A1D21] border-[#45494e]"
                  onMouseLeave={() => setPopoverOpen(false)}
                >
                  <div className="flex flex-col items-start text-base font-semibold">
                    {djellabas.map((djel) => (
                      <Link
                        key={djel.id}
                        href={`/categories/${djel.slug}`}
                        // onClick={() => handleActiveJeu(dofs.slug)}
                        className="outline-none text-left w-full text-white cursor-pointer p-1.5 transition-all rounded-[10px] hover:bg-[#363A3D] hover:text-white"
                        aria-label="Server dofus selection"
                      >
                        {djel.name}
                      </Link>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              {/* <Link
                href="/categories/djellabas"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {tScope("djel")}
              </Link> */}
              <Link
                href="/categories/caftans"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {tScope("caf")}
              </Link>
              <Link
                href="/categories/parfums"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {tScope("parfum")}
              </Link>
              <Link
                href="/categories/folar"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                {tScope2("colOr")}
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {session?.user ? (
                <Link href="/profile" className="cursor-pointer max-sm:hidden">
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
                  className="flex items-center gap-1 p-3 transition-colors cursor-pointer rounded-[10px] hover:shadow-link text-white hover:text-yellow-600 max-sm:hidden"
                >
                  <CiUser size={24} className="-mt-1" />
                  <span className="hidden sm:flex text-base">
                    {tScope("account")}
                  </span>
                </Link>
              )}
              <div className="max-sm:hidden">
                <LanguageAndCurrency />
              </div>
              <CardHoverCon />
              <div>
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Navbar;
