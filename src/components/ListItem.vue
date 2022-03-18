<template>
  <div class="list">
    <van-cell-group class="list-item" v-for="(item,index) in list" :key="index">
      <div class="l-i-title" @click="router.push('/operation')">
        <span>{{item.useDate}}</span>
        <span>{{item.type==='INCOME'?'收':'支'}}:{{item.money}}</span>
      </div>
      <van-swipe-cell>
        <van-cell :title="item.classifyName" :value="item.showMoney" :label="item.remark" @click="showPopup" />
        <template #right>
          <van-button square type="primary" text="修改" @click="updateClick(item.id)" />
          <van-button square type="danger" text="删除" @click="delClick(item.classifyId)" />
        </template>
      </van-swipe-cell>
       <!-- <van-popup v-model:show="show" position="bottom" round :style="{ height: '25%' }">
      <div class="list-cell">
        <div class="l-c-detail">
          <h6>账单详情</h6>
          <div>
            <span @click="router.push('/operation')">修改</span>
            <span @click="delClick(item.classifyId)">删除</span>
          </div>
        </div>
        <van-cell title="金额" value="-10.00" />
        <van-cell title="分类" value="三餐" />
        <van-cell title="时间" value="2022.03-01 11:41" />
      </div>
    </van-popup> -->
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { Dialog,Toast } from 'vant';
import BillService from "@/services/bill-service";
import { RBill } from "@/types/bill";
const router = useRouter();
const show = ref<boolean>(false);
const showPopup = () => {
  show.value = true;
}

const delClick = (id) => {
  console.log('id',id)
  Dialog.confirm({
    title: "提示",
    message: "确认要删除此账单吗？",
  })
    .then(() => {
      BillService.delete(id).then(() => {
        Toast("删除成功");
        router.push("/books");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const updateClick = (id) => {
  router.push({
    path: "/operation",
    query: {
      id: id,
    },
  });
};
onMounted(() => {
  getList();
});
let list: RBill[] = reactive([]);
const getList = () => {
  BillService.list({}).then((rep) => {
    list.push(...rep);
  });
}
</script>

<style scoped lang="scss">
.list {
  height: fit-content;
  padding: 0 12px;
  font-size: 14px;
  margin-top: 12px;
  border-radius: 8px;
  background: #fff;
  :deep {
    .van-cell__value {
      color: #fd5a31;
    }
  }
  .list-item {
    .l-i-title {
      height: 36px;
      line-height: 36px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;
    }
    :deep {
      .van-cell__title {
        &::before {
          content: "";
          width: 4px;
          height: 4px;
          position: absolute;
          left: 0;
          top: 20px;
          background: #fd5a31;
          border-radius: 50%;
        }
      }
    }
  }

  .list-cell {
    .l-c-detail {
      height: 32px;
      padding: 12px;
      line-height: 32px;
      display: flex;
      justify-content: space-between;
      span {
        margin-left: 24px;
        &:last-child {
          color: #fd5a31;
        }
      }
    }
  }
}
</style>