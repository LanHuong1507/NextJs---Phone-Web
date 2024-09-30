"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm,SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name:'',
            email:'',
            password:'',
        }
    });
    const onSubmit: SubmitHandler<FieldValues> =(data) => {
        setIsLoading(true);
        console.log(data);
    }
    return ( 
        <>
        <Heading title="Sign Up for E-SHOP" />
        <Button outline label="Sign up with Google" icon={AiOutlineGoogle}  onclick={()=>{}}/>
        <hr className="bg-slate-300 w-full h-px" />
        <Input id="name" label="Name" disabled={isLoading} required register={register} errors={errors} />
        <Input id="email" label="Email" disabled={isLoading} required register={register} errors={errors} />
        <Input id="password" label="Password" type="password" disabled={isLoading} required register={register} errors={errors} />
        <Button label={isLoading ? "Loading..." : "Sign Up"} onclick={handleSubmit(onSubmit)} />
        <p className="text-sm">Already have an account? <Link href="/login" className="underline">Log in</Link></p>
        </>
     );
}
 
export default RegisterForm;