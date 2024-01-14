import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AssessmentSlice from "./Assessment/Assessment.slice";


const rootReducer = combineReducers({
  assessment: AssessmentSlice
})

const store = configureStore({
  reducer: rootReducer
})

export type ReduxRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;