import React from 'react'
import TextInput from '../Layout/TextInput'
import { useForm } from 'react-hook-form'

const page = () => {

  const onFormSubmit = (data : any) =>{
    console.log(data)
  }

const {
  register,
  handleSubmit,
  formState:{errors},

} = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
   
      <h2 className='mt-10 text-2xl text-gray- font-bold '>Sign Up</h2>
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
       name="email"
       register={register}
       error={errors}
       validationSchema={{
       required: true,
       pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
       patterError: "Invalid password",
       requiredError:'Password cannot be empty'
     }}

      />
      </div>

      <button className='text-white bg-black px-5 py-2 rounded-full my-5 mb-10  '>Register</button>
      

    
   </form>
  )
}

export default page