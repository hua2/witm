import { defineStore } from "pinia";
import { UserState } from "./types";
import AuthService from "@/services/auth-service";

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        account: undefined,
        avatar: undefined,
        id: undefined,
        ledgerId: undefined,
        nickName: undefined
      }),
getters: {
    // getInfo(state: UserState): UserState {
    //     return { ...state };
    //   },
  },
actions: {
    getUserInfo(){
        AuthService.account().then((rep) =>{
            console.log('getUserInfo-rep',rep)
        })
    }
 }
});
