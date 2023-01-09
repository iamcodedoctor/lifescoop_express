import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';
import { baseConfig } from '../configs/baseConfig.js';

const verifyToken = (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (!token) {
            return createError(403, 'Access Denied');
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trim();
        }

        const verified = jwt.verify(token, baseConfig.jwtSecret);

        if (!verified) {
            return createError(403, "Invalid Token");
        }

        req.user = verified;
        next();
    } catch (error) {
        return next(error);
    }
};

export {verifyToken}