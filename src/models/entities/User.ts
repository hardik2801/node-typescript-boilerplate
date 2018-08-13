import {AllowNull, BeforeSave, Column, DataType, HasOne, IsEmail, Table, Unique} from 'sequelize-typescript';
import {AccessToken} from "./AccessToken";
import {BaseModel} from "./BaseModel";
import {Utils} from "../../utils";

@Table
export class User extends BaseModel<User> {

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @HasOne(() => AccessToken)
    accessToken: AccessToken;

    @BeforeSave
    static encryptPassword(instance: User) {
        instance.password = Utils.encryptPassword(instance.password);
    }
}
