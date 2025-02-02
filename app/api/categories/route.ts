// app/api/categories/route.ts
import { connectDB } from "@/lib/db";
import CategoryModel from "@/lib/models/category.model";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const category = await CategoryModel.create(data);

    return NextResponse.json(
      { message: "Catégorie ajoutée avec succès", category },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de la catégorie" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des catégories" },
      { status: 500 }
    );
  }
}
