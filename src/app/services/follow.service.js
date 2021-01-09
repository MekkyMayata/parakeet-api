import Follow from '../models/follow.model';
import config from '../../config';

const { paginationLimit } = config;

class FollowService {
  
  /**
   * @description - follows a registered user
   * @param { Object } data - obtained follow data
   * @returns { Object } { success: true, followResult }
   */
  static async followUser(data) {
    try {
      const followResult = await Follow.followUser(data);
      return {
        success: true,
        followResult
      }
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  static async fetchUserByUsername(data) {
    try {
      const user = await Follow.fetchUserByUsername(data);
      return {
        success: true,
        user
      }
    } catch (err) {
      return {
        success: false,
        message: err.message
      }
    }
  }

  /**
   * @description - unfollows a registered user
   * @param { Object } data 
   */
  static async unfollowUser(data) {
    try {
      const unfollowResult = await Follow.unfollowUser(data);
      return {
        success: true,
        unfollowResult
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }
  
  /**
   * @description - fetches all user followers
   * @param { Object } data 
   */
  static async fetchFollowers(data) {
    try {
      data.limit = paginationLimit;
      data.offset = (Number(data.page) - 1) * data.limit;
      
      const followerResult = await Follow.fetchFollowers(data);
      const followerCount = followerResult.followersCount;
      const itemCount = parseFloat(followerCount);
      const pageCount = Math.ceil(itemCount / data.limit)

      return {
        success: true,
        data: {
          followers: followerResult.followersResult,
          item_count: itemCount,
          page_count: pageCount,
          current_page: Number(data.page)
        }
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - fetches all user follows
   * @param { Object } data 
   */
  static async fetchFollowing(data) {
    try {
      data.limit = paginationLimit;
      data.offset = (Number(data.page) - 1) * data.limit;

      const followResult = await Follow.fetchFollowing(data);
      const followCount = followResult.followingCount;
      const itemCount = parseFloat(followCount);
      const pageCount = Math.ceil(itemCount / data.limit);

      return {
        success: true,
        data: {
          follows: followResult.followingResult,
          item_count: itemCount,
          page_count: pageCount,
          current_page: Number(data.page)
        }
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  static async fetchFollower(data) {
    try {
      const followingResult = await Follow.fetchFollower(data);
      return {
        success: true,
        followingResult
      }
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }
}

export default FollowService;