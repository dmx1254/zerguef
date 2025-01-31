"use client";

import React from "react";
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
// import MobileTopMenus from "./MobileTopMenus";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  // console.log(session);

  // const [scrollPosition, setScrollPosition] = useState<number>(0);

  return (
    !pathname.includes("signin") &&
    !pathname.includes("signup") &&
    !pathname.includes("reset-password") &&
    !pathname.includes("profile") &&
    !pathname.includes("resetpassword") && (
      <>
        {/* <MobileTopMenus /> */}
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
                <span className="sr-only">zerguef logo</span>
                <span className="text-2xl font-extrabold -ml-3 text-white">
                  Zerguef
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4 max-lg:hidden">
              <Link
                href="/categories/djellabas"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                Djellabas
              </Link>
              <Link
                href="/categories/caftans"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                Caftans
              </Link>
              <Link
                href="/categories/gandouras"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                Gandouras
              </Link>
              <Link
                href="/vendre-des-kamas"
                className="text-base text-white transition-colors hover:text-yellow-600"
              >
                Accessoires
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
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
                  className="hidden sm:inline-flex items-center gap-1 p-3 transition-colors cursor-pointer rounded-[10px] hover:shadow-link text-white hover:text-yellow-600"
                >
                  <CiUser size={24} className="-mt-1" />
                  <span className="text-base ">Compte</span>
                </Link>
              )}

              <LanguageAndCurrency />
              <CardHoverCon />
              {/* <div>
                <SocialMediaDropdown />
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Navbar;
