"use client";

import { Button } from "@/components/ui/button";
import { Card } from "../../components/ui/card";
// import { Navbar } from "@/components/ui/navbar";
import { Box, Heart, MinusIcon, PlusIcon, Share2, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCartStore } from "@/lib/manage";

const allProducts = {
  1: {
    id: 1,
    name: "Djellaba Royale",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500",
    description:
      "Élégante djellaba brodée à la main avec des motifs traditionnels",
    category: "Djellabas",
    details: {
      material: "100% Coton",
      origin: "Maroc",
      care: "Lavage à la main recommandé",
      sizes: ["S", "M", "L", "XL"],
    },
  },
  2: {
    id: 2,
    name: "Caftan Émeraude",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&q=80&w=500",
    description: "Caftan en soie avec broderies précieuses",
    category: "Caftans",
    details: {
      material: "Soie",
      origin: "Maroc",
      care: "Nettoyage à sec uniquement",
      sizes: ["S", "M", "L", "XL"],
    },
  },
  3: {
    id: 3,
    name: "Gandoura Sahara",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=500",
    description: "Gandoura légère parfaite pour l'été",
    category: "Gandouras",
    details: {
      material: "Lin",
      origin: "Tunisie",
      care: "Lavable en machine",
      sizes: ["S", "M", "L", "XL"],
    },
  },
};

export default function ProductPage() {
  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = allProducts[productId as keyof typeof allProducts];
  const [selectedSize, setSelectedSize] = useState(product.details.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  console.log(items);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Produit non trouvé. Veuillez vérifier l'URL ou retourner à la page
              d'accueil.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section Image avec Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={
                    isWishlisted
                      ? "w-6 h-6 text-red-500 fill-red-500"
                      : "w-6 h-6 text-gray-600"
                  }
                />
              </button>
            </div>
          </div>

          {/* Section Information Produit */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xl font-semibold text-gray-900 mt-4">
                {product.price}€
              </p>
              <p className="text-lg text-gray-600 mt-4">
                {product.description}
              </p>
            </div>

            {/* Avantages Produit */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gray-50 border-2">
                <Box className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">Retours Gratuits</h3>
                <p className="text-sm text-gray-600">Sous 30 jours</p>
              </Card>
              <Card className="p-4 bg-gray-50 border-2">
                <Truck className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">Livraison Express</h3>
                <p className="text-sm text-gray-600">2-4 jours ouvrés</p>
              </Card>
            </div>

            {/* Sélection Taille */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Sélectionnez votre taille
                </h3>
                <button className="text-sm text-yellow-600 hover:underline">
                  Guide des tailles
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.details.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`w-full ${
                      selectedSize === size ? "ring-2 ring-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sélection Quantité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quantité</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full"
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Bouton Ajouter au Panier */}
            <Button
              size="lg"
              className="w-full text-lg py-6 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition-colors"
              onClick={handleAddToCart}
            >
              Ajouter au Panier • {(product.price * quantity).toFixed(2)}€
            </Button>

            {/* Détails Produit */}
            <Card className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Détails du produit</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Matériau</span>
                  <span className="font-medium">
                    {product.details.material}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Origine</span>
                  <span className="font-medium">{product.details.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entretien</span>
                  <span className="font-medium">{product.details.care}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
