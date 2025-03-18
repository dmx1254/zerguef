"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";
import Image from "next/image";

import { AiFillLike } from "react-icons/ai";
import { MdSecurity, MdFlashOn } from "react-icons/md";
import { IoArrowUndo } from "react-icons/io5";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaSnapchat,
} from "react-icons/fa";

import giropay from "../../../assets/iben/giropay.webp";
import neosurf from "../../../assets/iben/neosurf.webp";
import marocbank from "../../../assets/iben/marocbank.webp";
import crd_agricole from "../../../assets/iben/crd_agricole.png";
import sg from "../../../assets/iben/sg.png";
import { BsThreads } from "react-icons/bs";

const Footer = () => {
  const tScope = useScopedI18n("home");
  const tScope2 = useScopedI18n("about");
  const tScope3 = useScopedI18n("footer");
  const tScope4 = useScopedI18n("cart");

  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const categories = [
    {
      name: tScope("colDjel"),
      // link: "/categories/djellabas",
      link: "/#",
    },
    {
      name: tScope("colCaf"),
      // link: "/categories/caftans",
      link: "/#",
    },
    {
      name: tScope("colParf"),
      // link: "/categories/parfums",
      link: "/#",
    },
    {
      name: tScope("colOr"),
      link: "/categories/or",
    },
    {
      name: tScope("mikhwar-emarati"),
      link: "/categories/mikhwar-emarati",
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/profile.php?id=61571382011435",
      color: "text-blue-600",
      size: 14,
    },
    {
      icon: BsThreads,
      href: "https://www.threads.net/@ibendouma_com?hl=fr",
      color: "text-gray-400",
      size: 13,
    },

    {
      icon: FaWhatsapp,
      href: "https://wa.me/212660265244",
      color: "text-green-600",
      size: 14,
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@zarguef",
      color: "text-gray-500",
      size: 13,
    },

    {
      icon: FaInstagram,
      href: "https://www.instagram.com/khadija_zarguef/",
      color: "text-[#E1306C]",
      size: 13,
    },
    {
      icon: FaSnapchat,
      href: "https://www.snapchat.com/add/zarguef.com",
      color: "text-yellow-500",
      size: 13,
    },
  ];


  const brands = [
    { name: tScope4("brands.visa"), logo: "/visa.png" },
    { name: tScope4("brands.mastercard"), logo: "/mastercard.png" },
    { name: tScope4("brands.paypal"), logo: "/paypal.png" },
  ];

  return (
    !pathname.includes("signin") &&
    !pathname.includes("signup") &&
    !pathname.includes("profile") &&
    !pathname.includes("forgot-password") && (
      <footer className="bg-gradient-to-r bg-[#18191A] text-gray-300">
        <div className="p-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:px-44">
            <div className="flex flex-col items-start gap-2">
              <p className="text-base font-semibold text-white/90 w-full border-b border-dashed pb-2 border-gray-400">
                {tScope3("satisfaction")}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
                  <AiFillLike size={30} className="text-black" />
                </span>
                <p className="text-sm text-white/80">
                  {tScope3("satisfactionDesc")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-base font-semibold text-white/90 w-full border-b border-dashed pb-2 border-gray-400">
                {tScope3("secure")}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
                  <MdSecurity size={30} className="text-black" />
                </span>
                <p className="text-sm text-white/80">{tScope3("secureDesc")}</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-base font-semibold text-white/90 w-full border-b border-dashed pb-2 border-gray-400">
                {tScope3("fast")}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
                  <MdFlashOn size={30} className="text-black" />
                </span>
                <p className="text-sm text-white/80">{tScope3("fastDesc")}</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <p className="text-base font-semibold text-white/90 w-full border-b border-dashed pb-2 border-gray-400">
                {tScope3("refund")}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="flex items-center justify-center rounded-full bg-white p-2 shadow-sm">
                  <IoArrowUndo size={30} className="text-black" />
                </span>
                <p className="text-sm text-white/80">{tScope3("refundDesc")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full bg-white p-6">
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-12 bg-white">
              {/* About Us Section */}
              <div className="md:w-[500px] bg-[#18191A] p-2 rounded md:h-52">
                <h3 className="text-white/80 font-bold mb-4 w-full">
                  {tScope2("whoWeAre")}
                </h3>
                <p className="text-[15px] text-gray-300 leading-6">
                  {tScope2("whoWeAreDescription")}
                </p>
              </div>

              {/* Security Badges */}
              <div className="max-md:w-full bg-[#18191A] p-2 md:p-4 rounded md:h-52">
                <div className="flex max-md:w-full flex-row md:flex-col items-center justify-between md:justify-center gap-3 sm:gap-6">
                  <Image
                    src="/secure/ssl-shopper.svg"
                    alt="ssl Shopper"
                    width={120}
                    height={120}
                    className="max-sm:w-20 max-sm:h-10 object-contain md:object-cover"
                  />
                  <Image
                    src="/secure/ssl.png"
                    alt="SSL Certificate"
                    width={120}
                    height={120}
                    className="max-sm:w-20 max-sm:h-10 object-contain md:object-cover"
                  />
                  <Image
                    src="/secure/trustS.png"
                    alt="TrustedSite"
                    width={120}
                    height={120}
                    className="max-sm:w-20 max-sm:h-6 object-contain md:object-cover"
                  />
                </div>
              </div>

              <div className="bg-[#18191A] w-full md:w-[220px] p-2 md:p-4 rounded md:h-52">
                <h3 className="text-white/80 font-bold mb-4">
                  {tScope("colTitle")}
                </h3>
                <ul className="space-y-2 text-sm">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.link}
                        className="hover:text-white transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Information */}
              <div className="bg-[#18191A] w-full md:w-[220px] p-2 md:p-4 md:h-52 rounded">
                <h3 className="text-white/80 font-bold mb-4">
                  {tScope("customerServiceTitle")}
                </h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <Link
                      href="/faq"
                      className="text-gray-300 hover:text-white"
                    >
                      {tScope("customerServiceFaq")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-and-policy"
                      className="text-gray-300 hover:text-white"
                    >
                      {tScope("customerServiceContact")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="text-gray-300 hover:text-white"
                    >
                      {tScope("customerServiceAbout")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-gray-300 hover:text-white"
                    >
                      {tScope("privacyPolicy")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl flex max-md:flex-col items-center justify-between border-t bg-[#18191A] mx-auto py-4">
          <div className="flex items-center gap-4 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-1">
              <p className="text-sm text-gray-400">
                © 2024 Zarguef. {tScope("allrights")}
              </p>

              <Link
                href="/terms-and-conditions"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {tScope("termsandconditions")}
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
            <Image
              src={brands[0].logo}
              width={45}
              height={45}
              alt={brands[0].name}
              className="object-cover"
            />
            <Image
              src={brands[1].logo}
              width={30}
              height={30}
              alt={brands[1].name}
              className="object-cover"
            />
            <Image
              src={brands[2].logo}
              width={30}
              height={30}
              alt={brands[2].name}
              className="object-cover"
            />
            <Image
              src={neosurf}
              width={70}
              height={55}
              alt="Neosurf"
              className="object-cover"
            />
            <Image
              src={giropay}
              width={55}
              height={35}
              alt="Giropay"
              className="object-cover"
            />

            <Image
              src="/paymentfoot2.png"
              width={260}
              height={260}
              alt="Marocco bank"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-gray-400 font-bold">{tScope("followUs")}</span>
          <div className="flex items-center justify-center gap-4 pb-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center p-1.5 rounded-full border-[2px] bg-[#363A3D] border-[#45494e] ${social.color} hover:opacity-80`}
              >
                <social.icon size={social.size} />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
