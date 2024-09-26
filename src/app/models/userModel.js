// models/userModel.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,  // Initial score is 0
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
