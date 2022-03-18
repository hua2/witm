export interface IBill {
  id?: string;
  operator?: string;
  createTime?: string;
  updateTime?: null;
  money?: number;
  remark?: number;
  useDate?: string;
  classifyId?: number;
  ledgerId?: number;
  userId?: number;
  showMoney?: string;
  classifyName?: string;
}
export interface IListParams {
  date?: string;
  ledgerId?: string;
  type?: string;
}