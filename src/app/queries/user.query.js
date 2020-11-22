const query = {
    createUser: `
        INSERT INTO users (
            id, name, username, password, email,telephone, gender, website, bio,category
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `,
    findUserById: `
        SELECT * FROM users WHERE id = $1
    `,
    findUserByEmail: `
        SELECT * FROM users WHERE email = $1
    `,
    findUserByToken: `
        SELECT * FROM users WHERE password_reset_token = $1
    `,
    

};

export default query;