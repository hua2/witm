/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
import { IBill } from "@/types/bill";
class BillService {
  list(params:any): Promise<IBill[]> {
    return http.get("api/v1/money/users/bills",  { params: params });
  }
  add(data: IBill): Promise<IBill> {
    return http.post("api/v1/money/users/bills", data );
  }
  update(data: IBill): Promise<IBill> {
    return http.put("api/v1/money/users/bills", data);
  }
  delete(data: string): Promise<void> {
    return http.delete("api/v1/money/users/bills/" + data);
  }
  getDetials(data: string): Promise<IBill> {
    return http.get("api/v1/money/users/bills/" + data);
  }
}

export default new BillService();
