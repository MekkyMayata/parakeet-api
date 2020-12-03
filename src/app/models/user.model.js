import moment from 'moment';
import db from '../utils/database';
import userQuery from '../queries/user.query';

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
                category: category,
                salt: salt
            } = userData;
            const user = await db.oneOrNone(
                userQuery.createUser,
                [id, name, username, password, email, telephone, gender, website, bio, category, salt]);
            return user;
        } catch (err) {
            global.logger.error(`[${moment.format('DD-MM-YYYY, h:mm:ss')}] Failed to create user from user.model: ${err}`);
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
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user from findUserById method in user.model: ${err}`);
            throw new Error('Failed to fetch user');
        }
    }

    /**
     * @description - Fetch single user by email
     * @param { String } email - the user email
     * @returns { Object } user object
     */
    static async findUserByEmail(email) {
        try {
            const user = await db.oneOrNone(userQuery.findUserByEmail, [email]);
            return user;
        } catch (err)  {
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user from findUserByEmail method in user.model: ${err}`);
            throw new Error('Failed to fetch user');
        }
    }

    /**
     * @description - fetch user by token
     * @param { String } token
     * @returns { Object } user object
     */
    static async findUserByToken(token) {
        try {
            const user = await db.oneOrNone(userQuery.findUserByToken, [token]);
            return user;
        } catch (err) {
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to fetch user with provided token from findUserByToken method in user.model ${err}`);
            throw new Error('Failed to find token for user')
        }
    }

    /**
     * @description - Verify user id
     * @param { Number } id - user id
     * @returns { Object } user object
     */
    static async verifyUserId(id) {
        try {
            const user = await db.oneOrNone(userQuery.verifyUserId, [id]);
            return user;
        } catch(err) {
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to verify user id from verifyUserId method in user.model: ${err}`);
            throw new Error('Failed to verify user');
        }
    }

    /**
     * @description - save user password reset token
     * @param { Number } id - user id
     * @param { String } token - provided token
     */
    static async saveUserPasswordResetToken(id, token) {
        try {
            await db.oneOrNone(userQuery.saveUserPasswordResetToken, [token, moment(), id]);
            return true;
        } catch (err) {
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to save user password reset token from saveUserPasswordResettoken method in user.model: ${err}`);
            throw new Error('Failed to save user password reset token');
        }
    }

    /**
     * @description - update user password credentials
     * @param { Object } data - user data
     * @returns { Boolean } true
     */
    static async updatePassword(data) {
        try {
            const { password, userId, salt } = data;
            await db.none(userQuery.updatePassword, [null, null, salt, password, userId]);
            return true;
        } catch(err) {
            global.logger.error(`[${moment().format('DD-MM-YYYY, h:mm:ss')}] Failed to update user password from updatePassword method in user.model: ${err}`);
            throw new Error('Failed to update user password');
        }
    }
}

export default User;