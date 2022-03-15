export interface ILedger {
    id?:string,
    userId?: string;
    name?: string;
    remark?: string;
    operator?: string;
    cover?: string, //封面图url
    shareKey?:string,
    startDate?: number //开始日期
}
export interface IUploader {
    fileName:string,
}
