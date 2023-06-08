

import React , {useImperativeHandle, useState} from 'react'
import TextInput from '../UI/TextInput'
import { useForm } from 'react-hook-form'
import { LoginState } from '../Layout/LoginLayout'
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig'
import { useNavigate} from "react-router-dom"
import MenuButton from '../UI/MenuButton'
import Button from '../UI/Button'




const test = ( props : {stateHandler : (newState : LoginState) => void}) => {

  const [loginError,setLoginError] = useState({error : false, msg: ""})
  const [isSigningIn,setIsSigningIn] = useState(false)

  const provider = new GoogleAuthProvider()
  const navigate = useNavigate();

  const onFormSubmit =( data:any ) =>{
    console.log(data)
    signIn(data.email,data.password)
    
  }

  const signIn =  async(email:string,password:string) => {
    setIsSigningIn(true)
    try {
      const user = await signInWithEmailAndPassword(auth,email,password)
      console.log(user)
      setIsSigningIn(false)
      navigate("/Dashboard")
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
      navigate("/Dashboard")
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
   
   <div className=" w-full flex justify-center text-center items-center my-5">
          <span>LOGIN</span>
        </div>
        <div className=" justify-center w-full flex flex-col p-2 ">
          <div className="pt-2">
            <TextInput
              type="text"
              colorScheme="white"
              rounded="md"
              size="xs"
              placeHolder="email"
              borderScheme="white"
              register={register}
              error={errors}
              name="email"
              validationSchema={{
                required: true,
                //pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                patternError: "Invalid email.",
                requiredError: "Email cannot be empty",
              }}
            />
          </div>
          <div className="pb-2">
            {" "}
            <TextInput
              type="password"
              colorScheme="white"
              rounded="md"
              size="xs"
              placeHolder="password"
              borderScheme="white"
              register={register}
              error={errors}
              name="password"
              validationSchema={{
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                patternError: "Invalid password.",
                requiredError: "Password cannot be empty",
              }}
            />
          </div>
          {/* error messages */}
          {loginError.error && (
            <div className=" mb-2 text-center text-sm text-red-500">
              {loginError.msg}
            </div>
          )}
          {/* button */}
          <MenuButton
            type="submit"
            colorScheme="blue"
            radius="md"
            buttonSize="md"
            variant="solid"
            spinnerSize="sm"
            isLoading={isSigningIn}
            // leftIcon={<MdOutlineLogin size={23} />}
          >
            LOGIN
          </MenuButton>
          {/* <button
            className="mt-2 py-2 border text-center align-middle flex justify-center border-gray-500"
            onClick={() => {
              signInWithGooglePopup();
            }}
          >
            Sign in with google
          </button> */}
          <Button
            customCssProps="mt-5 bg-gray-200 "
            type="button"
            variant="ghost"
            colorScheme="white"
            padding="normal"
            radius="md"
            icon={
              <div className="h-8 w-8 rounded-full overflow-clip">
                <img src="/src/assets/googleIcon.jpg" alt="googleIcon" />
              </div>
            }
            shadowSize="sm"
            buttonSize="md"
            onClick={() => {
              signInWithGooglePopup();
            }}
          >
            Sign in with Google
          </Button>
        </div>{" "}
        {/* links div */}
        <div className="flex w-full flex-col  justify-center items-center p-2 my-2">
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Dont have an account ?</span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.REGISTER);
              }}
              className="text-blue-600 font-semibold px-2"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Trouble signing in ? </span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.RESET_PASSWORD);
              }}
              className="text-blue-600 font-semibold px-2"
            >
              Click here
            </button>
          </div>
          {/* <MenuButton
            type="button"
            variant="ghost"
            radius="md"
            colorScheme="black"
            customCssProps="p-5"
          >
            BUTTON
          </MenuButton> */}
        </div>
    
   </form>
  )
}

export default test