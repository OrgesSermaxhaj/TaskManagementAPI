const admin = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only Admins can access this page!" });
  }
  next();
};
module.exports = { admin };
