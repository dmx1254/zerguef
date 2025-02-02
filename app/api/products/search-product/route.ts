// app/api/products/route.ts
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/product.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req: Request) {
  try {
    // Récupérer les paramètres de l'URL
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const onSale = searchParams.get("onSale");

    // Construire la requête de base
    let query: any = {};

    // Filtre par catégorie (insensible à la casse)
    if (category) {
      query.category = new RegExp(`^${category}$`, "i");
    }

    // Récupérer les produits de la catégorie
    let products = await ProductModel.find(query).select("-__v").lean();

    // Appliquer les filtres supplémentaires
    if (search) {
      const searchRegex = new RegExp(search, "i");
      products = products.filter(
        (product) =>
          searchRegex.test(product.name) ||
          searchRegex.test(product.description)
      );
    }

    if (minPrice || maxPrice) {
      products = products.filter((product) => {
        const price = product.price;
        return (
          (minPrice ? price >= parseFloat(minPrice) : true) &&
          (maxPrice ? price <= parseFloat(maxPrice) : true)
        );
      });
    }

    if (inStock === "true") {
      products = products.filter((product) => product.stock > 0);
    }

    if (onSale === "true") {
      products = products.filter((product) => product.discount > 0);
    }

    // Retourner les produits filtrés
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}