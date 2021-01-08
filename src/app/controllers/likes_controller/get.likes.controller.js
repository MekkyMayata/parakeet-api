import moment from 'moment';
import constants from '../../../config/constants';
import LikesService from '../../services/likes.service';

const { ERROR } = constants;

class FetchLikesController {

  static async fetchLikes(req, res) {
    try {
      const data = {};

      const { decoded } = req.user;
      data.user_id = decoded.id;

      const fetchResult = await LikesService.fetchLikes(data);
      if (!fetchResult.success == true) { throw new Error();}

      return res.status(200).json({
        current_url: req.originalUrl,
        success: true,
        message: 'Likes fetched successfully',
        status: 200,
        data: fetchResult
      });
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] FetchLikesController error resulting from ${err}`);
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

export default FetchLikesController;