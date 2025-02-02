import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { ProviderSession } from "./components/session-provider";
import QueryProvider from "./components/QueryProvider";
import Footer from "./components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zarguef | Produits de Luxe Orientaux",
  description:
    "Découvrez notre collection exclusive de mikhwar émirati, parfums authentiques et or de haute qualité. Zarguef vous offre le meilleur des produits de luxe orientaux avec une expérience shopping unique.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { params: Promise<{ locale: string }> };
}>) {
  //@ts-ignore
  const { locale } = await params;
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased font-sans`}>
        <ProviderSession>
          <QueryProvider>
            <Toaster />
            <Providers locale={locale}>
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </QueryProvider>
        </ProviderSession>
      </body>
    </html>
  );
}
