import { UnknownAction, Dispatch } from 'redux';
import { ToastSuccess, ToastError } from '@/components/toast/toast';
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from "./types"
import type { IRegisterProps } from './interfaces';

export const register = (props:IRegisterProps) => async (dispatch:Dispatch) => {

    try{
        const body=JSON.stringify({
            email:props.email,
            username:props.username,
            last_name:props.last_name,
            first_name:props.first_name,
            password:props.password,
            re_password:props.re_password
        })

        const res=await fetch('api/auth/register',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body
        })

        const data=await res.json();
        if(res.status===201){
            dispatch({
                type:SIGNUP_SUCCESS
                
            });
            ToastSuccess("we have sent you an email, please click the link to verify your account")
        }else {
            dispatch({
                type:SIGNUP_FAIL
            })
            if(data.email && data.email.length>0){
                ToastError(data.email[0])
            }else if (data.username && data.username.length>0){
                ToastError(data.username[0])
            }else{
                ToastError("An unknown error occured")
            }
        } 
    }catch(err){
        dispatch({
            type:SIGNUP_FAIL,
            payload:err
        })
    }
    
}
export const activate =() =>  {}