export interface ILedger {
    name: string;
    remark?: string;
    operator?: string;
}

export interface ULedger {
    id?: number, //ID
    name:string, //名称
    remark: string, //备注
    cover: string, //封面图url
    startDate?: number //开始日期
}