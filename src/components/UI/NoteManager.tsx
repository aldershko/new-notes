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
        const noteListRef =  ref(database,activePath.path)
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
        setIsCreating(false)
      }

      useEffect(() =>{
        const dbRef = ref(database)
        get(child(dbRef,activePath.path)).then((snapshot) =>{
          if(snapshot.exists()){
            const activeNotes = Object.values(snapshot.val())
            console.log(snapshot.val())
            setNotesList(activeNotes as Note[])
          }
        })
      },[activePath])


   

  return (
    <>
    <NoteCreatorContext.Provider 
    value={{changeColor:colorChangeHandler, archiveNote: archiveSingleNote,
    trashNote:trashSingleNote}}>
    <div className="flex justify-center ">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            
          >
            {activePath.name === "ACTIVE" && (
              <div
                className={`md:w-128 sm:w-96 flex flex-col mb-3 justify-center px-4 py-3 rounded-md  shadow-md shadow-gray-400 border`}
              >
                <div className="flex ">
                  {!isCreating && (
                    <div
                      className="flex justify-start font-medium"
                      onClick={() => {
                        setIsCreating(true);
                      }}
                    >
                      Create Note...
                    </div>
                  )}
                  {isCreating && (
                    <div className="w-full">
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
                        // isNoteInput={true}
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "",
                          requiredError: "empty",
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
                        // isNoteInput={true}
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "Invalid password.",
                          requiredError: "empty",
                        }}
                      />
                      <div className="flex justify-between">
                        <button type="submit" className="">
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
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