"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
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
import { signOut, useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartResponse, Order, formatPrice } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

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

const ProfilePage = () => {
  const tScope = useScopedI18n("profile");
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", session?.user.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/${session?.user.id}`, {
        method: "GET",
      });
      const result = await res.json();
      return result;
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        country: data.country || "",
        city: data.city || "",
        address: data.address || "",
        phone: data.phone || "",
      });
    }
  }, [data]);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      const response = await fetch(`/api/user/${session?.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      await queryClient.invalidateQueries({
        queryKey: ["user", session?.user.id],
      });

      toast.success(tScope("successUpdateProfile"), {
        style: {
          color: "#10b981",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(tScope("updateProfilError"), {
        style: {
          color: "#ef4444",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.trim().length < 6 || newPassword !== confirmNewPassword) {
      if (newPassword.trim().length < 6) {
        toast.error(tScope("passwordErrorLength"), {
          style: {
            color: "#ef4444",
          },
        });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast.error(tScope("passwordnorMatchError"), {
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
          toast.error(tScope("passwordError"), {
            style: {
              color: "#ef4444",
            },
          });

          throw new Error("Erreur lors de la mise à jour du mot de passe");
        }
        const res = await response.json();
        if (res) {
          toast.success(tScope("passwordSuccess"), {
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

  const { data: ordersData, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", session?.user?.id],
    queryFn: async () => {
      const res = await fetch("/api/order", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des commandes");
      }
      const data = await res.json();
      return data as Order[];
    },
    enabled: !!session?.user?.id,
  });

  // console.log(ordersData);

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  // if (error) {
  //   return <div>Erreur lors du chargement des données</div>;
  // }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Card className="shadow-xl mt-1">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback className="font-bold">
                  {data?.firstName?.[0]}
                  {data?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                {data?.firstName} {data?.lastName}
              </CardTitle>
              <CardDescription>{data?.email}</CardDescription>
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
                  {tScope("title")}
                </Button>
                <Button
                  variant="ghost"
                  className={clsx("w-full justify-start", {
                    "text-yellow-500": activeTab === "orders",
                  })}
                  onClick={() => setActiveTab("orders")}
                >
                  <Package className="mr-2 h-4 w-4" />
                  {tScope("orders")}
                </Button>
                <Button
                  variant="ghost"
                  className={clsx("w-full justify-start", {
                    "text-yellow-500": activeTab === "settings",
                  })}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {tScope("password")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {tScope("logout")}
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
                  <CardTitle>{tScope("personalInfo")}</CardTitle>
                  <CardDescription>{tScope("manageInfo")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName">{tScope("firstName")}</label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName">{tScope("lastName")}</label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {tScope("email")}
                    </label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      {tScope("phone")}
                    </label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {tScope("address")}
                    </label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label>{tScope("city")}</label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label>{tScope("country")}</label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                  >
                    {isUpdating ? tScope("updating") : tScope("saveChanges")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>{tScope("orders")}</CardTitle>
                  <CardDescription>{tScope("orderHistory")}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingOrders ? (
                    <div className="text-center py-4">
                      {tScope("orderLoading")}
                    </div>
                  ) : ordersData?.length === 0 ? (
                    <div className="text-center py-4">{tScope("noOrders")}</div>
                  ) : (
                    ordersData?.map((order) => (
                      <div
                        key={order.orderNumber}
                        className="border rounded-lg p-4 mb-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">
                              {tScope("order")} #{order.orderNumber}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString(
                                "fr-FR"
                              )}
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
                            {order.status === "pending" && tScope("pending")}
                            {order.status === "processing" &&
                              tScope("processing")}
                            {order.status === "completed" &&
                              tScope("completed")}
                            {order.status === "cancelled" &&
                              tScope("cancelled")}
                          </div>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((product: CartResponse) => (
                            <div
                              key={product.id}
                              className="flex items-center space-x-4"
                            >
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {tScope("qty")}: {product.quantity}
                                  {product.volume &&
                                    ` • Format: ${product.volume}`}
                                  {product.size && ` • Taille: ${product.size}`}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {product.volume &&
                                    `Format: ${product.volume}`}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {formatPrice(product.price.toFixed(2))}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between">
                            <span className="font-semibold">
                              {tScope("total")}
                            </span>
                            <span className="font-semibold">
                              {formatPrice(order.total.toFixed(2))}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>{tScope("settingTitle")}</CardTitle>
                  <CardDescription>{tScope("settingDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label>{tScope("newPassword")}</label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setNewPassword(e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label>{tScope("confirmNewPassword")}</label>
                      <Input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setConfirmNewPassword(e.target.value)
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleChangePassword}
                      disabled={isUpdatingPassword}
                    >
                      {isUpdatingPassword
                        ? tScope("updating")
                        : tScope("updateNewPassword")}
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
