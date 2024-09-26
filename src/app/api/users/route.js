// src/app/api/users/route.js

import User from '../../models/userModel';

import  dotenv  from 'dotenv';
import dbConnect from '../../utils/dbConnect';


dotenv.config()


export async function POST(req) {
 // Ensure the DB connection is 
  await dbConnect();


  try {
    
    const { firebaseUid, email, displayName } = await req.json();
    console.log("Received user data:", { firebaseUid, email, displayName });

    // Check if user already exists in the database
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Create a new user if it doesn't exist
      user = new User({
        firebaseUid,
        email,
        displayName, // Save displayName if needed
        score: 0, // Initial score of 0
      });

      await user.save();
      console.log("User created successfully");
    } else {
      console.log("User already exists in the database");
    }

    return new Response(
      JSON.stringify({ message: "User saved successfully", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(JSON.stringify({ error: "Error saving user" }), {
      status: 500,
    });
  }
}
