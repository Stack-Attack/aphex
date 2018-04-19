//load sounds from server
export const REQUEST_SOUNDS = 'REQUEST_SOUNDS';
export const RECEIVE_SOUNDS = 'RECEIVE_SOUNDS';
export const FAILURE_SOUNDS = 'FAILURE_SOUNDS';

//create and post sound to server
export const REQUEST_CREATE_SOUND = 'CREATE_SOUND';
export const RECEIVE_CREATE_SOUND = 'RECEIVE_CREATE_SOUND';
export const FAILURE_CREATE_SOUND = 'FAILURE_CREATE_SOUND';

//search for sound
export const REQUEST_SEARCH_SOUNDS = "REQUEST_SEARCH_SOUNDS";
export const RECEIVE_SEARCH_SOUNDS = "RECEIVE_SEARCH_SOUNDS";
export const FAILURE_SEARCH_SOUNDS = "FAILURE_SEARCH_SOUNDS";

//add comment to sound
export const REQUEST_ADD_COMMENT = "REQUEST_ADD_COMMENT";
export const RECEIVE_ADD_COMMENT = "RECEIVE_ADD_COMMENT";
export const FAILURE_ADD_COMMENT = "FAILURE_ADD_COMMENT";

//get comments for specific sound
export const REQUEST_GET_COMMENTS = "REQUEST_GET_COMMENTS";
export const RECEIVE_GET_COMMENTS = "RECEIVE_GET_COMMENTS";
export const FAILURE_GET_COMMENTS = "FAILURE_GET_COMMENTS";

//clear all the sounds loaded in the browser
export const CLEAR_LOADED_SOUNDS = 'CLEAR_LOADED_SOUNDS';

//endpoints
export const SOUND_ENDPOINT = 'https://syro.dannykivi.com/sample';

