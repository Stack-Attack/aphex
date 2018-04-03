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

const SAMPLE_ENDPOINT = 'https://syro.dannykivi.com/sample';


//GET sample/{id}
export const fetchSingleSound = (id, token) => dispatch => {
    dispatch(requestSound());

    let config = {
        headers: {
            'Authorization': token
        }
    };

    return fetch(SAMPLE_ENDPOINT + '/${id}', config)
        .then(response => response.json().then(sound => ({sound, response})))
        .then(({sound, response}) => {
                if (!response.ok) {
                    //error in fetching single sound
                    dispatch(failureSound(sound.message));
                    return Promise.reject(sound);
                }
                else {
                    dispatch(receiveSound(sound));
                }
            }
        )
        .catch(err => console.log("Error: ", err));

};

//GET sample
export const fetchSounds = (num, token) => dispatch => {
    dispatch(requestSounds());

    let config = {
        headers: {
            'Authorization': token
        }
    };
    return fetch(SAMPLE_ENDPOINT, config)
        .then(response => response.json().then(sounds => ({sounds, response})))
        .then(({sounds, response}) => {
                if (!response.ok) {
                    //error in fetching sounds
                    dispatch(failureSounds(sounds.message));
                    return Promise.reject(sounds);
                }
                else {
                    dispatch(receiveSounds(sounds.data))
                }
            }
        )
        .catch(err => {
                console.log("Error: ", err);
                dispatch(failureSounds("Error:" + err));
            }
        )
};

export const tempSounds = (num, token) => dispatch => {
    //this doesn't get used
    dispatch(requestSounds());

    sounds.getSounds(sounds => {
        dispatch(receiveSounds(sounds));
    });
}

/**
 * called when the user uploads a sound on the 'Upload' page. It will send a POST request to the server with the file data
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

//POST sample
export const uploadSound = (file, token) => dispatch => {
    dispatch(requestCreateSound());

    if (!token) {
        console.log("No token, will need to re-authenticate");
    }

    let config = { // eslint-disable-line no-unused-vars
        method: "POST",
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'name': file.name,
            'uri': file.url
        })
    };

    console.log(config);

    return fetch(SAMPLE_ENDPOINT, config)
        .then(response => response.json().then(sound => ({sound, response})))
        .then(({sound, response}) => {
            console.log(response);
            console.log(sound);
            if (!response.ok) {
                //error in uploading sound
                dispatch(failureCreateSound(sound.message));
                return Promise.reject(sound);
            }
            else {
                dispatch(receiveCreateSound());
            }
        })
        .catch(err => console.log("Error: ", err));
};





//actions for request a single sound from the server
export const requestSound = () => ({
    //request sounds from the server
    type: types.REQUEST_SOUND
});
export const receiveSound = sound => ({
    //action for when we receive new sounds from the server.
    //'sounds' should be an array of sound objects from the server
    type: types.RECEIVE_SOUND,
    payload: sound
});
export const failureSound = message => ({
    type: types.FAILURE_SOUND,
    message: message
});

//actions for requesting multiple sounds from the server
export const requestSounds = () => ({
    type: types.REQUEST_SOUNDS
});

export const receiveSounds = sounds => ({
    type: types.RECEIVE_SOUNDS,
    payload: sounds
});

export const failureSounds = message => ({
    type: types.FAILURE_SOUNDS,
    message: message
})


//actions for uploading a new sound to the server
export const requestCreateSound = () => ({
    type: types.REQUEST_CREATE_SOUND
})
export const receiveCreateSound = () => ({
    type: types.RECEIVE_CREATE_SOUND
})
export const failureCreateSound = message => ({
    type: types.FAILURE_CREATE_SOUND,
    message: message
})


//other sound actions

export const clearLoadedSounds = () => ({
    type: types.CLEAR_LOADED_SOUNDS
})



