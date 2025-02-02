// app/api/products/route.ts
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/product.model";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const product = await ProductModel.create(data);

    return NextResponse.json(
      { message: "Produit ajouté avec succès", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du produit" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await ProductModel.find({})
      .sort({ createdAt: -1 }) // Tri par date de création décroissante
      .select("-__v") // Exclure le champ __v de mongoose
      .lean(); // Convertir en objets JavaScript simples

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des produits" },
      { status: 500 }
    );
  }
}
