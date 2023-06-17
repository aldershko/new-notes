import React, { ReactNode, useContext, useState } from "react";
import { MenuItem } from "./Layout/MainLayout";
import Button from "./UI/Button";
import { MainContext } from "./Contexts/MainContext";
import { NoteManagerActivePath, remotePath } from "../utils/utils";

const Sidebar = (props: {
  menuList: MenuItem[];
  selectHandler?: (component: ReactNode) => void;
  activePathChangeHandler?:(newState: NoteManagerActivePath) => void;
}) => {
  const { setTitle } = useContext(MainContext);
  const [currentSelectedMenu, setCurrentSelectedMenu] = useState(0);

  const { menuList,activePathChangeHandler } = props;

  const menuHandler = (id: number) => {
    setCurrentSelectedMenu(id);
    stateSetter(id)
    if (setTitle) setTitle(menuList[id].title);
  };

// setting path in firebase for each sidebar

  const stateSetter = (id:number) =>{
    if(id === 3 ){
      if(activePathChangeHandler) activePathChangeHandler({ name:"ARCHIVE",path:remotePath.archive})
    }
    if(id === 4){
      if(activePathChangeHandler) activePathChangeHandler({ name:"TRASH" , path:remotePath.trash})
    }
    if(id===0){
      if(activePathChangeHandler)activePathChangeHandler({name:"ACTIVE" , path:remotePath.active})
    }
  }

  //Build Menu items
  const buildMenu = () => {
    return menuList.map((menuItem, index) => {
      return (
        <div className="" key={index}>
          {/* <span className="ml-5 text-xs font-semibold tracking-widest text-stoneGray">
                  
                </span> */}
          <Button
            customCssProps="font-medium text-sm"
            key={menuItem.id}
            buttonId={menuItem.id}
            type={"button"}
            colorScheme={"white"}
            variant={"ghost"}
            padding={"normal"}
            radius={"rightFull"}
            lightIcon
            isActive={currentSelectedMenu === menuItem.id}
            fullWidth
            onMenuClick={menuHandler}
            iconPaddingFull
            justifyContent={"start"}
            icon={menuItem.icon}
          >
            {menuItem.title}
          </Button>
        </div>
      );
    });
  };

  return (
    <>
      {/* <div className="justify-left relative flex h-14 flex-row items-center  border-b border-divider py-2 px-3 align-middle "></div> */}
      {/* {buildMenu()} */}
      {buildMenu()}
    
    </>
  );
};

export default Sidebar;