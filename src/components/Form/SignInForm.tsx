import React, { useState } from 'react'
import TextInput from '../UI/TextInput'
import { useForm } from 'react-hook-form'
import { LoginState } from '../Layout/LoginLayout'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'

const page = (props :{stateHandler :(newState:LoginState) => void}) => {

  const [signUpError,setSignUPError] = useState({error:false,msg:""})

  const onFormSubmit = (data : any) =>{
    console.log(data)
    signUp(data.email,data.password)

  }

const {
  register,
  handleSubmit,
  formState:{errors},

} = useForm()


// user Registration setup using firebase

const signUp = async (email:string , password:string) =>{
  try {
    const newUser = await createUserWithEmailAndPassword(auth,email,password)
    const user = newUser.user
    console.log(user)
    props.stateHandler(LoginState.LOGIN)
    
  } catch (error:any) {
    console.log(error)
    setSignUPError({error:true, msg:error.message})
  }
}

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
       name="password"
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
      {signUpError.error && (
            <div className=" mb-2 text-center text-sm text-red-500">
              {signUpError.msg}
            </div>
          )}

      <button className='text-white bg-black px-5 py-2 rounded-full my-5 mb-10  '>Register</button>

      <div className="flex w-full flex-col  justify-center items-center px-5 pb-5">
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Already have an account ?</span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.LOGIN);
              }}
              className="text-white font-semibold px-2 hover:text-black"
            >
              Login
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Trouble signing in ? </span>
            <button className="text-white font-semibold px-2 hover:text-black">
              Click here
            </button>
          </div>
        </div>
      

    
   </form>
  )
}

export default page