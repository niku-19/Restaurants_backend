import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    menu: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            require: true,
          },
          description: {
            type: String,
          },
          isVeg: {
            type: Boolean,
          },
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: [
        {
          rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
          },
          reviewText: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Restaurant", restaurantSchema);
