"use client";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { BackgroundBeams } from "./ui/Background";
import { TypewriterEffect} from "./ui/Text";

const Login = () => {
  const { user, googleSignIn } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const saveUser = async () => {
        const userData = {
          firebaseUid: user.uid,
          email: user.email,
          displayName: user.displayName, 
        };

        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to save user:", errorData);
          } else {
            const result = await response.json();
            console.log("User saved successfully:", result);
          }
        } catch (error) {
          console.error("Error while saving user:", error);
        }
      };

      saveUser();
    }
  }, [user]);
  const words = [
    { text: "Welcome " },
    { text: "To " },
    { text: "IOS ", className: "bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent " },
    {
      text: "Fusion",
      className:
        "bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent",
    },
    {
      text: "7.0",
      className:
        "bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent",
    },
  ];
  
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <TypewriterEffect words={words}/>
    <BackgroundBeams /> 
    <h1 className="mt-[1rem]">Take part in The Quiz.</h1>

    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Border Magic
  </span>

</button>
  </div>
  );
};

export default Login;
