import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';
import actions from './../actions/actions';


class Instructions extends React.Component {
  constructor(props) {
    super(props);

    // if a click was fired
    this.clicked = false;

    // bind functions to component
    this.clickHandler = this.clickHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
  }


  /**
   * Mouse enter handler
   * @returns {undefined} undefined
   */
  mouseEnterHandler() {
    this.props.dispatch(actions.instructionsButtonColorChanged('#0ed324'));
  }


  /**
   * Mouse leave handler
   * @returns {undefined} undefined
   */
  mouseLeaveHandler() {
    this.props.dispatch(actions.instructionsButtonColorChanged('#0ba31c'));
  }


  /**
   * Click handler
   * @returns {undefined} undefined
   */
  clickHandler() {
    if (!this.clicked) {
      this.props.dispatch(actions.instructionsViewed());

      this.fireEventsTimeout = setTimeout(() => {
        this.clicked = false;
      }, 10);
    }
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const state = this.props.appState;
    const buttonColor = state.instructionsButtonColor;
    const className = 'component-instructions clickable';
    const instructionsText = state.inVRMode
      ? 'To click on objects and buttons, hover over them until you see the cursor change.'
      : 'Click on Team logos to see stats.';
    const textPosition = state.inVRMode
      ? '-.5'
      : '0';

    return (
      <Entity
        className={className}
        look-at='#camera'
        scale='0 0 0'
        animate-scale-in={!state.instructionsViewed}
        animate-scale-out={state.instructionsViewed}
        geometry={{
          primitive: 'plane',
          width: 10,
          height: 5,
        }}
        material={{
          color: '#ffffff',
          shader: 'flat',
        }}
        rotation='90 0 0'
        position='0 8 -10'
        events={{
          click: this.clickHandler,
          mouseenter: this.mouseEnterHandler,
          mouseleave: this.mouseLeaveHandler,
        }}
      >
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#000000',
            text: instructionsText,
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            lineHeight: 80,
            opacity: 1,
            width: 800,
          }}
          scale='1.5 1.5 1.5'
          position={`-3 ${textPosition} .1`}
        />
        <Entity
          geometry={{
            primitive: 'plane',
            width: 2,
            height: 1,
          }}
          material={{
            color: buttonColor,
            shader: 'flat',
          }}
          position='0 -1.5 .1'
        >
          <Entity
            bmfont-text={{
              align: 'center',
              color: '#ffffff',
              text: 'OK',
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
    );
  }
}


/**
 * Expected propTypes
 * @prop {Object} appState - The state of the
 * Instructions component
 * @prop {Function} dispatch - A function to dispatch actions to Redux store
 */
Instructions.propTypes = {
  appState: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
};


export default connect(({ appState }) =>
  ({ appState }))(Instructions);
