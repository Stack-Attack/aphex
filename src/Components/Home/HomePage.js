import React, { Component } from "react";
import Player from "./Player.js";
import ItemInfo from "./ItemInfo.js";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "./Player.css";
import { Button, Grid, Image } from "semantic-ui-react";

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
    addComment: PropTypes.func.isRequired,
    searchMode: PropTypes.bool.isRequired
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
        rect.top >= -50 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight + 100 ||
            document.documentElement.clientHeight + 100) /*or $(window).height() */ &&
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
    let content, bottomButton;
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

    if (!this.props.searchMode) {
      //not displaying search results
      bottomButton = (
        <Button
          primary
          onClick={() =>
            this.props.loadAdditionalSounds(this.props.loadedSounds.length)
          }
        >
          Load more sounds
        </Button>
      );
    } else {
      bottomButton = (
        <Button onClick={() => this.props.refreshTimeline()}>
          Return to home
        </Button>
      );
    }

    return (
      <div>
        <div className="left-pane">
          <ul className="ul-padding">
            <li>
              <Grid celled="interally" className="Player">
                <Grid.Column width={4} verticalAlign={"middle"}>
                  <Grid centered>
                    <Grid.Row className="artistRow">
                      <p className="Author">
                        {" "}
                        {this.props.userInfo.user.email.substring(
                          0,
                          this.props.userInfo.user.email.indexOf("@")
                        )}{" "}
                      </p>
                    </Grid.Row>

                    <Grid.Row className="imageRow">
                      <Image
                        className="songImage"
                        src={
                          "https://syro.dannykivi.com" +
                          this.props.userInfo.user.picture.path
                        }
                      />
                    </Grid.Row>

                    <Grid.Row className="titleRow">
                      <p className="placeholder">track name</p>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>

                <Grid.Column
                  width={10}
                  className={"noLeftRightPadding noBorder"}
                >
                  <img
                    src={require("../../Assets/share_waveform.svg")}
                    className={"wavey"}
                  />
                  <div className={"Waveform"} />
                </Grid.Column>
                <Grid.Column
                  width={2}
                  className={"noBorder"}
                  verticalAlign={"middle"}
                >
                  <div className="Controls">
                    <Link to="/upload">
                      <img className={"PlayerUploadButton"} src={require("../../Assets/upload_play_button.svg")} onClick={() => this.props.resetControls} />
                    </Link>
                  </div>
                </Grid.Column>
              </Grid>
            </li>
            {content}
          </ul>
          <div>{bottomButton}</div>
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
