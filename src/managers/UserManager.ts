import {User} from "../models";
import {NotFoundError} from "../errors/NotFoundError";
import {Auth} from "../auth/auth";
import {AuthError} from "../errors/AuthError";

export class UserManager {

    constructor() {

    }

    public async createUser(email: string, password: string, firstName: string, lastName: string) {

        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });
        return newUser.save();
    }

    public async updateUser(userId: string, email: string, firstName: string, lastName: string, profilePicUrl?: string): Promise<User> {

        const user = await User.find<User>({where: {id: userId}});
        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            return user.save();
        } else {
            throw new NotFoundError("No user found");
        }
    }
    public async findByEmail(email: string) {
        const user = await User.findOne<User>({where: {email: email}});
        if (user) {
            return user;
        } else {
            throw new NotFoundError("No user found with the provided email");
        }
    }

    public async deleteUser(userId: string): Promise<User | null> {
        const user = await User.find<User>({where: {id: userId}});
        if (user) {
            await user.destroy();
            return user;
        } else {
            throw new NotFoundError("No user found");
        }
    }

    public async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<User> {
        const user = await User.find<User>({where: {id: userId}});
        if (user) {
            const authorized = await Auth.comparePasswords(currentPassword, user.password);
            if (authorized) {
                user.password = newPassword;
                return user.save();
            } else {
                throw new AuthError("Current password incorrect");
            }
        } else {
            throw new NotFoundError("No user found");
        }
    }
}
