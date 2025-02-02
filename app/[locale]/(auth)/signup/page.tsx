"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useScopedI18n } from "@/locales/client";

const SignUpPage = () => {
  const tScope = useScopedI18n("signup");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      country: formData.get("country"),
      city: formData.get("city"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    const confirmPassword = formData.get("confirmPassword");

    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.country ||
      !data.city ||
      !data.address ||
      !data.password
    ) {
      toast.error(tScope("error.missingfields"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    if (data.password !== confirmPassword) {
      toast.error(tScope("error.passwordmismatch"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(tScope("error.signupError"));
      }

      const result = await response.json();
      if (result.email) {
        setRegistrationEmail(result.email);
        setShowVerification(true);
        toast.success(tScope("success.signup"), {
          style: {
            color: "#22c55e",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(tScope("error.signupError"), {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!verificationCode) {
      toast.error(tScope("verification.inputField"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/user/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registrationEmail,
          code: verificationCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Code invalide");
      }

      toast.success("Inscription validée ! Redirection...", {
        style: {
          color: "#22c55e",
        },
      });
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Code invalide ou expiré", {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {tScope("title")}
          </div>
          <p className="text-slate-600">{tScope("subtitle")}</p>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{tScope("firstName.label")}</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full"
                  placeholder={tScope("firstName.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{tScope("lastName.label")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full"
                  placeholder={tScope("lastName.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{tScope("email.label")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  placeholder={tScope("email.placeholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{tScope("phone.label")}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  required
                  className="w-full"
                  placeholder={tScope("phone.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">{tScope("country.label")}</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  className="w-full"
                  placeholder={tScope("country.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{tScope("city.label")}</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  className="w-full"
                  placeholder={tScope("city.placeholder")}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">{tScope("address.label")}</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  className="w-full"
                  placeholder={tScope("address.placeholder")}
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
                  placeholder={tScope("password.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {tScope("confirmPassword.label")}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full"
                  placeholder={tScope("confirmPassword.placeholder")}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>
        </CardContent>

        <div className="text-center self-center text-sm text-slate-600 mb-4">
          {tScope("alreadyAccount")}{" "}
          <Link href="/signin" className="text-amber-600 hover:underline ml-1">
            {tScope("alreadyAccounSignup")}
          </Link>
        </div>
      </Card>
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{tScope("verification.title")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-gray-600">
              {tScope("verification.subtitle", { email: registrationEmail })}
            </p>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">
                {tScope("verification.codeTitle")}
              </Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVerificationCode(e.target.value)
                }
                placeholder={tScope("verification.placeholder")}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />
            </div>
            <Button
              onClick={handleVerification}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? tScope("verification.button.loading")
                : tScope("verification.button")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpPage;
