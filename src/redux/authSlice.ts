import { createSlice } from "@reduxjs/toolkit";

const getTokenFromStorage = (): string => {
    try {
      const storedToken = localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : "";
    } catch {
      return "";
    }
  };

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        token: getTokenFromStorage()
    },
    reducers:{
        setToken : (state, action) => {
            state.token = action.payload
            console.log(action.payload)
            localStorage.setItem('token', JSON.stringify(action.payload))
        },
        setLoading: (state, aciton) => {
            console.log(aciton.payload)
            state.loading = aciton.payload
        }
    }
})

export const { setToken, setLoading} = authSlice.actions
export default authSlice.reducer