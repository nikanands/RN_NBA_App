import axios from 'axios';
import {SIGNUP, SIGNIN, FIREBASEURL, REFRESH} from '../../utils/urlSchema';

export const signUp = data => {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: 'SIGN_UP',
    payload: request,
  };
};

export const signIn = data => {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: 'SIGN_IN',
    payload: request,
  };
};

export const autoSignIn = refreshToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: 'AUTO_SIGN_IN',
    payload: request,
  };
};
