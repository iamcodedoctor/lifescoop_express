import AuthService from '../services/authService.js';

const authService = new AuthService();

class AuthController {
    /**
     * Controller function to register new User
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    register = async (req, res, next) => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                picturePath,
                friends,
                location,
                occupation,
            } = req.body;
            const viewedProfile = Math.floor(Math.random() * 100);
            const impressions = Math.floor(Math.random() * 100);

            const response = await authService.register({
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
            });

            return res.status(201).json({
                success: true,
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * function for user Log In
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const response = await authService.login({ email, password });
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };
}

export default AuthController;
