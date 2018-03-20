import sounds from "../api/sounds";
import * as types from '../Constants/SoundActionTypes';

/*
    Actions for the sounds reducer. A container will dispatch one of these actions upon the user
    interacting with the app. The sounds reducer will receive one of these actions and adjust the
    Redux state accordingly.
 */

/**
 * Called when a request to load more sounds from the server is sent. Notice how API calls will be made in this method, NOT in the reducer.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

export const fetchSounds = () => dispatch => {
  dispatch(requestSounds());

  //TODO: replace this with a FETCH request. it will then dispatch receiveSounds
  sounds.getSounds(sounds => {
    dispatch(receiveSounds(sounds));
  });
  // return fetch('http request with ' + num + 'as parameter')
  //     .then(response => response.json())
  //     .then(json => dispatch(receiveSounds(json)));
};

/**
 * called when the user uploads a sound on the 'Upload' page. It will send a POST request to the server with the file data
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

export const uploadSound = (file, tokenFromStorage) => dispatch => {
  console.log(file);

  if (!tokenFromStorage) {
    console.log("won't work");
  }

  //TODO: complete implementation of uploading sound.
  let config = { // eslint-disable-line no-unused-vars  
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenFromStorage}`,
      "Content-Type": "Possibly define content type"
    },
    body: file
  };
};

export const receiveSounds = sounds => ({
  //action for when we receive new sounds from the server.
  //'sounds' should be an array of sound objects from the server
  type: types.RECEIVE_SOUND,
  sounds
});

export const requestSounds = num => ({
  //request sounds from the server
  type: types.REQUEST_SOUND
});
