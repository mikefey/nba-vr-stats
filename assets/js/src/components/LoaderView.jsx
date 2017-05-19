import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';


class LoaderView extends React.Component {
  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const className = 'component-loader-view';

    return (
      <Entity
        className={className}
        position={this.props.position}
        look-at='#camera'
      >
        <Entity
          bmfont-text={{
            align: 'center',
            color: '#666',
            text: 'LOADING',
            fnt: 'assets/fonts/Share-Bold-webfont.fnt',
            fntImage: 'assets/fonts/Share-Bold-webfont.png',
            opacity: 1,
            width: 800,
          }}
          scale='5 5 5'
          position='-10 -7 0'
        />
      </Entity>
    );
  }
}


/**
 * Expected propTypes
 * @prop {String} position - A string representation of the position vector
 * for this component
 */
LoaderView.propTypes = {
  position: React.PropTypes.string,
};


export default connect(({ appState }) =>
  ({ appState }))(LoaderView);
