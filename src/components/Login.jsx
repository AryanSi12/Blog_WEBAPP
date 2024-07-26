import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { Input,Button,Logo } from "./index";
import authservice from "../Appwrite/Auth";
import { login as storeLogin } from "../store/authSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";


function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")
    const signin=async(Data)=>{
        try{
            const session=await authservice.login(Data);
            if(session){
                const data=await authservice.getCurrentUser()
                if(data){
                    console.log(data);
                    dispatch(storeLogin(data));
                    navigate('/')
                }
            }
        }
        catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className="min-h-screen flex items-start justify-center py-12 bg-gradient-to-r from-teal-100 to-blue-100">
      <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg border border-gray-300">
        <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Log in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signin)} className=' mt-8'>
        <div className='space-y-5'>
            <Input
            label="Email"
            placeholder="Enter your E-mail"
            type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full  bg-teal-600 hover:bg-teal-500 rounded-full transition duration-200"
                >Log in</Button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Login