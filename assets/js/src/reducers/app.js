import update from 'immutability-helper';
import objectAssign from 'object-assign';
import {
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

const initialState = {
  teams: {},
  selectedTeamId: null,
  selectedTeamPosition: null,
  selectedTeamStats: null,
  allTeamsTransitionedOut: false,
  instructionsViewed: false,
  instructionsButtonColor: '#0ba31c',
  inVRMode: false,
};


/**
 * creates a property on the teams object for a specific logo if it doesn't
 * already exist
 * @param {Object} state - The current state of the reducer
 * @param {String} id - The id of the logo
 * @returns {undefined} undefined
 */
function createTeamObject(state, id) {
  let nextState = state;

  if (!state.teams[id]) {
    const updatedState = update(state, {
      teams: { [id]: { $set: {
        nameTextTransitionedIn: false,
        selected: false,
        nameTextOpacity: 0,
        buttonColor: '#c83a06',
      } } },
    });

    nextState = objectAssign({}, state, updatedState);
  }

  return nextState;
}


export default function reducer(state = initialState, action = {}) {
  const updatedState = createTeamObject(state, action.id);
  let nextState;

  switch (action.type) {
    case NAME_TEXT_TRANSITIONED_IN:
      nextState = update(updatedState, {
        teams: { [action.id]: { $merge: { nameTextTransitionedIn: true } } },
      });

      return objectAssign({}, state, nextState);

    case NAME_TEXT_TRANSITIONED_OUT:
      nextState = update(updatedState, {
        teams: { [action.id]: { $merge: { nameTextTransitionedIn: false } } },
      });

      return objectAssign({}, state, nextState);

    case ALL_TEAMS_TRANSITIONED_OUT:
      return objectAssign({}, updatedState, {
        allTeamsTransitionedOut: true,
      });

    case ALL_TEAMS_TRANSITIONED_IN:
      Object.keys(updatedState.teams).forEach((key) => {
        const obj = updatedState.teams[key];

        const nextTeam = update(obj, {
          $merge: {
            nameTextTransitionedIn: false,
            selected: false,
            nameTextOpacity: 0,
            buttonColor: '#c83a06',
          },
        });

        return objectAssign({}, obj, nextTeam);
      });

      return objectAssign({}, updatedState, {
        allTeamsTransitionedOut: false,
      });

    case TEAM_SELECTED:
      nextState = update(updatedState, {
        teams: { [action.id]: { $merge: { selected: true, nameTextOpacity: 0 } } },
      });

      return objectAssign({}, updatedState,
        nextState,
        {
          selectedTeamId: action.id,
        });

    case TEAM_DESELECTED:
      nextState = update(updatedState, {
        teams: { [action.id]: { $merge: { selected: false } } },
      });

      return objectAssign({}, updatedState, nextState);

    case SELECTED_TEAM_STATS_CHANGED:
      return objectAssign({}, updatedState, {
        selectedTeamStats: action.stats,
      });

    case SELECTED_TEAM_POSITION_CHANGED:
      return objectAssign({}, updatedState, {
        selectedTeamPosition: action.position,
      });

    case INSTRUCTIONS_BUTTON_COLOR_CHANGED:
      return objectAssign({}, updatedState, {
        instructionsButtonColor: action.color,
      });

    case INSTRUCTIONS_VIEWED:
      return objectAssign({}, updatedState, {
        instructionsViewed: true,
      });

    case TEAM_BACK_BUTTON_COLOR_CHANGED:
      nextState = update(updatedState, {
        teams: { [action.id]: { $merge: { buttonColor: action.color } } },
      });

      return objectAssign({}, updatedState, nextState);

    case VR_MODE_ENTERED:
      return objectAssign({}, updatedState, {
        inVRMode: true,
      });

    case VR_MODE_EXITED:
      return objectAssign({}, updatedState, {
        inVRMode: false,
      });

    default:
      return state;
  }
}
