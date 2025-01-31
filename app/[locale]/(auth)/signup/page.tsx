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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      toast.error("Tous les champs sont requis", {
        style: {
          color: "#ef4444",
        },
      });

      return;
    } else if (data.password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas", {
        style: {
          color: "#ef4444",
        },
      });
      return;
    }
    {
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
          throw new Error("Erreur lors de l'inscription");
        }

        const res = response.json();

        if (res) {
          toast.success(
            "Inscription réussie. Vous allez être redirigé vers la page de connexion",
            {
              style: {
                color: "#22c55e",
              },
            }
          );

          setTimeout(() => {
            router.push("/signin");
          }, 1500);
        }

        // Connexion automatique après l'inscription
        // await signIn("credentials", {
        //   email: data.email,
        //   password: data.password,
        //   callbackUrl: "/",
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    // Validation basique
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-8 px-4">
      <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Créer votre compte
          </div>
          <p className="text-slate-600">
            Rejoignez notre communauté d&apos;amateurs d&apos;artisanat
            traditionnel
          </p>
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
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full"
                  placeholder="Jean"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full"
                  placeholder="Dupont"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full"
                  placeholder="jean.dupont@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telephone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  required
                  className="w-full"
                  placeholder="+212 0645748631"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  className="w-full"
                  placeholder="France"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  name="city"
                  required
                  className="w-full"
                  placeholder="Paris"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  className="w-full"
                  placeholder="123 rue de la Paix"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full"
                  placeholder="********"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full"
                  placeholder="********"
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
          Déjà un compte ?{" "}
          <Link href="/signin" className="text-amber-600 hover:underline ml-1">
            Connectez-vous
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
