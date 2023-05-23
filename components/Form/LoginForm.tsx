'use client';

import React from 'react'
import TextInput from '../Layout/TextInput'
import { useForm } from 'react-hook-form'

const test = () => {

  const onFormSubmit =( data:any ) =>{
    console.log(data)
  }


const {
  register,
  handleSubmit,
  formState:{ errors },
  setError
} = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
   <div className='flex min-h-screen justify-center items-center bg-amber-400 '>
    <div className='flex flex-col justify-center items-center w-96  border-none rounded-xl bg-slate-500 text-center'>
      <h2 className='mt-10 text-2xl text-gray-300 font-bold '>LOGIN</h2>
      <TextInput
      type="text"
      placeholder="email"
      rounded="xl"
      shadow="xl"
      name="email"
      register={register}
      error={errors}
      validationSchema={{
        required: true,
        patterError: "Invalid email",
        requiredError:'Email cannot be empty'
      }}

       />
       <div className='mb-8'>
       <TextInput
        type="text"
        placeholder="password"
        rounded="xl"
        shadow="xl"
        name="password"
        register={register}
        error={errors}
        validationSchema={{
        required: true,
        pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        patterError: "Invalid password",
        requiredError:'Password  cannot be empty'
      }}

       />
       </div>
      

          {/* LOGIN BUTTON   */}

          <button
            type="submit"
            className="text-white   bg-black px-5 py-2 rounded-full "
          >
            LOGIN
          </button>

          {/* LINKS */}

      <div className="flex w-full flex-col  justify-center items-center p-2 my-2">
          <div className="flex flex-row justify-center items-center text-center align-middle">

          

            <span>Dont have an account ?</span>
            <button
              
              className="text-white font-semibold px-2 hover:text-black"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Trouble signing in ? </span>
            <button
              
              className="text-white font-semibold px-2 hover:text-black"
            >
              Click here
            </button>
          </div>
        </div>

    </div>

   </div>
   </form>
  )
}

export default test