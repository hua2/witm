<template>
  <div class="home">
    <!-- 首页header -->
    <Header/>
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
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </van-pull-refresh>
    <Footer/>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '@/components/Header.vue'
import ListItem from '@/components/ListItem.vue';
import { useRouter } from 'vue-router';
import Footer from '@/components/Footer.vue'

export default defineComponent({
  name: 'Witm-Home',
  components:{Header, ListItem, Footer},
  setup() {
    const router = useRouter();
    const list = ref<number[]>([]);
    const loading = ref<boolean>(false);
    const finished = ref<boolean>(false);
    const refreshing = ref<boolean>(false);

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };


    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    return {
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      router
    };
  },
});
</script>
<style scoped lang="scss" >
.home{
  width: 100%;
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
