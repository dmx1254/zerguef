// app/api/products/search/route.ts
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/product.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json([]);
    }

    // Créer un objet de recherche avec plusieurs champs
    const searchQuery = {
      $or: [
        // Recherche dans le nom
        {
          name: {
            $regex: query,
            $options: "i", // insensible à la casse
          },
        },
        // Recherche dans la description
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
        // Recherche dans la catégorie
        {
          category: {
            $regex: query,
            $options: "i",
          },
        },
        // Recherche dans les détails
        {
          "details.material": {
            $regex: query,
            $options: "i",
          },
        },
        {
          "details.origin": {
            $regex: query,
            $options: "i",
          },
        },
      ],
    };

    // Exécuter la recherche avec limite et tri
    const products = await ProductModel.find(searchQuery)
      .limit(20) // Limiter à 20 résultats
      .sort({ createdAt: -1 }) // Trier par date de création
      .select("-__v") // Exclure le champ __v
      .lean(); // Convertir en objets JavaScript simples

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche des produits" },
      { status: 500 }
    );
  }
}

// Route POST pour la recherche avancée avec filtres
export async function POST(req: Request) {
  try {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      onlyInStock,
      onSale,
      sort = "newest",
    } = await req.json();

    // Construire la requête de recherche
    let searchQuery: any = {};

    // Recherche textuelle
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { "details.material": { $regex: query, $options: "i" } },
        { "details.origin": { $regex: query, $options: "i" } },
      ];
    }

    // Filtre par catégorie
    if (category) {
      searchQuery.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Filtre par prix
    if (minPrice !== undefined || maxPrice !== undefined) {
      searchQuery.price = {};
      if (minPrice !== undefined) searchQuery.price.$gte = minPrice;
      if (maxPrice !== undefined) searchQuery.price.$lte = maxPrice;
    }

    // Filtre stock
    if (onlyInStock) {
      searchQuery.stock = { $gt: 0 };
    }

    // Filtre promotions
    if (onSale) {
      searchQuery.discount = { $gt: 0 };
    }

    // Déterminer l'ordre de tri
    let sortOption = {};
    switch (sort) {
      case "price-asc":
        sortOption = { price: 1 };
        break;
      case "price-desc":
        sortOption = { price: -1 };
        break;
      case "name-asc":
        sortOption = { name: 1 };
        break;
      case "name-desc":
        sortOption = { name: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Exécuter la recherche
    const products = await ProductModel.find(searchQuery)
      .sort(sortOption)
      .limit(20)
      .select("-__v")
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la recherche avancée:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche des produits" },
      { status: 500 }
    );
  }
}
