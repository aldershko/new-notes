import { createContext } from "react";
import { Note } from '../Layout/MainLayout'

export type NoteCreatorContextType = {
    changeColor?: (id:string,color:string) => void;
}

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});