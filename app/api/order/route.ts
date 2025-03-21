// app/api/orders/route.ts
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import OrderModel from "@/lib/models/order.model";

connectDB();

import { Resend } from "resend";
import { OrderNotificationEmail } from "@/app/[locale]/components/orderConfirm-template";
import UserModel from "@/lib/models/user.model";

const resend = new Resend(process.env.RESEND_ZERGUEF_API_KEY);

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
    const user = await UserModel.findById(data.userId);

    // Envoi de l'email de notification
    await resend.emails.send({
      from: "Zarguef Notification <noreply@ibendouma.com>",
      to: ["khadijazf04@gmail.com"],
      subject: `Nouvelle commande #${data.orderNumber}`,
      react: OrderNotificationEmail({
        orderNumber: data.orderNumber,
        items: data.items,
        total: data.total,
        shipping: data.shipping,
        paymentMethod: data.paymentMethod,
        shippingRegion: user?.country || "Non spécifié",
        customerEmail: user?.email,
        customerName: `${user?.firstName} ${user?.lastName}`,
        guest: false,
      }) as React.ReactElement,
    });

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
