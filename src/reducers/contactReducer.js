import { LOAD_CONTACT } from "../actions/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_CONTACT:
            return action.payload;
        default:
            return state;
    }
};
