<template>
  <div class="list">
    <van-cell-group class="list-item">
      <div class="l-i-title" @click="router.push('/operation')">
        <span>02.28</span>
        <span>支:10.00</span>
      </div>
      <van-swipe-cell>
        <van-cell title="交通" value="-10.00"  label="描述信息"  @click="showPopup"/>
        <template #right>
          <van-button square type="primary" text="修改" @click="router.push('/operation')"/>
          <van-button square type="danger" text="删除" @click="onDelete"/>
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-cell title="水电" value="-50.00"  @click="showPopup"/>
        <template #right>
          <van-button square type="primary" text="修改" @click="router.push('/operation')"/>
          <van-button square type="danger" text="删除" @click="onDelete"/>
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <van-popup v-model:show="show"
               position="bottom"
               round
               :style="{ height: '25%' }">
      <div class="list-cell">
        <div class="l-c-detail"><h6>账单详情</h6>
          <div>
            <!-- <span>退款</span>   -->
            <span @click="router.push('/operation')">修改</span>  <span @click="onDelete">删除</span></div>
        </div>
        <van-cell title="金额" value="-10.00"  />
        <van-cell title="分类" value="三餐" />
        <van-cell title="时间" value="2022.03-01 11:41"  />
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { Dialog } from 'vant';
const router = useRouter();
const show = ref<boolean>(false);
const showPopup = () => {
  show.value = true;
};
const onDelete =() =>{
  Dialog.confirm({
    title: '提示',
    message:
        '确认要删除此账单吗？',
  })
    .then(() =>{
      console.log()
    })
    .catch((err) => {
      console.log(err)
    });
}
</script>

<style scoped lang="scss">
.list{
  height: fit-content;
  padding: 0 12px;
  font-size: 14px;
  margin-top: 12px;
  border-radius: 8px;
  background: #fff;
  :deep{
    .van-cell__value{
      color:#FD5A31;
    }
  }
  .list-item{
    .l-i-title{
      height: 36px;
      line-height: 36px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #EFEFEF;
    }
    :deep{
      .van-cell__title{
        &::before {
          content: "";
          width: 4px;
          height: 4px;
          position: absolute;
          left: 0;
          top: 20px;
          background: #FD5A31;
          border-radius: 50%;
        }
      }
    }
  }

  .list-cell{
    .l-c-detail{
      height: 32px;
      padding: 12px;
      line-height: 32px;
      display: flex;
      justify-content: space-between;
      span{
        margin-left: 24px;
        &:last-child{
          color: #FD5A31;
        }
      }
    }
  }
}

</style>