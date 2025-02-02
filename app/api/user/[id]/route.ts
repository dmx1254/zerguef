import { connectDB } from "@/lib/db";
import UserModel from "@/lib/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/option";

connectDB();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(options);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour passer une commande" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const user = await UserModel.findById(id);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(options);

  if (!session?.user) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour passer une commande" },
      { status: 401 }
    );
  }
  const { id } = await params;

  try {
    const user = await req.json();

    const newUser = Object.fromEntries(
      Object.entries(user).filter(([_, value]) => !!value)
    );

    const updatingUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: newUser,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json(updatingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
