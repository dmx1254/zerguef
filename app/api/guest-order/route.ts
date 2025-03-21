// app/api/orders/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OrderModel from "@/lib/models/order.model";
import { Resend } from "resend";
import { OrderNotificationEmail } from "@/app/[locale]/components/orderConfirm-template";

connectDB();

const resend = new Resend(process.env.RESEND_ZERGUEF_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const order = await OrderModel.create(data);

    // console.log(data);

    // console.log(data);

    // Envoi de l'email de notification
    await resend.emails.send({
      from: "Zarguef Notification <noreply@ibendouma.com>",
      to: ["support@ibendouma.com"],
      subject: `Nouvelle commande #${order.orderNumber}`,
      react: OrderNotificationEmail({
        orderNumber: order.orderNumber,
        items: order.items,
        total: order.total,
        shipping: order.shipping,
        paymentMethod: order.paymentMethod,
        shippingRegion: order?.shippingRegion || "Non spécifié",
        customerEmail: order?.guest?.email,
        customerName: order?.guest?.name,
        guest: true,
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
