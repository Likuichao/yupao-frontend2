/*
    用户类别
 */

import {userType} from "./user";

export type teamType = {
    id: number;
    "name": string;
    "description": string;
    "expireTime"?:Date;
    "maxNum": Number;
    "password"?: string;
    //todo 定义枚举值类型
    "status": Number;
    createTime:Date;
    updateTime:Date;
    createUser: userType;
    hasJoinNum:Number;
};