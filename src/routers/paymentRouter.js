import express from "express";
import { updatePaymentMethodValidation } from "../middlewares/joiMiddleware.js";
import {
  createNewPaymentMethod,
  deletePaymentMethod,
  readPaymentMethods,
  updatePaymentMethod,
} from "../models/paymentMethods/PaymentModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const paymentTypes = await readPaymentMethods();
    console.log(paymentTypes);
    res.json({
      status: "success",
      message: "Available Payment Types Lists",
      paymentTypes,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    const result = await createNewPaymentMethod(data);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "New payment method has been created",
        result,
      });
    }
    res.json({
      status: " error",
      message: "unable to create new payment method",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await updatePaymentMethod(req.body);

    if (result?._id) {
      return res.json({
        status: "success",
        message: "payment Method has beeen updated",
        result,
      });
    }
    res.json({
      status: " error",
      message: "unable to update payment method",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await deletePaymentMethod(_id);
    if (result?._id) {
      return res.json({
        status: "success",
        message: " Payment method has beeen delete",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the payment method",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
