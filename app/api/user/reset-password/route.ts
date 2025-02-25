// app/api/user/reset-password/route.ts
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import UserModel from "@/lib/models/user.model";
import VerificationModel from "@/lib/models/verification.model";
import { Resend } from "resend";

connectDB();

const resend = new Resend(process.env.RESEND_Zarguef_API_KEY);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const email = data.email;

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email non trouvé" }, { status: 404 });
    }

    // Générer et sauvegarder le code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 3600000); // 1 heure

    await VerificationModel.create({
      email,
      code,
      expiresAt,
      type: "reset_password",
    });

    // Envoyer l'email
    await resend.emails.send({
      from: "Zarguef <noreply@zarguef.com>",
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D97706;">Réinitialisation du mot de passe</h2>
          <p>Vous avez demandé la réinitialisation de votre mot de passe. Utilisez le code suivant :</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; letter-spacing: 5px; margin: 0; color: #1F2937;">${code}</h1>
          </div>
          <p>Ce code expirera dans une heure.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Code envoyé" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du code" },
      { status: 500 }
    );
  }
}
