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
      return res.status(400).send("Hashpassword error, password is required.");
    }

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    return next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Hashpassword Internal Server Error");
    return null;
  }
};

const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { hashedPassword } = req.user;
    if (!hashedPassword || !password) {
      return res.status(400).send("Error Auth.VerifyPassword: Invalid request");
    }
    const isVerified = await argon2.verify(hashedPassword, password);

    if (isVerified) {
      next();
    } else {
      return res.status(401).send("Invalid password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("VerifyPassword Internal server error");
  }
  return null;
};

const generateToken = (req, res, next) => {
  const payload = { cargo: req.user };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).send({ token });
  next();
};

const verifyPasswordAndGenerateToken = async (req, res) => {
  try {
    const { password } = req.body;
    const { hashedPassword } = req.user;

    if (!hashedPassword || !password) {
      return res
        .status(400)
        .send("Error Auth.VerifyPasswordandGenerateToken, invalid requestS");
    }

    const isVerified = await argon2.verify(hashedPassword, password);

    if (isVerified) {
      const user = { ...req.user };
      delete user.hashedPassword;
      const payload = { cargo: req.user };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });

      return null;
    }
    res.status(401).send("Error Auth VerifyPassword");
    return null;
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("VerifyPasswordandGenerateToken Internal servor error");
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
      res.status(401).send("verifytoken, Invalid token");
    } else if (err.name === "TokenExpiredError") {
      res.status(401).send("verifytoken, Token has expired");
    } else {
      res.status(401).send("verifytoken error, unauthorized");
    }
  }
};

const verifyPasswordBeforeDelete = async (req, res, next) => {
  const { hashedPassword } = req.user;
  const { password } = req.body;
  try {
    if (!hashedPassword || !password) {
      return res
        .status(400)
        .send("Auth.VerifyPasswordBeforeDelete invalid request");
    }
    const isVerified = await argon2.verify(hashedPassword, password);
    if (isVerified) {
      next();
    } else {
      res.status(401).send("Error, can't verify the user password");
      return null;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Auth, internal servor error");
    return null;
  }
  return null;
};

module.exports = {
  hashPassword,
  verifyPasswordAndGenerateToken,
  verifyPassword,
  verifyToken,
  verifyPasswordBeforeDelete,
  generateToken,
};
