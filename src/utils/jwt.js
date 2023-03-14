import jwt from "jsonwebtoken";
import { updateAdmin } from "../models/admin/AdminModel.js";
import { createNewSession } from "../models/session/SessionModel.js";

export const signAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS, {
    expiresIn: "15m",
  });
  await createNewSession({
    associate: payload.email,
    token: accessJWT,
  });
  return accessJWT;
};

export const signRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "15d",
  });

  await updateAdmin(
    {
      email: payload.email,
    },
    { refreshJWT }
  );

  return refreshJWT;
};

export const verifyAccessJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS);
    return decoded;
  } catch (error) {
    return error.messgae.includes("jwt expired")
      ? "jwt expired"
      : error.messsage;
  }
};
