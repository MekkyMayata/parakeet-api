import Post from '../models/post.model';
import constants from '../../config/constants';
import config from '../../config';
import { generateRandomString } from '../controllers/auth_controller/auth.utils';

const { MIN_ID_LENGTH } = constants;
const { paginationLimit } = config;

class PostService {
  /**
   * @description - creates a new image post
   * @param { Object } data - obtained post details
   * @returns { Object } { success: true, post }
   */
  static async createNewPost(data) {
    try {
      const post = await Post.createNewPost(data);
      return {
        success: true,
        post
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - fetches a post by id
   * @param { String } id
   * @return { Object } 
   */
  static async fetchPostById(id) {
    try {
      const post = await Post.fetchPostById(id);
      return {
        success: true,
        post
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }

  }

  /**
   * @description - generates a unique post id 
   * @returns { Object }
   */
  static async generatePostId() {
    try {
      let id = generateRandomString(MIN_ID_LENGTH);
      let idExists = true;

      while (idExists) {
        idExists = await Post.verifyPostId(id);
        if (idExists) {
          id = generateRandomString(MIN_ID_LENGTH);
        }
      }
      return {
        success: true,
        id
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - deletes a post by id
   * @param { String } id - post data
   */
  static async deletePostById(data) {
    try {
      const post = await Post.deletePostById(data);
      return {
        success: true,
        post
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  /**
   * @description - fetches all user posts
   * @param { Object } data
   * @returns { Object }
   */
  static async fetchPosts(data) {
    try {
      data.limit = paginationLimit;
      data.offset = (Number(data.page) - 1) * data.limit;
      const result = await Post.fetchPosts(data);
      const postCount = result.count;
      const itemCount = parseFloat(postCount);
      const pageCount = Math.ceil(itemCount / data.limit);

      return {
        success: true,
        data: {
          posts: result.posts,
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

}

export default PostService