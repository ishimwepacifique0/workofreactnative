import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  umuduguduEvents: [],
  isLoading: false,
  umuduguduEventAdded: false,
  eventRefresh: false,
};
import { getItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";

const umuduguduEventSlice = createSlice({
  name: "umuduguduEvents",
  initialState,
  reducers: {
    loadingTrue: (state) => {
      state.isLoading = true;
    },
    loadingFalse: (state) => {
      state.isLoading = false;
    },
    eventAdded: (state) => {
      state.eventRefresh = Math.random();
    },
    umuduguduEventAdded: (state) => {
      console.log(umuduguduEventAdded, '---------------------------------------------------------')
      state.umuduguduEventAdded = true;
    },
    getUmuduguduEvents: (state, action) => {
      state.umuduguduEvents = action.payload;
      state.isLoading = true;
    },
  },
});

export const AddUmuduguduEvent = (data) => async (dispatch) => {
  console.log(data)
  dispatch(loadingTrue());
  const token = await getItemAsync("token");
  console.log(token, "User token");
  try {
    const response = await axios({
      method: "post",
      url: "https://umudugudu-backend.onrender.com/api/event/create/umudugudu",
      data: data,
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    dispatch(umuduguduEventAdded());
    dispatch(eventAdded());
    dispatch(loadingFalse());
    alert("Igikorwa cyagiyemo neza");
  } catch (err) {
    dispatch(loadingFalse());
    alert("Uzuza ibisabwa neza");
    console.log(err, "error "); // log the error message
  }
};

export const { loadingTrue, loadingFalse, getUmuduguduEvents, umuduguduEventAdded, eventAdded } =
  umuduguduEventSlice.actions;

export default umuduguduEventSlice.reducer;
