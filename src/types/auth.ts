/**用户登录 */
export interface ILogin {
    account?: string;
    password?: string;
}

/**当前登录用户 */
export interface IAccount {
    id: number, //ID
    operator?: string, //操作人
    account: string, //账户
    nickName: null, //昵称
    avatar: string, //头像
}
