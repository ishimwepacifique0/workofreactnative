import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isiboEvents: [],
  isLoading: false,
  isiboEventAdded: false,
  eventRefresh: false,
};
import { getItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";


const isiboEventSlice = createSlice({
  name: "isiboEvents",
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
    isiboEventAdded: (state) => {
      state.isiboEventAdded = true;
    },
    getIsiboEvents: (state, action) => {
      state.isiboEvents = action.payload;
      state.isLoading = true
    },
  },
});

export const AddIsiboEvent = (data) => async (dispatch) => {
  dispatch(loadingTrue());
  const token = await getItemAsync("token");
  console.log(token, "User token")
  try {
    const response = await axios({
      method: "post",
      url: "https://umudugudu-backend.onrender.com/api/event/create/isibo",
      data: data,
      headers: {
        token: `Bearer ${token}`,
      },
    })
    console.log(response.data.data);
    dispatch(loadingFalse());
    dispatch(isiboEventAdded());
    dispatch(eventAdded());
    alert("Gushyiramo igikorwa byagenze neza")
    dispatch(GetIsiboEvents())
  } catch (err) {
    dispatch(loadingFalse());
    console.log(err, "error---------- "); // log the error message
    alert('Gukora igikorwa ntabwo bikunze')
  }
};

export const GetIsiboEvents = () => async (dispatch) => {
  dispatch(loadingTrue());
  const token = await getItemAsync("token");
  console.log(token, "User token")
  try {
    const response = await axios({
      method: "get",
      url: "https://umudugudu-backend.onrender.com/api/event/get/isibo",
      headers: {
        token: `Bearer ${token}`,
      },
    })
    console.log(response.data.data);
    dispatch(loadingFalse());
    dispatch(getIsiboEvents(response.data.data));
  } catch (err) {
    dispatch(loadingFalse());
    console.log(err, "error "); // log the error message
  }
};

export const { loadingTrue, loadingFalse, getIsiboEvents, isiboEventAdded, eventAdded } = isiboEventSlice.actions;

export default isiboEventSlice.reducer;





export const LoginUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://umudugudu-backend.onrender.com/api/user/login",
      data
    );
    console.log(response.data.data);

    dispatch(login(response.data.data));
    await setItemAsync("logindata", JSON.stringify(response.data.data));
    dispatch(tokenStore(response.data.token));
    await setItemAsync("token", JSON.stringify(response.data.token));
  } catch (err) {
    console.log(err, "error "); // log the error message
    // or dispatch an action to update the Redux store with the error message
    // dispatch({ type: "LOGIN_ERROR", payload: err.message });
  }
};