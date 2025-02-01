import express from "express";
import * as mailController from "../controllers/mail.controller.js";

const router = express.Router();

router.post("/sendSubscriptionMail", mailController.sendSubscriptionMail);
router.post("/sendReceiptMail", mailController.sendReceiptMail);

export default router;
