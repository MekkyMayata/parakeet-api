import moment from 'moment';
import Pusher from 'pusher'
import constants from '../../../config/constants';
import LikesService from '../../services/likes.service';
import PostService from '../../services/post.service';
import LikesError from '../../errors/like.error';
import config from '../../../config/index';

const { ERROR } = constants;
const pusher = new Pusher({
  appId: config.PUSHER_APP_ID,
  Key: config.PUSHER_APP_KEY,
  secret: config.PUSHER_APP_SECRET,
  cluster: config.PUSHER_APP_CLUSTER,
  useTLS: true
});

class LikePostController {

  static async likePost(req, res) {
    try {
      const data = {};

      const { decoded } = req.user;
      data.user_id = decoded.id;

      // get the action (like or unlike)
      const action = req.body.action;
      // get the post id
      const post = req.params.id;

      data.like_value = action;

      data.post_id = post;

      // handle increment of total likes for a post
      const counter = action === 'Like' ? 1 : -1;
      data.likes_counter = counter;

      // update post likes_count record here
      const updateResult = await PostService.updatePostLikes(data);
      if (updateResult.success == true) {
        pusher.trigger("my-channel", "my-event", { action: action, post_id: post}, req.body.socketId);
      }

      const result = await LikesService.likePost(data);
      if (!result.success == true) { throw new LikesError(); }

      
      // *********************doubt data is returned*******************
      return res.status(200).json({})
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] LikePostController error resulting from ${err}`);
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
export default LikePostController;
