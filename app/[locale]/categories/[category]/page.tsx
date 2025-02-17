"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/lib/manage";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Filter,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScopedI18n } from "@/locales/client";
import { toast } from "sonner";
import Image from "next/image";

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

interface Filters {
  sizes: string[];
  priceRange: [number, number];
  materials: string[];
  onlyInStock: boolean;
  onSale: boolean;
  volume: string;
}

const volumes = ["60ml", "100ml", "200ml"];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const fetchProducts = async (category: string, filters?: any) => {
  const params = new URLSearchParams();

  // Toujours inclure la catégorie
  params.append("category", category);

  // Ajouter les autres filtres s'ils existent
  if (filters) {
    if (filters.priceRange) {
      params.append("minPrice", filters.priceRange[0].toString());
      params.append("maxPrice", filters.priceRange[1].toString());
    }
    if (filters.onlyInStock) params.append("inStock", "true");
    if (filters.onSale) params.append("onSale", "true");
  }

  const res = await fetch(`/api/products/search-product?${params.toString()}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des produits");
  return res.json();
};

const ProductCard = ({ product }: { product: Product }) => {
  const tScope = useScopedI18n("categories");
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // console.log(product);

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
      className="group overflow-hidden font-poppins bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product._id}`}>
        <CardHeader className="p-0 relative">
          <div className="w-full relative overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className={`object-cover w-full h-[200px] transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            {product.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                -{product.discount}%
              </div>
            )}
          </div>
          {/* <button
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
          </button> */}
        </CardHeader>
      </Link>

      <CardContent className="p-6">
        <Link href={`/products/${product._id}`}>
          <CardTitle className="mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10 overflow-hidden">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          {product.discount ? (
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price * (1 - product.discount / 100))}
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
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full gap-2 bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700 transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-5 w-5" />
          {tScope("addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Page principale des catégories
export default function CategoryPage() {
  const tScope = useScopedI18n("categories");
  const tScopeCart = useScopedI18n("cart");
  const params = useParams();
  const category = params.category as string;
  const [activeFilters, setActiveFilters] = useState<Filters>({
    sizes: [],
    priceRange: [0, 10000],
    materials: [],
    onlyInStock: false,
    onSale: false,
    volume: "",
  });
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parfumsSeleced, setParfumsSelected] = useState<string>("");

  // console.log(category);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category, activeFilters],
    queryFn: () => fetchProducts(category, activeFilters),
    staleTime: 0,
  });

  const showSizesAndMaterials = ![
    "folar",
    "parfums",
    "mikhwar-emarati",
    "abaya-femme",
    "djellabas-femme",
    "djellabas-homme",
    "djellabas-enfant",
    "caftans",
  ].includes(category.toLowerCase());

  const sortOptions = [
    { value: "newest", label: tScope("newestLab1") },
    { value: "price-asc", label: tScope("newestLab2") },
    { value: "price-desc", label: tScope("newestLab3") },
    { value: "name-asc", label: tScope("newestLab4") },
    { value: "name-desc", label: tScope("newestLab5") },
  ];
  const availableMaterials = ["Coton", "Soie", "Lin", "Laine", "Synthetique"];

  // Filtrer les produits
  const filteredProducts = products.filter((product: Product) => {
    if (activeFilters.onlyInStock && product.stock <= 0) return false;
    if (activeFilters.onSale && !product.discount) return false;
    if (
      product.price < activeFilters.priceRange[0] ||
      product.price > activeFilters.priceRange[1]
    )
      return false;
    if (
      showSizesAndMaterials &&
      activeFilters.sizes.length > 0 &&
      !activeFilters.sizes.some((size) => product.details.sizes?.includes(size))
    )
      return false;
    if (
      showSizesAndMaterials &&
      activeFilters.materials.length > 0 &&
      !activeFilters.materials.includes(product.details.material || "")
    )
      return false;
    return true;
  });

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort(
    (a: Product, b: Product) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    }
  );

  const clearFilters = () => {
    setActiveFilters({
      sizes: [],
      priceRange: [0, 1000],
      materials: [],
      onlyInStock: false,
      onSale: false,
      volume: "",
    });
  };

  const handleVolumeFilter = (volume: string) => {
    setParfumsSelected(volume);
    setActiveFilters((prev) => ({
      ...prev,
      volume: volume,
    }));
  };

  // console.log(parfumsSeleced);

  // Composant des filtres mobiles et desktop
  const FiltersContent = () => (
    <div className="space-y-6">
      {showSizesAndMaterials && (
        <>
          {category !== "mikhwar-emarati" && (
            <div>
              <h3 className="font-semibold mb-3">{tScope("taile")}</h3>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    variant={
                      activeFilters.sizes.includes(size) ? "default" : "outline"
                    }
                    className="w-full"
                    onClick={() =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        sizes: prev.sizes.includes(size)
                          ? prev.sizes.filter((s) => s !== size)
                          : [...prev.sizes, size],
                      }))
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3">{tScope("matTitle")}</h3>
            <div className="space-y-2">
              {availableMaterials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={activeFilters.materials.includes(material)}
                    onCheckedChange={(checked) =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        materials: checked
                          ? [...prev.materials, material]
                          : prev.materials.filter((m) => m !== material),
                      }))
                    }
                  />
                  <label htmlFor={material} className="text-sm">
                    {tScope(
                      material as
                        | "Coton"
                        | "Soie"
                        | "Lin"
                        | "Laine"
                        | "Synthetique"
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div>
        <h3 className="font-semibold mb-3">{tScope("price")}</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={activeFilters.priceRange}
            onValueChange={(value: [number, number]) =>
              setActiveFilters((prev) => ({
                ...prev,
                priceRange: value as [number, number],
              }))
            }
            className="mb-4"
          />
          <div className="flex justify-between text-sm">
            <span>{formatPrice(activeFilters.priceRange[0])}</span>
            <span>{formatPrice(activeFilters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={activeFilters.onlyInStock}
            onCheckedChange={(checked: boolean) =>
              setActiveFilters((prev) => ({
                ...prev,
                onlyInStock: checked as boolean,
              }))
            }
          />
          <label htmlFor="inStock">{tScope("inStock")}</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="onSale"
            checked={activeFilters.onSale}
            onCheckedChange={(checked: boolean) =>
              setActiveFilters((prev) => ({
                ...prev,
                onSale: checked as boolean,
              }))
            }
          />
          <label htmlFor="onSale">{tScope("promotion")}</label>
        </div>
      </div>
      {category === "parfums" && (
        <div>
          <Select value={parfumsSeleced} onValueChange={handleVolumeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={tScope("format")} />
            </SelectTrigger>
            <SelectContent>
              {volumes.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
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

        {/* Barre de filtres et tri */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Filtres Mobile */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    {tScope("filter")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:w-96">
                  <SheetHeader className="mb-6">
                    <SheetTitle>{tScope("filter")}</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    <FiltersContent />
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* Tri */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filtres actifs */}
              <div className="flex flex-wrap gap-2">
                {activeFilters.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {size}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          sizes: prev.sizes.filter((s) => s !== size),
                        }))
                      }
                    />
                  </Badge>
                ))}
                {activeFilters.materials.map((material) => (
                  <Badge
                    key={material}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {material}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          materials: prev.materials.filter(
                            (m) => m !== material
                          ),
                        }))
                      }
                    />
                  </Badge>
                ))}
                {(activeFilters.onlyInStock || activeFilters.onSale) && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                    onClick={clearFilters}
                  >
                    {activeFilters.onlyInStock ? "En stock" : "En promotion"}
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                )}
                {(activeFilters.sizes.length > 0 ||
                  activeFilters.materials.length > 0 ||
                  activeFilters.onlyInStock ||
                  activeFilters.onSale) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-600"
                  >
                    {tScope("delAll")}
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {sortedProducts.length} {tScope("pro")}
              {sortedProducts.length > 1 ? "s" : ""} {tScope("finding")}
              {sortedProducts.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-12 gap-8">
          {/* Filtres Desktop */}
          <aside className="hidden lg:block col-span-3 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" /> {tScope("filter")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FiltersContent />
              </CardContent>
            </Card>
          </aside>

          {/* Liste des produits */}
          <div className="col-span-12 lg:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-gray-200" />
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                      <div className="h-8 bg-gray-200 rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">
                  {tScope("noProFind")}
                </h3>
                <p className="text-gray-600 mb-4">{tScope("tryToModif")}</p>
                <Button onClick={clearFilters} variant="outline">
                  {tScope("reset")}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
