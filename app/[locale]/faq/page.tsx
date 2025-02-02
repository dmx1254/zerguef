import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, HelpCircle } from "lucide-react";
import { useScopedI18n } from "@/locales/client";

const FaqPage = () => {
  const tScope = useScopedI18n("faq");
  const faqs = [
    {
      question: tScope("question1"),
      answer: tScope("answer1"),
    },
    {
      question: tScope("question2"),
      answer: tScope("answer2"),
    },
    {
      question: tScope("question3"),
      answer: tScope("answer3"),
    },
    {
      question: tScope("question4"),
      answer: tScope("answer4"),
    },
    {
      question: tScope("question5"),
      answer: tScope("answer5"),
    },
    {
      question: tScope("question6"),
      answer: tScope("answer6"),
    },
    {
      question: tScope("question7"),
      answer: tScope("answer7"),
    },
    {
      question: tScope("question8"),
      answer: tScope("answer8"),
    },
    {
      question: tScope("question9"),
      answer: tScope("answer9"),
    },
    {
      question: tScope("question10"),
      answer: tScope("answer10"),
    },
    {
      question: tScope("question11"),
      answer: tScope("answer11"),
    },
    {
      question: tScope("question12"),
      answer: tScope("answer12"),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 font-poppins">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{tScope("title")}</h1>
          <p className="text-gray-600">{tScope("description")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-md"
            >
              <AccordionTrigger className="px-6 hover:no-underline">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {tScope("contact.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {tScope("contact.description")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-600" />
                <span>{tScope("contact.email")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>{tScope("contact.phone")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaqPage;
