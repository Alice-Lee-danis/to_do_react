import React, { useEffect, useRef, useState } from 'react'
import { useToDoSelector } from '../../state/Hooks/useToDoSelector';
import { IMenuItem } from '../../state/reducers/menuReducer/MenuReducer';
import classes from "../../styles/menu.module.scss"
import MenuItem from './MenuItem';
import home from '../../staticResources/home.png'
import link from '../../staticResources/link.png'

function Menu() {
    const [menuTriggerState, menuTriggerSetState] = useState<Boolean>(false);
    const refMenu:React.RefObject<HTMLButtonElement> = useRef(null);
    const contextMenu:React.RefObject<HTMLDivElement> = useRef(null);
    const {items} = useToDoSelector((state)=>state.MenuReducer)
    const [menuState, menuSetState] = useState<Array<IMenuItem>>([])
    useEffect(()=>{
      const newMenuItems = Array.from(new Set(items.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
      menuSetState(newMenuItems)
    },[items])


    const stylesMenuContext:React.CSSProperties = {
      width: !menuTriggerState ? '0' : '100%',
    }

    const stylesMenu: React.CSSProperties  = {
      width: !menuTriggerState ? "5px" : "110px",
    }

    const MenuContextActive = (event: React.MouseEvent<HTMLDivElement>) => {
      if(menuTriggerState ){
        menuTriggerSetState(false)
      }   
    }

    const MenuActive = (event:React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      if(!menuTriggerState)
        menuTriggerSetState(true)
    }

    return (
      <div className={classes.menuContext + ' '} ref={contextMenu} onClick={MenuContextActive}  style={stylesMenuContext}>
        <button className={classes.menu} ref={refMenu} onClick={MenuActive} style={stylesMenu}>
          <div className={classes.contentContext}>
            <div className={classes.home}><MenuItem link='d' icon={home}></MenuItem></div>
              <div className={classes.listMenuItem}>
              {menuState!.map((item)=>{
                return <MenuItem key={item.link} icon={link} link={item.link}></MenuItem>
              })}
              </div>
          </div>
        </button>
      </div>
    );
  }

  export default Menu;
  