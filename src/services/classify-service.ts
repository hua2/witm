/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
import { IClassify } from "@/types/classify";
class ClassifyService {
    list(params:any): Promise<IClassify[]> {
        return http.get("api/v1/money/users/classifies", {params:params});
    }
    add(data: IClassify): Promise<IClassify> {
        return http.post("api/v1/money/users/classifies", data);
    }
    update(data: IClassify): Promise<IClassify> {
        return http.put("api/v1/money/users/classifies", data);
    }
    delete(data:string): Promise<void> {
        return http.delete("api/v1/money/users/classifies/" + data);
    }
    getDetials(data:string): Promise<IClassify> {
        return http.get("api/v1/money/users/classifies/" + data);
    }
}
  
export default new ClassifyService();
