import {useState} from 'react'
import Loginform from '../Form/LoginForm'
import SignInForm from '../Form/SignInForm'
import ResetForm  from '../Form/ResetForm'


export enum LoginState {
  LOGIN,
  REGISTER,
  RESET,
  RESET_PASSWORD
}




const LoginLayout = () => {

    const [loginState,setLoginState] = useState<LoginState>(LoginState.LOGIN)

    const stateChangeHandler = (newState : LoginState) =>{
        setLoginState(newState)
    }


  return (
    <div className='flex min-h-screen justify-center items-center bg-amber-400 '>
    <div className='flex flex-col justify-center items-center w-96  border-none rounded-xl bg-slate-500 text-center'>
        
        { loginState === LoginState.LOGIN ?
        (<Loginform stateHandler = {stateChangeHandler} />) : ""} 
        { loginState === LoginState.REGISTER ?
        (<SignInForm stateHandler = {stateChangeHandler} />) : ""} 
        { loginState === LoginState.RESET_PASSWORD ?
        (<ResetForm stateHandler = {stateChangeHandler} />) : ""} 
    </div>
    </div>
  )
}

export default LoginLayout