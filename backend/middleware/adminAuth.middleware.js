import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.json({ success: false, message: "login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== process.env.ADMIN_ID) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
