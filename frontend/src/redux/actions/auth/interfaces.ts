
export interface IRegisterProps{
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    password: string;
    re_password: string;
    
}

export interface IActivationsProps {
  uid: string | null;
  token: string | null;
}

export interface IResendActivationProps{
  email:string;
}