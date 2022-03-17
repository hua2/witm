import { defineStore } from "pinia";
import { UserState } from "./types";
import AuthService from "@/services/auth-service";

export const useUserStore = defineStore("user", {
    state: () => ({
        userINfo: {},
      }),
getters: {
    // getInfo(state: UserState): UserState {
    //     return { ...state };
    //   },
  },
actions: {
    getUserInfo(){
        AuthService.account().then((rep:UserState) =>{
            console.log('getUserInfo-rep',rep)
            this.userINfo = rep
            console.log(' this.userINfo', this.userINfo)
        })
    }
 }
});
