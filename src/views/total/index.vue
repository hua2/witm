<template>
  <div class="overview">
    <van-nav-bar
      title="收支总览"
      left-arrow
      fixed
      placeholder="true"
      @click-left="onClickLeft"
      @click-right="show = true"
    >
      <template #right>
        <van-icon name="filter-o" size="18" />
      </template>
    </van-nav-bar>
    <van-calendar
      v-model:show="show"
      type="range"
      color="#519AF8"
      title="自定义日期查询"
      :style="{ height: '500px' }"
      @confirm="onConfirm"
    />
    <div class="content">
      <div class="o-view">
        <h5>收支总览</h5>
        <div class="o-v-block">
          <span>支出</span>
          <p>0.00</p>
        </div>
        <div class="o-v-block">
          <span>收入</span>
          <p>0.00</p>
        </div>
        <div class="o-v-block">
          <span>结余</span>
          <p>0.00</p>
        </div>
        <div class="o-v-block">
          <span>日均支出</span>
          <p>0.00</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Footer from "@/components/Footer.vue";

const onClickLeft = () => history.back();
const date = ref<string>("");
const show = ref<boolean>(false);
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const onConfirm = (values: any) => {
  const [start, end] = values;
  show.value = false;
  date.value = `${formatDate(start)} - ${formatDate(end)}`;
};
</script>
<style scoped lang="scss">
.overview {
  width: 100%;
  .o-view {
    height: 120px;
    padding: 12px;
    font-size: 16px;
    text-align: center;
    border-radius: 16px;
    background: #fff;
    .o-v-block {
      width: 50%;
      float: left;
      font-size: 14px;
      margin-top: 16px;
      span {
        color: #8b8b8b;
      }
      p {
        margin-top: 6px;
      }
    }
  }
}
</style>
