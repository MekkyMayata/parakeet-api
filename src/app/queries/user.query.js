const query = {
    createUser: `
        INSERT INTO users (
            id, name, username, password, email,telephone, gender, website, bio,category, salt
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
    verifyUserId: `
        SELECT * FROM users WHERE id = $1
    `,
    saveUserPasswordResetToken: `
        UPDATE users
        SET password_reset_token = $1, password_reset_token_date = $2
        WHERE id = $3
    `,
    updatePassword: `
        UPDATE users
        SET password_reset_token = $1, password_reset_token_date = $2, salt = $3,
            password = $4
        WHERE id = $5
        `,
};

export default query;