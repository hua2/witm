/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
import { ILedger, IShare } from "@/types/ledger";
class LedgerService {
  userList(): Promise<ILedger[]> {
    return http.get("api/v1/money/users/ledgers");
  }
  add(data: ILedger): Promise<ILedger> {
    return http.post("api/v1/money/users/ledgers", data);
  }
  update(data: ILedger): Promise<ILedger> {
    return http.put("api/v1/money/users/ledgers", data);
  }
  delete(data: string): Promise<void> {
    return http.delete("api/v1/money/users/ledgers/" + data);
  }
  getDetials(data: string): Promise<ILedger> {
    return http.get("api/v1/money/users/ledgers/" + data);
  }
  share(data: number): Promise<void> {
    return http.post("api/v1/money/ledgers/" + data + "/shares");
  }
  cancel(data: string, id: string): Promise<void> {
    return http.delete("api/v1/money/ledgers/" + data + "/shares/" + id);
  }
  //账本共享用户列表 
  getList(data: string): Promise<IShare[]> {
    return http.get("api/v1/money/ledgers/" + data + "/shares/users");
  }
  //设置默认账本
  default(data: string): Promise<void> {
    return http.put("api/v1/money/users/ledgers/" + data + "/default");
  }
}
export default new LedgerService();
