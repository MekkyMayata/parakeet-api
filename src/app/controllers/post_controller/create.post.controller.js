import moment from 'moment';
import PostService from '../../services/post.service';
import constants from '../../../config/constants';
import Validator from '../../utils/validator';
import PostError from '../../errors/post.error';

const { ERROR } = constants;

class CreatePostController {
  /**
   * @description - creates a new post
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async createPost(req, res) {
    try {
      let { body } = req;
      
      const { decoded } = req.user;

      // validate input
      body = Validator.validateImagePost(body);
      body.user_id = decoded.id;

      const idAssigned = await PostService.generatePostId();
      if (!idAssigned.success) { throw new PostError(); }

      const { id: postId } = idAssigned;
      body.post_id = postId;

      const result = await PostService.createNewPost(body);
      if (!result.success) { 

        throw new PostError(); }

      const { post: newPost } = result;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Post Uploaded successfully',
        status: 200,
        data: newPost
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] CreatePostController error resulting from ${err}`);
      return res.status(400).json({
        current_url: req.originalUrl,
        success: false,
        message: err.message || ERROR,
        status: 400,
        data: err.data || {},
        code: err.code
      });
    }
  }
}

export default CreatePostController;
