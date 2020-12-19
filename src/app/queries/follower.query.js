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
  unfollowUserByUsername:  `
      DELETE FROM user_followers
      INNER JOIN users ON users.id = user_followers.user_id
      WHERE users.username = $1 
  `
}

export default query;