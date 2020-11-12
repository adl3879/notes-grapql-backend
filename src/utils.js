const jwt = require("jsonwebtoken");
const { createWriteStream } = require("fs");
const shortid = require("shortid");

const APP_SECRET = "NOTES-APP-TOKEN-STRING";

const getJWTErrorCode = name => {
  switch (name) {
    case 'TokenExpiredError':
      // token expired
      return '1001';
    case 'JsonWebTokenError':
      // jwt token malformed
      return '1002';
    case 'NotBeforeError':
      // jwt not active
      return '1003';
    default:
      return undefined;
  }
};

const getUser = req => {
  const {
    headers: { authorization },
  } = req;

  let token = "";
  if (authorization && authorization.split(" ")[0] === "Bearer")
    token = authorization.split(" ")[1];

  if (!token) {
    return {
      user: null,
      errorCode: "JWT_TOKEN_MISSING",
    };
  }

  try {
    const user = jwt.verify(token, APP_SECRET);

    return { user, errorCode: null };
  } catch (error) {
    const { name, message } = error;
    const errorCode = getJWTErrorCode(name) || message || "Your session expired. Sign in again.";

    return { user: null, errorCode };
  }
};

//file upload
const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  filename = filename.split(" ").join("-");
  const path = `../images/${id}-${filename}`;
  filename = id + "-" + filename;
  // (createWriteStream) writes our file to the images directory
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path, filename, mimetype }))
      .on("error", reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });

  return file;
};


//exports
exports.APP_SECRET = APP_SECRET;
exports.getUser = getUser;
exports.processUpload = processUpload;