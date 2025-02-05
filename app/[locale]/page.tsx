"use client";

import { Button } from "@/components/ui/button";
import Form from "next/form";
import { CartItem, useCartStore } from "@/lib/manage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  ChevronRight,
  Tag,
  ShoppingBag,
  Search,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { categoriesClothes, formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CategorySkeletonGrid,
  ProductSkeletonGrid,
} from "./components/skelettons/skeletons";
import { useScopedI18n } from "@/locales/client";
import { toast } from "sonner";
import Testimonials from "./components/Testimonials";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

// Types
interface Category {
  id: string;
  name: string;
  icon: StaticImport;
  slug: string;
}

// Types des produits
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

interface ProductCardProps {
  product: Product;
}

// API Fetchers
const fetchCategories = async () => {
  const res = await fetch("/api/categories", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des catégories");
  }
  return res.json();
};

const fetchProducts = async () => {
  const res = await fetch("/api/products", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des produits");
  }
  return res.json();
};

// Components
const HeroSection = () => {
  const tScope = useScopedI18n("home");
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1579493934830-eab45746b51b?auto=format&fit=crop&q=80&w=1200"
        >
          <source src="/assets/background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="relative text-center text-white space-y-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Zerguef
        </h1>
        <p className="text-2xl max-w-2xl mx-auto font-light">
          {tScope("desc")}
        </p>
        <div className="flex gap-6 justify-center pt-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 text-lg px-8"
            asChild
          >
            <Link href="/categories/djellabas">{tScope("descBtn")}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
    </section>
  );
};

const SearchBar = () => {
  const tScope = useScopedI18n("home");
  return (
    <Form action="/search" className="relative max-w-xl mx-auto -mt-8 z-10">
      <div className="bg-white rounded-full shadow-xl p-2 flex items-center mx-2">
        <input
          type="text"
          name="query"
          placeholder={tScope("searchplaceholder")}
          className="flex-1 px-3 sm:px-6 py-3 outline-none"
        />
        <Button className="rounded-full px-4 sm:px-8" type="submit">
          <Search className="h-6 w-6 sm:h-5 sm:w-5 mr-2" />
          <span className="max-sm:hidden">{tScope("searchText")}</span>
        </Button>
      </div>
    </Form>
  );
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
      className="group overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product._id}`}>
        <CardHeader className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className={`object-cover w-full h-full transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            {product.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                -{product.discount}%
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </CardHeader>
      </Link>

      <CardContent className="p-6">
        <Link href={`/products/${product._id}`}>
          <CardTitle className="mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>

        <CardDescription className="text-sm mb-4 line-clamp-2">
          {product.description}
        </CardDescription>

        <div className="flex items-end justify-between">
          <div>
            {product.discount ? (
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">
                  {formatPrice(discountedPrice)}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              addItem({
                id: product._id,
                name: product.name,
                price: discountedPrice,
                image: product.image,
                quantity: 1,
              });
              toast.success("Produit ajouté au panier", {
                style: {
                  color: "#22c55e",
                },
              });
            }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CategoryShowcase = ({ categories }: { categories: Category[] }) => {
  const tScope = useScopedI18n("navbar");
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="flex flex-col items-center gap-2"
        >
          <Image
            src={category.icon}
            alt={category.name}
            width={48}
            height={48}
          />
          <h3 className="text-base font-bold mb-3">
            {tScope(
              category.slug as
                | "abaya-femme"
                | "parfums"
                | "djellabas"
                | "caftans"
                | "or"
            )}
          </h3>
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-white text-3xl font-bold mb-3">
              {category.name}
            </h3>
            <p className="text-white/90 text-lg mb-6">{category.description}</p>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black transition-all"
            >
              {tScope("catBtnCollection")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div> */}
        </Link>
      ))}
    </div>
  );
};

const PromoBanner = () => {
  const tScope = useScopedI18n("home");
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative px-8 py-12 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white space-y-4 text-center md:text-left">
          <h3 className="text-3xl font-bold">{tScope("offerTitle")}</h3>
          <p className="text-lg text-white/90">
            {tScope("offerDesc", { item: -5 })}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-600 hover:bg-white/90"
        >
          <Link href="/categories/djellabas">
            {tScope("offerBtn")}
            <Tag className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Home Page
export default function Home() {
  const tScope = useScopedI18n("home");

  const features = [
    {
      icon: Truck,
      title: tScope("expressDeliverTitle"),
      description: tScope("expressDeliverDesc", { price: formatPrice(250) }),
    },
    {
      icon: Shield,
      title: tScope("securepaymentTitle"),
      description: tScope("securepaymentDesc"),
    },
    {
      icon: Clock,
      title: tScope("refundTitle"),
      description: tScope("refundDesc"),
    },
  ];
  // Requête pour les catégories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnMount: true,
    staleTime: 0,
  });

  // Requête pour les produits
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnMount: true,
    staleTime: 0,
  });

  return (
    <main className="min-h-screen bg-gray-50 font-poppins">
      <HeroSection />
      <SearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collections */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {tScope("catTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tScope("catDescription")}
            </p>
          </div>
          {isLoadingCategories ? (
            <CategorySkeletonGrid />
          ) : (
            <CategoryShowcase categories={categoriesClothes} />
          )}
        </section>
        <section className="pb-24">
          <Testimonials />
        </section>
        {/* Promo Banner */}
        <section className="pb-24">
          <PromoBanner />
        </section>
        {/* Featured Products */}
        <section className="pb-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {tScope("productTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {tScope("productDesc")}
            </p>
          </div>
          {isLoadingProducts ? (
            <ProductSkeletonGrid />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products?.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
        {/* Features */}:
        {/* <section className="pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all group"
              >
                <div className="bg-blue-50 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </main>
  );
}
