<template>
  <div class="header">
    <van-icon name="wap-nav" size="24"/>
    <div>
      <van-cell :value=date?date:currentDate @click="showCalendar = true" is-link arrow-direction="down" />
      <van-popup v-model:show="showCalendar" round
                 position="bottom"
                 :style="{ height: '38%' }">
        <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showCalendar = false"
            @confirm="onConfirm"
        />
      </van-popup>
    </div>
    <router-link to="/total"><img :src="require('@/assets/img/overview.png')" width="22"/></router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//显示当前时间
const showCalendar = ref(false);
const time = ref(new Date());
const currentDate = `${time.value.getFullYear()}-${time.value.getMonth() + 1}`;
const date = ref<string>('');
const onConfirm = (value:any) => {
const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}`;
  showCalendar.value = false;
  date.value = formatDate(value);
};

</script>
<style scoped lang="scss">
.header{
  width: calc(100% - 32px);
  height: 48px;
  padding: 0 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-avatar{
    margin: 16px;
  }
}
</style>
