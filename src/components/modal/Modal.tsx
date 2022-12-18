import React, { useState } from 'react'
import classes from "../../styles/modal.module.scss"

interface IModalArg {
    contextExit:(isExit:Boolean)=>void,
    taskNameSet:(text:string)=>void
}


const Modal:React.FC<IModalArg> = ({contextExit,taskNameSet})=>{

    const [textState, textSetState]=useState<String | null>(null)


    return (
        <div className={classes.contextModal} onClick={()=>{
            contextExit(false)}}>
                <div className={classes.modal} onClick={(e:React.MouseEvent<HTMLDivElement>)=> e.stopPropagation()}>
                    <div><h1>Создай заметку</h1></div>
                    <div><input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        textSetState(e.target.value)
                    }} type="text" className={classes.notesInput}/></div>
                    <div className={classes.saveNoteContext}>
                        <button className={classes.saveNote} onClick={()=>{
                            taskNameSet(textState!.toString())
                            contextExit(false)
                        }}>сохранить</button>
                    </div>
                    
                </div>
        </div>
    )
}

export default Modal