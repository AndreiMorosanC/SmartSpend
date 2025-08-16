import { useState } from "react";
import { useAuth } from "./auth/authContext";
import "./App.css";
import Loader from "./Componets/Loader";
import DashBoard from "./Componets/DashBoardMain/DashBoard";
import LandingPage from "./Componets/LandingPageMain/LandingPage";

function App() {

  const {user, loading} = useAuth();




  if(loading) return <Loader/>

  return user ? <DashBoard/> : <LandingPage/> ;
}

export default App;
