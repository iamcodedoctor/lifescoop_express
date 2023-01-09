import User from "../models/User.js";
import createError from "../utils/createError.js";

class UserService {
    getUser = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id);
                if(!user) {
                    return reject(createError(404, "User not found"));
                }
                const {password, ...rest} = user._doc;
                return resolve({user: rest})
            } catch (error) {
                return reject(error);

            }
        });
    };

    getUserFriends = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id);
                const friends = await Promise.all(
                    user.friends.map((id)=> User.findById(id))
                )

                const formattedFriends = friends.map(({_id, firstName, lastName, occupation, picturePath, location}) => {
                    return {_id, firstName, lastName, occupation, picturePath, location}
                })
                return resolve(formattedFriends);
            } catch (error) {
                return reject(error);
            }
        });
    };

    addRemoveFriends = (id, friendId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id);
                const friend = await User.findById(friendId);

                if(user.friends.includes(friendId)) {
                    user.friends = user.friends.filter((id) => id !== friendId)
                    friend.friends = friend.friends.filter((id) => id !== id)
                } else {
                    user.friends.push(friendId)
                    friend.friends.push(id);
                }

                await user.save()
                await friend.save()

                const friends = await Promise.all(
                    user.friends.map((id)=> User.findById(id))
                )

                const formattedFriends = friends.map(({_id, firstName, lastName, occupation, picturePath, location}) => {
                    return {_id, firstName, lastName, occupation, picturePath, location}
                })
                return resolve(formattedFriends);

            } catch (error) {
                return reject(error);
            }
        });
    };
}

export default UserService;