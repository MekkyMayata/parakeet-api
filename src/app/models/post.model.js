import moment from 'moment';
import db from '../utils/database';
import postQuery from '../queries/post.query';

class Post {
  /**
   * @description - Creates a new post on the database
   * @param { Object } postData - the post records
   * @returns { Object } created post records
   */
  static async createNewPost(postData) {
    try {
      const {
        post_id: post_id,
        user_id: user_id,
        post_path: post_path,
        post_caption: post_caption,
        post_latitude: post_latitude,
        post_longitude: post_longitude
      } = postData;

      const post = await db.oneOrNone(
        postQuery.createNewPost,
        [post_id, user_id, post_path, post_caption, post_latitude, post_longitude]);
      
      return post;
    } catch (err) {
        global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to create image post from post.model: ${err}`);
        throw new Error('Failed to save post');
    }
  }

  /**
   * @description - Fetch single post from database
   * @param { String } id - the post id
   * @returns { Object } post object
   */
  static async fetchPostById(id) {
    try {
      const post = await db.oneOrNone(postQuery.fetchPostById, [id]);
      return post;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch post from findPostById method in post.model: ${err}`);
      throw new Error('Failed to fetch post');
    }
  }

  /**
   * @description - verifies post id 
   * @param { String } id post id
   * @returns { Object } post object
   */
  static async verifyPostId(id) {
    try {
      const post = await db.oneOrNone(postQuery.fetchPostById, [id]);
      return post;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to verify post id from verifyPostById method in post.model: ${err}`);
      throw new Error('Failed to verify post id');
    }
  }

  /**
   * @description - deletes single post from database
   * @param { String } data - the post details
   * @returns { Object } deleted post object
   */
  static async deletePostById(data) {
    try {
      const { postId: post_id, userId: user_id } = data;
      const post = await db.oneOrNone(postQuery.deleteImagePostById, [post_id, user_id]);
      return post;
    } catch (err) {
      global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch post from deletePost method in post.model: ${err}`);
      throw new Error('Failed to delete post');
    }
  }

  /**
   * @description - fetches user posts
   * @param { Object } data - { post_id, offset, limit }
   * @returns { Object } user object
   */
  static async fetchPosts(data) {
    try {
      const { userId: user_id, offset, limit } = data;
      const posts = await db.any(postQuery.fetchPosts, [user_id, offset, limit]);
      const count = await db.oneOrNone(postQuery.getPostsCount, [user_id]);
      return {
        posts,
        count
      };
    } catch (err) {
        global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user posts from findUserPostsById method in posts.model: ${err}`);
        throw new Error('Failed to fetch user posts');
    }
    
  }
}

export default Post;