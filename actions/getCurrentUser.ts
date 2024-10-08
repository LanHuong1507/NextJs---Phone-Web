import { authOPtions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";
import { create } from "domain";
export async function getSession() {
    return await getServerSession(authOPtions);
}
export async function getCurrentUser() {
    try {
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentUser=await prisma.user.findUnique({
            where:{
                email:session?.user?.email,
            }
        });
        if(!currentUser){
            return null;
        }
        return {
            ...currentUser,
            createdAt:currentUser.createdAt.toISOString(),
            updatedAt:currentUser.updatedAt.toISOString(),
            emailVerified:currentUser.emailVerified?.toString() ||null,

        }
    } catch (error:any) {   
        return null;
    }
}