"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Clock, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { useScopedI18n } from "@/locales/client";

const ContactPage = () => {
  const tScope = useScopedI18n("contact");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    toast.success(tScope("form.success"), {
      style: {
        color: "#22c55e",
      },
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 font-poppins">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{tScope("title")}</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {tScope("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {tScope("formTitle")}
              </CardTitle>
              <CardDescription>{tScope("formDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">{tScope("form.name")}</label>
                  <Input
                    id="name"
                    placeholder={tScope("form.placeholder.name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">{tScope("form.email")}</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={tScope("form.placeholder.email")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject">{tScope("form.subject")}</label>
                  <Input
                    id="subject"
                    placeholder={tScope("form.placeholder.subject")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">{tScope("form.message")}</label>
                  <Textarea
                    id="message"
                    placeholder={tScope("form.placeholder.message")}
                    className="min-h-[150px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> {tScope("form.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{tScope("infoTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tScope("email")}</h3>
                    <p className="text-gray-600">sup@zarguef.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tScope("phone")}</h3>
                    <p className="text-gray-600">+212660262544</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tScope("workingHours")}</h3>
                    <p className="text-gray-600">
                      {tScope("workingHoursDetails")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <p className="text-gray-700">{tScope("supportMessage")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
