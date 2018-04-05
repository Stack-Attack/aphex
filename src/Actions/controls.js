/**
 * Actions for the controls reducer. A container will dispatch one of these actions upon the user interacting with the app. The controls reducer will receive one of these actions and adjust the Redux state accordingly.
 */

import * as types from '../Constants/ControlsActionTypes';

/**
 * Called when the user presses the play button. Toggles whether the sound is playing or not
 * @constructor
 * @param {string} id - ID of snippet to be played
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const playPressed = id => (dispatch, getState) => {
    let isPlaying = getState().controls.playing;
    let activeID = getState().controls.activeID;

    if (activeID !== id) {
        dispatch(playSound(id));
    } else {
        if (!isPlaying) {
            dispatch(playSound(id));
        } else {
            dispatch(pauseSound(id));
        }
    }
};

const SAMPLE_ENDPOINT = 'https://syro.dannykivi.com/sample';

export const addComment = (payload, token) => dispatch => {

    dispatch(requestAddComment());

    if (!token) {
        console.log("No token, needs to be reauthenticated");
    }

    const endpoint = SAMPLE_ENDPOINT + '/' + payload.id + '/comment'

    let config = {
        method: "POST",
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'comment': payload.comment
        })
    }

    console.log(config);
    console.log(endpoint);

    return fetch(endpoint, config)
        .then(response => response.json().then(sound => ({sound, response})))
        .then(({sound, response}) => {
            console.log(sound);
            if (!response.ok) {
                //error in posting comment
                dispatch(failureAddComment(sound.message));
                return Promise.reject(sound);
            }
            else {
                dispatch(receiveAddComment());
            }
        })
        .catch(err => console.log("Error: ", err));


};

export const requestAddComment = () => ({
    type: types.REQUEST_ADD_COMMENT
});

export const receiveAddComment = () => ({
    type: types.RECEIVE_ADD_COMMENT
})

export const failureAddComment = message => ({
    type: types.FAILURE_ADD_COMMENT,
    message
})


export const playSound = id => ({
    type: types.PLAY_SOUND,
    id
});

export const pauseSound = id => ({
    type: types.PAUSE_SOUND,
    id
});

export const adjustFocus = inFocus => ({
    type: types.ADJUST_FOCUS,
    inFocus
});

export const setSeek = pos => ({
    type: types.SET_SEEK,
    pos
});

export const resetControls = () => ({
    type: types.RESET_CONTROLS
});
