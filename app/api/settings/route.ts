// app/api/admin/settings/route.ts
import VideoModel from "@/lib/models/video";
import { NextResponse } from "next/server";


// Route GET pour récupérer la vidéo
export async function GET() {
  try {
    const video = await VideoModel.find().lean();
    if (!video) {
      return NextResponse.json({ error: "Vidéo non trouvée" }, { status: 404 });
    }

    return NextResponse.json(video[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la vidéo" },
      { status: 500 }
    );
  }
}
