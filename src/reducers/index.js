import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import listContactReducer from "./listContactReducer";
import contactReducer from "./contactReducer";

export default combineReducers({
    list: listContactReducer,
    form: formReducer,
    contact: contactReducer
});
