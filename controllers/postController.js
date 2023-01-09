import PostService from '../services/postService.js';

const postService = new PostService();

class PostController {
    createPost = async (req, res, next) => {
        try {
            const { picturePath, description } = req.body;
            const userId = req.user.id;
            const response = await postService.createPost({
                userId,
                picturePath,
                description,
            });
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };

    getFeedPosts = async (req, res, next) => {
        try {
            const response = await postService.getFeedPosts();
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };

    getSelfPosts = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const response = await postService.getUserPosts(userId);
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };

    getUserPosts = async (req, res, next) => {
        try {
            const { userId } = req.params;
            const response = await postService.getUserPosts(userId);
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };

    likePost = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const response = await postService.likePost({ id, userId });
            return res.status(200).json({
                success: true,
                data: response,
            });
        } catch (error) {
            return next(error);
        }
    };
}

export default PostController;
