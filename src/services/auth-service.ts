/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
import { UserState } from "@/store/types";
class AuthService {
  authenticate(data: any): Promise<any> {
    return http.post("api/v1/authenticate", data);
  }
  account(): Promise<UserState> {
    return http.get("api/v1/account");
  }
}
export default new AuthService();
