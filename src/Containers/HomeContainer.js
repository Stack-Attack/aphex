import {connect} from 'react-redux';
import {adjustFocus, playPressed, fetchSounds} from "../Actions/index";

import HomePage from '../Components/Home/HomePage';


const mapStateToProps = state => ({
    loadedSounds: state.sounds.loadedSounds,
    loop: state.controls.looping,
    activeID: state.controls.activeID,
    playing: state.controls.playing,
    activeInfo: state.sounds.loadedSounds.find((sound) => {
        return sound.id === state.controls.activeID
    }),
    playerInFocus: state.controls.playerInFocus
})

const mapDispatchToProps = dispatch => ({
    playerToggle: (entry) => {
        dispatch(adjustFocus(true))
        dispatch(playPressed(entry.id))
    },

    infoControlPlayToggle: (entry) => {
        dispatch(playPressed(entry.id))
    },

    adjustFocus: (isInFocus) => {
        dispatch(adjustFocus(isInFocus))
    },

    loadSounds: () => {
        dispatch(fetchSounds());
    }

})

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

export default HomeContainer;

