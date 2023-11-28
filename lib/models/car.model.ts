import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  people: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fuel: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  popularCar: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRented: {
    type: Boolean,
    default: false,
  },
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
