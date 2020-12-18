import express from 'express';
import { extractUser } from '../controllers/auth_controller/auth.utils';
import GetPostsController from '../controllers/post_controller/get.post.controller';
import CreatePostController from '../controllers/post_controller/create.post.controller';
import DeletePostController from '../controllers/post_controller/delete.post.controller';

const Router = express.Router();


Router.get('/all', extractUser, GetPostsController.fetchPosts);
Router.get('/', GetPostsController.fetchPostById)
Router.post('/new', extractUser, CreatePostController.createPost);
Router.delete('/destroy', extractUser, DeletePostController.deletePostById);


export default Router;