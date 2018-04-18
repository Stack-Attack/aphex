import * as types from '../Constants/SoundActionTypes';
import History from '../Utils/History';
/**
    Actions for the sounds reducer. A container will dispatch one of these actions upon the user
    interacting with the app. The sounds reducer will receive one of these actions and adjust the
    Redux state accordingly.
 */

const SOUND_ENDPOINT = types.SOUND_ENDPOINT;

/**
 * Called when user loads sounds from server.
 * GET /sample
 * @param {number} limit - query for number of results to return from server
 * @param {number} skip - query for number of results to skip. This is good for a avoiding getting duplicates from server
 * @param {string} token - JWT retrieved from storage
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const fetchSounds = (limit, skip, token) => dispatch => {
    dispatch(requestSounds());

    let config = {
        headers: {
            'Authorization': token
        }
    };
    let queryString = '?$sort[createdAt]=-1&$limit=' + limit + '&$skip=' + skip;

    return fetch(SOUND_ENDPOINT + queryString, config)
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

/**
 * search sounds for a title matching the search term
 * GET /sample/?$sort[createdAt]=-1&name={searchTerm}
 * @param {string} query - term that was entered in search bar
 * @param {string} token - JWT retrieved from localstorage
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const searchSounds = (query, token) => dispatch => {
    dispatch(clearLoadedSounds());
    dispatch(requestSearchSounds());

    let config = {
        headers: {
            'Authorization': token
        }
    };
    let queryString = '?$sort[createdAt]=-1&name=' + query;

    return fetch(SOUND_ENDPOINT + queryString, config)
        .then(response => response.json().then(sounds => ({sounds, response})))
        .then(({sounds, response}) => {
                console.log(sounds);
                if (!response.ok) {
                    //error in fetching sounds
                    dispatch(failureSounds(sounds.message));
                    return Promise.reject(sounds);
                }
                else {
                    dispatch(receiveSearchSounds(sounds.data))
                }
            }
        )
        .catch(err => {
                console.log("Error: ", err);
                dispatch(failureSearchSounds("Error:" + err));
            }
        )
};

/**
 * called when the user uploads a sound on the 'Upload' page.
 * POST /sample
 * @param {Object} file - object with properties and data url of user uploaded file
 * @param {string} token - JWT token retrieved from local storage
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
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
        body: JSON.stringify({
            'name': file.name,
            'description': file.description,
            'type': file.type,
            'uri': file.url
        })
    };
    return fetch(SOUND_ENDPOINT, config)
        .then(response => response.json().then(sound => ({sound, response})))
        .then(({sound, response}) => {
            if (!response.ok) {
                //error in uploading sound
                dispatch(failureCreateSound(sound.message));
                return Promise.reject(sound);
            }
            else {
                dispatch(receiveCreateSound());
                History.push('/');
            }
        })
        .catch(err => console.log("Error: ", err));
};

/**
 * posts a comment added to the given sound
 * POST /sample/{id}/comment
 * @param {Object} payload - Object which contains id of sound and the comment itself
 * @param {string} token - JWT retrieved from localstorage
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const addComment = (payload, token) => dispatch => {

    dispatch(requestAddComment());

    if (!token) {
        console.log("No token, needs to be reauthenticated");
    }
    const endpoint = SOUND_ENDPOINT + '/' + payload.id + '/comment'
    let config = {
        method: "POST",
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'comment': payload.comment
        })
    };

    return fetch(endpoint, config)
        .then(response => response.json().then(sound => ({sound, response})))
        .then(({sound, response}) => {
            if (!response.ok) {
                //error in posting comment
                dispatch(failureAddComment(sound.message));
                return Promise.reject(sound);
            }
            else {
                dispatch(receiveAddComment(sound));
                dispatch(fetchComments(payload, token));
            }
        })
        .catch(err => console.log("Error: ", err));
};

/**
 * retrieves comments for a specific sound
 * GET /sample/{id}/comment
 * @param {Object} payload - Object which contains id of sound to retrieve comments for
 * @param {string} token - JWT retrieved from localstorage
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
export const fetchComments = (payload, token) => dispatch => {
    dispatch(requestGetComments());
    if (!token) {
        console.log("No token, cannot authenticate");
    }

    const endpoint = SOUND_ENDPOINT + '/' + payload.id + '/comment';
    let config = {
        headers: {
            'Authorization': token
        }
    };
    return fetch(endpoint, config)
        .then(response => response.json().then(comments => ({comments, response})))
        .then(({comments, response}) => {
            if (!response.ok) {
                dispatch(failureGetComments(comments.message));
                return Promise.reject(comments);
            }
            else {
                dispatch(receiveGetComments(comments));
            }
        })
        .catch(err => console.log("Error: ", err));
}

//actions for fetching sounds from the server
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
});

//actions for searching for sounds
export const requestSearchSounds = () => ({
    type: types.REQUEST_SEARCH_SOUNDS
});
export const receiveSearchSounds = sounds => ({
    type: types.RECEIVE_SEARCH_SOUNDS,
    payload: sounds
});
export const failureSearchSounds = message => ({
    type: types.FAILURE_SEARCH_SOUNDS,
    message
});

//actions for uploading a new sound to the server
export const requestCreateSound = () => ({
    type: types.REQUEST_CREATE_SOUND
});
export const receiveCreateSound = () => ({
    type: types.RECEIVE_CREATE_SOUND
});
export const failureCreateSound = message => ({
    type: types.FAILURE_CREATE_SOUND,
    message: message
});


//actions for adding a comment
export const requestAddComment = () => ({
    type: types.REQUEST_ADD_COMMENT
});
export const receiveAddComment = sound => ({
    type: types.RECEIVE_ADD_COMMENT,
    sound
});
export const failureAddComment = message => ({
    type: types.FAILURE_ADD_COMMENT,
    message
});

//actions for getting comments
export const requestGetComments = () => ({
    type: types.REQUEST_GET_COMMENTS
});
export const receiveGetComments = comments => ({
    type: types.RECEIVE_GET_COMMENTS,
    comments
});
export const failureGetComments = message => ({
    type: types.FAILURE_GET_COMMENTS,
    message
});

//other sound actions
export const clearLoadedSounds = () => ({
    type: types.CLEAR_LOADED_SOUNDS
});



