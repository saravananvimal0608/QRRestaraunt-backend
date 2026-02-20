const adminMiddleware = (req, res, next) => {

  if (!req.user?.role) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export default adminMiddleware;
