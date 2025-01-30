"use client";

import { Language, languages } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useChangeLocale,
  useCurrentLocale,
  useI18n,
  useScopedI18n,
} from "@/locales/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const LocaleSelect = () => {
  const [langSelected, setLangSelected] = useState<Language | null>(null);
  // const t = useI18n();
  // const tScope = useScopedI18n("languageandcur");
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  useEffect(() => {
    const findLanguage = languages.find((l) => l.code === locale);
    if (findLanguage) {
      setLangSelected(findLanguage);
    }
  }, [locale]);

  return (
    <div className="space-y-1 w-full">
      <Select
        onValueChange={(value) =>
          changeLocale(value as "en" | "fr" | "es" | "ar")
        }
      >
        <SelectTrigger className="w-full outline-none focus:outline-none focus:ring-0 focus:ring-offset-0">
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2">
                <Image
                  src={langSelected?.flag || languages[0].flag}
                  alt={langSelected?.name || "language"}
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
                <span className="flex-grow text-left text-sm font-medium -mt-0.5">
                  {langSelected?.name || "Francais"}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup className="w-full">
            {languages.map((lang) => (
              <SelectItem
                value={lang.code}
                key={lang.code}
                className="w-full flex items-center gap-3 p-4"
              >
                <div className="w-full flex items-center gap-2">
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <span className="flex-grow text-left text-sm font-medium">
                    {lang.name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
