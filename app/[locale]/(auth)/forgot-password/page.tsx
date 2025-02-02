"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useScopedI18n } from "@/locales/client";

const ForgotPassword = () => {
  const tScope = useScopedI18n("forgotpassword");
  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(tScope("emailStep.error"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Email non trouvé");
      }

      toast.success(tScope("emailStep.success"), {
        style: {
          color: "#22c55e",
        },
      });
      setStep("code");
    } catch (error) {
      toast.error(tScope("codeStep.notFounEmailerror"), {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error(tScope("codeStep.error"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/user/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        throw new Error("Code invalide");
      }

      toast.success(tScope("codeStep.success"), {
        style: {
          color: "#22c55e",
        },
      });
      setStep("password");
    } catch (error) {
      toast.error(tScope("codeStep.expiredEmailerror"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error(tScope("passwordStep.error"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error(tScope("passwordStep.passwordMismatch"), {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/user/new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, password }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation");
      }

      toast.success("Mot de passe réinitialisé avec succès", {
        style: {
          color: "#22c55e",
        },
      });
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de la réinitialisation du mot de passe", {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
            <LockKeyhole className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {tScope("title")}
          </h2>
          <p className="text-sm text-gray-500">
            {step === "email"
              ? tScope("codeStep.emailInput")
              : step === "code"
              ? tScope("codeStep.toInputCode")
              : tScope("codeStep.chooseNewPassword")}
          </p>
        </CardHeader>

        <CardContent>
          {step === "email" && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{tScope("emailStep.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={tScope("emailStep.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? tScope("emailStep.button.sending")
                  : tScope("emailStep.button.sendCode")}
              </Button>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">{tScope("codeStep.label")}</Label>
                <Input
                  id="code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? tScope("codeStep.button.verifying")
                  : tScope("codeStep.button.verifyCode")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("email")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {tScope("codeStep.back")}
              </Button>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  {tScope("passwordStep.newPasswordLabel")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {tScope("passwordStep.confirmPasswordLabel")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? tScope("passwordStep.button.resetting")
                  : tScope("passwordStep.button.resetPassword")}
              </Button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link
              href="/signin"
              className="text-sm text-yellow-600 hover:underline"
            >
              {tScope("footer.backToSignin")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
