// app/api/user/register/route.ts
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import VerificationModel from "@/lib/models/verification.model";
import UserModel from "@/lib/models/user.model";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_ZERGUEF_API_KEY);

connectDB();

// Fonction pour générer un code aléatoire
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { password, ...rest } = data;

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      ...rest,
      password: hashedPassword,
    };

    // Générer le code de vérification
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 3600000); // Expire dans 1 heure

    // Sauvegarder le code et les données utilisateur temporairement
    await VerificationModel.create({
      email: data.email,
      code: verificationCode,
      userData,
      expiresAt,
    });

    // Envoyer l'email avec Resend
    await resend.emails.send({
      from: "Zarguef <noreply@ibendouma.com>",
      to: data.email,
      subject: "Vérifiez votre adresse email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D97706;">Bienvenue sur Zarguef</h2>
          <p>Merci de vous être inscrit ! Pour finaliser votre inscription, veuillez utiliser le code suivant :</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; letter-spacing: 5px; margin: 0; color: #1F2937;">${verificationCode}</h1>
          </div>
          <p>Ce code expirera dans une heure.</p>
          <p>Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Code de vérification envoyé", email: data.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}

// Route pour vérifier le code
export async function PUT(req: Request) {
  try {
    const { email, code } = await req.json();

    const verification = await VerificationModel.findOne({
      email,
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    // Créer l'utilisateur avec les données stockées
    const user = await UserModel.create(verification.userData);

    // Supprimer le code de vérification
    await VerificationModel.deleteOne({ _id: verification._id });

    return NextResponse.json(
      { message: "Inscription validée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur de vérification:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}
