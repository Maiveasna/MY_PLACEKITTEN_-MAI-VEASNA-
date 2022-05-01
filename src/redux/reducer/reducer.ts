import { ActionReducerType, ActionType } from '../action-types/actionType';
import { ItemType } from './../../types/itemType';

export type InitialStateType = {
    images :  ItemType[]
    imageDetail : ItemType
}

const initialState : InitialStateType =
 {
    images : [],
    imageDetail : {}
}

const reducer = (state:InitialStateType = initialState , action: ActionReducerType) => {
     switch (action.type) {
         case ActionType.SET_IMAGE :
                  state.images  = action.payload as  ItemType[]
             break;
        case ActionType.SET_IMAGE_DETAIL :
                 state.imageDetail = action.payload
        case ActionType.SET_IMAGE_BY_PAGINATION : 
                 state.images = action.payload as ItemType[] 
         default:
            return  state
     }
}

export  default reducer