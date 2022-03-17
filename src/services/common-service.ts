/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/http-common";
export interface IIcon {
  id?:string,
  name?:string,
  icon?:string
}

//上传系统文件
class CommonService {
  storage(data: File): Promise<any> {
    const fd = new FormData()
    fd.append('file', data)
    return http.post("api/v1/storage", fd);
  }
  iconList(): Promise<IIcon[]> {
    return http.get("api/v1/system/icons");
}
}
export default new CommonService();
