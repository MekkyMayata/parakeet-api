const query = {
  createNewPost: `
    INSERT INTO posts (
      post_id, user_id, post_path, post_caption, post_latitude, post_longitude
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
  deleteImagePostById: `
      DELETE FROM posts 
      WHERE post_id = $1 AND user_id = $2
  `,
  findImagePostById:  `
      SELECT * FROM posts WHERE post_id = $1
  `,
  verifyImagePostById: `
      SELECT * FROM posts WHERE post_id = $1
  `,
  findImagePostByPath: `
      SELECT * FROM posts WHERE post_path = $1
  `,
  fetchPosts: `
      SELECT
        users.id,
        users.username,
        users.category,
        posts.post_id, 
        posts.post_path, 
        posts.post_caption, 
        posts.post_latitude, 
        posts.post_longitude, 
        posts.post_date
      FROM posts
      INNER JOIN users ON users.id = posts.user_id
      WHERE posts.user_id = $1
      ORDER BY posts.post_date DESC
      OFFSET $2
      LIMIT $3
  `,
  getPostsCount: `
      SELECT count(*) AS count 
      FROM posts
      INNER JOIN users ON users.id = posts.user_id
  `
}

export default query;