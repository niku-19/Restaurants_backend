import { Router } from "express";
import {
  addDishToRestaurantMenu,
  addRestaurantReviewAndRating,
  createRestaurant,
  deleteRestaurant,
  getRestaurantsByCuisine,
  getRestaurantsByLocation,
  getRestaurantsByName,
  getRestaurantsByRating,
  getUserReviewsForRestaurant,
  readAllRestaurants,
  removeDishToRestaurantMenu,
  updateRestaurant,
} from "../controllers/restaurant-controllers.js";

const router = Router();

router.post("/createNewRestaurant", createRestaurant);
router.get("/getAllRestaurants", readAllRestaurants);
router.get("/resturants/:name", getRestaurantsByName);
router.get("/resturants/cuisine/:cuisineType", getRestaurantsByCuisine);
router.put("/restaurants/:restaurantId", updateRestaurant);
router.get("/restaurants/search", getRestaurantsByLocation);
router.get("/restaurants/rating/:rating", getRestaurantsByRating);
router.delete("/restaurants/:restaurantId", deleteRestaurant);
router.put("/restaurants/:restaurantId/menu", addDishToRestaurantMenu);
router.delete(
  "/restaurants/:restaurantId/menu/:dishName",
  removeDishToRestaurantMenu
);
router.put("/restaurants/:restaurantId/reviews", addRestaurantReviewAndRating);
router.get("/restaurants/:restaurantId/reviews", getUserReviewsForRestaurant);

export default router;
