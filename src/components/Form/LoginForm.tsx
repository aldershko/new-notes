

import React , {useImperativeHandle, useState} from 'react'
import TextInput from '../UI/TextInput'
import { useForm } from 'react-hook-form'
import { LoginState } from '../Layout/LoginLayout'
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'


const test = ( props : {stateHandler : (newState : LoginState) => void}) => {

  const [loginError,setLoginError] = useState({error : false, msg: ""})

  const provider = new GoogleAuthProvider()

  const onFormSubmit =( data:any ) =>{
    console.log(data)
    signIn(data.email,data.password)
    
  }

  const signIn =  async(email:string,password:string) => {
    try {
      const user = await signInWithEmailAndPassword(auth,email,password)
      console.log(user)
    } catch (error:any) {
      setError(
        "email",
        {type:"custom",message:"user not found"},
        {shouldFocus : true}
      
      )
      setLoginError({error : true, msg: error.message})
      
    }
  }

  const signInWithGooglePopup = async() =>{
    try {
      const result = await signInWithPopup(auth,provider)
      const credential  = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user =  result.user
      console.log(user)
    } catch (error:any) {
      console.log(error)
      
    }
  }


const {
  register,
  handleSubmit,
  formState:{ errors },
  setError
} = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
   
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

          {/* GOOGLE SIGNIN BUTTON */}

         <div className='flex flex-col'>
           <button className='mt-2 py-2 border flex flex-col text-center items-center  justify-center border-white-500' onClick={()=>{
            signInWithGooglePopup()
          }}>
            SIGN IN WITH GOOGLE
          </button></div>

          {/* LINKS */}

      <div className="flex w-full flex-col  justify-center items-center p-2 my-2">
          <div className="flex flex-row justify-center items-center text-center align-middle">

          

            <span>Dont have an account ?</span>
            <button
              
              className="text-white font-semibold px-2 hover:text-black"
              onClick={()=>{
                props.stateHandler(LoginState.REGISTER)
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Trouble signing in ? </span>
            <button
              
              className="text-white font-semibold px-2 hover:text-black"
              onClick={()=>{
                props.stateHandler(LoginState.RESET)
              }}
            >
              Click here
            </button>
          </div>
        </div>

    
   </form>
  )
}

export default test