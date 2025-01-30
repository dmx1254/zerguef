"use client";

import { Button } from "@/components/ui/button";
// import { Navbar } from "@/components/ui/navbar";
import { useCartStore } from "@/lib/manage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  Star,
} from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

const featuredProducts = [
  {
    id: 1,
    name: "Djellaba Royale",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=500",
    description:
      "Élégante djellaba brodée à la main avec des motifs traditionnels",
    category: "djellabas",
  },
  {
    id: 2,
    name: "Caftan Émeraude",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1600267185393-e158a98703de?auto=format&fit=crop&q=80&w=500",
    description: "Caftan en soie avec broderies précieuses",
    category: "caftans",
  },
  {
    id: 3,
    name: "Gandoura Sahara",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=500",
    description: "Gandoura légère parfaite pour l'été",
    category: "gandouras",
  },
];

const categories = [
  {
    name: "Djellabas",
    image:
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&q=80&w=500",
    link: "/categories/djellabas",
    description: "Élégance traditionnelle pour homme et femme",
  },
  {
    name: "Caftans",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=500",
    link: "/categories/caftans",
    description: "Tenues d'exception pour vos cérémonies",
  },
  {
    name: "Gandouras",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500",
    link: "/categories/gandouras",
    description: "Confort et style au quotidien",
  },
];

const features = [
  {
    icon: Truck,
    title: "Livraison Express",
    description: "Livraison gratuite en France dès 200€",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Par carte ou PayPal",
  },
  {
    icon: Clock,
    title: "Retours Faciles",
    description: "30 jours pour changer d'avis",
  },
];

const HeroSection = () => (
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
        Souk Élégant
      </h1>
      <p className="text-2xl max-w-2xl mx-auto font-light">
        Découvrez l'authenticité et l'élégance de la mode traditionnelle
        marocaine
      </p>
      <div className="flex gap-6 justify-center pt-4">
        <Button
          size="lg"
          className="bg-white text-black hover:bg-white/90 text-lg px-8"
        >
          Nouvelle Collection
        </Button>
        {/* <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-black transition-all text-lg px-8"
        >
          En savoir plus
        </Button> */}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent" />
  </section>
);

const SearchBar = () => (
  <div className="relative max-w-xl mx-auto -mt-8 z-10">
    <div className="bg-white rounded-full shadow-xl p-2 flex items-center">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        className="flex-1 px-6 py-3 outline-none"
      />
      <Button className="rounded-full px-8">
        <Search className="h-5 w-5 mr-2" />
        Rechercher
      </Button>
    </div>
  </div>
);

const ProductCard = ({ product }: any) => {
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
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0 relative">
          <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
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
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-600">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews} avis)
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
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
            onClick={() =>
              addItem({
                id: product.id,
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
      </CardContent>
    </Card>
  );
};

const CategoryShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {categories.map((category, index) => (
      <Link
        key={category.name}
        href={category.link}
        className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
      >
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-white text-3xl font-bold mb-3">
            {category.name}
          </h3>
          <p className="text-white/90 text-lg mb-6">{category.description}</p>
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-black transition-all"
          >
            Explorer la Collection
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Link>
    ))}
  </div>
);

const PromoBanner = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600">
    <div className="absolute inset-0 bg-grid-white/10" />
    <div className="relative px-8 py-12 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-white space-y-4 text-center md:text-left">
        <h3 className="text-3xl font-bold">Offre Spéciale</h3>
        <p className="text-lg text-white/90">
          -20% sur toute la collection d'été avec le code{" "}
          <strong>ETE 2025</strong>
        </p>
      </div>
      <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
        En profiter maintenant
        <Tag className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-poppins">
      <HeroSection />
      <SearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collections */}
        <section className="py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Nos Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une sélection raffinée de vêtements traditionnels marocains, où
              chaque pièce raconte une histoire d'artisanat et de tradition
            </p>
          </div>
          <CategoryShowcase />
        </section>

        {/* Promo Banner */}
        <section className="pb-24">
          <PromoBanner />
        </section>

        {/* Featured Products */}
        <section className="pb-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Nos Produits Populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos pièces les plus appréciées, sélectionnées avec soin
              pour leur qualité exceptionnelle
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="pb-24">
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
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Souk Élégant</h3>
              <p className="text-gray-400">
                L'élégance de la tradition marocaine à portée de main
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Collections
              </h4>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.link}
                      className="hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Service Client
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/livraison"
                    className="hover:text-white transition-colors"
                  >
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link
                    href="/retours"
                    className="hover:text-white transition-colors"
                  >
                    Retours & Échanges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Nous Contacter
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:contact@soukelegant.com"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    contact@soukelegant.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33123456789"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    +33 1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-center gap-2">75001 Paris, France</li>
              </ul>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold text-white mb-2">
                  Newsletter
                </h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="bg-white/10 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sous-footer */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2024 Souk Élégant. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
