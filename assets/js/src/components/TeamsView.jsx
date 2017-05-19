import React from 'react';
import { connect } from 'react-redux';
import { Entity } from 'aframe-react';
import TeamLogo from './TeamLogo.jsx';


class TeamsView extends React.Component {
  constructor(props) {
    super(props);

    // bind functions to component
    this.renderLogos = this.renderLogos.bind(this);
  }


  /**
   * Renders the current view
   * @returns {Array<ReactElement>} An array of ReactElements
   */
  renderLogos() {
    const data = this.props.data;
    const logos = [];

    for (let i = 0; i < data.length; i++) {
      logos.push(
        <TeamLogo
          data={data[i]}
          iteration={i}
          key={'logo-' + i}
          totalItems={data.length}
        />
      );
    }

    return logos;
  }


  /**
   * Renders component
   * @returns {ReactElement} ReactElement
   */
  render() {
    const logos = this.renderLogos();
    const className = 'component-teams-view';

    return (
      <Entity className={className}>
        {logos}
      </Entity>
    );
  }
}


/**
 * Expected propTypes
 * @prop {Array<Object>} data - An array of json objects
 */
TeamsView.propTypes = {
  data: React.PropTypes.array.isRequired,
};


export default connect(({ appState }) =>
  ({ appState }))(TeamsView);
