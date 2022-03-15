export interface ILedger {
    id?:string,
    name?: string;
    remark?: string;
    operator?: string;
    cover?: string, //封面图url
    startDate?: number //开始日期
}
export interface IUploader {
    fileName:string,
}
