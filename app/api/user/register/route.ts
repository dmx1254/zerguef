import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/lib/models/user.model";

connectDB();

export async function POST(req: Request) {
  const data = await req.json();
  try {
    console.log(data);
    const { password, ...rest } = data;

    const hashedPasword = await bcrypt.hash(password, 10);
    const userData = {
      ...rest,
      password: hashedPasword,
    };

    const res = await UserModel.create(userData);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
