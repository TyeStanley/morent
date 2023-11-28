import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
  },
  ownedCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  likedCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  rentedCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
