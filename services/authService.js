import bcrypt from 'bcrypt';
import User from '../models/User.js';
import createError from '../utils/createError.js';
import jwt from 'jsonwebtoken';
import { baseConfig } from '../configs/baseConfig.js';

class AuthService {
    /**
     * Service to register a new user
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param picturePath
     * @param friends
     * @param location
     * @param occupation
     * @param viewedProfile
     * @param impressions
     * @returns {Promise<unknown>}
     */
    register = ({
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile,
        impressions,
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(password, salt);

                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: passwordHash,
                    picturePath,
                    friends,
                    location,
                    occupation,
                    viewedProfile,
                    impressions,
                });

                const savedUser = await newUser.save();
                const { password: passwd, ...rest } = savedUser._doc;
                return resolve({ user: rest });
            } catch (error) {
                return reject(error);
            }
        });
    };

    /**
     * Service to log in user
     * @param email
     * @param password
     * @returns {Promise<unknown>}
     */
    login = ({ email, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return reject(new createError(400, 'User does not exist'));
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return reject(new createError(400, 'Invalid Credentials'));
                }
                const token = jwt.sign({ id: user._id }, baseConfig.jwtSecret);
                const { password: passwd, ...rest } = user._doc;
                return resolve({ token, user: rest });
            } catch (error) {
                return reject(error);
            }
        });
    };
}

export default AuthService;
