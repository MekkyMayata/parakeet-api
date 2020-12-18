import moment from 'moment';
import constants from '../../../config/constants';
import PostService from '../../services/post.service';

const { ERROR } = constants;

class GetPostsController {

  /**
   * @description Fetches all posts
   * @param { Object} req - request object
   * @param { Object } res - response object
   */
  static async fetchPosts(req, res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;
      const page = req.query.page || 1;
      const body = { userId, page };

      const postResult = await PostService.fetchPosts(body);
      if (!postResult.success) { throw new Error(postResult.message);}

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Fetched posts successfully',
        status: 200,
        data: postResult.data
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] PostController error resulting from ${err}`);
      return res.status(400).json({
        current_url: req.originalUrl,
        success: false,
        message: err.message || ERROR,
        status: 400,
        data: err.data || {},
        code: err.code
      })
    }
  }

  static async fetchPostById(req, res) {
    try {
      const postId = req.query.id; 
      
      const postResult = await PostService.fetchPostById(postId);
      if (!postResult.success) { throw new Error(postResult.message);}

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Fetched post successfully!',
        status: 200,
        data: postResult.post
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] GetPostsController error resulting from ${err}`);
      return res.status(400).json({
        current_url: req.originalUrl,
        success: false,
        message: err.message || ERROR,
        status: 400,
        data: err.data || {},
        code: err.code
      })
    }
    
  }
}

export default GetPostsController;