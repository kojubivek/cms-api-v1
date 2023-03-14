import { verify } from "jsonwebtoken";
import { findUser } from "../models/admin/AdminModel";
import { verifyAccessJWT } from "../utils/jwt";

export const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = verifyAccessJWT(authorization);
    if (decoded?.email) {
      const user = await findUser({
        email: decoded.email,
      });
      if (user?._id) {
        req.userInfo = user;
        return next();
      }
    }
    res.status(403).json({
      status: "error",
      message: decoded,
    });
  } catch (error) {
    next(error);
  }
};
