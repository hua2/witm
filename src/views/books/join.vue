<template>
  <div class="books-join">
    <van-nav-bar
      title="加入他人账本"
      left-arrow
      fixed
      placeholder="true"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="content">
      <van-field
        v-model="value"
        label="邀请码"
        placeholder="点此输入..."
        required
        clearable
        input-align="right"
      />
      <div class="b-ntn">
        <van-button block type="primary" native-type="submit" :loading="isLoading" @click="onSubmit">
          保存
        </van-button>
        <p @click="show = true">如何获得邀请码?</p>
        <van-popup
          v-model:show="show"
          round
          position="bottom"
          :style="{ height: '30%' }"
        >
          <h3>如何获得邀请码</h3>
          <van-cell title="1.邀请码只能由账本创建者生成(在账本设置页面)" />
          <van-cell
            title="2.创建者将邀请码告知他人后，他人输入该邀请码，即可加入账本"
          />
          <van-cell title="3.每个邀请码有效期为5分钟，过期需要重新生成" />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LedgerService from "@/services/ledger-service";
import { Toast } from "vant";
import router from "@/router";

const isLoading =ref<boolean>(false)
const onClickLeft = () => history.back();
const value = ref<number>(0);
const show = ref<boolean>(false);
const onSubmit = () => {
  isLoading.value = true
  LedgerService.share(value.value).then(() => {
  isLoading.value = false
  Toast("邀请已发送，请等待...");
  setTimeout(() => {
    router.push("/books");
   }, 1000);
 });
};
</script>

<style scoped lang="scss">
.books-join {
  h3 {
    height: 62px;
    line-height: 62px;
    font-size: 18px;
    font-weight: bold;
    padding-left: 16px;
    border-bottom: 1px solid #efefef;
  }
  p {
    color: #969799;
    margin: 24px;
    font-size: 14px;
    text-align: center;
  }
  .b-ntn {
    margin-top: 12px;
  }
}
</style>