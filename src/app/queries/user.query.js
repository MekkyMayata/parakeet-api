const query = {
    findUserById: `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `,
    findUserByEmail: `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `
};

export default query;