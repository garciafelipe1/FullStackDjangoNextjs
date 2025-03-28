
import { IUser } from "@/interfaces/auth/IUser";
import { 
   SIGNUP_SUCCESS,
   SIGNUP_FAIL,
   ACTIVATION_SUCCESS,
   ACTIVATION_FAIL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOAD_USER_SUCCESS,
   LOAD_USER_FAIL,
   REFRESH_TOKEN_FAIL,
   REFRESH_TOKEN_SUCCESS,
   VERIFY_TOKEN_FAIL,
   VERIFY_TOKEN_SUCCESS

   } from "../actions/auth/types";

type Action={
    type:string,
    payload?:any

}

type State={
    user: IUser| null;
    isAutenticated:boolean;
}

const initialState={
    user: null,
    isAutenticated: false,

}

export default function authReducer(state:State = initialState,action:Action={type:''}) {
   const {type,payload}=action;
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
     case LOGIN_SUCCESS:
       return {
         ...state,
         isAutenticated: true,
       };
     case LOGIN_FAIL:
       return {
         ...state,
         isAutenticated: false,
       };
     case LOAD_USER_SUCCESS:
       return {
         ...state,
         user: payload,
       };
     case LOAD_USER_FAIL:
       return {
         ...state,
         user: null,
       };
     case REFRESH_TOKEN_SUCCESS:
       return {
         ...state,
       };
     case REFRESH_TOKEN_FAIL:
       return {
         ...state,
         user: null,
         isAutenticated: false,
       };
     case VERIFY_TOKEN_SUCCESS:
       return {
         ...state,
       };
     case VERIFY_TOKEN_FAIL:
       return {
         ...state,
         user: null,
         isAutenticated: false,
       };

     default:
       return state;
   }
}