import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import TextInput from './TextInput';
import { Note } from '../Layout/MainLayout';
import NoteList from './NoteList';
import { ref, push, set, get , child } from "firebase/database"
import { database } from '../../firebase/firebaseConfig';

const NoteCreator = () => {

    const [isCreating,setIsCreating] = useState(false)
    const [notesList,setNotesList] = useState<Note[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

      const createNote = (header:string, description:string) =>{
        const note: Note = {
            id:Math.random().toString(),
            content:{
                header:header,
                body:{
                    bodyType:"plain",
                    bodyContent:description,
                }
            },
            config:{
                color:"#bebebe"
            }   
        }
        setNotesList([...notesList,note])
        const noteListRef =  ref(database,"/Notes/active")
        const newNoteRef =  push(noteListRef)
        set(newNoteRef,note)
      }

      const onFormSubmit = (data:any) =>{
        

        console.log(data)
        createNote(data.header,data.body)
        setValue("header","")
        setValue("body",'')
      }

      useEffect(() =>{
        const dbRef = ref(database)
        get(child(dbRef,"/Notes/active")).then((snapshot) =>{
          if(snapshot.exists()){
            const activeNotes = Object.values(snapshot.val())
            console.log(snapshot.val())
            setNotesList(activeNotes as Note[])
          }
        })
      },[])
      

  return (
    <>
    <div className='flex justify-center'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className='flex flex-col justify-center px-4 py-3 rounded-md items-center shadow-md border'>
                {!isCreating && (
                    <div className='flex justify-start font-medium' onClick={()=>{
                        setIsCreating(true)
                    }}> Create Note...</div>
                ) }
                {isCreating && (
                     <div>
                     <TextInput
                       type="text"
                       colorScheme="white"
                       rounded="md"
                       size="xs"
                       placeHolder="Title"
                       borderScheme="white"
                       register={register}
                       error={errors}
                       name="header"
                       validationSchema={{
                         required: false,
                         // pattern:
                         //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        //  patternError: "Invalid password.",
                         requiredError: "Password cannot be empty",
                       }}
                     />
                     <TextInput
                       type="text"
                       colorScheme="white"
                       rounded="md"
                       size="xs"
                       placeHolder="Description"
                       borderScheme="white"
                       register={register}
                       error={errors}
                       name="body"
                       validationSchema={{
                         required: false,
                         // pattern:
                         //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                         patternError: "Invalid password.",
                         requiredError: "Password cannot be empty",
                       }}
                     />
                     <button type="submit" className="">
                       Submit
                     </button>
                   </div>
                 )}{" "}

                

            </div>
            </form>
    </div>
    <div className='flex flex-wrap'>
        <NoteList notes={notesList} />
    </div>
    </>
  )
}

export default NoteCreator