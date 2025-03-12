"use client";

import { useEffect, useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  Trash2,
  CreditCard,
  Wallet,
  ShoppingBag,
  Truck,
  Gift,
} from "lucide-react";
import { useCartStore, useCartSubtotal, useIsCartEmpty } from "@/lib/manage";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "./ui/card";
import { Label } from "@/components/ui/label";
import { CardBank, formatPrice, generateOrderNumber } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useScopedI18n } from "@/locales/client";
import Image from "next/image";
import { DialogShipping } from "./DialogShipping";
import { useRouter } from "next/navigation";

const CartStats = () => {
  const tScope = useScopedI18n("cart");
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <ShoppingBag className="h-6 w-6 text-yellow-600 mb-2" />
        <h3 className="text-sm font-medium text-yellow-900">
          {tScope("cartFree")}
        </h3>
        <p className="text-xs text-yellow-700">
          {tScope("orderCart", { item: formatPrice(250) })}
        </p>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <Truck className="h-6 w-6 text-blue-600 mb-2" />
        <h3 className="text-sm font-medium text-blue-900">
          {tScope("orderCartEx")}
        </h3>
        <p className="text-xs text-blue-700">{tScope("orderCartovr")}</p>
      </Card>
      <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
        <Gift className="h-6 w-6 text-rose-600 mb-2" />
        <h3 className="text-sm font-medium text-rose-900">
          {tScope("orderCartEmb")}
        </h3>
        <p className="text-xs text-rose-700">{tScope("orderCartOption")}</p>
      </Card>
    </div>
  );
};

export default function ShoppingCart() {
  const router = useRouter();
  const tScope = useScopedI18n("cart");
  const { data: session } = useSession();
  const { items, totalAmount, removeItem, updateQuantity, clearCart } =
    useCartStore();
  const subtotal = useCartSubtotal();
  const isEmpty = useIsCartEmpty();
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>(false);
  const [shipping, setShipping] = useState<number>(0);
  const [shippingRegion, setShippingRegion] = useState<string>("casablanca");
  const [open, setOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(totalAmount + shipping);

  // const total = totalAmount + shipping;

  // console.log(selectedPayment);

  useEffect(() => {
    if (selectedPayment === "virement") {
      const discount = ((totalAmount * 5) / 100).toFixed(2);
      const total = Number(totalAmount + shipping - Number(discount)).toFixed(
        2
      );
      setTotal(Number(total));
    } else {
      setTotal(totalAmount + shipping);
    }
  }, [totalAmount, shipping, selectedPayment]);

  // console.log(total);
  // console.log(items);

  useEffect(() => {
    if (!shippingRegion || shippingRegion === "casablanca") {
      setShipping(0);
    } else {
      setShipping(20);
    }
  }, [shippingRegion]);

  const handleCheckout = async () => {
    if (!shippingRegion) {
      setOpen(true);
    } else if (!session?.user) {
      toast.error(tScope("cartErrorLogin"), {
        style: {
          color: "#f8312f",
        },
      });
      return;
    } else {
      try {
        setIsOrderLoading(true);
        const orderData = {
          orderNumber: generateOrderNumber(),
          userId: session.user.id,
          items: items,
          total: total,
          shipping: shipping,
          paymentMethod: selectedPayment,
          shippingRegion,
        };

        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error("Erreur lors du paiement");
        }

        const result = await response.json();

        if (result) {
          toast.success(tScope("cartSuccess"), {
            style: {
              color: "#22c55e",
            },
          });

          clearCart();
          setSelectedPayment("card");
          router.push("/checkout-success");
        }
      } catch (error) {
        console.error("Erreur:", error);
        toast.error(tScope("cartErrorPay"), {
          style: {
            color: "#f8312f",
          },
        });
      } finally {
        setIsOrderLoading(false);
      }
    }
  };

  const paymentMethods: CardBank[] = [
    {
      id: "card",
      name: tScope("bankCard"),
      description: tScope("bankCardDesk"),
      icon: CreditCard,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      brands: [
        { name: tScope("brands.visa"), logo: "/visa.png" },
        { name: tScope("brands.mastercard"), logo: "/mastercard.png" },
        { name: tScope("brands.paypal"), logo: "/paypal.png" },
      ],
    },
    {
      id: "cash",
      name: tScope("bankHomeDeliver"),
      description: tScope("bankHomeDeliverDesc"),
      icon: Wallet,
      bgColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
    {
      id: "virement",
      name: "Virement bancaire",
      description: "Paiement par virement bancaire marocain",
      bankIcon: "/paymentfoot2.png",
      bgColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
    // {
    //   id: "virement",
    //   name: "Virement bancaire",
    //   description: "Paiement par crédit agricole",
    //   bankIcon: "/crd_agricole.png",
    //   bgColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    // },
    // {
    //   id: "virement",
    //   name: "Virement bancaire",
    //   description: "Paiement par Société Générale",
    //   bankIcon: "/sg.png",
    //   bgColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    // },
  ];

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br font-poppins from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <Alert className="bg-white shadow-lg border-0">
            <AlertDescription className="text-lg">
              {tScope("emptyCart")}
            </AlertDescription>
          </Alert>
          <Button
            asChild
            className="mt-6 bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700"
          >
            <Link href="/">{tScope("disvoverProduct")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br font-poppins from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
          {tScope("title")}
        </h1>

        <CartStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-lg transition-shadow duration-200 bg-[#2a2d30]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-white/80 text-lg">
                      {item.name}
                    </h3>
                    <p className="text-white/80">
                      {formatPrice(item.price)}
                      {item.size && ` • Taille: ${item.size}`}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-white/80">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  setShippingRegion("");
                }}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                {tScope("clearCart")}
              </Button>
            </div>

            <div className="">
              <div>
                <p>{tScope("dialogTitle")}</p>
                <p>{tScope("dialogDesc")}</p>
              </div>

              <div className="flex flex-col gap-4 py-4">
                <RadioGroup
                  value={shippingRegion}
                  onValueChange={setShippingRegion}
                  className="gap-6 cursor-pointer"
                >
                  <div
                    className={`flex items-center space-x-2 p-4 border-2 border-transparent rounded-[12px] relative overflow-hidden ${
                      shippingRegion === "casablanca"
                        ? "border-[#3a7979] bg-[#3a3b3b] text-white/80"
                        : "bg-[#5e5f5f] text-white/80"
                    }`}
                    onClick={() => setShippingRegion("casablanca")}
                  >
                    {/* Badge Livraison Gratuite */}
                    <div className="absolute -right-12 top-2 bg-green-500 text-white px-12 py-1 transform rotate-45 text-xs font-bold">
                      {tScope("free")}
                    </div>

                    <RadioGroupItem
                      value="casablanca"
                      id="casablanca"
                      className="border border-white/20"
                    />
                    <Label htmlFor="casablanca" className="flex flex-col">
                      <span className="font-medium flex items-center gap-2">
                        {tScope("dialogCa")}
                        <span className="text-green-500">🚚</span>
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-green-600">
                          {tScope("freeDel")} ✅
                        </span>
                        <span className="text-sm text-white/80">
                          {tScope("dialogCaHours")}
                        </span>
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-2 p-4 border-2 border-transparent rounded-[12px] ${
                      shippingRegion === "hors-casablanca"
                        ? "border-[#3a7979] bg-[#3a3b3b] text-white/80"
                        : "bg-[#5e5f5f] text-white/80"
                    }`}
                    onClick={() => setShippingRegion("hors-casablanca")}
                  >
                    <RadioGroupItem
                      value="hors-casablanca"
                      id="hors-casablanca"
                      className="border border-white/20"
                    />
                    <Label htmlFor="hors-casablanca" className="flex flex-col">
                      <span className="font-medium">
                        {tScope("dialogHorsCa")}
                      </span>
                      <span className="text-sm text-white/80">
                        {tScope("dialogHorsCaHours")}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-[#2a2d30] shadow-lg border-0">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                {tScope("resumeCart")}
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>{tScope("cartSous")}</span>
                  <span>{subtotal}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>{tScope("cartDelivery")}</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-3 flex text-white/80 justify-between font-semibold text-lg">
                  <span>{tScope("cartTotal")}</span>
                  <span className="bg-gradient-to-r text-white/80 font-extrabold bg-clip-text">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[#2a2d30] text-gray-400 shadow-lg border-0">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                {tScope("cartPaymentMode")}
              </h2>

              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
                className="space-y-4"
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative bg-[#2a2d30] rounded-xl border ${
                      selectedPayment === method.id
                        ? "border-[#587070] bg-[#3a3b3b] border-2"
                        : "border-gray-600 hover:border-blue-200"
                    } transition-colors duration-200 p-4`}
                  >
                    <div className="flex items-center space-x-3">
                      <Label
                        htmlFor={method.id}
                        className="flex flex-col items-start gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={method.id}
                            id={method.id}
                            className={`border ${
                              selectedPayment === method.id
                                ? "border-gray-600"
                                : "border-white/60"
                            } `}
                          />

                          <div className={`p-2 rounded-lg ${method.bgColor}`}>
                            {method.icon && (
                              <method.icon className="h-5 w-5 text-white" />
                            )}
                            {method.bankIcon && (
                              <Image
                                src={method.bankIcon}
                                width={method.id === "virement" ? 200 : 100}
                                height={method.id === "virement" ? 100 : 50}
                                alt="Marocco bank"
                                className="object-cover"
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                          <div className="font-medium text-white/80">
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {method.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                    {method.brands && (
                      <div className="mt-3 flex gap-2 pl-8">
                        {method.brands.map((brand) => (
                          <div
                            key={brand.name}
                            className="w-12 h-8 bg-white rounded border flex items-center justify-center p-1"
                          >
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
              <div className="flex items-center gap-2 p-3 mb-4 mt-2 bg-[#2c2e30] rounded-lg border border-green-200">
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {tScope("percentRemise")}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-white/80">
                    {tScope("remise")}
                  </span>
                  <span className="text-green-500 text-2xl">💳</span>
                </div>
              </div>
            </Card>

            <Button
              size="lg"
              className="w-full py-6 text-lg bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700 transition-colors duration-300 shadow-lg"
              onClick={handleCheckout}
            >
              {isOrderLoading
                ? tScope("cartPayLoading")
                : `${tScope("cartToPay")} ${formatPrice(total)}`}
            </Button>
            <div className="flex items-center gap-2">
              <p>{tScope("whatsapp")}</p>
              <Link
                href="https://wa.me/212660265244"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={24}
                  height={24}
                  className="object-cover"
                  src="/whatsapp.png"
                  alt="zerguef whatsapp"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
