import q from 'q';
import fs from 'fs';
// import lodash from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config/index';
import cryptoRandomString from 'crypto-random-string';

const privateKey = fs.readFileSync(__dirname + '/private.key', 'utf-8');

const bcryptSaltPassword = (password) => {
  const defer = q.defer();
  const saltRounds = 12;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if(err) {
        defer.resolve(false);
      }
      defer.resolve({ password, salt, hash });
    })
  })
  return defer.promise;
};

const validateHash = (plainText, salt, validHash) => {
  const defer = q.defer();
  bcrypt.hash(plainText, salt, (err, newHash) => {
    if(err) {
      defer.reject(err);
    } else if(newHash != validHash) {
      defer.resolve(false);
    }
    defer.resolve(true);
  });
  return defer.promise;
}

const generateRandomString = (length = 20) => {
  const str = cryptoRandomString({ length });
  return str.toUpperCase();
}

const generateJWTToken = (user) => {
  const signOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    expiresIn: config.auth.expiresIn,
    algorithm: 'RS256',
  };
  // =====> TODO: try using partial user payload
  const token = jwt.sign(user, privateKey, signOptions);
  return token;
}

const extractUser = (req, res, next) => {
  const verifyOptions = {
    issuer: config.auth.issuer,
    subject: config.auth.subject,
    validity: config.auth.expiresIn
  };

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, privateKey, verifyOptions, (err, decoded) => {
      if(err) {
        return res.status(403).json({
          message: 'User is unauthorized'
        });
      }
      req.user = decoded;
      return next();
    });
  } else {
    return res.status(403).json({
      message: 'User is unauthorized'
    });
  }
};

export {
  bcryptSaltPassword,
  validateHash, 
  generateRandomString, 
  generateJWTToken,
  extractUser
};

