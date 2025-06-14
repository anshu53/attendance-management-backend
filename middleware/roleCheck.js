//middleware-rolecheck.js

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user?.role); // Add this
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "You are not authorized for this action" });
    }
    next();
  };
};

module.exports = authorizeRoles;
