
import prisma from "@/lib/primsclient";
import User from "@/models/user";
import bcrypt from 'bcryptjs';

export const checkExistingUserByEmail=async(email:string)=>{
    const count=await prisma.user.count({
        where:{email:email}
    })
    return count;
}

export const userLogin=async(email: string)=>{
    const user=await prisma.user.findUnique({
        where:{email:email}
    })
    return user;
}


export const createNewUser = async (user: User) => {

    const hashedPassword = await bcrypt.hash(user.password, 10); 


    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,  
            phone: user.phone,
        },
    });

    return newUser;
};