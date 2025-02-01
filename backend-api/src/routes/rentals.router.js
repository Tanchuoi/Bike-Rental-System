import express from "express";
import * as rentalsController from "../controllers/rentals.controller.js";

const router = express.Router();

router.get("/rentals", rentalsController.getRentals);
router.post("/rental", rentalsController.addRental);
router.delete("/rental/:id", rentalsController.deleteRental);

export default router;
