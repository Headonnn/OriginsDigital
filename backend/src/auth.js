const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).send("Password is required.");
    }

    const hashedPassword = await argon2.hash(password, hashingOptions);

    // console.log(hashedPassword);

    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    return next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
    return null;
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { hashedPassword } = req.user;
    const { password } = req.body;

    if (!hashedPassword || !password) {
      return res.status(400).send("Invalid request.");
    }

    const isVerified = await argon2.verify(hashedPassword, password);

    if (isVerified) {
      const payload = { sub: req.user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const user = { ...req.user };
      delete user.hashedPassword;

      res.send({ token, user });
    }
    res.sendStatus(401);
    return null;
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
    return null;
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has an incorrect type");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.payload = payload;

    next();
  } catch (err) {
    console.error(err);

    if (err.name === "JsonWebTokenError") {
      res.status(401).send("Invalid token");
    } else if (err.name === "TokenExpiredError") {
      res.status(401).send("Token has expired");
    } else {
      res.status(401).send("Unauthorized");
    }
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
