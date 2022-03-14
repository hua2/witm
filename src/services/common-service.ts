/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
//上传系统文件
class CommonService {
  storage(data: File): Promise<any> {
    const fd = new FormData()
    fd.append('file', data)
    return http.post("api/v1/storage", fd);
  }
}
export default new CommonService();
