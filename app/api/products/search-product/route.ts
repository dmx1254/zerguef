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
    const newPage = searchParams.get("page");
    const search = searchParams.get("search");
 

    // Construire la requête de base
    let query: any = {};

    // Filtre par catégorie (insensible à la casse)
    if (category) {
      query.category = new RegExp(`^${category}$`, "i");
    }

    const limit = 15;
    const page = Number(newPage) || 1;

    const offset = (page - 1) * limit;
    // console.log("offset", offset);
    // console.log("page", page);

    // Récupérer les produits de la catégorie
    let products = await ProductModel.find(query)
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset) // Tri par date de création décroissante

      .lean();

    //Appliquer les filtres supplémentaires
    if (search) {
      const searchRegex = new RegExp(search, "i");
      products = products.filter(
        (product) =>
          searchRegex.test(product.name) ||
          searchRegex.test(product.description)
      );
    }


    // console.log(products.length);
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
