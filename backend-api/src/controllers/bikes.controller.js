import knex from "../database/knex.js";
// import { getBrandId } from "../services/bike.service.js";

const getBrandId = async (brandName) => {
  console.log("Received brandName:", brandName); // Log the brand name
  try {
    const result = await knex("brand").where("name", brandName).first();
    console.log(
      "Generated query:",
      knex("brand").where("name", brandName).toString()
    ); // Log the query for debugging
    return result ? result.brand_id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// getBikes
const getBikes = async (req, res) => {
  try {
    const bikes = await knex("bike").select("*");
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getBikeById
const getBikeById = async (req, res) => {
  try {
    const bike = await knex("bike").where({ id: req.params.id }).first();
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredBikes = async (req, res) => {
  const { type, brand, sortField, sortDirection } = req.query;

  try {
    let query = knex("bike").join("brand", "bike.brand_id", "brand.brand_id");

    // Apply filters based on query parameters
    if (type) query = query.where("bike.type", type);
    if (brand) query = query.where("brand.name", brand); // Filter by brand name from the brand table

    // Apply sorting if sorting field is provided
    if (sortField) {
      const direction = sortDirection === "desc" ? "desc" : "asc";
      query = query.orderBy(sortField, direction);
    }

    const bikes = await query;
    res.json(bikes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bikes", error: error.message });
  }
};

const deleteBike = async (req, res) => {
  try {
    await knex("rental").where({ bike_id: req.params.id }).del();
    await knex("bike").where({ id: req.params.id }).del();
    res.json({ message: "Bike deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new bike
const addBike = async (req, res) => {
  // console.log(req.body); // Log the bike details
  // console.log(req.file); // Log the uploaded file object

  const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the uploaded file's path

  try {
    const brandId = await getBrandId(req.body.brand); // Get brand ID based on brand name

    if (!brandId) {
      return res.status(400).json({ message: "Invalid brand name" });
    }

    const bikeData = {
      bike_name: req.body.bike_name,
      brand_id: brandId, // Store the brand_id instead of brand name
      type: req.body.type,
      status: req.body.status,
      description: req.body.description,
      overview: req.body.overview,
      price_by_day: req.body.price_by_day,
      max_engine: req.body.max_engine,
      gas_capacity: req.body.gas_capacity,
      image, // Store the image path
    };

    await knex("bike").insert(bikeData);
    // console.log("File received by multer:", req.file);
    // console.log("Image path:", image);
    res.status(201).json({ message: "Bike added successfully" });
  } catch (error) {
    // console.error("Error adding bike:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to add bike", error: error.message });
  }
};

// Update bike by ID
const updateBike = async (req, res) => {
  const {
    bike_name,
    brand, // This is the brand name
    type,
    status,
    description,
    overview,
    price_by_day,
    max_engine,
    gas_capacity,
  } = req.body;

  if (!brand) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Only set if a new file is uploaded

  try {
    // Fetch brand ID based on brand name
    const brandId = await getBrandId(brand);

    if (!brandId) {
      return res.status(400).json({ message: "Invalid brand name" });
    }

    const updateData = {
      bike_name,
      brand_id: brandId, // Store the brand_id instead of brand name
      type,
      status,
      description,
      overview,
      price_by_day,
      max_engine,
      gas_capacity,
    };

    if (image) updateData.image = image;

    const updatedRows = await knex("bike")
      .where({ id: req.params.id })
      .update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json({ message: "Bike updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update bike", error: error.message });
  }
};

const getBikeBrands = async (req, res) => {
  try {
    const brandNames = await knex("brand").select("*");
    res.json(brandNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBikeBrand = async (req, res) => {
  try {
    await knex("brand").insert({ name: req.body.brand });
    res.status(201).json({ message: "Brand added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBikeBrand = async (req, res) => {
  try {
    await knex("brand").where({ brand_id: req.params.id }).del();
    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getBikes,
  getBikeById,
  getFilteredBikes,
  deleteBike,
  addBike,
  updateBike,
  getBikeBrands,
  addBikeBrand,
  deleteBikeBrand,
};
