import { connect } from "react-redux";
import { adjustFocus, playPressed } from "../Actions/controls";
import { fetchSounds } from "../Actions/sounds";
import HomePage from "../Components/Home/HomePage";

/**
 * HomeContainer is the corresponding container for our home page component, at ../Components/Home/HomePage.js. This file handles only Redux state operations, and then connects it to HomePage.js, which handles all presentational functionality (ie, how the page looks).
 */

/**
 * mapStateToProps takes our current Redux state and maps each relevant piece of the state to a prop in this component which can be interacted with and passed to child components. This way, HomePage.js exists with no knowledge of the Redux state; it simply passes everything via props to this container.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
const mapStateToProps = state => ({
  loadedSounds: state.sounds.loadedSounds,
  loop: state.controls.looping,
  activeID: state.controls.activeID,
  playing: state.controls.playing,
  activeInfo: state.sounds.loadedSounds.find(sound => {
    return sound.id === state.controls.activeID;
  }),
  playerInFocus: state.controls.playerInFocus
});

/**
 * mapDispatch to props defines a series of methods that can be called from HomePage.js, passed to that file via props. Each method maps to a Redux action dispatch, which will modify the state accordingly. Similarly to mapStateToProps, this allows HomePage.js to fire actions with no knowledge of the global state.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */
const mapDispatchToProps = dispatch => ({
  playerToggle: entry => {
    dispatch(adjustFocus(true));
    dispatch(playPressed(entry.id));
  },
  infoControlPlayToggle: entry => {
    dispatch(playPressed(entry.id));
  },
  adjustFocus: isInFocus => {
    dispatch(adjustFocus(isInFocus));
  },
  loadSounds: () => {
    dispatch(fetchSounds());
  }
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomeContainer;
