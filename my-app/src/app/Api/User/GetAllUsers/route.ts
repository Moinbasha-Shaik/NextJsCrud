import prisma from "@/lib/primsclient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const users = await prisma.user.findMany();
    if (!users || users.length === 0) {
        return NextResponse.json({ message: "No users found" }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
}
