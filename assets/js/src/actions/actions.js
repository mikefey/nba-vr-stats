import dataFormatter from './../data/data-formatter';
import {
  API_ENDPOINT,
  NAME_TEXT_TRANSITIONED_IN,
  NAME_TEXT_TRANSITIONED_OUT,
  ALL_TEAMS_TRANSITIONED_OUT,
  ALL_TEAMS_TRANSITIONED_IN,
  TEAM_SELECTED,
  TEAM_DESELECTED,
  SELECTED_TEAM_STATS_CHANGED,
  SELECTED_TEAM_POSITION_CHANGED,
  INSTRUCTIONS_BUTTON_COLOR_CHANGED,
  INSTRUCTIONS_VIEWED,
  TEAM_BACK_BUTTON_COLOR_CHANGED,
  VR_MODE_ENTERED,
  VR_MODE_EXITED,
} from './../constants/app-constants';

const actions = {
  /**
   * Creates an event for the message text being transitioned in
   * @param {String} id - The id of the active object
   * @returns {Object} an event object with a payload
   */
  nameTextTransitionedIn(id) {
    return (dispatch) => {
      dispatch({
        type: NAME_TEXT_TRANSITIONED_IN,
        id,
      });
    };
  },


  /**
   * Creates an event for the message text being transitioned in
   * @param {String} id - The id of the active object
   * @returns {Object} an event object with a payload
   */
  nameTextTransitionedOut(id) {
    return (dispatch) => {
      dispatch({
        type: NAME_TEXT_TRANSITIONED_OUT,
        id,
      });
    };
  },


  /**
   * Creates an event for all logos being transitioned out
   * @returns {Object} an event object with a payload
   */
  allTeamsTransitionedOut() {
    return (dispatch) => {
      dispatch({
        type: ALL_TEAMS_TRANSITIONED_OUT,
      });
    };
  },


  /**
   * Creates an event for all logos being transitioned in
   * @returns {Object} an event object with a payload
   */
  allTeamsTransitionedIn() {
    return (dispatch) => {
      dispatch({
        type: ALL_TEAMS_TRANSITIONED_IN,
      });
    };
  },


  /**
   * Creates an event for a logo being selected
   * @param {String} id - The id of the active object
   * @returns {Object} an event object with a payload
   */
  teamSelected(id) {
    return (dispatch) => {
      dispatch({
        type: TEAM_SELECTED,
        id,
      });

      if (!id) {
        dispatch({
          type: SELECTED_TEAM_STATS_CHANGED,
          stats: null,
        });
      } else {
        const endpoint = API_ENDPOINT + id + '/stats';

        window.fetch(endpoint)
        .then((response) => {
          return response.json();
        }).then((json) => {
          const formattedData = dataFormatter.getWinsLossesAndConferenceRank(json);

          dispatch({
            type: SELECTED_TEAM_STATS_CHANGED,
            stats: formattedData,
          });
        }).catch((error) => {
          console.log('parsing failed', error);
        });
      }
    };
  },


  /**
   * Creates an event for a logo being de-selected
   * @param {String} id - The id of the active object
   * @returns {Object} an event object with a payload
   */
  teamDeselected(id) {
    return (dispatch) => {
      dispatch({
        type: TEAM_DESELECTED,
        id,
      });
    };
  },


  /**
   * Creates an event for a logo being de-selected
   * @param {Object} stats - A json object holding team stats
   * @returns {Object} an event object with a payload
   */
  selectedTeamStatsChanged(stats) {
    return (dispatch) => {
      dispatch({
        type: SELECTED_TEAM_STATS_CHANGED,
        stats,
      });
    };
  },


  /**
   * Creates an event for a logo being de-selected
   * @param {String} position - A string representation of a position vector
   * @returns {Object} an event object with a payload
   */
  selectedTeamPositionChanged(position) {
    return (dispatch) => {
      dispatch({
        type: SELECTED_TEAM_POSITION_CHANGED,
        position,
      });
    };
  },


  /**
   * Creates an event for the intro button color being changed
   * @param {String} color - The button color
   * @returns {Object} an event object with a payload
   */
  instructionsButtonColorChanged(color) {
    return (dispatch) => {
      dispatch({
        type: INSTRUCTIONS_BUTTON_COLOR_CHANGED,
        color,
      });
    };
  },


  /**
   * Creates an event for the intro being viewed
   * @returns {Object} an event object with a payload
   */
  instructionsViewed() {
    return (dispatch) => {
      dispatch({
        type: INSTRUCTIONS_VIEWED,
      });
    };
  },


  /**
   * Creates an event for a team back button color being changed
   * @param {String} id - The id of the active object
   * @param {String} color - The button color
   * @returns {Object} an event object with a payload
   */
  teamBackButtonColorChanged(id, color) {
    return (dispatch) => {
      dispatch({
        type: TEAM_BACK_BUTTON_COLOR_CHANGED,
        id,
        color,
      });
    };
  },


  /**
   * Creates an event for when VR mode is entered
   * @returns {Object} an event object with a payload
   */
  vrModeEntered() {
    return (dispatch) => {
      dispatch({
        type: VR_MODE_ENTERED,
      });
    };
  },


  /**
   * Creates an event for when VR mode is exited
   * @returns {Object} an event object with a payload
   */
  vrModeExited() {
    return (dispatch) => {
      dispatch({
        type: VR_MODE_EXITED,
      });
    };
  },
};


export default actions;
