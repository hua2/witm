/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
import { ILedger } from "@/types/ledger";
class LedgerService {
    userList(): Promise<ILedger[]> {
        return http.get("api/v1/money/users/ledgers");
    }
    delete(data:number): Promise<void> {
        return http.get("api/v1/money/users/ledgers/" + data);
    }
    add(data: any): Promise<ILedger[]> {
        return http.post("api/v1/money/users/ledgers" + data);
    }
    update(data: any): Promise<ILedger[]> {
        return http.put("api/v1/money/users/ledgers" + data);
    }
}
export default new LedgerService();
