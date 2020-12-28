const query = {
  followUser:`
    INSERT INTO user_followers (
      user_id, follower_id
    ) VALUES ($1, $2)
    RETURNING *
  `,
  fetchUserByUsername: `
      SELECT * FROM users WHERE username = $1
  `,
  unfollowUser:  `
      DELETE FROM user_followers
      WHERE user_id = $1
      AND follower_id = $2
  `,
  fetchFollowers: `
      SELECT
        users.id,
        users.username,
        user_followers.follower_id
      FROM user_followers
      INNER JOIN users ON users.id = user_followers.user_id
      WHERE users.id = $1
      ORDER BY user_followers.followed_at DESC
      OFFSET $2
      LIMIT $3
  `,
  getFollowersCount: `
      SELECT count(*) AS followers_count
      FROM user_followers
      INNER JOIN user_followers ON user_followers.user_id = users.id
      WHERE user_followers.user_id = $1
  `,
  fetchFollowing: `
  SELECT 
    follower_id,
    username,
    user_id 
  FROM user_followers
  INNER JOIN users ON users.id = user_followers.user_id
  WHERE users_followers.follower_id = $1
  ORDER BY user_followers.followed_at DESC
  OFFSET $2
  LIMIT $3
  `,
  getFollowingCount: `
    SELECT count(*) AS following_count
    FROM user_followers
    INNER JOIN users ON users.id = user_followers.user_id
    WHERE user_followers.follower_id = $1;
    `,
  fetchFollower: `
      SELECT * FROM user_followers 
      WHERE user_id = $1
      AND follower_id = $2
  `

}

export default query;
