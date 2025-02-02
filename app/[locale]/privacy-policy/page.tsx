"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { useScopedI18n } from "@/locales/client";

const PrivacyPolicy = () => {
  const tScope = useScopedI18n("privacyPolicy");
  const sections = [
    {
      title: tScope("collection.title"),
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{tScope("collection.content1")}</li>
          <li>{tScope("collection.content2")}</li>
          <li>{tScope("collection.content3")}</li>
          <li>{tScope("collection.content4")}</li>
        </ul>
      ),
    },
    {
      title: tScope("usage.title"),
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{tScope("usage.content1")}</li>
          <li>{tScope("usage.content2")}</li>
          <li>{tScope("usage.content3")}</li>
          <li>{tScope("usage.content4")}</li>
          <li>{tScope("usage.content5")}</li>
          <li>{tScope("usage.content6")}</li>
        </ul>
      ),
    },
    {
      title: tScope("sharing.title"),
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{tScope("sharing.content1")}</li>
          <li>{tScope("sharing.content2")}</li>
          <li>{tScope("sharing.content3")}</li>
          <li>{tScope("sharing.content4")}</li>
        </ul>
      ),
    },
    {
      title: tScope("security.title"),
      content: <p className="text-gray-700">{tScope("security.content")}</p>,
    },
    {
      title: tScope("rights.title"),
      content: (
        <div className="space-y-4 text-gray-700">
          <p>{tScope("rights.content1")}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{tScope("rights.content2")}</li>
            <li>{tScope("rights.content3")}</li>
            <li>{tScope("rights.content4")}</li>
            <li>{tScope("rights.content5")}</li>
            <li>{tScope("rights.content6")}</li>
          </ul>
        </div>
      ),
    },
    {
      title: tScope("cookies.title"),
      content: <p className="text-gray-700">{tScope("cookies.content")}</p>,
    },
    {
      title: tScope("transfers.title"),
      content: <p className="text-gray-700">{tScope("transfers.content")}</p>,
    },
    {
      title: tScope("changes.title"),
      content: <p className="text-gray-700">{tScope("changes.content")}</p>,
    },
  ];
  return (
    <div className="container mx-auto py-8 px-4 font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-center">{tScope("title")}</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Introduction */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">{tScope("intro")}</p>
            <p className="text-gray-700">{tScope("acceptance")}</p>
          </CardContent>
        </Card>

        {/* Sections principales */}
        {sections.map((section, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        ))}

        {/* Informations de contact */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {tScope("contact.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-600" />
                <span>{tScope("contact.email")}: Sup@Zarguef.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>{tScope("contact.phone")}: +212660262544</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                <div>
                  <p>71-75 Shelton Street, Covent Garden,</p>
                  <p>London, United Kingdom, WC2H 9JQ</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium">{tScope("legalInfo.title")}</p>
                <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
                  <li>{tScope("legalInfo.content1")}</li>
                  <li>{tScope("legalInfo.content2")}</li>
                  <li>{tScope("legalInfo.content3")}</li>
                  <li>{tScope("legalInfo.content4")}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Définition des sections

export default PrivacyPolicy;
