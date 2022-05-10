import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "idle",
    isLoggedIn: false,
    user: {
        id:undefined,
        name:undefined,
        email: undefined,
        firstName:undefined,
        lastName: undefined
    },
    profile: {},
    userStatus: "idle",
    users: [],
    justregistered: false
};

interface userInformation{
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData:userInformation) => {
        const { data } = await axios.post('http://localhost:3001/login', {email: userData.email, password: userData.password});
        console.log(data);
        return data;
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData:userInformation) => {
        const { data } = await axios.post('http://localhost:3001/register', {firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password});
        console.log(data);
        return data;
    }
);

export const authenticateUser = createAsyncThunk(
    "auth/isUserAuth",
    async () => {
        const { data } = await axios.get('http://localhost:3001/isUserAuth', { headers: { "x-access-token": localStorage.getItem("token") || "" } });
        console.log(data);
        return data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        logout: (state, action) => {
            localStorage.clear();
            state.isLoggedIn = false;
            axios.defaults.headers.common["authorization"] = null || "";
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder.addCase( loginUser.pending, (state, action) =>{
            state.status = "loading";
            console.log("HELLO THIS IS LOADING");
        });
        builder.addCase( loginUser.fulfilled, (state, action) =>{
            console.log(action.payload.response);
            const { id, user, firstName, lastName } = action.payload.response;

            localStorage.setItem("login", JSON.stringify({id, user, firstName, lastName, isLoggedIn: true}));
            localStorage.setItem("token", action.payload.token);
            state.user.id = id;
            state.user.email = user;
            state.user.firstName = firstName;
            state.user.lastName = lastName;
            state.status = "success";
            state.isLoggedIn = true;

        });
        builder.addCase( loginUser.rejected, (state, action) =>{
            state.status = "failed";
            state.isLoggedIn = false;
        });
        builder.addCase( registerUser.pending, (state, action) =>{
            state.status = "loading";
            console.log("FAIL 2");
        });
        builder.addCase( registerUser.fulfilled, (state, action) =>{
            const { id, user, firstName, lastName } = action.payload.response;
            localStorage.setItem("login", JSON.stringify({id, user, firstName, lastName, isLoggedIn: true}));
            localStorage.setItem("token", action.payload.token);
            state.user.name = user;
            state.status = "success";
            state.isLoggedIn = true;
        });
        builder.addCase( registerUser.rejected, (state, action) =>{
            state.status = "failed";
            state.isLoggedIn = false;
            console.log("FAIL");
        });
        builder.addCase( authenticateUser.fulfilled, (state, action) =>{
            if(action.payload.auth === false){
                localStorage.clear();
                state.isLoggedIn = false;
                axios.defaults.headers.common["authorization"] = null || "";
            };
        });
    }
});


export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;