import { StaticImageData } from "next/image";
import es from "@/public/flags/spain.png";
import fr from "@/public/flags/fr.png";
import en from "@/public/flags/en.png";
import ar from "@/public/flags/arabic.png";
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
}

export interface Order extends Document {
  _id: string;
  orderNumber: string;
  userId: string;
  items: CartResponse[];
  total: number;
  shipping: number;
  paymentMethod: "card" | "cash";
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
