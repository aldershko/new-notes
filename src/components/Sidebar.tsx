import { ReactNode } from "react"

import { MenuItem } from "./Layout/MainLayout"
import Button from "./Layout/Button"


 const Sidebar = (props:{
    menuList : MenuItem[]
    selectHandler?:(component:ReactNode) => void
}) => {

    const {menuList} = props

    const buildMenu = () =>{
        return menuList.map((menuItem,index) =>{
            return(
                <div className="my-2" key={index}>
                <Button
                    customCssProps=""
                    key={menuItem.id}
                    buttonId={menuItem.id}
                    type={"button"}
                    colorScheme={"white"}
                    variant={"ghost"}
                    padding={"normal"}
                    radius={"rightFull"}
                    lightIcon
                    fullWidth
                    iconPaddingFull
                    justifyContent={"start"}
                    icon={menuItem.icon}
                >
                    {menuItem.title}
                </Button>
                </div>
            )
        })
    }

  return (
   <>
    {buildMenu()}
    <div className="absolute bottom-0 flex w-64 flex-col border-t border-divider">
        {/* <span className="text-center">LOGOUT</span> */}
        {/* <Header /> */}
      </div>
   </>
  )
}

export default Sidebar