import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import { setAuth } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router";
import PrivateRoute from './components/privateRoute';
import Home from './pages/home';
import LogInPage from './pages/logInPage';

function App() {
  type Props = {
    path?:string
  }

  const dispatch = useDispatch();
  const  { isLoggedIn } = useSelector((state: any) => state.auth);

  //CHECK IF USER IS LOGGED IN USING LOCAL STORAGE
  useEffect(() => {
    if ("login" in localStorage){
      const login: any = JSON.parse(localStorage.getItem("login") || '{}' );
      axios.defaults.headers.common["authorization"] = `Bearer ${login.token}`
    }
  }, [isLoggedIn]);

  /* SENDS DATA TO authSlice WHERE THE isLoggedIn STATE IS UPDATED, 
  LETTING THE WEBSITE KNOW IF THE USER IS LOGGED IN, EVEN AFTER REFRESH. 
  DONE BY THE privateRoute FILE/MODULE */
  useEffect(() => {
    const { isLoggedIn } = JSON.parse(localStorage.getItem("login") || "{}" ); 
    if (isLoggedIn) {
      dispatch(setAuth({ isLoggedIn }));
    }
  }, [dispatch, isLoggedIn]);



  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}> 
        <Route index element={<Home/>}/>
      </Route>
      <Route path="/login">
        <Route index element={<LogInPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
