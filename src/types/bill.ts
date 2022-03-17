export interface IBill {
    id?:string,
    operator?:string,
    createTime?:string,
    updateTime: null,
    money?: number
    remark: null,
    useDate?:string,
    classifyId?: number
    ledgerId?: number
    userId?: number
    showMoney?:string,
    classifyName?:string,
}
export interface IListParams {
    date?:string,
    ledgerId?:string
}
