import { NextRequest, NextResponse } from 'next/server'    
import User from '@/models/user';
import { userRegister } from '@/service/userRegister';
import { CommonError } from '@/errors/commonError';
import { userSchema } from '@/validation/user';

export async function POST(req: NextRequest) {
    try {
        const user:User=await req.json();
        const validatedData=userSchema.safeParse(user);

        if(!validatedData.success){
            const error: Record<string, string> = {};
 
            validatedData.error.issues.map((issue: any) => {
              error[issue.path[0]] = issue.message;
            });
           
            return NextResponse.json(error, { status: 400 });
        }

        const createdUser=await userRegister(user);
        return NextResponse.json({message:"User Created Successfully"},{status:200});
    } catch (error) {
        if(error instanceof CommonError) return NextResponse.json({ message: error.message },{status:error.statusCode});
        return NextResponse.json({ message: 'Internal Server Error' },{status:500});
    }
}

