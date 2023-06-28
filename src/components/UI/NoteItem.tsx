import React, { ReactNode, useContext } from 'react'
import { Note } from '../Layout/MainLayout'
import Button from './Button'
import { MdMoreVert, MdOutlineArchive, MdOutlineImage } from 'react-icons/md'
import { TbBellPlus, TbPalette, TbPinned, TbUserPlus } from 'react-icons/tb'
import { Menu } from "@headlessui/react";
import ColorSelector from '../ColorSelector'
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";


export type ActionsButtonType = {
  id:number
  icon:ReactNode
  actionCallback?: () => void
}



const NoteItem = (props:Note) => {

const {archiveNote , trashNote} = useContext(NoteCreatorContext);
  const actionsList: ActionsButtonType[] = [
    {
      id: 0,
      icon: <TbBellPlus size={18} />,
    },
    {
      id: 1,
      icon: <TbUserPlus size={18} />,
    },
    {
      id: 2,
      icon: <TbPalette size={18} />,
    },
    {
      id: 3,
      icon: <MdOutlineImage size={18} />,
    },
    {
      id: 4,
      icon: <MdOutlineArchive size={18} />,
      actionCallback: ()=>{
        if(archiveNote)
        archiveNote(props.id)
      }
    },
    {
      id: 5,
      icon: <MdMoreVert size={18} />,
      actionCallback:() =>{
        if(trashNote) trashNote(props.id)
      }
      
    },
  ];

  const buildActionsList = () =>{
    return actionsList.map((action) =>{
      if (action.id === 2)
      return(
        <Menu
        key={action.id}
        as="div"
        className="relative inline-block text-left"
      >
        <Menu.Button className="flex p-2 hover:bg-gray-200 rounded-full">
          <TbPalette size={18} />
          {/* <Button
            customCssProps=" text-gray-600 "
            type="button"
            colorScheme="white"
            radius="full"
            variant="ghost"
            padding="rounded"
            onClick={action.actionCallback}
            buttonSize="xs"
            iconOnly
            icon={action.icon}
          ></Button> */}
        </Menu.Button>
        <Menu.Items>
          <Menu.Item as="div" className="absolute">
            <ColorSelector
            noteId={props.id}
              noteColor={props.config.color}
            />
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
      
      return(
        <Button
          key={action.id}
          customCssProps=" text-gray-600 "
          type="button"
          colorScheme="white"
          radius="full"
          variant="ghost"
          padding="rounded"
          onClick={action.actionCallback}
          buttonSize="xs"
          iconOnly
          icon={action.icon}
        ></Button>
      )
    })
  }

  return (
    <>
    <div className='flex w-64 border border-gray-200 group hover:shadow-md py-2 px-3  m-2 flex-col rounded-md justify-center' style={{backgroundColor: props.config.color}}>
    <div className="flex flex-row justify-between items-center align-middle py-2 font-medium">
          <div>{props.content.header}</div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-200">
            <Button
              customCssProps=" text-gray-600 "
              type="button"
              colorScheme="white"
              radius="full"
              variant="ghost"
              padding="rounded"
              buttonSize="lg"
              iconOnly
              icon={<TbPinned size={23} />}
              
            ></Button>
          </div>
        </div> 
        <div className='flex font-base '>{props.content.body.bodyContent}</div>
        <div className='flex text-gray-800 pb-1 font-base'>
          <span className='border mt-2 mb-0.5 border-gray-400 px-1 bg-gray text-xs rounded-full'>tags</span>
        </div>
        <div className='mt-1 flex justify-between   group-hover:opacity-100 opacity-0 flex-row  transition-opacity  ease-in delay-200'>
          {buildActionsList()}
        </div>
    </div>
    </>
  )
}

export default NoteItem