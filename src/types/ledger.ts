export interface ILedger {
  id?: string;
  userId?: string;
  name?: string;
  remark?: string;
  operator?: string;
  cover?: string; //封面图url
  shareKey?: string;
  startDate?: number; //开始日期
  isDefault?:false,
  isShare?:false
}
export interface IUploader {
  fileName?: string;
}

export interface IShare {
  id?: string;
  operator?: string;
  createTime?: string;
  updateTime?: string;
  account?: string;
  nickName?: null,
  avatar?: string;
  role?: string;
  ledgerId: null
}