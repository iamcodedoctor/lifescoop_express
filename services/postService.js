import Post from '../models/Post.js';
import User from '../models/User.js';

class PostService {
    createPost = ({ userId, picturePath, description }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(userId);
                const newPost = new Post({
                    userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    description,
                    userPicturePath: user.picturePath,
                    picturePath,
                    likes: {},
                    comments: [],
                });
                await newPost.save();

                const posts = await Post.find().sort({ createdAt: -1 }).lean();
                return resolve(posts);
            } catch (error) {
                return reject(error);
            }
        });
    };

    getFeedPosts = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await Post.find().sort({ createdAt: -1 }).lean();
                return resolve(posts);
            } catch (error) {
                return reject(error);
            }
        });
    };

    getUserPosts = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await Post.find({ userId })
                    .sort({ createdAt: -1 })
                    .lean();
                return resolve(posts);
            } catch (error) {
                return reject(error);
            }
        });
    };

    likePost = ({ id, userId }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await Post.findById(id);
                const isLiked = post.likes.get(userId);

                if (isLiked) {
                    post.likes.delete(userId);
                } else {
                    post.likes.set(userId, true);
                }

                const updatedPost = await Post.findByIdAndUpdate(
                    id,
                    { likes: post.likes },
                    { new: true }
                );

                return resolve(updatedPost);
            } catch (error) {
                return reject(error);
            }
        });
    };
}

export default PostService;
