"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Box, Heart, MinusIcon, PlusIcon, Share2, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCartStore } from "@/lib/manage";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useScopedI18n } from "@/locales/client";
import { toast } from "sonner";
import clsx from "clsx";

interface ProductDetails {
  material?: string;
  origin: string;
  care?: string;
  sizes?: string[];
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: ProductDetails;
  discount?: number;
  stock: number;
}

const volumes = ["60ml", "100ml", "200ml"];

// Loading Skeleton
const ProductSkeleton = () => (
  <div className="min-h-screen bg-gray-50 font-poppins animate-pulse">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="aspect-square bg-gray-200 rounded-xl" />

        {/* Content Skeleton */}
        <div className="space-y-8">
          <div>
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded-lg w-1/4 mb-4" />
            <div className="h-20 bg-gray-200 rounded-lg w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 rounded-lg" />
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>

          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-lg w-1/2" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const fetchProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Erreur lors du chargement du produit");
  return res.json();
};

export default function ProductPage() {
  const tScope = useScopedI18n("productDetail");
  const { items, addItem } = useCartStore();
  const params = useParams();
  const productId = params.id as string;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 0,
    refetchOnMount: true,
  });

  // console.log(product);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectV, setSelectedV] = useState<string>("");

  const showSizesAndCare = !["or", "parfums"].includes(
    product?.category.toLowerCase() || ""
  );

  if (isLoading) return <ProductSkeleton />;

  if (error || !product) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>{tScope("notFoundProduct")}</AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  // console.log(selectV);
  // console.log(items);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price,
      image: product.image,
      quantity: quantity,
      volume: selectV,
      ...(showSizesAndCare && { size: selectedSize }),
    });
    toast.success("Produit ajouté au panier", {
      style: {
        color: "#22c55e",
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Section Image */}
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
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium px-2 py-1 ${
                  product.stock && product.stock > 0
                    ? "text-inherit p-4"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.stock && product.stock > 0 ? (
                  <span>
                    <strong>{product.stock}</strong> {tScope("inStock")}{" "}
                  </span>
                ) : (
                  tScope("epuise")
                )}
              </span>
            </div>
          </div>

          {/* Section Information */}
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
                {formatPrice(product.price)}
              </p>
              <p className="text-lg text-gray-600 mt-4">
                {product.description}
              </p>
            </div>

            {/* Avantages */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-gray-50 border-2">
                <Box className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">{tScope("back")}</h3>
                <p className="text-sm text-gray-600">{tScope("dela")}</p>
              </Card>
              <Card className="p-4 bg-gray-50 border-2">
                <Truck className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">{tScope("delivery")}</h3>
                <p className="text-sm text-gray-600">{tScope("daysJours")}</p>
              </Card>
            </div>

            {/* Sélection Taille - Conditionnelle */}
            {/* {showSizesAndCare && product.details.sizes && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {tScope("chooseTaile")}
                  </h3>
                  <button className="text-sm text-yellow-600 hover:underline">
                    {tScope("guideTaille")}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.details.sizes.map((size: string) => (
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
            )} */}

            {product?.category === "parfums" && (
              <div className="grid grid-cols-4 gap-2">
                {volumes.map((v: string) => (
                  <Button
                    key={v}
                    variant={selectV === v ? "default" : "outline"}
                    className={`w-full ${
                      selectV === v ? "ring-2 ring-yellow-500" : ""
                    }`}
                    onClick={() => setSelectedV(v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            )}

            {/* Sélection Quantité */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{tScope("qty")}</h3>
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
              className="w-full text-lg py-6 rounded-xl bg-[#18191A] hover:opacity-80 transition-colors"
              onClick={handleAddToCart}
              disabled={showSizesAndCare && !selectedSize}
            >
              {tScope("addToCart")} • {formatPrice(product.price * quantity)}
            </Button>

            {/* Détails Produit - Conditionnels */}
            {(showSizesAndCare || product.details.origin) && (
              <Card className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">
                  {tScope("prodDetail")}
                </h3>
                <div className="space-y-3">
                  {product.details.material && showSizesAndCare && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">
                        {tScope("materDet")}
                      </span>
                      <span className="font-medium">
                        {product.details.material}
                      </span>
                    </div>
                  )}
                  {product.details.origin && (
                    <div
                      className={clsx(
                        `flex justify-between ${
                          product.details.care && "border-b"
                        } border-gray-200 pb-2`
                      )}
                    >
                      <span className="text-gray-600">
                        {tScope("origDetail")}
                      </span>
                      <span className="font-medium">
                        {product.details.origin}
                      </span>
                    </div>
                  )}
                  {product.details.care && showSizesAndCare && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {tScope("entretien")}
                      </span>
                      <span className="font-medium">
                        {product.details.care}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
