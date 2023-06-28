import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import TextInput from './TextInput';
import { Note } from '../Layout/MainLayout';
import NoteList from './NoteList';
import { ref, push, set, get , child, update, remove } from "firebase/database"
import { database } from '../../firebase/firebaseConfig';
import ColorSelector from '../ColorSelector';
import { NoteCreatorContext } from '../Contexts/NoteCreatorContext';
import { NoteManagerActivePath, remotePath } from '../../utils/utils';

const NoteCreator = (props:{activePath: NoteManagerActivePath}) => {

    const [isCreating,setIsCreating] = useState(false)
    const [notesList,setNotesList] = useState<Note[]>([])

    const { activePath } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm();

      const colorChangeHandler = (id: string, color: string) => {
        const notesListCopy = [...notesList];
        notesListCopy.forEach((note) => {
          if (note.id === id) {
            note.config.color = color;
            setNotesList(notesListCopy);
            const noteRef = ref(database, `/Notes/active/${note.id}`);
            update(noteRef, note);
          }
        });
      };
    

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
        note.id = newNoteRef.key!;
        set(newNoteRef,note)
      }


      const archiveSingleNote = (id: string) => {
        const notesListCopy = [...notesList];
        notesListCopy.forEach((note) => {
          if (note.id === id) {
            const noteCopy = Object.assign({}, note);
            const noteArchiveRef = ref(database, remotePath.archive);
            const newArchiveRef = push(noteArchiveRef);
            noteCopy.id = newArchiveRef.key!;
            console.log(newArchiveRef.key);
            set(newArchiveRef, noteCopy).then(() => {
              deleteSingleNote(id);
            });
          }
        });
      };

      const trashSingleNote = (id:string)=>{
        const notesListCopy = [...notesList]
        notesListCopy.forEach((note) =>{
          if(note.id === id){
            const noteCopy = Object.assign({},note);
            const noteTrashRef = ref(database,remotePath.trash)
            const newTrashRef = push(noteTrashRef)
            noteCopy.id = newTrashRef.key!;
            console.log(newTrashRef.key)
            set(newTrashRef,noteCopy).then(() =>{
              deleteSingleNote(id)
            })

          }
        })
      }

      const deleteLocalNote = (id: string) => {
        const notesListCopy = [...notesList];
        notesListCopy.forEach((note, index) => {
          if (note.id === id) {
            notesListCopy.splice(index, 1);
            setNotesList(notesListCopy);
          }
        });
      };
    

      const deleteSingleNote = async (id: string) => {
        const noteDeleteRef = ref(database, `/Notes/active/${id}`);
        try {
          await remove(noteDeleteRef);
          console.log("id:", id);
          deleteLocalNote(id);
        } catch (error) {
          console.log("Cannot delete note...");
        }
      };
    

     
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


      useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, activePath.path)).then((snapshot) => {
          if (snapshot.exists()) {
            const activeNotes = Object.values(snapshot.val());
            console.log(snapshot.val());
            setNotesList(activeNotes as Note[]);
          }
        });
      }, [activePath]);
      

  return (
    <>
    <NoteCreatorContext.Provider 
    value={{changeColor:colorChangeHandler, archiveNote: archiveSingleNote,
    trashNote:trashSingleNote}}>
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
    </NoteCreatorContext.Provider>
    </>
  )
}

export default NoteCreator