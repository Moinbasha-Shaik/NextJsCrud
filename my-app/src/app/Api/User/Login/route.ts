import { CommonError } from "@/errors/commonError";
import { login } from "@/service/userRegister";
import { loginSchema, userSchema } from "@/validation/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise <NextResponse> {
    try {
        const user = await req.json();
        const validatedData = loginSchema.safeParse(user);

        if (!validatedData.success) {
            const error: Record<string, string> = {};

            validatedData.error.issues.map((issue: any) => {
                error[issue.path[0]] = issue.message;
            });

            return NextResponse.json(error, { status: 400 });
}

const loginUser = await login(user.email,user.password);
return NextResponse.json(loginUser, { status: 200 });

    } catch (error) {
        
        if (error instanceof CommonError) return NextResponse.json({ message: error.message }, { status: error.statusCode });
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}