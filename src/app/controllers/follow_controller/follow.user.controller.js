import moment from 'moment';
import FollowService from '../../services/follow.service';
import constants from '../../../config/constants';
import FollowError from '../../errors/follow.error';

const { ERROR } = constants;

class FollowController {
  /**
   * @description - follows a registered user
   * @param { Object } req - request object
   * @param { Object } res - response object
   */
  static async followUser(req, res) {
    try {
      if(!req.query.follow) { throw new FollowError('invalid username'); }
      let data = {};
      
      // get users id
      const { decoded } = req.user;
      data.user_id = decoded.id;

      data.username = req.query.follow;
      const userResult = await FollowService.fetchUserByUsername(data);
      if(!userResult.user) { throw new FollowError(); }

      // get follow user id
      const { id: follower_id } = userResult.user;
      data.follow_id = follower_id;

      // already following?
      const followingResult = await FollowService.fetchFollower(data);
      if(followingResult.followingResult != null ) { 
        throw new FollowError('Already following user'); }

      const followResult = await FollowService.followUser(data);
      const { followResult: follow } = followResult;

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'followed User successfully',
        status: 200,
        data: follow
      })
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] FollowController error resulting from: ${err}`);
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

export default FollowController;