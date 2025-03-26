import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ReactElement } from "react";
import { BulkOrderTemplate } from "@/app/[locale]/components/bulkOrder-template";

const resend = new Resend(process.env.RESEND_ZERGUEF_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form data
    const fullName = formData.get("fullName") as string;
    const companyName = formData.get("companyName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const country = formData.get("country") as string;
    const city = formData.get("city") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const products = JSON.parse(formData.get("products") as string);
    const quantity = formData.get("quantity") as string;
    const barcode = formData.get("barcode") as string;
    const additionalProducts = formData.get("additionalProducts") as string;

    // Handle file uploads
    const files = formData.getAll("files");
    const fileUrls: string[] = [];

    // Here you would typically upload the files to your storage service
    // For now, we'll just store the file names
    files.forEach((file) => {
      if (file instanceof File) {
        fileUrls.push(file.name);
      }
    });

    // Prepare email data
    const emailData = {
      fullName,
      companyName,
      email,
      phone,
      country,
      city,
      paymentMethod,
      products,
      quantity,
      barcode,
      additionalProducts,
      fileUrls,
    };

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Zerguef <noreply@ibendouma.com>",
      to: email,
      subject: "Confirmation de commande en gros",
      react: BulkOrderTemplate({ data: emailData }),
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "Zerguef <noreply@ibendouma.com>",
      to: ["khadijazf04@gmail.com"],
      subject: "Nouvelle commande en gros reçue",
      react: BulkOrderTemplate({
        data: emailData,
        isAdmin: true,
      }),
    });

    return NextResponse.json(
      { message: "Commande soumise avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Échec de la soumission de la commande" },
      { status: 500 }
    );
  }
}
