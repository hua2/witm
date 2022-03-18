export interface IBill {
  id?: string;
  operator?: string;
  createTime?: string;
  updateTime?: null;
  money?: string;
  remark?: string;
  useDate?: string;
  classifyId?:string;
  ledgerId?: string;
  userId?: string;
  showMoney?: string;
  classifyName?: string;
  type?: string;
}
export interface IListParams {
  date?: string;
  ledgerId?: string;
  type?: string;
}

export interface RBill {
  classifyId?: string;
  classifyName?: string;
  createTime?: string;
  id?: string;
  ledgerId?: string;
  money?: string;
  operator?: string;
  remark?: string;
  showMoney?: string;
  type?: string;
  updateTime?: null;
  useDate?: string;
  userId?: string;
}
