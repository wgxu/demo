import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from './token'
import accountReducer from "./account";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    account: accountReducer
  }
})

export default store