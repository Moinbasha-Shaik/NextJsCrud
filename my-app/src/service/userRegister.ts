import User from "@/models/user";
import { checkExistingUserByEmail, createNewUser, userLogin } from "./userService";
import { CommonError } from "@/errors/commonError";
import bcrypt from 'bcryptjs';
import prisma from "@/lib/primsclient";
import { sign } from "crypto";
import { SignJWT } from "jose";
import { JwtResponse } from "@/Response/jwtResponse";


export const userRegister=async(user:User)=>{
    const existingUserCount=await checkExistingUserByEmail(user.email);
    if(existingUserCount>0){
        throw new CommonError("User already exists with email",400);
    }
    const newUser=await createNewUser(user);
    if(!newUser || !newUser.id){
        throw new CommonError("User not created",500);
    }
    return newUser;
}

export const login=async(email:string,password:string)=>{
    const checkEmail=await userLogin(email);
    if(!checkEmail){
        throw new CommonError("User not found",400);
    }
    const isPasswordMatch=await bcrypt.compare(password,checkEmail.password);
    if(!isPasswordMatch){
        throw new CommonError("Invalid Password",400);
    }
    const token=await new SignJWT({email:checkEmail.email,id:checkEmail.id}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("1h").sign(new TextEncoder().encode("secret"));
    const jwtResponse:JwtResponse={email:checkEmail.email,token:token,phone:checkEmail.phone};
    return jwtResponse;
   
}