<template>
  <div class="home">
    <!-- 首页header -->
     <div class="home-header">
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
    <div class="content">
      <div class="home-total">
        <div class="h-t-top">
          <div>
            <span>月结余</span>
            <p>0.00</p>
          </div>
          <van-button size="mini" @click="router.push('/books')" round>默认账本</van-button>
        </div>
        <div class="">
          月收入: 0.00 月支出: 0.00
        </div>
      </div>
      <list-item/>
      <list-item/>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ListItem from '@/components/ListItem.vue';
import { useRouter } from 'vue-router';
import Footer from '@/components/Footer.vue'
// import BillService from "@/services/bill-service";


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

// BillService.billList().then()

</script>

<style scoped lang="scss" >
.home{
  width: 100%;
  .home-header{
  width: calc(100% - 32px);
  height: 48px;
  padding: 0 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  .home-total{
    padding: 12px;
    height: 108px;
    color: #fff;
    font-size: 16px;
    background-image: url("https://img.yzcdn.cn/vant/cat.jpeg");
    background-size: 100% 100%;
    border-radius:8px;
    .h-t-top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 54px;
      p{
        margin-top: 6px;
      }
      .van-button--round{
        background: transparent;
        color: #fff;
      }
    }
  }
}
</style>
