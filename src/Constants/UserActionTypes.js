//get current user (me) from token in localstorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

//sign up user
export const SIGNUP_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//sign in user
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//validate email, if success, then load user and login
export const VALIDATE_EMAIL_REQUEST = 'VALIDATE_EMAIL_REQUEST';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when email is updated in profile to update main user's email
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

//logout user
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

//endpoint constants for our API calls. Currently empty.
export const LOGIN_ENDPOINT = '';
export const SIGNUP_ENDPOINT = '';

