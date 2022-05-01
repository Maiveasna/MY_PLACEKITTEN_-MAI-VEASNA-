import { ItemType } from './../../types/itemType';

export  enum ActionType  {
    SET_IMAGE = "SET_IMAGE",
    SET_IMAGE_DETAIL = "SET_IMAGE_DETAIL",
   SET_IMAGE_BY_PAGINATION  = "SET_IMAGE_BY_PAGINATION",
}


interface  SetImagesAction {
     type : ActionType.SET_IMAGE ,
     payload : ItemType[]
}

interface SelectImageAction {
    type :  ActionType.SET_IMAGE_DETAIL ,
    payload : ItemType
}

interface SetImageByPaginationAction {
     type : ActionType.SET_IMAGE_BY_PAGINATION ,
     payload : ItemType[]
}


export  type  ActionReducerType = SetImagesAction | SelectImageAction | SetImageByPaginationAction;


