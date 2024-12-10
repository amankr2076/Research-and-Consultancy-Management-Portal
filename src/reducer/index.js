import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authslice";
import profileReducer from "../slices/profileSlice";
import navReducer from "../slices/nav";


const rootReducer=combineReducers({
    auth: authReducer,
    profile: profileReducer,
    nav : navReducer,
})

export default rootReducer;