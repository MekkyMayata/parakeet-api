import moment from 'moment';
import constants from '../../../config/constants';
import FollowService from '../../services/follow.service';

const { ERROR } = constants;

class UnfollowUserController {
  static async unfollowUser(req, res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;
      const data = { userId };
      
      data.username = req.query.unfollow;
      const followingResult = await FollowService.fetchUserByUsername(data);
      if (!followingResult.user) { throw new Error('currently not following user');}

      const { id: follower_id } = followingResult.user;
      data.follow_id = follower_id;

      const unfollowResult = await FollowService.unfollowUser(data);
      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Successfully unfollowed user',
        status: 200,
        data: unfollowResult.unfollowResult
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] UnfollowUserController error resulting from ${err}`);
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

export default UnfollowUserController;