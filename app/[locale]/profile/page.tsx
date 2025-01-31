"use client";

import React, { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Package,
  User,
  Settings,
  LogOut,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  password: string;
  phone: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface Order {
  orderNumber: string;
  products: CartItem[];
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  const handleChangePassword = async () => {
    if (newPassword.trim().length < 6 || newPassword !== confirmNewPassword) {
      if (newPassword.trim().length < 6) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères", {
          style: {
            color: "#ef4444",
          },
        });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast.error("Les mots de passes ne correspondent pas", {
          style: {
            color: "#ef4444",
          },
        });
        return;
      }
    } else {
      try {
        setIsUpdatingPassword(true);
        const response = await fetch(`/api/user/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword, id: session?.user.id }),
        });
        if (!response.ok) {
          toast.error("Erreur lors de la mise à jour du mot de passe", {
            style: {
              color: "#ef4444",
            },
          });

          throw new Error("Erreur lors de la mise à jour du mot de passe");
        }
        const res = await response.json();
        if (res) {
          toast.success("Mot de passe mis à jour avec succès", {
            style: {
              color: "#10b981",
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdatingPassword(false);
      }
    }
  };

  // Mock data - remplacer par vos vraies données
  const user: User = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    country: "Morocco",
    city: "Casablanca",
    address: "123 Rue des Artisans",
    phone: "+212 6XX-XXXXXX",
    password: "********",
  };

  const orders: Order[] = [
    {
      orderNumber: "ORD-2024-001",
      date: "2024-01-30",
      status: "completed",
      total: 299.99,
      products: [
        {
          id: 1,
          name: "Tapis Berbère",
          price: 199.99,
          image: "/products/tapis.jpg",
          quantity: 1,
          size: "200x150cm",
        },
        {
          id: 2,
          name: "Théière traditionnelle",
          price: 99.99,
          image: "/products/theiere.jpg",
          quantity: 1,
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Card className="shadow-xl mt-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={clsx("w-full justify-start", {
                    "text-yellow-500": activeTab === "profile",
                  })}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
                <Button
                  variant="ghost"
                  className={clsx("w-full justify-start", {
                    "text-yellow-500": activeTab === "orders",
                  })}
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Commandes
                </Button>
                <Button
                  variant="ghost"
                  className={clsx("w-full justify-start", {
                    "text-yellow-500": activeTab === "settings",
                  })}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <Tabs value={activeTab} className="space-y-4">
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Information personnelle</CardTitle>
                  <CardDescription>
                    Gérez vos informations personnelles et vos coordonnées.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName">Prénom</label>
                      <Input id="firstName" value={user.firstName} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName">Nom</label>
                      <Input id="lastName" value={user.lastName} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </label>
                    <Input value={user.email} />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Téléphone
                    </label>
                    <Input value={user.phone} />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Adresse
                    </label>
                    <Input value={user.address} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>Ville</label>
                      <Input value={user.city} />
                    </div>
                    <div className="space-y-2">
                      <label>Pays</label>
                      <Input value={user.country} />
                    </div>
                  </div>
                  <Button className="w-full">
                    Sauvegarder les modifications
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Mes commandes</CardTitle>
                  <CardDescription>
                    Historique de vos commandes et leur statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="border rounded-lg p-4 mb-4"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">
                            Commande #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </div>
                      </div>
                      <div className="space-y-4">
                        {order.products.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-4"
                          >
                            <div className="w-16 h-16 bg-gray-100 rounded">
                              {/* Image placeholder */}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-500">
                                Quantité: {product.quantity}
                                {product.size && ` • Taille: ${product.size}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {product.price.toFixed(2)} €
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-semibold">
                            {order.total.toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                  <CardDescription>
                    Gérez vos préférences et la sécurité de votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label>Nouveau mot de passe</label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setNewPassword(e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Confirmez le mot de passe</label>
                      <Input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setConfirmNewPassword(e.target.value)
                        }
                      />
                    </div>
                    <Button className="w-full" onClick={handleChangePassword}>
                      {isUpdatingPassword
                        ? "En cours..."
                        : "Mettre à jour le mot de passe"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
