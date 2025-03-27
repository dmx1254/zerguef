"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/manage";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { toast } from "sonner";
import Image from "next/image";
import PaginationCategoryPage from "../../components/PaginationCategoryPage";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  volume?: string;
  details: {
    material?: string;
    origin: string;
    care?: string;
    sizes?: string[];
  };
  discount?: number;
  stock: number;
}

const fetchProducts = async (category: string, page: number) => {
  const params = new URLSearchParams();
  params.append("category", category);
  params.append("page", page.toString());

  const res = await fetch(`/api/products/search?${params.toString()}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    console.error("API Error:", res.status, res.statusText);
    throw new Error("Erreur lors du chargement des produits");
  }
  const data = await res.json();
  console.log("API Response:", data);
  return data;
};

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price,
      image: product.image,
      volume: "60ml",
      quantity: 1,
    });
    toast.success("Produit ajouté au panier", {
      style: {
        color: "#22c55e",
      },
    });
  };

  return (
    <Card
      className="group overflow-hidden font-poppins bg-[#18191A] border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product._id}`}>
        <CardHeader className="p-0 relative">
          <div className="w-full relative overflow-hidden bg-gray-100 aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              priority
            />
            {product.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full text-xs font-medium">
                -{product.discount}%
              </div>
            )}
          </div>
        </CardHeader>
      </Link>

      <CardContent className="py-4 px-2">
        <Link href={`/products/${product._id}`}>
          <CardTitle className="mb-2 text-sm text-gray-300 line-clamp-1 hover:text-gray-500 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 h-10 overflow-hidden">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          {product.discount ? (
            <div>
              <p className="text-base sm:text-lg font-bold text-blue-600">
                {formatPrice(product.price * (1 - product.discount / 100))}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.price)}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </p>
          )}
          <button
            className="gap-2 bg-gradient-to-r from-yellow-600 p-1.5 rounded to-blue-600 hover:from-yellow-700 hover:to-blue-700 transition-all duration-300"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 text-white/80" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function CategoryPage() {
  const tScopeCart = useScopedI18n("cart");
  const params = useParams();
  const category = params.category as string;

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // console.log("Fetching products for category:", category, "page:", page);
        const res = await fetchProducts(category, page);
        // console.log("Products received:", res.products);
        setProducts(res.products || []);
        setTotalPages(res.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [category, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl flex flex-col items-center justify-center mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p className="text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl flex flex-col items-center justify-center mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-gray-600">
            {category === "mikhwar-emarati" && tScopeCart("mikhwarDesc")}
            {category === "folar" && tScopeCart("folarDesc")}
            {category.includes("djellabas") && tScopeCart("djellaDesc")}
            {category === "caftans" && tScopeCart("cafDesc")}
            {category === "parfums" && tScopeCart("parfDesc")}
          </p>
        </div>

        {/* Grille principale */}
        <div className="w-full">
          {/* Liste des produits */}
          <div className="col-span-12">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-8">
                {[...Array(12)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="w-full h-[200px] bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <PaginationCategoryPage
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Aucun produit trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
