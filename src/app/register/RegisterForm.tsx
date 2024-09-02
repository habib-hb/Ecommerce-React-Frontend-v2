 

import { useEffect, useState } from "react"; 
import Heading from "../components/Heading";
import Input from "../components/inputs/Input"; 
import {FieldValues , SubmitHandler , useForm} from 'react-hook-form';
import Button from "../components/Button";
// import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import {toast} from "react-hot-toast";
// import {signIn} from 'next-auth/react'
// import { useRouter } from "next/navigation";
// import { SafeUser } from "../../types";


// interface RegisterFormProps {
//     currentUser: SafeUser | null
// }

const RegisterForm: React.FC<any> = ({currentUser}) => {

    const [isLoading , setIsLoading] = useState(false);

    const {register , handleSubmit , formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: "",
            email: "",
            password: "",
        }
    }) 

    // const router = useRouter();

    useEffect(()=>{
        if(currentUser){
            window.location.href="/cart";
            // router.refresh();
        }
    }, [])

    // const onSubmit:SubmitHandler<FieldValues> = (data)=>{
    //     setIsLoading(true)
       
    //     axios.post('/api/register' , data).then(()=>{
    //         toast.success('Account created')

    //     signIn("credentials" , {
    //         email: data.email,
    //         password: data.password,
    //         redirect: false,
    //     }).then((callback)=>{
    //         if(callback?.ok){
    //             router.push("/cart");
    //             router.refresh();
    //             toast.success('Logged In')
    //         }

    //         if(callback?.error){
    //             toast.error(callback.error)
    //         }

    //     });
    //     }).catch(()=>toast.error("Something went wrong")).finally(()=>{
    //         setIsLoading(false)
    //     });
    // };



    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
       
        axios.post('https://laravel.valueadderhabib.com/auth/user/create' , data, {
            withCredentials: true
        }).then(()=>{

            toast.success('Account created');

            typeof window !== 'undefined' ?  window?.localStorage.setItem('loggedInEmail' , data.email) : '';

            window.location.href='/';

        }).catch((e)=>{

           e.response.data.message ? toast.error(e.response.data.message) : toast.error('Something went wrong');

        })
        .finally(()=>{

            setIsLoading(false)

        });
    };



    if(currentUser){
        return <p className="text-center">Logged In. Redirecting...</p>
    }

    return ( 
        <>
        <Heading title="Sign up for E-Shop"/>

        <Button
        outline
        label="Continue with Github"
        icon={AiOutlineGoogle} 
        onClick={()=>window.location.href='https://laravel.valueadderhabib.com/auth/redirect'}
        />

        <hr className="bg-slate-300 w-full h-px" />

        <Input 
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

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

        <Button label = {isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />

        <p className="text-sm">
            Already have an account?{" "}
            <a className="underline" href="/login">Log in</a>
        </p>

        </>
     );
}
 
export default RegisterForm;