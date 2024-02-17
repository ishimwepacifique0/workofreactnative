import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import umuduguduEventReducer from "../features/umuduguduevents"
import isiboEventReducer from "../features/isiboEvents";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    umuduguduEvent: umuduguduEventReducer,
    isiboEvent: isiboEventReducer,
  },
});
