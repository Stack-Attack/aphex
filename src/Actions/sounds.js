import sounds from '../api/sounds';

//Actions for the Sounds Reducer

export const fetchSounds = () => dispatch => {
    dispatch(requestSounds());

    //TODO: replace this with fetchSounds. it will then dispatch receiveSounds
    sounds.getSounds(sounds => {
        dispatch(receiveSounds(sounds))
    })

    // return fetch('http request with ' + num + 'as parameter')
    //     .then(response => response.json())
    //     .then(json => dispatch(receiveSounds(json)));
}

export const uploadSound = (file, tokenFromStorage)=> dispatch => {
    console.log(file);

    if(!tokenFromStorage){
        console.log("won't work")
    }

    //TODO: complete implementation of uploading sound. unclear if we want to
    let config = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ${tokenFromStorage}',
            'Content-Type': 'Possibly define content type'
        },
        body: file
    }


}





export const receiveSounds = sounds => ({
    //action for when we receive new sounds from the server.
    //'sounds' should be an array of sound objects from the server
    type: 'RECEIVE_SOUNDS',
    sounds
})

export const requestSounds = (num) => ({
    //request sounds from the server
    type: 'REQUEST_SOUNDS'
})