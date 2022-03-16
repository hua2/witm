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
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AuthService from "@/services/auth-service";
import { ILogin } from "@/types/auth";

export default defineComponent({
  name: "Witm-Login",
  setup() {
    const isLoading = ref<boolean>(false);
    const router = useRouter();
    const store = useStore();
    const account = ref("");
    const password = ref("");

    const onSubmit = (values: ILogin) => {
      isLoading.value = true;
      AuthService.authenticate(values).then((rep) => {
        isLoading.value = false;
        const { id_token } = rep;
        if (id_token) {
          sessionStorage.setItem("token", id_token);
          store.commit("setToken", id_token);
          store.dispatch("getInfo");
          router.push("/ho me");
        }
      });
    };
    return {
      onSubmit,
      account,
      password,
      router,
      isLoading,
    };
  },
});
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