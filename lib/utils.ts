import { StaticImageData } from "next/image";
import es from "@/public/flags/spain.png";
import fr from "@/public/flags/fr.png";
import en from "@/public/flags/en.png";
import ar from "@/public/flags/arabic.png";

import caftan from "@/public/assets/caftan.png";
import abayafemme from "@/public/assets/abaya-femme.png";
import djel from "@/public/assets/djellabas.png";
import parfums from "@/public/assets/parfums.png";
import or from "@/public/assets/or.png";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Language {
  code: string;
  name: string;
  flag: StaticImageData;
}

export const languages: Language[] = [
  { code: "fr", name: "Français", flag: fr },
  { code: "en", name: "Englais", flag: en },
  // { code: "es", name: "Español", flag: es },
  { code: "ar", name: "Arabe", flag: ar },
];

export const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat("ar-MA", {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));
};

export interface UserResponse {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  password?: string;
  phone: string;
}

export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  // Génération du numéro de commande
  const orderNumber = `ORD-${year}${minutes}${seconds}-${milliseconds}`;

  return orderNumber;
};

export interface CartResponse extends Document {
  _id: string;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  volume?: string;
}

export interface Order extends Document {
  _id: string;
  orderNumber: string;
  userId: string;
  items: CartResponse[];
  total: number;
  volume?: string;
  shipping: number;
  paymentMethod: "card" | "cash";
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export const djellabas = [
  {
    id: "HG15LP",
    name: "Djellabas femme",
    slug: "djellabas-femme",
  },
  {
    id: "PA37KW",
    name: "Djellabas homme",
    slug: "djellabas-homme",
  },
  {
    id: "PA37KW",
    name: "Djellabas enfant",
    slug: "djellabas-enfant",
  },
];

export function maskDisplayName(name: string) {
  if (!name || name.length < 3) {
    // Si le nom est trop court, ne pas le masquer complètement
    return name;
  }

  const firstChar = name[0]; // Premier caractère
  const lastChar = name[name.length - 1]; // Dernier caractère

  // Remplir les caractères intermédiaires par des étoiles
  const maskedPart = "*".repeat(name.length - 2);

  return `${firstChar}${maskedPart}${lastChar}`;
}

export interface Review {
  id: number;
  name: string;
  reviews: number;
  date: string;
  message: string;
  titre: string;
  image: string;
}

export const trustpilotReviews: Review[] = [
  {
    id: 1,
    name: "Yassine Yousfani",
    reviews: 5,
    date: "19 septembre 2024",
    message:
      "excelllente experience, mlle khadija etait tres professionnelle, respectueuse et donne le temps au clients, merci !",
    titre: "excelllente experience",
    image: "",
  },
  {
    id: 2,
    name: "ystech dof",
    reviews: 5,
    date: "23 septembre 2024",
    message: "excellent service 100% faible",
    titre: "excellent service 100% faible",
    image: "",
  },
  {
    id: 3,
    name: "Yassine Bayla",
    reviews: 5,
    date: "16 mars 2024",
    message:
      "Jai déjà vendu et acheter avec la personne sans même le connaître en vrai très professionnel rien à dire, vous pouvez lui faire confiance les yeux fermés",
    titre:
      "Jai déjà vendu et acheter avec la personne sans même le connaître en vrai très professionnel rien à dire, vous pouvez lui faire confiance les yeux fermés",
    image: "",
  },
  {
    id: 4,
    name: "Hamada N",
    reviews: 5,
    date: "15 mars 2024",
    message:
      "Je recommande chaudement Bendouma pour son professionnalisme et son service irréprochable. C'est un partenaire sur lequel on peut compter en toute confiance a propos du kama, super fiable.",
    titre: "Service fiable, rapide",
    image: "",
  },
  {
    id: 5,
    name: "Mohamed",
    reviews: 5,
    date: "16 mars 2024",
    message:
      "Bonjour,Je valide que ce site est un site de confiance depuis plus de 5ans , je n'ai pas eu bcp de probleme avec le service en ligne .Il sont toujours disponible au horaire definit et l'écoute de mes attentes.Je vous le recommande",
    titre: "Bonjour,",
    image: "",
  },
  {
    id: 6,
    name: "Mehdi",
    reviews: 5,
    date: "23 mars 2024",
    message:
      "Les agents sont cools, les échanges sont rapides et les transactions sont bien sécurisés. Je recommande fortement !",
    titre: "Experience client avec ibytrade",
    image: "",
  },
  {
    id: 7,
    name: "Client",
    reviews: 5,
    date: "16 septembre 2024",
    message: "Meilleur Prix tous sites Compris !",
    titre: "Meilleur Prix tous sites Compris !",
    image: "",
  },
  {
    id: 8,
    name: "Walid Ouroui",
    reviews: 5,
    date: "18 mars 2024",
    message: "Rapide et efficaces sans problème ni encombre",
    titre: "Rapide et efficaces sans problème ni encombre",
    image: "",
  },
  {
    id: 9,
    name: "Othmane",
    reviews: 5,
    date: "16 mars 2024",
    message: "site fiable service qualité je le recommande",
    titre: "site fiable service qualité je le recommande",
    image: "",
  },
  {
    id: 9,
    name: "Taha",
    reviews: 5,
    date: "15 mars 2024",
    message: "Service rapide et fiable.Mercii beaucoup",
    titre: "Service rapide et fiable",
    image: "",
  },
  {
    id: 10,
    name: "Jowem",
    reviews: 5,
    date: "15 mars 2024",
    message: "Fiable, rapide et serviable ! je recommande.",
    titre: "Fiable, je recommande !",
    image: "",
  },
  {
    id: 10,
    name: "Hox y",
    reviews: 5,
    date: "18 mars 2024",
    message: "service top et rapide je recommande",
    titre: "service top et rapide.",
    image: "",
  },
  {
    id: 11,
    name: "Hatim El Harti",
    reviews: 5,
    date: "18 mars 2024",
    message: "Service fiable , parfait , immédiat, accessible et sécurisé :D",
    titre: "Échange professionnel et fiable",
    image:
      "https://user-images.trustpilot.com/65f8469a3bd3830012a05976/73x73.png",
  },
  {
    id: 12,
    name: "Achraf Belfquih",
    reviews: 5,
    date: "16 mars 2024",
    message: "Site fiable, je recommande !",
    titre: "Retour d'expérience",
    image: "",
  },
  {
    id: 13,
    name: "الزنديق",
    reviews: 5,
    date: "18 mars 2024",
    message: "Fiable et service rapide",
    titre: "Fiable et service rapide",
    image:
      "https://user-images.trustpilot.com/64ece8dd24b3c30012b8972d/73x73.png",
  },
  {
    id: 14,
    name: "Drissi Melna",
    reviews: 5,
    date: "15 mars 2024",
    message: "service de qualité, rapide et efficace, je recommande vivement",
    titre: "service de qualité",
    image: "",
  },
  {
    id: 15,
    name: "Laptop Loco",
    reviews: 5,
    date: "16 mars 2024",
    message: "Service de qualité, rapidité, fiabilité 💯👌",
    titre: "Service de qualité, recommande à tous",
    image: "",
  },
  {
    id: 16,
    name: "Laptop Loco",
    reviews: 5,
    date: "16 mars 2024",
    message: "Fiable et rapide comme d'hab",
    titre: "Fiable et rapide comme d'hab",
    image: "",
  },

  {
    id: 17,
    name: "Simo Sedraty",
    reviews: 5,
    date: "16 mars 2024",
    message: "Meilleur service !",
    titre: "Meilleur service !",
    image: "",
  },
];

export const categoriesClothes = [
  {
    id: "A6WD",
    name: "Abaya femme",
    slug: "abaya-femme",
    icon: abayafemme,
  },
  {
    id: "P3XJ",
    name: "Parfums",
    slug: "parfums",
    icon: parfums,
  },
  {
    id: "F5OD",
    name: "Djellabas",
    slug: "djellabas",
    icon: djel,
  },
  {
    id: "H6XL",
    name: "Caftans",
    slug: "caftans",
    icon: caftan,
  },
  {
    id: "T8KW",
    name: "Or",
    slug: "or",
    icon: or,
  },
];

caftan;
abayafemme;
djel;
parfums;
