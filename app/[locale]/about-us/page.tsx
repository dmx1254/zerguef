"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  Star,
  Target,
  Eye,
  Shield,
  Heart,
  Truck,
  UserCheck,
  Trophy,
  Store,
} from "lucide-react";
import { useScopedI18n } from "@/locales/client";

const AboutUsPage = () => {
  const tScope = useScopedI18n("about");
  const values = [
    {
      icon: Shield,
      title: tScope("values.quality"),
      description: tScope("values.qualityDescription"),
    },
    {
      icon: Award,
      title: tScope("values.authenticity"),
      description: tScope("values.authenticityDescription"),
    },
    {
      icon: Heart,
      title: tScope("values.customerService"),
      description: tScope("values.customerServiceDescription"),
    },
  ];

  const advantages = [
    {
      icon: Star,
      title: tScope("advantages.exclusiveProducts"),
      description: tScope("advantages.exclusiveProductsDescription"),
    },
    {
      icon: Truck,
      title: tScope("advantages.fastDelivery"),
      description: tScope("advantages.fastDeliveryDescription"),
    },
    {
      icon: UserCheck,
      title: tScope("advantages.customerSatisfaction"),
      description: tScope("advantages.customerSatisfactionDescription"),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 font-poppins">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section d'introduction */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">
            {tScope("title")}
          </h1>
          <Card className="shadow-lg bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-6 w-6 text-blue-600" />
                <CardTitle>www.zarguef.com</CardTitle>
              </div>
              <p className="text-gray-700 leading-relaxed">{tScope("intro")}</p>
            </CardHeader>
          </Card>
        </div>

        <div className="border-t pt-12"></div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">{tScope("whoWeAre")}</h1>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="pt-6 px-6">
              <p className="text-gray-700 leading-relaxed">
                {tScope("whoWeAreDescription")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section Mission */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-6 w-6 text-blue-600" />
              <CardTitle>{tScope("missionTitle")}</CardTitle>
            </div>
            <p className="text-gray-700">{tScope("missionDescription")}</p>
          </CardHeader>
        </Card>

        {/* Section Valeurs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            {tScope("valuesTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section Avantages */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {tScope("whyChooseUsTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-4">
                      <advantage.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section Vision */}
        <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-6 w-6 text-yellow-600" />
              <CardTitle>{tScope("visionTitle")}</CardTitle>
            </div>
            <p className="text-gray-700">{tScope("visionDescription")}</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default AboutUsPage;
