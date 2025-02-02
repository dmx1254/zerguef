"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/manage";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: {
    material?: string;
    origin: string;
    care?: string;
    sizes?: string[];
  };
  discount?: number;
  stock: number;
}

type SearchParamsProps = {
  params: { locale: string };
  searchParams: { query?: string };
};

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card
      className="group overflow-hidden hover:shadow-lg transition-shadow relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product._id}`}>
        <div className="aspect-w-3 aspect-h-2 relative">
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-48 transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              -{product.discount}%
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            {product.discount ? (
              <div className="space-y-1">
                <div className="font-bold text-lg text-blue-600">
                  {formatPrice(discountedPrice)}
                </div>
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </div>
              </div>
            ) : (
              <div className="font-bold text-lg text-blue-600">
                {formatPrice(product.price)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() =>
                addItem({
                  id: product._id,
                  name: product.name,
                  price: discountedPrice,
                  image: product.image,
                  quantity: 1,
                })
              }
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton loader pour les produits
const ProductSkeleton = () => (
  <Card className="overflow-hidden animate-pulse">
    <div className="aspect-w-3 aspect-h-2 bg-gray-200" />
    <CardContent className="p-4">
      <div className="h-6 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded w-16" />
      </div>
    </CardContent>
  </Card>
);

const SearchPage = ({ searchParams }: SearchParamsProps) => {
  const tScope = useScopedI18n("search");
  const query = searchParams?.query || "";

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", query],
    queryFn: async () => {
      const res = await fetch(
        `/api/products/search?query=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Erreur lors de la recherche");
      return res.json();
    },
    enabled: !!query,
  });

  if (!query) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600">
              {tScope("start")}
            </h2>
            <p className="text-gray-500 mt-2">{tScope("startDesc")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            {tScope("resultFor")} "{query}"
          </h1>
          {!isLoading && (
            <p className="text-gray-600">
              {products?.length ?? 0} {tScope("resultFind")}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600">
                {tScope("resultFindNo")}
              </h2>
              <p className="text-gray-500 mt-2">{tScope("resultFindTried")}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
