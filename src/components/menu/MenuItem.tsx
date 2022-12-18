import React, { Dispatch } from 'react'
import { Link, useLocation } from 'react-router-dom';
import classes from "../../styles/menuItem.module.scss"
import close from '../../staticResources/close.png'
import { useDispatch } from 'react-redux';
import { MenuAction, menuCreateItemActionDelete } from '../../state/reducers/menuReducer/MenuReducer';

interface IMenuItemArg {
  link:string,
  icon?:string
}

const MenuItem:React.FC<IMenuItemArg> = ({link, icon})=> {
    const dispatch : Dispatch<MenuAction> = useDispatch()
    const location = useLocation()

    return (
      <Link to={link} className={classes.a}>
          <div className={classes.icon}>
          <img src={icon} alt="" />
          </div>
          {
            link !== location.pathname &&  <button className={classes.close} onClick={
              (e:React.MouseEvent<HTMLButtonElement>)=>{
                e.stopPropagation()
               dispatch(menuCreateItemActionDelete(link)) 
              }
            }>
              <img src={close} alt="" />
            </button>
          }
      </Link>
      
    );
  }
  
  export default MenuItem;
  