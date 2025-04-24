import prisma from "@/lib/primsclient";

export async function PUT(req: Request, { params }: { params: { email: string } }): Promise<Response> {
    const email = params.email;

    // Parse the request body to get the new name and phone
    const body = await req.json();
    const { name, phone } = body;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        return new Response(JSON.stringify({ message: "User not found with that email" }), { status: 404 });
    }

    // Update the user's name and phone
    const updatedUser = await prisma.user.update({
        where: { email: email },
        data: { name: name, phone: phone },
    });

    if (!updatedUser) {
        return new Response(JSON.stringify({ message: "Failed to update user" }), { status: 500 });
    }
    // Return the updated user data
    return new Response(JSON.stringify(updatedUser), { status: 200 });
}