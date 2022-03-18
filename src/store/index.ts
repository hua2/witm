import { defineStore } from "pinia";
import { UserState } from "./types";
import AuthService from "@/services/auth-service";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    account: undefined,
    avatar: undefined,
    id: undefined,
    ledgerId: undefined,
    nickName: undefined,
  }),
  getters: {
    // getInfo(state: UserState): UserState {
    //     return { ...state };
    //   },
  },
  actions: {
    getUserInfo() {
      AuthService.account().then((rep) => {
        this.setInfo(rep);
      });
    },
    setInfo(partial:Partial<UserState>){
      console.log('partial',partial)
      this.$patch(partial)
    }
  },
});
