// app/api/products/search/route.ts
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/product.model";
import { NextResponse } from "next/server";
import { FilterQuery } from "mongoose";

connectDB();

const ITEMS_PER_PAGE = 12;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const category = searchParams.get("category");

    console.log("Search params:", { query, page, category });

    // Construire la requête de recherche
    const searchQuery: FilterQuery<typeof ProductModel> = {};

    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    if (category) {
      // Make category search less strict
      searchQuery.category = { $regex: category, $options: "i" };
    }

    console.log("Search query:", searchQuery);

    // Calculer le skip pour la pagination
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Obtenir le nombre total de produits
    const totalProducts = await ProductModel.countDocuments(searchQuery);
    console.log("Total products found:", totalProducts);
    
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    console.log("Total pages:", totalPages);

    // Exécuter la recherche avec pagination
    const products = await ProductModel.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .select("-__v")
      .lean();

    console.log("Products found:", products.length);

    return NextResponse.json({ 
      products, 
      totalPages,
      currentPage: page,
      totalProducts,
      itemsPerPage: ITEMS_PER_PAGE
    });
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
      page = 1,
    } = await req.json();

    // Construire la requête de recherche
    const searchQuery: FilterQuery<typeof ProductModel> = {};

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

    // Calculer le skip pour la pagination
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Obtenir le nombre total de produits
    const totalProducts = await ProductModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    // Exécuter la recherche avec pagination
    const products = await ProductModel.find(searchQuery)
      .sort(sortOption)
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .select("-__v")
      .lean();

    return NextResponse.json({ 
      products, 
      totalPages,
      currentPage: page,
      totalProducts,
      itemsPerPage: ITEMS_PER_PAGE
    });
  } catch (error) {
    console.error("Erreur lors de la recherche avancée:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recherche des produits" },
      { status: 500 }
    );
  }
}
