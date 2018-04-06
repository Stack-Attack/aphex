//signin/authenticate user
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const FAILURE_LOGIN = 'FAILURE_LOGIN';

//signup/create new user
export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
export const RECEIVE_CREATE_USER = 'RECEIVE_CREATE_USER';
export const FAILURE_CREATE_USER = 'FAILURE_CREATE_USER';

//log out
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT';

//upload profile picture
export const REQUEST_UPLOAD_PICTURE = 'REQUEST_UPLOAD_PICTURE';
export const RECEIVE_UPLOAD_PICTURE = 'RECEIVE_UPLOAD_PICTURE';
export const FAILURE_UPLOAD_PICTURE = 'FAILURE_UPLOAD_PICTURE';





//currently unused

//get current user (me) from token in localstorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';


//validate email, if success, then load user and login
export const VALIDATE_EMAIL_REQUEST = 'VALIDATE_EMAIL_REQUEST';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when email is updated in profile to update main user's email
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';




