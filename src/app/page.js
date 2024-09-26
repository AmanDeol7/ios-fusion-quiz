
"use client";
import Login from "./components/Login";

import { UserAuth } from "./context/AuthContext";
import {useState, useEffect} from "react"
import Quiz from "./components/Quiz";
import dbConnect from "./utils/dbConnect";
import dotenv from 'dotenv'

export default function Home() {

  dotenv.config()
  dbConnect();

  
  const { user, logout } = UserAuth();  
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);  // Once we know the user's auth state, stop loading
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;  // Show a loading state while Firebase checks user
  }

  return (
   <>
   <div className="flex flex-col justify-center items-center h-[100vh]">
    {user?  <Quiz /> : <Login/>}
    {/* <Login /> */}
    {user&& <>
      <button onClick={logout} >Logout</button>
    
    </>}
   
    {/* <h1>Welcome to IOS Fusion</h1>
    {user } */}
    {/* <Login /> */}

    
   </div>
   </>
  );
}
