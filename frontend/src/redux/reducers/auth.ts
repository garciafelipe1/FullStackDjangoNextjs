
import { SIGNUP_SUCCESS,SIGNUP_FAIL, ACTIVATION_SUCCESS, ACTIVATION_FAIL } from "../actions/auth/types";

type Action={
    type:string,
    payload?:any

}

type State={
    user: any| null;
    isAutenticated:boolean;
}

const initialState={
    user: null,
    isAutenticated: false,

}

export default function authReducer(state:State = initialState,action:Action={type:''}) {
   const {type,}=action;
   switch (type) {
     case SIGNUP_SUCCESS:
       return {
         ...state,
       };
     case SIGNUP_FAIL:
       return {
         ...state,
       };
     case ACTIVATION_SUCCESS:
       return {
         ...state,
       };
     case ACTIVATION_FAIL:
       return {
         ...state,
       };
     default:
       return state;
   }
}