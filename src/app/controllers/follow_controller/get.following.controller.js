import moment from 'moment';
import constants from '../../../config/constants';
import FollowService from '../../services/follow.service';

const { ERROR } = constants;

class GetFollowingController {

  static async fetchFollowing(req, res) {
    try {
      const { decoded } = req.user;
      const userId = decoded.id;
      const page = req.query.page || 1;
      const data = { userId, page };

      const followingResult = await FollowService.fetchFollowing(data);
      if (!followingResult.success) { throw new Error(followingResult.message); }

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Fetched follows successfully',
        status: 200,
        data: followingResult.data
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] GetFollowingController error resulting from: ${err}`);
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

export default GetFollowingController;