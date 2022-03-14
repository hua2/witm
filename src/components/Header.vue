<template>
  <div class="header">
    <van-icon name="wap-nav" size="24" @click="showPopup"/>
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
    <van-popup v-model:show="show" position="left" :style="{ width: '60%',height: '100%' }" >
      <div class="header-avatar">
        <van-image
            round
            width="64px"
            height="64px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            @click="goLogin"
        />
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Witm-Header',
  setup() {
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
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
    const router = useRouter();

    const goLogin = () => {
      router.push({
        name: 'login'
      })
    }

    return {
      show,
      showPopup,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate,
      date,
      showCalendar,
      onConfirm,
      goLogin
    };
  },
  props: {
  },
});
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
