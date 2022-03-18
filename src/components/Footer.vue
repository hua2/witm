<template>
  <div class="footer">
    <van-tabbar v-model="active" route active-color="#519AF8">
      <van-tabbar-item icon="wap-home-o" to="/">账单</van-tabbar-item>
      <van-tabbar-item to="/operation">
        <img :src="require('@/assets/img/add.png')" width="32" />
      </van-tabbar-item>
      <van-tabbar-item icon="balance-pay" to="/total">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const active = ref(0);

</script>

<style scoped lang="scss">
.footer {
  width: 100%;
}
</style>
