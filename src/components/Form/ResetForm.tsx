import React from 'react'
import {useForm} from 'react-hook-form'
import TextInput from '../Layout/TextInput'
import { LoginState } from '../Layout/LoginLayout'

const ResetForm = (props:{stateHandler : (newState:LoginState) => void}) => {

    const onFormSubmit = (data: any) =>{
        console.log(data)
    }

    const{
        register,
        handleSubmit,
        formState:{errors}
    } = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
   
   <div className=" w-full flex justify-center text-center items-center my-5">
          <span>SEND EMAIL</span>
    </div>
    
    <div className='p-2'>
    <TextInput
     type="text"
     placeholder="Email"
     rounded="xl"
     shadow="xl"
     name="email"
     register={register}
     error={errors}
     validationSchema={{
     required: true,
    //  pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
     patterError: "Invalid email",
     requiredError:'Email cannot be empty'
   }}

    />
    </div>

    <button className='text-white bg-black px-5 py-2 rounded-full my-5 mb-10  '>Reset</button>

    <div className="flex w-full flex-col justify-center items-center p-2 my-2">
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Dont have an account ?</span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.REGISTER);
              }}
              className="text-white font-semibold px-2 hover:text-black"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Already have an account ? </span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.LOGIN);
              }}
              className="text-white font-semibold px-2 hover:text-black"
            >
              Click here
            </button>
          </div>
        </div>
    

  
 </form>
  )
}

export default ResetForm