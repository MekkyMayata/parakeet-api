import moment from 'moment';
import db from '../utils/database';
import userQuery from '../queries/user.query';
import logger from '../../config/logger';

class User {
    /**
     * @description - Create a new user on the database
     * @param { Object } userData - the user records
     * @returns { Object } created user records or error
     */
    static async createUser(userData) {
        try {
            const {
                id, 
                name: name, 
                username: username,
                password: password, 
                email: email,
                telephone: telephone, 
                gender: gender, 
                website: website, 
                bio: bio,
                category: category
            } = userData;
            const user = await db.oneOrNone(
                userQuery.createUser,
                [id, name, username, password, email, telephone, gender, website, bio, category]
                );
            return user;
        } catch (err) {
            logger.error(`[${moment.format('DD-MM-YYYY, h:mm:ss')}]`,
            'Error: Failed to create user from user.model', err);
            throw new Error('Failed to create user');
        }
    }

    /**
     * @description - Fetch single user from database
     * @param { Number } id - the user id
     * @returns { Object } user object
    */
    static async findUserById(id) {
        try {
            const user = await db.oneOrNone(userQuery.findUserById, [id]);
            return user;
        } catch (err) {
            logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}]`, 
            'Error: Failed to fetch user from findUserById method in user.model', err);
            throw new Error('Failed to fetch user');
        }
    }

    /**
     * @description - Fetch single user from database
     * @param { String } email - the user email
     * @returns { Object } user object
     */
    static async findUserByEmail(email) {
        try {
            const user = await db.oneOrNone(userQuery.findUserByEmail, [email]);
            return user;
        } catch (err)  {
            logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}]`,
            'Error: Failed to fetch user from findUserByEmail method in user.model', err);
            throw new Error('Failed to fetch user');
        }
    }
}

export default User;