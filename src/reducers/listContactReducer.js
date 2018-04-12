import {
  LIST_CONTACTS,
  DELETE_CONTACT,
  CREATE_CONTACT
} from "../actions/actionTypes";

const initialState = {
  connections: [],
  nextPageToken: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_CONTACTS:
      return Object.assign({}, state, {
        connections: [...state.connections, ...action.payload.connections],
        nextPageToken: action.payload.nextPageToken,
      });
    case DELETE_CONTACT:
      // get the index of the resource name 
      let index = state.connections.findIndex(
        x => x.resourceName === action.payload
      );
      // remove the resource from our state
      let newarry = state.connections
        .slice(0, index)
        .concat(state.connections.slice(index + 1, state.connections.length));
      return Object.assign({}, state, {
        connections: newarry,
        nextPageToken: state.nextPageToken
      });
    case CREATE_CONTACT:
      return Object.assign({}, state, {
        connections: [...state.connections, ...action.payload],
        nextPageToken: state.nextPageToken,
      });
    default:
      return state;
  }
};
