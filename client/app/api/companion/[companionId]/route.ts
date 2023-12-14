import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {companionId: string}}) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!params.companionId) {
            return new NextResponse("Missing companionId", { status: 400 });
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const companion = await prismadb.companion.update({
            where:{
                id: params.companionId,
                userId: user.id
            },
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
        console.log("[COMPANION_PATCH]", err);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(request: Request, {params}: {params: {companionId: string}}) {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const companion = await prismadb.companion.delete({
            where:{
                userId: user.id,
                id: params.companionId
            }
        });

        return NextResponse.json(companion);
    } catch {
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}