// app/api/orders/route.ts
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import OrderModel from "@/lib/models/order.model";

connectDB();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const order = await OrderModel.create(data);

    // console.log(data);

    return NextResponse.json(
      {
        message: "Commande créée avec succès",
        order: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
