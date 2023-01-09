import UserService from '../services/userService.js';
const userService = new UserService();

class UserController {
    getUser = async (req, res, next) => {
        try {
            const id = req.user.id;
            const response = await userService.getUser(id);
            return res.status(200).json({
                success: true,
                data: response
            });
        } catch (error) {
            return next(error);
        }
    };

    getUserFriends = async (req, res, next) => {
        try {
            const id = req.user.id;
            const response = await userService.getUserFriends(id);
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            return next(error);
        }
    };

    addRemoveFriends = async (req, res, next) => {
        try {
            const {friendId} = req.params;
            const id = req.user.id;
            const response = await userService.addRemoveFriends(id, friendId);
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            return next(error);
        }
    };
}

export default UserController;
