"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useScopedI18n } from "@/locales/client";

const SignInPage = () => {
  const tScope = useScopedI18n("signin");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error(tScope("error.missingfields"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    } else {
      try {
        setIsLoading(true);
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!response?.ok) {
          if (response?.error?.includes("Adresse E-mail incorrect")) {
            toast.error(tScope("error.email"), {
              style: {
                color: "#ef4444",
              },
            });
          }
          if (response?.error?.includes("Mot de passe incorrect")) {
            toast.error(tScope("error.password"), {
              style: {
                color: "#ef4444",
              },
            });
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Zerguef
          </div>
          <p className="text-slate-600">{tScope("subtitle")}</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{tScope("email.label")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={tScope("email.placeholder")}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{tScope("password.label")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? tScope("button.loading") : tScope("button")}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-slate-600">
          <div>
            <Link
              href="/forgot-password"
              className="text-amber-600 hover:underline"
            >
              {tScope("forgotpassword")}
            </Link>
          </div>
          <div>
            {tScope("noaccount")}{" "}
            <Link href="/signup" className="text-amber-600 hover:underline">
              {tScope("signup")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
