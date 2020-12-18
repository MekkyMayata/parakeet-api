import moment from 'moment';
import constants from '../../../config/constants';
import PostService from '../../services/post.service';

const { ERROR } = constants;

class DeletePostController {
  /**
   * @description deletes a user post
   * @param { Object} req - request object
   * @param { Object } res - response object
   */
  static async deletePostById(req, res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;

      const postId = req.query.id;
      if (!postId) { throw new Error('no selected post')}
      
      const body = { userId, postId };

      const postResult = await PostService.fetchPostById(postId);
      if (!postResult.post) { throw new Error(postResult.message)}

      const deleteResult = await PostService.deletePostById(body);
      if (!deleteResult.success) { throw new Error(deleteResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'deleted post successfully',
        status: 200,
        data: deleteResult.data
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] DeletePostController error resulting from ${err}`);
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

export default DeletePostController;