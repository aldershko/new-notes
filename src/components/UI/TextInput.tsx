import React from 'react'
import {FieldErrors,FieldValues,UseFormRegister } from 'react-hook-form'




export type TextInputProps ={
    type:"text" | "number" | "password";
    placeholder: string;
    rounded: "md" | "lg" | "xl"
    shadow:"md" | "lg" | "xl";
    name?:string;
    register:UseFormRegister<FieldValues>;
    error:FieldErrors<FieldValues>;
    validationSchema?:{
      required?:boolean;
      requiredError?:string;
      maxLength?:number;
      minLength?:number;
      pattern?:RegExp;
      patterError?:string;
    }

 }

const radius ={
    md:"rounded-md",
    lg:"rounded-lg",
    xl:"rounded-xl",
}

const dropRadius={
    md:"shadow-md",
    lg:"shadow-lg",
    xl:"shadow-xl",
}


const TextInput = (props : TextInputProps) => {


  return (
    <>
    <input className={` my-8 p-3 px-8 ${(radius as any)[props.rounded]} hover:${(dropRadius as any)[props.shadow]}`} 
    type={props.type}
    placeholder={props.placeholder}
    {...props.register(props.name || '',props.validationSchema)} />

    <div className='my-2 text-sm text-red-600'>
      {props.error && props.error[props.name || ""]?.type === 'required' && (
        <span>
          {props.validationSchema?.requiredError?
          props.validationSchema?.requiredError : 
          'Field cannot be empty'}
        </span>
      )}
      {props.error && props.error[props.name || ""]?.type === 'minLength' && (
        <span>
            Should be atleast {props.validationSchema?.minLength}
        </span>
      )}
      {props.error && props.error[props.name || ""]?.type === 'pattern' && (
        <span>
           {props.validationSchema?.requiredError?
          props.validationSchema?.requiredError : 
          'Invalid pattern'}{' '}
        </span>
      )}
    </div>

    

    </>
  )
}

export default TextInput