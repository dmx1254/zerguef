"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Building, User } from "lucide-react";
import { useScopedI18n } from "@/locales/client";

const TermAndCondition = () => {
  const tScope = useScopedI18n("termandconditions");
  const sections = {
    cgu: [
      {
        title: tScope("cgu.introduction.title"),
        content: tScope("cgu.introduction.content"),
      },
      {
        title: tScope("cgu.definitions.title"),
        content: [
          tScope("cgu.definitions.site"),
          tScope("cgu.definitions.products"),
          tScope("cgu.definitions.services"),
        ],
      },
      {
        title: tScope("cgu.usercommitments.title"),
        content: [
          tScope("cgu.usercommitments.legaluse"),
          tScope("cgu.usercommitments.accurateinfo"),
          tScope("cgu.usercommitments.nofraud"),
          tScope("cgu.usercommitments.confidentiality"),
        ],
      },
      {
        title: tScope("cgu.productspricing.title"),
        content: [
          tScope("cgu.productspricing.authentic"),
          tScope("cgu.productspricing.updates"),
          tScope("cgu.productspricing.taxincluded"),
        ],
      },
      {
        title: tScope("cgu.payment.title"),
        content: [
          tScope("cgu.payment.methods"),
          tScope("cgu.payment.timely"),
          tScope("cgu.payment.fees"),
        ],
      },
      {
        title: tScope("cgu.shipping.title"),
        content: [
          tScope("cgu.shipping.localinternational"),
          tScope("cgu.shipping.delay"),
          tScope("cgu.shipping.internationaldelay"),
        ],
      },
      {
        title: tScope("cgu.returns.title"),
        content: tScope("cgu.returns.policy"),
      },
    ],
    legal: {
      companyInfo: {
        name: "Zarguef",
        address:
          "71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
        email: "Sup@Zarguef.com",
        phone: "+212660262544",
        type: "Société privée à responsabilité limitée",
        creationDate: "1er février 2023",
        dissolutionDate: "9 juillet 2024",
        status: "Société dissoute",
      },
      sections: [
        {
          title: tScope("legal.dataprotection.title"),
          content: tScope("legal.dataprotection.content"),
        },
        {
          title: tScope("legal.intellectualproperty.title"),
          content: tScope("legal.intellectualproperty.content"),
        },
        {
          title: tScope("legal.liability.title"),
          content: tScope("legal.liability.content"),
        },
      ],
    },
  };

  return (
    <div className="container mx-auto py-8 px-4 font-poppins">
      <h1 className="text-3xl font-bold text-center mb-8">{tScope("title")}</h1>

      <Tabs defaultValue="cgu" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="cgu">{tScope("tabs.cgu")}</TabsTrigger>
          <TabsTrigger value="legal">{tScope("tabs.legal")}</TabsTrigger>
        </TabsList>

        <TabsContent value="cgu">
          <div className="space-y-6">
            {sections.cgu.map((section, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {Array.isArray(section.content) ? (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {section.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">{section.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="legal">
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {tScope("legal.company.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-600" />
                    <span>{tScope("legal.company.name")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span>{tScope("legal.company.address")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span>{tScope("legal.company.email")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span>{tScope("legal.company.phone")}</span>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium mb-2">
                    {tScope("legal.company.titleStatus")}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>{tScope("legal.company.type")}</li>
                    <li>{tScope("legal.company.creationdate")}</li>
                    <li>{tScope("legal.company.status")}</li>
                    <li>{tScope("legal.company.dissolutiondate")}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {sections.legal.sections.map((section, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TermAndCondition;
