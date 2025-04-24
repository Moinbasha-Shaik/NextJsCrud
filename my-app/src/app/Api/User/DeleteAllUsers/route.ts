import prisma from "@/lib/primsclient";
import { NextResponse } from "next/server";

export async function DELETE(req: Request): Promise<NextResponse> {
    try {

        const deletedUsers = await prisma.user.deleteMany();

        if (deletedUsers.count === 0) {
            return NextResponse.json({ message: "No users found to delete" }, { status: 404 });
        }

        return NextResponse.json({ message: "Users deleted successfully"}, { status: 200 });
    } catch (error) {
        console.error("Error deleting users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
