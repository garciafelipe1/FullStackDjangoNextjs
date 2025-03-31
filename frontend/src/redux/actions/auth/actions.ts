
import { Dispatch, UnknownAction } from 'redux';
import { ToastSuccess, ToastError } from '@/components/toast/toast';
import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  VERIFY_TOKEN_FAIL,
  VERIFY_TOKEN_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOGOUT,
} from './types';
import type {
  IRegisterProps,
  IActivationsProps,
  IResendActivationProps,
  IForgotPasswordProps,
  IForgotPasswordConfirmProps,
  ILoginProps,
} from './interfaces';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '@/redux/reducers';

export const register = (props: IRegisterProps) => async (dispatch: Dispatch) => {
  try {
    const body = JSON.stringify({
      email: props.email,
      username: props.username,
      last_name: props.last_name,
      first_name: props.first_name,
      password: props.password,
      re_password: props.re_password,
    });

    const res = await fetch('api/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json();
    if (res.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      ToastSuccess('we have sent you an email, please click the link to verify your account');
    } else {
      dispatch({
        type: SIGNUP_FAIL,
      });
      if (data.email && data.email.length > 0) {
        ToastError(data.email[0]);
      } else if (data.username && data.username.length > 0) {
        ToastError(data.username[0]);
      } else {
        ToastError('An unknown error occured');
      }
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const activate = (props: IActivationsProps) => async (dispatch: Dispatch) => {
  try {
    const body = JSON.stringify({
      uid: props.uid,
      token: props.token,
    });

    const res = await fetch('/api/auth/activate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
      ToastSuccess('Your account has been activated, you may now login.');
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      ToastError('There was an error activating your account.');
    }
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const resend_activation = (props: IResendActivationProps) => async () => {
  try {
    const body = JSON.stringify({
      email: props.email,
    });

    const res = await fetch('/api/auth/resend_activation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 204) {
      ToastSuccess('we have send you email ');
    } else {
      ToastError('There an error resending the activation email');
    }
  } catch (err) {}
};
export const forgot_password = (props: IForgotPasswordProps) => async () => {
  try {
    const body = JSON.stringify({
      email: props.email,
    });

    const res = await fetch('/api/auth/forgot_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    if (res.status === 204) {
      ToastSuccess('we have send you email to reset your password');
    } else {
      ToastError('There an error resending the activation email');
    }
  } catch (err) {}
};
export const forgot_password_confirm =
  (props: IForgotPasswordConfirmProps) => async (dispatch: Dispatch) => {
    try {
      const body = JSON.stringify({
        new_password: props.new_password,
        re_new_password: props.re_new_password,
        uid: props.uid,
        token: props.token,
      });

      const res = await fetch('/api/auth/forgot_password_confirm', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      if (res.status === 204) {
        ToastSuccess('Your password has been reset, you may now login.');
      } else {
        ToastError('There was an error resending the activation email.');
      }
    } catch (err) {
      ToastError('Unexpected error');
    }
  };

export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
      });
      ToastError('Error loading user information.');
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const loadProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/profile');

    const data = await res.json();
    if (res.status === 200) {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: data.results,
      });
    } else {
      dispatch({
        type: LOAD_PROFILE_FAIL,
      });
      ToastError('Error loading user profile.');
    }
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
    });
  }
};

export const login =
  (props: ILoginProps) => async (dispatch: ThunkDispatch<RootState, void, UnknownAction>) => {
    try {
      const body = JSON.stringify({
        email: props.email,
        password: props.password,
      });

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      if (res.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        await dispatch(loadUser());
        await dispatch(loadProfile());

        console.log('Login successfull.');
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        ToastError('Login failed please verify your email and password');
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const refresh_access_token = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/refresh');
    if (res.status === 200) {
      const data = await res.json();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {}
};
export const verify_access_token = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetch('/api/auth/verify');
    if (res.status === 200) {
      dispatch({
        type: VERIFY_TOKEN_SUCCESS,
      });
    } else {
      dispatch({
        type: VERIFY_TOKEN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: VERIFY_TOKEN_FAIL,
    });
  }
};

export const setLoginSuccess = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: LOGIN_SUCCESS,
    });
    
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    
  }
};


export const logout= () => async (dispatch: Dispatch) => {
  try {
    const res=await fetch('/api/auth/logout');
    if(res.status===200){
      dispatch({
        type: LOGOUT,
      });
      
    }
  } catch (err) {
    ToastError('Unexpected error');
    };
  
}
