"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm,SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email:'',
            password:'',
        }
    });
    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        setIsLoading(true);
        signIn  ("credentials", {
            ...data,
            redirect: false,
        }).then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                router.push('/cart');
                router.refresh();
                toast.success('Logged in successfully');
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        });
    }
    return ( 
        <>
        <Heading title="Sign In for E-SHOP" />
        <Button outline label="Continue with Google" icon={AiOutlineGoogle}  onclick={()=>{}}/>
        <hr className="bg-slate-300 w-full h-px" />
        <Input id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
        <Input id="password" label="Password" type="password" disabled={isLoading} required register={register} errors={errors} />
        <Button label={isLoading ? "Loading..." : "Login"} onclick={handleSubmit(onSubmit)} />
        <p className="text-sm">Do not have an account? <Link href="/register" className="underline">Sign Up</Link></p>
        </>
     );
}
 
export default LoginForm;