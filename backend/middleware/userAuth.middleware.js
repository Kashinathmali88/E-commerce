import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ success: false, message: "login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({ success: false, message: "Invalide user" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Not authorized login again",
      error: error,
    });
  }
};

export default userAuth;
