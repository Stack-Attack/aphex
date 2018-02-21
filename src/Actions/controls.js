//Actions for the Controls Reducer

export const playPressed = (id) => (dispatch, getState) => {
    let isPlaying = getState().controls.playing;
    let activeID = getState().controls.activeID;

    if (activeID != id) {
        dispatch(playSound(id));
    }
    else {
        if (!isPlaying) {
            dispatch(playSound(id));
        }
        else {
            dispatch(pauseSound(id));
        }
    }
}

export const playSound = (id) => ({
    type: 'PLAY_SOUND',
    id
})

export const pauseSound = (id) => ({
    type: 'PAUSE_SOUND',
    id
})


export const adjustFocus = (inFocus) => ({
    type: 'ADJUST_FOCUS',
    inFocus
})