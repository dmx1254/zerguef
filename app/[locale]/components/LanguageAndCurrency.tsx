"use client";

import React, { useState } from "react";

import { ChevronDown, Globe } from "lucide-react";
import { cn, languages } from "@/lib/utils";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { LocaleSelect } from "./LocaleSelect";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import clsx from "clsx";

const LanguageAndCurrency = ({ isShowBg = true }: { isShowBg?: boolean }) => {
  const tScope = useScopedI18n("navbar");

  const locale = useCurrentLocale();

  const [isOpen, setIsOpen] = useState(false);


  const getLocaleLanguage = () => {
    const language = languages.find((l) => l.code === locale);
    return language;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          aria-label="Language and currency"
          className={clsx(
            "outline-none inline-flex gap-2 px-3 py-2 transition-all duration-200 cursor-pointer rounded-full hover:opacity-90",
            {
              "border border-[#76828D] items-center focus:ring-0 bg-[#363A3D]":
                isShowBg,
              "border border-white/30 items-end self-end focus:ring-0 bg-[#363A3D]":
                !isShowBg,
            }
          )}
        >
          <Globe size={18} className="text-white" />
          <span className="text-sm font-medium text-white">
            {getLocaleLanguage()?.code.toUpperCase()}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "text-white transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>

      <DialogContent className="font-poppins w-full max-w-[450px] rounded-[20px] p-0 bg-white shadow-xl border border-gray-200">
        <div className="w-full grid divide-gray-100">
          <h2 className="px-4 pt-4 text-lg text-gray-800 font-semibold">
            {tScope("chooseLangue")}
          </h2>
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-lg text-gray-800">
              {tScope("language")}
            </h4>
            <LocaleSelect />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageAndCurrency;
