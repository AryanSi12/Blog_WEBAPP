import { motion } from 'framer-motion'
import React, {useState} from 'react'
import authservice from '../Appwrite/Auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const userData = await authservice.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-start justify-center py-12 bg-gradient-to-r from-teal-100 to-blue-100">
          <motion.div
          initial={{opacity:0 ,y:-100 ,rotate:-3}}
          whileInView = {{opacity:1 , y:0 ,rotate:0}}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg border border-gray-300 mx-4 sm:mx-6 lg:mx-8 xl:mx-12">
            <div className="mb-6 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
              </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight sm:text-3xl">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60 sm:text-lg">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      
            <form onSubmit={handleSubmit(create)}>
              <div className='space-y-5'>
                <Input
                  label="Full Name: "
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: true,
                  })}
                />
                <Input
                  label="Email: "
                  placeholder="Enter your email"
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
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 rounded-full transition duration-200">
                  Create Account
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      );
    }

export default Signup
