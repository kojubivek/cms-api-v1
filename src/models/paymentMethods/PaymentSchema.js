import mongoose from "mongoose";

const paymentSchmea = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    paymentType: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PaymentMethods", paymentSchmea);
