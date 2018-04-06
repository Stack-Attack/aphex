import React, { Component } from "react";
import Player from "./Player.js";
import ItemInfo from "./ItemInfo.js";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

/*
    Presentational component for the 'Home' Page. Handles all of the audio selection and playback of sounds.
    Works in conjunction with the ../Containers/HomeContainer.js to get the state via props, and to send
    action dispatches via prop methods.
 */

class Home extends Component {
  constructor(props) {
    super(props);
    this.detectViewPort = this.detectViewPort.bind(this);
  }

  static propTypes = {
    activeID: PropTypes.string,
    activeInfo: PropTypes.object,
    loadedSounds: PropTypes.array.isRequired,
    playerToggle: PropTypes.func.isRequired,
    infoControlPlayToggle: PropTypes.func.isRequired,
    refreshTimeline: PropTypes.func.isRequired,
    loadAdditionalSounds: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired,
    loop: PropTypes.bool.isRequired,
    activeSeek: PropTypes.number.isRequired,
    resetControls: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener("scroll", this.detectViewPort);
    this.props.resetControls();
    this.props.refreshTimeline();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.detectViewPort);
  }

  detectViewPort() {
    //checks if the current playing element is out of the viewport. Send a focus event accordingly.
    if (this.props.activeID != null) {
      let currentElement = document.getElementById(
        "entry_" + this.props.activeID
      );
      let rect = currentElement.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight ||
            document.documentElement.clientHeight) /*or $(window).height() */ &&
        rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
      ) {
        this.props.adjustFocus(true);
      } else {
        this.props.adjustFocus(false);
      }
    }
  }

  render() {
    let content;
    //display loaded sounds from the server if there are any
    if (this.props.loadedSounds.length > 0) {
      content = this.props.loadedSounds.map(entry => {
        return (
          <li key={entry._id} id={"entry_" + entry._id}>
            <Player
              title={entry.name}
              user={entry.user.email}
              image={entry.user.picture.path}
              file={entry.file.path}
              playing={this.props.playing && this.props.activeID == entry._id}
              loop={this.props.loop}
              onToggle={() => this.props.playerToggle(entry)}
              onPlay={pos => this.onPlayerStart(pos)}
              onEnd={() => this.onPlayerEnd()}
              onLoad={dur => this.playerLoaded(dur)}
              setSeekPos={pos => this.props.setSeekPos(pos)}
              type={entry.type}
            />
          </li>
        );
      });
    } else {
      content = "Loading sounds...";
    }
    return (
      <div>
        <div className="left-pane">
          <ul className="ul-padding">{content}</ul>
          <div>
            <Button
              primary
              onClick={() =>
                this.props.loadAdditionalSounds(this.props.loadedSounds.length)
              }
            >
              Load more sounds
            </Button>
          </div>
        </div>
        <div className="right-pane">
          <ItemInfo
            onToggle={entry => this.props.infoControlPlayToggle(entry)}
            playing={this.props.playing}
            data={this.props.activeInfo}
            displayControls={!this.props.playerInFocus}
            submitComment={data => this.props.addComment(data)}
          />
        </div>
      </div>
    );
  }

  //we may not even end up needed the below functions
  onPlayerStart(pos) {}

  onPlayerEnd() {}

  playerLoaded(dur) {}

  handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.setState({
        message: "bottom reached"
      });
    } else {
      this.setState({
        message: "not at bottom"
      });
    }
  }
}

export default Home;
