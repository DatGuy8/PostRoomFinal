import jwt from "jsonwebtoken";


export const authenticate = async (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET_KEY, (err, payload) => {
    // console.log(req.cookies.token);
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
