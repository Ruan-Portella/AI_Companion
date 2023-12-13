import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const companion = await prismadb.companion.create({
            data: {
                src,
                name,
                description,
                instructions,
                seed,
                categoryId,
                userId: user.id,
                userName: user.firstName
            }
        });

        return NextResponse.json(companion);
    } catch (err) {
        console.log("[COMPANION_POST]", err);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}