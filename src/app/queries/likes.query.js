const query = {
  likePost: `
    INSERT INTO likes (
      user_id, post_id, like_value
    ) VALUES ($1, $2, $3)

  `,
  unlikePost: `
    UPDATE likes SET like_ value = $1
    WHERE user_id = $2
    AND post_id = $3
  `,
  // ******************verify style and usefuleness*************
  fetchLikes: `
    SELECT post_id, like_value
    FROM likes
    WHERE user_id = $1
    AND like_value = TRUE
  `,
  fetchLikesCount: `
    SELECT count(*) AS COUNT
    FROM likes
    WHERE user_id = $1
    AND like_value = TRUE
  `
}

export default query;