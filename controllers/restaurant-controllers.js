import restaurantModel from "../models/restaurant-model.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, address, city, rating, menu, averageRating } =
      req.body;

    //checking if all required fields are present
    if (!name || !cuisine || !address || !city || !menu) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
        data: null,
      });
    }

    //checking if restaurant already exists
    const foundRestaurant = await restaurantModel.findOne({ name });

    if (foundRestaurant) {
      return res.status(400).json({
        status: "fail",
        message: "restaurant already registered",
        data: null,
      });
    }

    //creating new restaurant
    const resturant = new restaurantModel({
      name,
      cuisine,
      address,
      city,
      rating,
      menu,
      averageRating,
    });

    const result = await resturant.save();

    return res.status(201).json({
      status: "success",
      message: "restaurant created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const readAllRestaurants = async (req, res) => {
  try {
    const resturants = await restaurantModel.find({});
    if (!resturants) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurants not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Restaurants found successfully",
      data: resturants,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const getRestaurantsByName = async (req, res) => {
  try {
    const { name } = req.params;

    //checking if name are present in params
    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
        data: null,
      });
    }

    //checking if restaurant  exists
    const foundRestaurant = await restaurantModel.findOne({ name });

    if (!foundRestaurant) {
      return res.status(404).json({
        status: "fail",
        message: "restaurant not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "restaurant found successfully",
      data: foundRestaurant,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisineType } = req.params;

    //checking if cuisine type are present in params
    if (!cuisineType) {
      return res.status(400).json({
        status: "fail",
        message: "Missing cuisine type as a params",
        data: null,
      });
    }

    // finding the resturants by cuisine type
    const resturants = await restaurantModel.findOne({ cuisine: cuisineType });

    if (!resturants) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurants not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Restaurants found successfully",
      data: resturants,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { name, cuisine, address, city, rating, menu, averageRating } =
      req.body;

    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing restaurant id as a params",
        data: null,
      });
    }

    const foundRestaurant = await restaurantModel.findById(restaurantId);

    if (!foundRestaurant) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    const updatedRestaurant = {
      name: name || foundRestaurant?.name,
      cuisine: cuisine || foundRestaurant?.cuisine,
      address: address || foundRestaurant?.address,
      city: city || foundRestaurant?.city,
      rating: rating || foundRestaurant?.rating,
      menu: menu || foundRestaurant?.menu,
      averageRating: averageRating || foundRestaurant?.averageRating,
    };

    const result = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      updatedRestaurant,
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Restaurant updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const getRestaurantsByLocation = async (req, res) => {
  try {
    const city = req.query.city.split("%").join(" ");
    const address = req.query.address.split("%").join(" ");

    if (city === undefined || address === undefined) {
      return res.status(404).json({
        status: "fail",
        message: "Location has missing feild city or address!",
        data: null,
      });
    }

    const found = await restaurantModel.findOne({
      $or: [{ city: city }, { address: address }],
    });

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Restaurant found successfully",
      data: found,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const getRestaurantsByRating = async (req, res) => {
  try {
    const { rating } = req.params;

    parseInt(rating);

    if (!rating) {
      return res.status(400).json({
        status: "fail",
        message: "Missing rating as a params",
        data: null,
      });
    }

    if (rating > 5 && rating < 0) {
      return res.status(400).json({
        status: "fail",
        message: "Rating cannot be greater than 5 and less than 0",
        data: null,
      });
    }

    const found = await restaurantModel.find({
      rating: { $gte: rating },
    });

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Restaurant found successfully",
      data: found,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing restaurant id as a params",
        data: null,
      });
    }

    const found = await restaurantModel.findById(restaurantId);

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    const result = await restaurantModel.findByIdAndDelete(restaurantId);

    return res.status(200).json({
      status: "success",
      message: "Restaurant deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const addDishToRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, description, isVeg } = req.body;

    if (!name || !price || !description || !isVeg) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
        data: null,
      });
    }

    if (!restaurantId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing restaurant id as a params",
        data: null,
      });
    }

    const found = await restaurantModel.findById(restaurantId);

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    const dish = {
      name,
      price,
      description,
      isVeg,
    };

    const result = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      { $push: { menu: dish } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Dish added to restaurant menu successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
      data: null,
    });
  }
};
export const removeDishToRestaurantMenu = async (req, res) => {
  try {
    const { restaurantId, dishName } = req.params;

    if (!restaurantId || !dishName) {
      return res.status(400).json({
        status: "fail",
        message: "Missing restaurant id as a params or dish name as a params",
        data: null,
      });
    }

    const found = await restaurantModel.findById(restaurantId);

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    const result = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        $pull: {
          menu: {
            name: dishName,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Dish remove from restaurant menu successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
      data: null,
    });
  }
};

export const addRestaurantReviewAndRating = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { rating, reviewText } = req.body;

    if (!restaurantId || !rating || !reviewText) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
        data: null,
      });
    }

    const found = await restaurantModel.findById(restaurantId);

    if (!found) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    const review = {
      rating,
      reviewText,
    };

    const result = await restaurantModel.findByIdAndUpdate(
      restaurantId,
      { $push: { reviews: review } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Review added to restaurant successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};

export const getUserReviewsForRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing restaurant id as a params",
        data: null,
      });
    }

    const found = await restaurantModel.findById(restaurantId);

    if (found.reviews.length < 1) {
      return res.status(404).json({
        status: "fail",
        message: "Restaurant not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Reviews found successfully",
      data: found.reviews,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
      data: null,
    });
  }
};
