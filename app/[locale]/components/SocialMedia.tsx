"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaSkype,
  FaTiktok,
  FaDiscord,
  FaWhatsapp,
  FaTelegramPlane,
  FaSnapchat,
} from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import clsx from "clsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScopedI18n } from "@/locales/client";

const SocialMedia = ({ isSource = false }) => {
  const tScope = useScopedI18n("pageicon");

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/ibendouma1",
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
      href: "https://wa.me/971529087560",
      color: "text-green-600",
      size: 14,
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@ibendouma.com",
      color: "text-gray-500",
      size: 13,
    },
    {
      icon: FaSnapchat,
      href: "https://www.snapchat.com/",
      color: "text-yellow-500",
      size: 13,
    },

    {
      icon: FaInstagram,
      href: "https://www.instagram.com/ibendouma_com/",
      color: "text-[#E1306C]",
      size: 13,
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={clsx(
            "flex fixed bottom-4 left-4 flex-col items-center gap-2 justify-center p-1.5 rounded-full text-white hover:opacity-80",
            {
              "border-[2px] bg-[#363A3D] border-[#45494e]": !isSource,
            }
          )}
        >
          <img
            className={clsx("object-cover object-center rounded-full", {
              "w-8 h-8 sm:w-9 sm:h-9": !isSource,
              "w-10 h-10 sm:w-12 sm:h-12": isSource,
            })}
            src="/social.png"
            alt="Social media"
          />
          {isSource && (
            <div className="max-sm:text-xs flex flex-col text-inherit items-center text-sm antialiased">
              <span className="text-black">{tScope("social1")}</span>
              <span className="text-black max-sm:hidden">
                {tScope("social2")}
              </span>
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto ml-2 p-3 bg-[#363A3D] border-[#45494e]">
        <div className="flex max-md:flex-col items-center gap-2">
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
      </PopoverContent>
    </Popover>
  );
};

export default SocialMedia;
