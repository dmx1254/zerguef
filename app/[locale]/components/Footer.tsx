"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

const Footer = () => {
  const tScope = useScopedI18n("home");
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");
  const [emailLoading, setEmailLoading] = useState<boolean>(false);

  const categories = [
    {
      name: tScope("colDjel"),
      link: "/categories/djellabas",
    },
    {
      name: tScope("colCaf"),
      link: "/categories/caftans",
    },
    {
      name: tScope("colParf"),
      link: "/categories/parfums",
    },
    {
      name: tScope("colOr"),
      link: "/categories/or",
    },
  ];

  const handleSignToNewLetter = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email invalide", {
        style: {
          color: "#ef4444",
        },
      });
    } else {
      setEmailLoading(true);

      setTimeout(() => {
        setEmailLoading(false);
      }, 1000);

      toast.success("Votre email a été bien ajouté", {
        style: {
          color: "#22c55e",
        },
      });
    }
  };

  return (
    !pathname.includes("signin") &&
    !pathname.includes("signup") &&
    !pathname.includes("profile") &&
    !pathname.includes("forgot-password") && (
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Zerguef</h3>
              <p className="text-gray-400">{tScope("footDesc")}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {tScope("colTitle")}
              </h4>
              <ul className="space-y-2">
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
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {tScope("customerServiceTitle")}
              </h4>
              <ul className="space-y-2">
                {/* <li>
              <Link
                href="/livraison"
                className="hover:text-white transition-colors"
              >
                Livraison
              </Link>
            </li>
            <li>
              <Link
                href="/retours"
                className="hover:text-white transition-colors"
              >
                Retours & Échanges
              </Link>
            </li> */}
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors"
                  >
                    {tScope("customerServiceFaq")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    {tScope("customerServiceContact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="hover:text-white transition-colors"
                  >
                    {tScope("customerServiceAbout")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {tScope("contactUs")}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:contact@soukelegant.com"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    sup@zerguef.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33123456789"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    +212660262544
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  Shelton Street, Covent Garden, London, United Kingdom, WC2H
                  9JQ
                </li>
              </ul>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold text-white mb-2">
                  {tScope("newsletterTitle")}
                </h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={tScope("newsletterPlace")}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="bg-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSignToNewLetter}
                  >
                    {emailLoading
                      ? tScope("newsletterLoading")
                      : tScope("newsletterBtn")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sous-footer */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2024 Zerguef. {tScope("allrights")}
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {tScope("privacyPolicy")}
                </Link>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {tScope("termsandconditions")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
