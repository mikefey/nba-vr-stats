import 'aframe';
import 'aframe-look-at-component';
import 'aframe-bmfont-text-component';
import 'aframe-animation-component';
import 'aframe-mouse-cursor-component';
import 'whatwg-fetch';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import { connect } from 'react-redux';
import './../aframe-components/animate-scale-out';
import './../aframe-components/animate-scale-in';
import Instructions from './Instructions.jsx';
import StarsView from './StarsView.jsx';
import TeamsView from './TeamsView.jsx';
import StatsView from './StatsView.jsx';
import LoaderView from './LoaderView.jsx';
import actions from '../actions/actions';


class App extends React.Component {
  constructor(props) {
    super(props);

    // bind functions to component
    this.renderCamera = this.renderCamera.bind(this);
    this.renderTeamAssets = this.renderTeamAssets.bind(this);
    this.renderStatsView = this.renderStatsView.bind(this);
    this.onVREntered = this.onVREntered.bind(this);
    this.onVRExited = this.onVRExited.bind(this);
  }


  /**
   * Add VR Event listeners when component mounts
   * @returns {undefined} undefined
   */
  componentDidMount() {
    document.querySelector('a-scene').addEventListener('enter-vr', this.onVREntered);
    document.querySelector('a-scene').addEventListener('exit-vr', this.onVRExited);
  }


  /**
   * Handler for VR mode entered
   * @returns {undefined} undefined
   */
  onVREntered() {
    const state = this.props.appState;

    if (!state.inVRMode) {
      this.props.dispatch(actions.vrModeEntered());
    }
  }


  /**
   * Handler for VR mode exited
   * @returns {undefined} undefined
   */
  onVRExited() {
    const state = this.props.appState;

    if (state.inVRMode) {
      this.props.dispatch(actions.vrModeExited());
    }
  }


  /**
   * Renders stats view
   * @returns {ReactElement} A ReactElement
   */
  renderStatsView() {
    const state = this.props.appState;
    let element;

    if (state.selectedTeamStats) {
      element = (
        <StatsView
          position={state.selectedTeamPosition}
          data={state.selectedTeamStats}
        />
      );
    }

    return element;
  }


  /**
   * Renders stats view
   * @returns {ReactElement} A ReactElement
   */
  renderLoaderView() {
    const state = this.props.appState;
    let element;

    if (state.selectedTeamPosition && !state.selectedTeamStats) {
      element = (
        <LoaderView position={state.selectedTeamPosition} />
      );
    }

    return element;
  }


  /**
   * Renders the team assets
   * @returns {Array<ReactElement>} An array of ReactElements
   */
  renderTeamAssets() {
    const data = this.props.data;
    const assets = [];

    for (let i = 0; i < data.teams.length; i++) {
      assets.push(
        <img
          alt={data.teams[i].teamId}
          crossOrigin='anonymous'
          id={data.teams[i].abbreviation}
          key={'image-asset-' + i}
          src={data.teams[i].logo}
        />
      );
    }

    return assets;
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  renderCamera() {
    let camera;
    const state = this.props.appState;

    if (state.inVRMode) {
      camera = (
        <Entity
          id='camera'
          camera
          look-controls
          position='0 0 0'
        >
          <Entity
            raycaster={{
              objects: '.clickable',
              far: 100,
            }}
            position='0 0 -3'
            geometry={{
              primitive: 'ring',
              radiusOuter: 0.05,
              radiusInner: 0.03,
            }}
            material={{
              color: '#a917b4',
              shader: 'flat',
            }}
            cursor={{
              fuse: 'true',
              fuseTimeout: 1000,
            }}
          >
            <a-animation
              begin='click'
              easing='ease-out'
              attribute='scale'
              fill='forwards'
              to='1 1 1'
              dur='100'
            />
            <a-animation
              begin='click'
              easing='ease-out'
              attribute='material.color'
              fill='forwards'
              to='#00ff00'
              dur='100'
            />
            <a-animation
              begin='mouseleave'
              easing='ease-out'
              attribute='scale'
              fill='forwards'
              to='1 1 1'
              dur='100'
            />
            <a-animation
              begin='mouseleave'
              easing='ease-out'
              attribute='material.color'
              fill='forwards'
              to='#a917b4'
              dur='100'
            />
            <a-animation
              begin='cursor-fusing'
              easing='ease-in'
              attribute='scale'
              fill='forwards'
              to='0.1 0.1 0.1'
              dur='1000'
            />
          </Entity>
        </Entity>
      );
    } else {
      camera = (
        <Entity
          id='camera'
          camera
          look-controls
          wasd-controls
          mouse-cursor
          position='0 0 0'
        />
      );
    }

    return camera;
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const camera = this.renderCamera();
    const teamAssets = this.renderTeamAssets();
    const statsView = this.renderStatsView();
    const loaderView = this.renderLoaderView();
    const state = this.props.appState;
    const data = this.props.data;
    const messsageTextShownClass = state.messageTextShown ?
      ' message-text-shown' : '';
    const messsageTextTransitionedInClass = state.nameTextTransitionedIn ?
      ' message-text-transitioned-in' : '';
    const className = 'component-app' +
      messsageTextShownClass +
      messsageTextTransitionedInClass;

    return (
      <div className={className}>
        <Scene
          fog={{
            type: 'linear',
            color: '#000',
            far: 10000,
            near: 8000,
          }}
          vr-mode-ui={{
            enabled: true,
          }}
        >
          <a-assets>
            <img
              alt='space'
              src={data.config.skyTexture}
              id='space'
              crossOrigin='anonymous'
            />
            {teamAssets}
          </a-assets>
          <Entity
            light={{
              color: '#ffffff',
              type: 'ambient',
              intensity: 0.9,
            }}
          />
          <Entity
            position='0 5 0'
          >
            {camera}
          </Entity>
          <a-sky
            src='#space'
            radius={10000}
          />
          <StarsView />
          <TeamsView
            data={data.teams}
          />
          {loaderView}
          {statsView}
          <Instructions />
        </Scene>
      </div>
    );
  }
}


/**
 * Expected propTypes
 * @prop {String} apiUrl- The base url of the api
 * @prop {Object} appState - The state of the
 * App component
 * @prop {Array<Object>} data - An array of json objects
 * @prop {Function} dispatch - A function to dispatch actions to Redux store
 */
App.propTypes = {
  appState: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
};


export default connect(({ appState }) =>
  ({ appState }))(App);
