import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import UserModel from "@/lib/models/user.model";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/option";

connectDB();

export async function POST(req: Request) {
  const session = await getServerSession(options);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour passer une commande" },
      { status: 401 }
    );
  }
  const data = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      data.id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
