"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
// import { Navbar } from "@/components/ui/navbar";
import { useCartStore } from "@/lib/manage";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Filter, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";

const categoryProducts = {
  djellabas: [
    {
      id: 1,
      name: "Djellaba Royale",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500",
      description:
        "Élégante djellaba brodée à la main avec des motifs traditionnels",
    },
    {
      id: 4,
      name: "Djellaba Safran",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500",
      description: "Djellaba moderne aux couleurs vibrantes",
    },
    {
      id: 12,
      name: "Djellaba Premium",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500",
      description: "Djellaba moderne aux couleurs vibrantes",
    },
    {
      id: 1,
      name: "Djellaba Pre",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500",
      description:
        "Élégante djellaba brodée à la main avec des motifs traditionnels",
    },
  ],
  caftans: [
    {
      id: 2,
      name: "Caftan Émeraude",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&q=80&w=500",
      description: "Caftan en soie avec broderies précieuses",
    },
    {
      id: 5,
      name: "Caftan Royal",
      price: 449,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=500",
      description: "Caftan luxueux pour occasions spéciales",
    },
  ],
  gandouras: [
    {
      id: 3,
      name: "Gandoura Sahara",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=500",
      description: "Gandoura légère parfaite pour l'été",
    },
    {
      id: 6,
      name: "Gandoura Médina",
      price: 179,
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500",
      description: "Gandoura traditionnelle au style authentique",
    },
  ],
};

const categoryTitles = {
  djellabas: "Djellabas",
  caftans: "Caftans",
  gandouras: "Gandouras",
};

const CategoryHeader = ({ category }: { category: string }) => (
  <div className="relative mb-12 text-center">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative">
      <span className="bg-gradient-to-r from-yellow-600 to-blue-600 text-transparent bg-clip-text text-4xl font-bold px-4 uppercase tracking-wider">
        {categoryTitles[category as keyof typeof categoryTitles]}
      </span>
    </div>
    <p className="mt-4 text-lg text-gray-600">
      Découvrez notre collection de{" "}
      {categoryTitles[category as keyof typeof categoryTitles].toLowerCase()}
    </p>
  </div>
);

const FiltersSection = () => (
  <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
    <div className="flex gap-4">
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Filtres
      </Button>
      <Button variant="outline" className="gap-2">
        Trier par <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-gray-600">6 produits trouvés</p>
  </div>
);

const ProductCard = ({ product, onAddToCart }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      className="group overflow-hidden font-poppins bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className={`object-cover w-full h-full transition-transform duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Nouveau
              </div>
            )}
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
        <Link href={`/products/${product.id}`}>
          <CardTitle className="mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          {product.discount ? (
            <div className="space-x-2">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price * (1 - product.discount / 100))}
              </span>
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full gap-2 bg-gradient-to-r from-yellow-600 to-blue-600 hover:from-yellow-700 hover:to-blue-700 transition-all duration-300"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingBag className="h-5 w-5" />
          Ajouter au Panier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const products = categoryProducts[category as keyof typeof categoryProducts] || [];
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discount 
        ? product.price * (1 - product.discount / 100)
        : product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <CategoryHeader category={category} />
        <FiltersSection />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}