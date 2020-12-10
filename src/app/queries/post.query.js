const query = {
  createImagePost: `
    INSERT INTO posts (
      id, user_id, post_path, post_caption, post_latitude, post_longitude
    ) VALUES ($1, $2, $3, $4, $5, $5, $6)
    RETURNING *
  `,
  deleteImagePostByPost_path: `
      DELETE FROM users WHERE post_path = $1
  `,
  findImagePostById:  `
      SELECT * FROM posts WHERE id = $1
  `,
  findImagePostByPath: `
      SELECT * FROM posts WHERE post_path = $1
  `,
  getUserImagePost: `
      SELECT
        users.username,
        users.category,
        posts.id AS post_id, 
        posts.post_path, 
        posts.post_caption, 
        posts.post_latitude, 
        posts.post_longitude, 
        posts.post_date
      FROM posts
      INNER JOIN users ON users.id = posts.user_id
      ORDER BY post_date DESC

  `
}

export default query;