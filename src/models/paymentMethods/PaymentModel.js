import CategorySchema from "../category/CategorySchema.js";
import PaymentSchema from "./PaymentSchema.js";

export const readPaymentMethods = () => {
  return PaymentSchema.find();
};

export const createNewPaymentMethod = (obj) => {
  return PaymentSchema(obj).save();
};

export const deletePaymentMethod = (_id) => {
  return PaymentSchema.findByIdAndDelete(_id);
};

export const updatePaymentMethod = ({ _id, ...rest }) => {
  return PaymentSchema.findByIdAndUpdate(_id, rest, { new: true });
};

export const findPaymentMethodById = (_id) => {
  return CategorySchema.findById(_id);
};
