import moment from 'moment';
import db from '../utils/database';
import followerQuery from '../queries/follow.query';

class Follow {
  /**
   * @description - follows a registered user
   * @param { Object } - the follow records
   * @returns { Object } created follow object
   */
  static async followUser(followData) {
    try {
      const {
        user_id: user_id,
        follow_id: follower_id
      } = followData;
      const follow = await db.oneOrNone(followerQuery.followUser,
        [user_id, follower_id]);
      
      return follow;
    } catch (err) {
      console.log(err);
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to follow user from Follow model: ${err}`);
      throw new Error('Failed to follow user');
    }
  }

  /**
   * @description - fetches a user record 
   * @param { Object } userData - the user object
   */
  static async fetchUserByUsername(userData) {
    try {
      const {
        username
      } = userData;

      const user = await db.oneOrNone(followerQuery.fetchUserByUsername,
        [username]);
      return user;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY,  h:mm:ss')}] Failed to fetch user from Follow model: ${err}`);
      throw new Error('Failed to fetch user')
    }
  }

  /**
   * @description - unfollow a certain user
   * @param { Object } followData - follow records
   */
  static async unfollowUser(followData) {
    try {
      const {
        userId:user_id,
        follow_id: follower_id
      } = followData;

      const unfollow = await db.oneOrNone(followerQuery.unfollowUser,
        [user_id, follower_id]);
      return unfollow;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to unfollow user from Follow model: ${err}`);
      throw new Error('Failed to unfollow user');
    }
  }

  /**
   * @description
   * @param { Object } data
   */
  static async fetchFollowers(data) {
    try {
      const { userId: id, offset, limit }  = data;
      const followersResult = await db.any(followerQuery.fetchFollowers, [id, offset, limit]);
      const followersCount = await db.oneOrNone(followerQuery.getFollowersCount);
      return {
        followersResult,
        followersCount
      };
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user followers from Follow model: ${err}`);
      throw new Error('Failed to fetch user followers');
    }
  }

  static async fetchFollowing(data) {
    try {
      const { userId: id, offset, limit } = data;
      const followingResult = await db.any(followerQuery.fetchFollowing, [id, offset, limit]);
      const followingCount = await db.oneOrNone(followerQuery.getFollowingCount, [id]);
      return {
        followingResult,
        followingCount
      };
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user follows from Follow model: ${err}`);
      throw new Error('Failed to fetch user follows');
    }
  }

  static async fetchFollower(data) {
    try {
      const {
        user_id:user_id,
        follow_id: follower_id
      } = data;
      const followingResult = await db.oneOrNone(followerQuery.fetchFollower, [user_id, follower_id]);
      return followingResult;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user follower from Follow model: ${err}`);
      throw new Error('Failed to fetch user follower');
    }
  }
}


export default Follow;