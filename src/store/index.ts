import { createStore } from 'vuex';

import RootStateTypes from '@/store/interface';
import AuthService from "@/services/auth-service";

export default createStore<RootStateTypes>({
    state: {
        token:'',
        account: {}
    },
    getters :{
    },
    mutations: {
        setToken(state,data){
            console.log('setToken ', data);
            state.token = data;
        },
        setAccount: (state, data:any) => {
            console.log('setAccount-mutations', data);
            state.account = data
        },
    },
    actions: {
        getInfo (context): void {
            AuthService.account().then((rep) => {
                context.commit("setAccount", rep);
            });
        }
    },
    modules: {
    }
});