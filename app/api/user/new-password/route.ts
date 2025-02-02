import { connectDB } from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import VerificationModel from "@/lib/models/verification.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

connectDB();
export async function POST(req: Request) {
  try {
    const { email, code, password } = await req.json();

    // Vérifier le code une dernière fois
    const verification = await VerificationModel.findOne({
      email,
      code,
      type: "reset_password",
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    // Mettre à jour le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    // Supprimer le code de vérification
    await VerificationModel.deleteOne({ _id: verification._id });

    return NextResponse.json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500 }
    );
  }
}
