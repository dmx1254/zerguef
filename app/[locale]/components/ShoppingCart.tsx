"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, Trash2, CreditCard, Wallet, ShoppingBag, Truck, Gift } from "lucide-react";
import { useCartStore, useCartSubtotal, useIsCartEmpty } from "@/lib/manage";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "./ui/card";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const paymentMethods = [
  {
    id: "card",
    name: "Carte Bancaire",
    description: "Visa, Mastercard, Paypal",
    icon: CreditCard,
    bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
    brands: [
      { name: "Visa", logo: "/visa.png" },
      { name: "Mastercard", logo: "/mastercard.png" },
      { name: "Paypal", logo: "/paypal.png" }
    ]
  },
  {
    id: "cash",
    name: "Paiement à la livraison",
    description: "Payez en espèces à la réception",
    icon: Wallet,
    bgColor: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
];

const CartStats = () => (
  <div className="grid grid-cols-3 gap-4 mb-8">
    <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
      <ShoppingBag className="h-6 w-6 text-yellow-600 mb-2" />
      <h3 className="text-sm font-medium text-yellow-900">Livraison Gratuite</h3>
      <p className="text-xs text-yellow-700">Pour les commandes &gt; 500 DH</p>
    </Card>
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <Truck className="h-6 w-6 text-blue-600 mb-2" />
      <h3 className="text-sm font-medium text-blue-900">Livraison Express</h3>
      <p className="text-xs text-blue-700">24-48h ouvrées</p>
    </Card>
    <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
      <Gift className="h-6 w-6 text-rose-600 mb-2" />
      <h3 className="text-sm font-medium text-rose-900">Emballage Cadeau</h3>
      <p className="text-xs text-rose-700">Option disponible</p>
    </Card>
  </div>
);

export default function ShoppingCart() {
  const { items, totalAmount, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = useCartSubtotal();
  const isEmpty = useIsCartEmpty();
  const [selectedPayment, setSelectedPayment] = useState("card");

  const shipping = 30;
  const total = totalAmount + shipping;

  const handleCheckout = () => {
    console.log("Paiement en cours...", {
      items,
      total,
      paymentMethod: selectedPayment,
    });
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br font-poppins from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <Alert className="bg-white shadow-lg border-0">
            <AlertDescription className="text-lg">
              Votre panier est vide. Continuez vos achats pour ajouter des articles.
            </AlertDescription>
          </Alert>
          <Button asChild className="mt-6 bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700">
            <Link href="/">Découvrir nos produits</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br font-poppins from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
          Mon Panier
        </h1>

        <CartStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow duration-200 bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden shadow-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      {formatPrice(item.price)}
                      {item.size && ` • Taille: ${item.size}`}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-white"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                    <p className="font-semibold text-lg bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                Vider le panier
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg border-0">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                Résumé de la commande
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg border-0">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
                Mode de paiement
              </h2>

              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
                className="space-y-4"
              >
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`relative rounded-xl border-2 ${
                      selectedPayment === method.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    } transition-colors duration-200 p-4`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer">
                        <div className={`p-2 rounded-lg ${method.bgColor}`}>
                          <method.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                    {method.brands && (
                      <div className="mt-3 flex gap-2 pl-8">
                        {method.brands.map(brand => (
                          <div key={brand.name} className="w-12 h-8 bg-white rounded border flex items-center justify-center p-1">
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
            </Card>

            <Button
              size="lg"
              className="w-full py-6 text-lg bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700 transition-colors duration-300 shadow-lg"
              onClick={handleCheckout}
            >
              Payer {formatPrice(total)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}