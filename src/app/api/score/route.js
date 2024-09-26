// src/app/api/score/route.js
import dbConnect from '../../utils/dbConnect';
import User from '../../models/userModel';

export async function POST(req) {
  await dbConnect();
  
  try {
    const { firebaseUid, email, score } = await req.json();

    // Find the user by Firebase UID or create if doesn't exist
    let user = await User.findOne({ firebaseUid });
    console.log("User found:", user);

    if (!user) {
      user = await User.create({ firebaseUid, email, score });
      console.log("User created successfully");
    } else {
      // Update the user's score if they already exist
      user.score = score;
      await user.save();
    }

    return new Response(JSON.stringify({ message: 'Score saved successfully', user }), { status: 200 });
  } catch (error) {
    console.log("Error saving score:", error);
    return new Response(JSON.stringify({ error: 'Error saving score' }), { status: 400 });
  }
}
