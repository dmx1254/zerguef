// app/api/products/[id]/route.ts
import { connectDB } from "@/lib/db";
import ProductModel from "@/lib/models/product.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: productId } = await params;

    const product = await ProductModel.findById(productId)
      .select("-__v") // Exclure le champ __v
      .lean(); // Convertir en objet JavaScript simple

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du produit" },
      { status: 500 }
    );
  }
}

// Mise à jour d'un produit
// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id: productId } = await params;
//     const updateData = await req.json();

//     const product = await ProductModel.findByIdAndUpdate(
//       productId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     ).select("-__v");

//     if (!product) {
//       return NextResponse.json(
//         { error: "Produit non trouvé" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour du produit:", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la mise à jour du produit" },
//       { status: 500 }
//     );
//   }
// }

// // Suppression d'un produit
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id: productId } = await params;
//     const product = await ProductModel.findByIdAndDelete(productId);

//     if (!product) {
//       return NextResponse.json(
//         { error: "Produit non trouvé" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Produit supprimé avec succès" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la suppression du produit:", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la suppression du produit" },
//       { status: 500 }
//     );
//   }
// }
