"use client";

import React, { useState } from "react";

import { ChevronDown, Globe } from "lucide-react";
import { Language, cn, languages } from "@/lib/utils";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { LocaleSelect } from "./LocaleSelect";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const LanguageAndCurrency = ({ isShowBg = true }: { isShowBg?: boolean }) => {
  const pathname = usePathname();

  const locale = useCurrentLocale();

  const [isActiveCurrency, setIsActiveCurrency] = useState<string>("euro");
  const [language, setLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

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
            "outline-none inline-flex items-center gap-2 px-3 py-2 transition-all duration-200 cursor-pointer rounded-full hover:opacity-90",
            {
              "border border-[#76828D] focus:ring-0 bg-[#363A3D] max-md:hidden":
                isShowBg,
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
      <DialogContent className="font-poppins w-full max-w-[450px] rounded-[20px] p-0 bg-white shadow-xl border border-gray-200">
        <div className="w-full grid divide-gray-100">
          <h2 className="px-4 pt-4 text-lg text-gray-800 font-semibold">
            title
          </h2>
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-lg text-gray-800">language</h4>
            <LocaleSelect />
          </div>

          <p className="w-full text-sm px-4 pb-4 pt-1 text-gray-800">desc</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageAndCurrency;
