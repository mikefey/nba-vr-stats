import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';


class StatsView extends React.Component {
  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const data = this.props.data;
    const state = this.props.appState;
    const className = 'component-stats-view';

    return (
      <Entity
        className={className}
        position={this.props.position}
        look-at='#camera'
        scale='0 0 0'
        animate-scale-in={state.allTeamsTransitionedOut}
        animate-scale-out={!state.allTeamsTransitionedOut}
      >
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: 'WINS',
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-22 -6 0'
        />
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: data.wins,
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-22 -8.5 0'
        />
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: 'LOSSES',
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-14 -6 0'
        />
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: data.losses,
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-14 -8.5 0'
        />
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: 'CONFERENCE RANK',
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-2.5 -6 0'
        />
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#ffffff',
            text: data.conferenceRank,
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-2.5 -8.5 0'
        />
      </Entity>
    );
  }
}


/**
 * Expected propTypes
 * @prop {Object} appState - The state of the
 * StatsView component
 * @prop {Array<Object>} data - An array of json objects
 * @prop {String} position - A string representation of the position vector
 * for this component
 */
StatsView.propTypes = {
  appState: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  position: React.PropTypes.string,
};


export default connect(({ appState }) =>
  ({ appState }))(StatsView);
