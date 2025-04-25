import prisma from "@/lib/primsclient";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { email: string } }): Promise<NextResponse> {
    const email = params.email;

    
    const body = await req.json();
    const { name, phone } = body;
console.log("body", body);
   if(!body || !name || !phone){
        return new NextResponse(JSON.stringify({ message: "Name and phone are required" }), { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found with that email" }), { status: 404 });
    }

    
    const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { name: name, phone: phone },
    });

    if (!updatedUser) {
        return new NextResponse(JSON.stringify({ message: "Failed to update user" }), { status: 500 });
    }
   
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
}



export async function GET(req: Request, { params }: { params: { email: string } }): Promise<NextResponse> {
    const email = params.email;

    if (!email) {
        return new NextResponse(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }
    
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found with that email" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(user), { status: 200 });
}



export async function DELETE(req: Request, { params }: { params: { email: string } }): Promise<NextResponse> {
    const email = params.email;

    if (!email) {
        return new NextResponse(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found with that email" }), { status: 404 });
    }
    const deletedUser = await prisma.user.delete({ where: { email: email } });
    if (!deletedUser) {
        return new NextResponse(JSON.stringify({ message: "Failed to delete user" }), { status: 500 });
    }
    return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
}


