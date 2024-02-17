import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userData: {},
  isloggedIn: false,
  isLoading: false,
  token: "",
  userEdited: false,
};
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { deleteItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";


const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading=true
    },
    endLoading: (state, action) => {
      state.isLoading= false
      state.error = action.payload
    },
    login: (state, action) => {
      state.userData = action.payload
      state.isloggedIn = true
      state.isLoading = true
    },
    logout: (state) => {
      state.userData = null;
      state.isloggedIn = false;
      state.token = ''
  },
  tokenStore: (state, action) => {
    state.token = action.payload;
  },
  editUser: (state) => {
    console.log("HAhahahahah")
    state.userEdited = true
  },
  resetEditProfile: (state) => {
    state.userEdited = false
  }
  },
});

export const { login, tokenStore, logout, editUser, resetEditProfile, startLoading, endLoading} = authSlice.actions;

export default authSlice.reducer;





export const LoginUser = (data) => async (dispatch) => {
  try {
    dispatch(startLoading())
    const response = await axios.post(
      "https://umudugudu-backend.onrender.com/api/user/login",
      data
    );
    console.log(response.data);
    
    dispatch(login(response.data.data));
    await setItemAsync("token", (response.data.token));
    await setItemAsync("logindata", JSON.stringify(response.data.data));
    dispatch(tokenStore(response.data.token));
    dispatch(endLoading())
  } catch (err) {
    dispatch(endLoading(err.response.data))
    alert("Wasyizemo imyirondoro itariyo")
    console.log(err.response.data, "error"); 
  }
};

export const LogoutUser = () => (dispatch) => {
  deleteItemAsync('logindata').then(() => console.log('loggedout'));
  deleteItemAsync('token')
  dispatch(endLoading())
  dispatch(logout(''))
};

export const editUserData =  (id, data) => (dispatch) => {
  let token = '';
  getItemAsync('token').then((res) => {
    console.log(res)
    token = res
  })
  console.log("Here")
  axios({
    method: 'PUT',
    url: `https://umudugudu-backend.onrender.com/api/user/update/${id}`,
    data: data,
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`
    }
  }).then((res) => {
    dispatch(editUser())
    console.log(res.data.data, '////////////////////////////////////////////////////////////////')}).catch((error)=>{
      console.log(error, "eroor");
    })
}