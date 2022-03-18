export interface IClassify {
  id?: string; //ID
  operator?: string; //操作人
  createTime?: string; //新建时间
  updateTime?: null; //更新时间
  name?: string; //名称
  icon?: string; //图标
  type?: string; //INCOME-> 收入，OUTLAY->支出
  userId?: string; //用户id
}
