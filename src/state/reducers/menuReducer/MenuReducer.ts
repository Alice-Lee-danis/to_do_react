
export interface IMenuItem {
        link:string
}

export interface IMenuState {
    items:Array<IMenuItem>,
}

export enum ActionTypeMenu {
    CREATE_ITEMS = "CREATE_ITEMS",
    DELETE_ITEMS = "DELETE_ITEMS"
}

export interface IActionMenuCreate{
    type: ActionTypeMenu.CREATE_ITEMS,
    payload: IMenuItem
}

export interface IActionMenuDelete{
    type: ActionTypeMenu.DELETE_ITEMS,
    payload?: string
}

export type MenuAction = IActionMenuCreate | IActionMenuDelete

export const MenuReducer = (state:IMenuState = {items:[]}, action:MenuAction) : IMenuState=>{
    switch(action.type){
        case ActionTypeMenu.CREATE_ITEMS :
            return {items:[...state.items, action.payload]}
        case ActionTypeMenu.DELETE_ITEMS :
            return {items:state.items.filter(item=>item.link!==action.payload)}
        default:
            return state    
    }
}

export const menuCreateItemActionCreators = (item:IMenuItem):IActionMenuCreate => {
    return {type:ActionTypeMenu.CREATE_ITEMS, payload:item}
}

export const menuCreateItemActionDelete = (item:string):IActionMenuDelete => {
    return {type:ActionTypeMenu.DELETE_ITEMS, payload:item}
}