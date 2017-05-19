import React from 'react';
import { Entity } from 'aframe-react';
import { connect } from 'react-redux';


class StarsView extends React.Component {
  constructor(props) {
    super(props);

    // bind functions to component
    this.renderStars = this.renderStars.bind(this);

    // holds start positions
    this.positionArray = [];

    for (let i = 0; i < 100; i++) {
      const randomPosition = this.getRandomPosition(100, 500, -40, 40);

      if (randomPosition) {
        this.positionArray.push(randomPosition.x + ' ' +
          randomPosition.y + ' ' + randomPosition.z);
      }
    }
  }


  getRandomPosition(min, max) {
    let randomXPos = (Math.random() * (max - min)) + min;
    let randomYPos = (Math.random() * (max - min)) + min;
    let randomZPos = (Math.random() * (max - min)) + min;

    randomXPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    randomYPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    randomZPos *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    const randomPosition = {
      x: randomXPos,
      y: randomYPos,
      z: randomZPos,
    };

    return randomPosition;
  }


  /**
   * Renders the stars
   * @returns {Array<ReactElement>} An array of ReactElements
   */
  renderStars() {
    const stars = [];

    for (let i = 0; i < this.positionArray.length; i++) {
      stars.push(
        <Entity
          key={'star-' + i}
          geometry={{
            primitive: 'sphere',
            segmentsWidth: 8,
            segmentsHeight: 8,
          }}
          material={{
            color: '#fff',
          }}
          position={this.positionArray[i]}
        />
      );
    }

    return stars;
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const stars = this.renderStars();
    const className = 'component-stars-view';

    return (
      <Entity
        className={className}
      >
        {stars}
      </Entity>
    );
  }
}


/**
 * Expected propTypes
 * @prop {Object} appState - The state of the
 * StarsView component
 */
StarsView.propTypes = {
  appState: React.PropTypes.object.isRequired,
};


export default connect(({ appState }) =>
  ({ appState }))(StarsView);
