<template>
  <div class="login">
    <div class="login-back" @click="router.back()">
      <van-icon name="cross" size="18" />
      <span>登录</span>
    </div>
    <p>嗨</p>
    <p>欢迎使用钱呢</p>
    <van-form show-error :show-error-message="false" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="account"
          name="account"
          label="账号"
          placeholder="请填写账号"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true }]"
        />
      </van-cell-group>
      <div style="margin: 24px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="isLoading"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/index";
import AuthService from "@/services/auth-service";
import { ILogin } from "@/types/auth";

const isLoading = ref<boolean>(false);
const router = useRouter();
const userStore = useUserStore();
const account = ref("");
const password = ref("");

const onSubmit = (values: ILogin) => {
  isLoading.value = true;
  AuthService.authenticate(values)
    .then((rep) => {
      const { id_token } = rep;
      if (id_token) {
        sessionStorage.setItem("token", id_token);
        userStore.getUserInfo();
        router.push("/home");
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<style scoped lang="scss">
.login {
  .login-back {
    margin-left: 12px;
    padding-bottom: 120px;
    span {
      font-size: 16px;
      margin-left: 16px;
    }
  }
  p {
    font-size: 24px;
    font-weight: bold;
    padding-left: 18px;
    margin-bottom: 16px;
  }
}
</style>
