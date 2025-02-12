// app/api/orders/route.ts
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import OrderModel from "@/lib/models/order.model";

connectDB();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour passer une commande" },
        { status: 401 }
      );
    }

    const data = await req.json();

    // Création de la commande
    const order = new OrderModel({
      userId: data.userId || session?.user.id,
      orderNumber: data.orderNumber,
      items: data.items,
      total: data.total,
      shipping: data.shipping,
      paymentMethod: data.paymentMethod,
    });

    await order.save();

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

export async function GET() {
  const session = await getServerSession(options);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour passer une commande" },
      { status: 401 }
    );
  }

  try {
    const userOrders = await OrderModel.find({
      userId: session.user.id,
    });

    return NextResponse.json(userOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
