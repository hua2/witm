<template>
    <div class="login">
        <div class="login-back" @click="router.back()">
          <van-icon name="cross" size="18"/>
          <span>登录</span>
        </div>
        <p>嗨</p>
        <p>欢迎使用钱呢</p>
       <van-form>
        <van-cell-group inset>
            <van-field
            v-model="isLogin.account"
            name="account"
            label="账号"
            placeholder="账号"
            :rules="[{ required: true, message: '账号' }]"
            />
            <van-field
            v-model="isLogin.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 24px;">
            <van-button square block type="primary" native-type="submit" @click="authClick">
            开始登录
         </van-button>
        </div>
</van-form>
    </div>
</template>

<script lang="ts">
  import {defineComponent } from 'vue'
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex'
  import AuthService from "@/services/auth-service";
  import { ILogin } from '@/types/auth';


  export default defineComponent({
    name:'Witm-Login',
     setup() {
        const router = useRouter()
        const store = useStore()
        let isLogin: ILogin ={
           account: 'admin',
           password: '123456',
        }
        const authClick = () => { {
        AuthService.authenticate(isLogin).then((rep) => {
           const { id_token } = rep;
            if (id_token) {
              sessionStorage.setItem("token", id_token);
              store.commit('setToken', id_token);
              store.dispatch('getInfo')
              router.push('/')
            }
          });
        }
      }

      return {
        authClick,
        isLogin,
        router
      };
  }, 
 })
</script>

<style scoped lang="scss">
.login{
  .login-back{
    margin-left: 12px;
    padding-bottom: 120px;
    span{
      font-size: 16px;
      margin-left: 16px;
    }
  }
  p{
    font-size: 24px;
    font-weight: bold;
    padding-left: 18px;
    margin-bottom: 16px;
  }
}

</style>