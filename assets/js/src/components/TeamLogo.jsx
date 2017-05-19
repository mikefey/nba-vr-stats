import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';
import actions from './../actions/actions';


class TeamLogo extends React.Component {
  constructor(props) {
    super(props);

    // if a click was fired
    this.clicked = false;

    // if the text has been animated in
    this.textAnimatedIn = false;

    // bind functions to component
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.backButtonMouseEnterHandler = this.backButtonMouseEnterHandler.bind(this);
    this.backButtonMouseLeaveHandler = this.backButtonMouseLeaveHandler.bind(this);
    this.backButtonClickHandler = this.backButtonClickHandler.bind(this);
    this.getSpherePosition = this.getSpherePosition.bind(this);
    this.getCirclePosition = this.getCirclePosition.bind(this);
  }


  /**
   * Mouse enter handler
   * @returns {undefined} undefined
   */
  mouseEnterHandler() {
    const data = this.props.data;
    const state = this.props.appState;

    if (data.teamId &&
      (!state.teams[data.teamId] || !state.teams[data.teamId].nameTextTransitionedIn)) {
      this.props.dispatch(actions.nameTextTransitionedIn(data.teamId));
    }
  }


  /**
   * Mouse leave handler
   * @returns {undefined} undefined
   */
  mouseLeaveHandler() {
    const data = this.props.data;
    const state = this.props.appState;

    if (data.teamId &&
      state.teams[data.teamId] &&
      state.teams[data.teamId].nameTextTransitionedIn) {
      this.props.dispatch(actions.nameTextTransitionedOut(data.teamId));
    }
  }


  /**
   * Click handler
   * @returns {undefined} undefined
   */
  clickHandler() {
    if (!this.clicked) {
      const data = this.props.data;

      this.clicked = true;
      this.props.dispatch(actions.teamSelected(data.teamId));
      this.props.dispatch(actions.selectedTeamPositionChanged(this.position));
      this.props.dispatch(actions.allTeamsTransitionedOut());
    }
  }


  /**
   * Mouse enter handler
   * @returns {undefined} undefined
   */
  backButtonMouseEnterHandler() {
    const data = this.props.data;
    const state = this.props.appState;

    if (state.teams[data.teamId] &&
      state.teams[data.teamId].buttonColor !== '#f8551a') {
      this.props.dispatch(actions.teamBackButtonColorChanged(data.teamId, '#f8551a'));
    }
  }


  /**
   * Mouse leave handler for the back button
   * @returns {undefined} undefined
   */
  backButtonMouseLeaveHandler() {
    const data = this.props.data;
    const state = this.props.appState;

    if (state.teams[data.teamId] &&
      state.teams[data.teamId].buttonColor !== '#c83a06') {
      this.props.dispatch(actions.teamBackButtonColorChanged(data.teamId, '#c83a06'));
    }
  }


  /**
   * Click handler
   * @returns {undefined} undefined
   */
  backButtonClickHandler() {
    const data = this.props.data;

    this.props.dispatch(actions.teamDeselected(data.teamId));
    this.props.dispatch(actions.teamSelected(null));
    this.props.dispatch(actions.selectedTeamPositionChanged(null));
    this.props.dispatch(actions.allTeamsTransitionedIn());

    setTimeout(() => {
      this.clicked = false;
    }, 100);
  }


  /**
   * Generates position for item in a circle arrangement
   * @returns {String} A string representation of a position vector
   */
  getCirclePosition() {
    const circleRadius = 40;
    const centerX = 0;
    const centerZ = 0;
    const mpi = Math.PI / 180;
    const incrementAngle = 360 / this.props.totalItems;
    const incrementRadians = incrementAngle * mpi;
    const startRadians = this.props.iteration * incrementRadians;
    const zPos = Math.round(centerX + (Math.sin(startRadians) * circleRadius));
    const xPos = Math.round(centerZ + (Math.cos(startRadians) * circleRadius));

    return xPos + ' 4 ' + zPos;
  }


  /**
   * Generates position for item in a sphere arrangement
   * @returns {String} A string representation of a position vector
   */
  getSpherePosition() {
    const scale = 35;
    const inc = Math.PI * (3 - Math.sqrt(5));
    const off = 2.0 / this.props.totalItems;
    let xPos;
    let yPos;
    let zPos;
    const phi = this.props.iteration * inc;

    yPos = ((this.props.iteration * off) - 1) + (off / 2);
    const r = Math.sqrt(1 - (yPos * yPos));

    xPos = Math.cos(phi) * r;
    zPos = Math.sin(phi) * r;

    xPos *= scale;
    yPos *= scale;
    zPos *= scale;

    return xPos + ' ' + yPos + ' ' + zPos;
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const data = this.props.data;
    const state = this.props.appState;
    const className = 'component-team-logo clickable';
    let textOpacity = 0;
    let transitionOutActive = false;
    let buttonColor = '#c83a06';
    let backButtonVisible = false;

    this.position = this.getSpherePosition();

    if (state.teams[data.teamId]) {
      textOpacity = state.teams[data.teamId].nameTextTransitionedIn ? 1 : 0;
    }

    if (state.teams[data.teamId] &&
      state.teams[data.teamId] &&
      state.teams[data.teamId].selected) {
      textOpacity = 1;
      backButtonVisible = true;
    }

    if (state.teams[data.teamId] && state.teams[data.teamId].buttonColor) {
      buttonColor = state.teams[data.teamId].buttonColor;
    }

    if (state.allTeamsTransitionedOut) {
      if ((state.teams[data.teamId] && !state.teams[data.teamId].selected) ||
        !state.teams[data.teamId]) {
        transitionOutActive = true;
      }
    }

    return (
      <Entity
        events={{
          click: this.clickHandler,
          mouseenter: this.mouseEnterHandler,
          mouseleave: this.mouseLeaveHandler,
        }}
        className={className}
        scale='0 0 0'
        animate-scale-in={state.instructionsViewed}
        position={this.position}
        look-at='#camera'
      >
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: data.teamName.toUpperCase(),
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: textOpacity,
            width: 800,
          }}
          scale='5 5 5'
          position='-10 4 0'
        />
        <Entity
          geometry={{
            primitive: 'plane',
            width: 5,
            height: 5,
          }}
          material={{
            src: '#' + data.abbreviation,
            transparent: true,
          }}
          scale='1 1 1'
          animate-scale-out={transitionOutActive}
          animate-scale-in={!transitionOutActive}
        >
          <Entity
            className='clickable'
            events={{
              click: this.backButtonClickHandler,
              mouseenter: this.backButtonMouseEnterHandler,
              mouseleave: this.backButtonMouseLeaveHandler,
            }}
            geometry={{
              primitive: 'plane',
              width: 2,
              height: 1,
            }}
            material={{
              color: buttonColor,
              shader: 'flat',
            }}
            position='0 -13 .1'
            scale='3 3 3'
            visible={backButtonVisible}
          >
            <Entity
              bmfont-text={{
                align: 'center',
                color: '#ffffff',
                text: 'BACK',
                fnt: 'assets/fonts/Share-Bold-webfont.fnt',
                fntImage: 'assets/fonts/Share-Bold-webfont.png',
                lineHeight: 80,
                opacity: 1,
                width: 800,
              }}
              scale='1.5 1.5 1.5'
              position='-3 -.2 .1'
            />
          </Entity>
        </Entity>
      </Entity>
    );
  }
}


/**
 * Expected propTypes
 * @prop {Object} appState - The state of the
 * TeamLogo component
 * @prop {Array<Object>} data - An array of json objects
 * @prop {Function} dispatch - A function to dispatch actions to Redux store
 * @prop {Number} iteration - The iteration of the component
 * @prop {Number} totalItems - The total number of items
 */
TeamLogo.propTypes = {
  appState: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
  iteration: React.PropTypes.number,
  totalItems: React.PropTypes.number,
};


export default connect(({ appState }) =>
  ({ appState }))(TeamLogo);
