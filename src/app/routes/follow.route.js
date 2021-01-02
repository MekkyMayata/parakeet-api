import express from 'express';
import { extractUser } from '../controllers/auth_controller/auth.utils';
import FollowUserController from '../controllers/follow_controller/follow.user.controller';
import GetFollowersController from '../controllers/follow_controller/get.followers.controller';
import UnfollowUserController from '../controllers/follow_controller/unfollow.user.controller';
import GetFollowingcontroller from '../controllers/follow_controller/get.following.controller';

const Router = express.Router();

Router.post('/connect', extractUser, FollowUserController.followUser);
Router.get('/followers', extractUser, GetFollowersController.fetchFollowers);
Router.get('/follower', extractUser, GetFollowersController.fetchFollower)
Router.get('/following', extractUser, GetFollowingcontroller.fetchFollowing);
Router.delete('/user-follows', extractUser, UnfollowUserController.unfollowUser);

export default Router;