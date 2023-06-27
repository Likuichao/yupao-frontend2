/*
    用户类别
 */

export type userType = {
    id?: number
    username?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStatus?: string;
    userRole?: number;
    createTime?:Date;
    planetCode?:string;
    tags: string[];
    profile: string;
};