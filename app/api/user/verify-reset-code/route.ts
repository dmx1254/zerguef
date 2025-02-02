import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import VerificationModel from "@/lib/models/verification.model";

connectDB();
export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    const verification = await VerificationModel.findOne({
      email,
      code,
      type: "reset_password",
      expiresAt: { $gt: new Date() }
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Code invalide ou expiré" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Code vérifié" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification" },
      { status: 500 }
    );
  }
}