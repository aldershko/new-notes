import { createContext } from "react";
import { Note } from '../Layout/MainLayout'

export type NoteCreatorContextType = {
    changeColor?: (id:string,color:string) => void;
    archiveNote?: (id:string) => void;
    deleteNote?: (id:string) => void;
    trashNote?:(id:string) => void;
    noteColor?: string;
    notesList?: Note[];
}

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});