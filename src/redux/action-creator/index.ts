import { ItemType } from "../../types/itemType";
import { ActionReducerType, ActionType } from "../action-types/actionType";
import  { Dispatch } from 'redux'

export const dispatchSetImages = (images: ItemType[]) =>  {
   return ( disptch : Dispatch<ActionReducerType>) => {
    disptch({
        type : ActionType.SET_IMAGE,
        payload : images
    })
   }
}


export const dispatchSetImageDetail = (image: ItemType) =>  {
    return ( disptch : Dispatch<ActionReducerType>) => {
     disptch({
         type : ActionType.SET_IMAGE_DETAIL,
         payload : image
     })
    }
 }
 
 export const dispatchSetImagesByPagination = (images: ItemType[]) =>  {
    return ( disptch : Dispatch<ActionReducerType>) => {
     disptch({
         type : ActionType.SET_IMAGE_BY_PAGINATION,
         payload : images
     })
    }
 }
 

