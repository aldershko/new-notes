import React, { ReactNode } from "react";



export type AllButtonPropsType = {
    type: 'button' | 'submit' | 'reset'
    title?:string
    variant:string
    shadow?:'xs' | 'sm' | 'md' | 'lg'| 'normal' | 'full' | 'inner'
    radius?:'xs' | 'sm' | 'md' | 'lg'| 'normal' | 'full' 
    buttonSize?:'xs' | 'sm' | 'lg' | 'md'
    iconOnly?:boolean
    leftIcon?:ReactNode
    colorScheme?:string



}

const AllButton = (props:AllButtonPropsType) =>{
    const {
        type,
        title,
        variant,
        colorScheme,
    } = props

    const colorSchemes = {

        // standard has background none or set to transparent or depends on  parent background

        standard:{
            text_lighter:"text-gray-600",
            hover_text:"hover:text-gray-950",
            hover_bg:"hover:bg-gray-"

        }

    }

    const variants ={
        none:`${(colorSchemes as any)[colorScheme!].text_lighter} ${(colorSchemes as any)[colorScheme!].hover_text}
        ${(colorSchemes as any)[colorScheme!].hover_bg}`
    }

}

export default AllButton