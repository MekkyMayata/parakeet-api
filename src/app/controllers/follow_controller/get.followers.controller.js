import moment from 'moment';
import constants from '../../../config/constants';
import FollowService from '../../services/follow.service';

const { ERROR } = constants;

class GetFollowersController {

  static async fetchFollowers(req,res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;
      const page = req.query.page || 1;
      const data = { userId, page };

      const followersResult = await FollowService.fetchFollowers(data);
      if (!followersResult.success) { throw new Error(followersResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Fetched followers successfully',
        status: 200,
        data: followersResult.data
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] GetFollowersController error resulting from ${err}`);
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

  static async fetchFollower(req,res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;
      const data = { userId };

      data.username = req.query.follow;
      const userResult = await FollowService.fetchUserByUsername(data);
      if(!userResult.user) { throw new Error(); }

      // get follow user id
      const { id: follower_id } = userResult.user;
      data.follow_id = follower_id;

      const followerResult = await FollowService.fetchFollower(data);
      if (!followerResult.success) { throw new Error(followerResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Fetched follower successfully',
        status: 200,
        data: followerResult.data
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] GetFollowersController error resulting from ${err}`);
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

export default GetFollowersController;