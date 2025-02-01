import express from "express";
import upload from "../middlewares/upload.middleware.js";
import * as bikesController from "../controllers/bikes.controller.js";

const router = express.Router();

router.get("/bikes", bikesController.getBikes);
router.get("/bike/:id", bikesController.getBikeById);
router.get("/bikes/filter", bikesController.getFilteredBikes);
router.delete("/bike/:id", bikesController.deleteBike);
router.post("/bike", upload.single("image"), bikesController.addBike);
router.put("/bike/:id", upload.single("image"), bikesController.updateBike);
router.get("/brands", bikesController.getBikeBrands);
router.post("/brand", bikesController.addBikeBrand);
router.delete("/brand/:id", bikesController.deleteBikeBrand);
export default router;
