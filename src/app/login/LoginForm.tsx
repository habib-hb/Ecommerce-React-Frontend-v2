 

import { useEffect, useState } from "react"; 
import Heading from "../components/Heading";
import Input from "../components/inputs/Input"; 
import {FieldValues , SubmitHandler , useForm} from 'react-hook-form';
import Button from "../components/Button";
// import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { SafeUser } from "./../../types";

// interface LoginFormProps {
//     currentUser: SafeUser | null
// }


const LoginForm: React.FC<any> = ({currentUser}) => {

    const [isLoading , setIsLoading] = useState(false);

    const {register , handleSubmit , formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            email: "",
            password: "",
        }
    });
    
    // const router = useRouter()


    useEffect(()=>{
        if(currentUser){
            window.location.href="/cart";
            // router.refresh();
        }
    }, [])

    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
        // setIsLoading(true)
        // signIn('credentials', {
        //     ...data,
        //     redirect: false
        // }).then((callback) => {

        //     setIsLoading(false)

        //     if(callback?.ok){
        //         router.push("/cart");
        //         router.refresh();
        //         toast.success('Logged In')
        //     }

        //     if(callback?.error){
        //         toast.error(callback.error)
        //     }
        // } );
        setIsLoading(true)
        await fetch('https://laravel.valueadderhabib.com/api/login' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async(response) => {
            if(response.ok){
                toast.success('Logged In')
                setIsLoading(false)
                    // router.push("/cart");
                    // router.refresh();
                let json_response =await response.json();

                alert(json_response.message);

                alert('User Email >>> ' + json_response.user.email);

                typeof window !== 'undefined' && window?.localStorage.setItem('loggedInEmail' , json_response.user.email);

                window.location.href = '/';

            }else{
                let json_response =await response.json();

                alert(json_response.message);

                toast.error('Something went wrong')
            }
        }).catch(async(error) => {

            alert('Something went wrong')

            toast.error('Something went wrong')
            // toast.error('Something went wrong')
            console.error('Something went wrong right here>>>' + error);

            
            
        })
        
    };

    // if(currentUser){
    //     return <p className="text-center">Logged In. Redirecting...</p>
    // }

    return ( 
        <>
        <Heading title="Sign in to E-Shop"/>

        <Button
        outline
        label="Continue with Github"
        icon={AiOutlineGoogle} 
        onClick={()=>window.location.href='https://laravel.valueadderhabib.com/auth/redirect'}
        />

        <hr className="bg-slate-300 w-full h-px" />


        <Input 
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

        <Input 
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="password"
        />

        <Button label = {isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />

        <p className="text-sm">
            Do not have an account?{" "}
            <a className="underline" href="/register">Sign Up</a>
        </p>

        </>
     );
}
 
export default LoginForm;