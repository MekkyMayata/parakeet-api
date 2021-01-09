import Likes from '../models/likes.model';

class LikesService {

  static async likePost(data) {
    try {
      const like = await Likes.likePost(data);
      return {
        success: true,
        like
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      }
    }
  }

  static async unlikePost(data) {
    try {
      const unlike = await Likes.unlikePost(data);
      return {
        success: true,
        unlike
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      }
    }
  }

  static async fetchLikes(data) {
    try {
      const likes = await Likes.fetchLikes(data);
      const likesCount = likes.count;

      return {
        success: true,
        data: {
          likes: likes.likes,
          likes_count: likesCount
        }
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

}

export default LikesService;
