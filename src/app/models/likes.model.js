import moment from 'moment';
import db from '../utils/database';
import likesQuery from '../queries/likes.query';

class Likes {

  /**
   * @description - Likes (favorites) a post on the database
   * @param { Object } data - the likes record
   */
  static async likePost(data) {
    try {
      const {user_id, post_id, like_value} = data;

      const likeResult = await db.oneOrNone(
        likesQuery.likePost, [user_id, post_id, like_value]);
      
      return likeResult;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to like post from likes.model: ${err}`);
      throw new Error('Failed to like Post');
    }
  }

  static async unlikePost(data) {
    try {
      const { like_value, user_id, post_id } = data;

      const unlikeResult = await db.oneOrNone(
        likesQuery.unlikePost, [like_value, user_id, post_id]);

      return unlikeResult;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to unlike post from likes.model: ${err}`);
      throw new Error('Failed to unlike Post');
    }
  }

  static async fetchLikes(data) {
    try {
      const { user_id } = data;

      const likes = await db.any(likesQuery.fetchLikes, [user_id]);
      const count = await db.oneOrNone(likesQuery.fetchLikesCount, [user_id]);

      return {
        likes,
        count
      };
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch likes from likes.model: ${err}`);
      throw new Error('Failed to fetch likes');      
    }
  }
}

export default Likes;
