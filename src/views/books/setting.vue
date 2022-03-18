<template>
  <div class="books-setting">
    <van-nav-bar title="账本设置" left-arrow fixed :placeholder="true" @click-left="goBack"></van-nav-bar>
    <div class="content">
      <div class="b-s-common">
        <h5>设置</h5>
        <van-field label="修改" is-link readonly @click="updateClick" />
      </div>
      <div class="b-s-common">
        <h5>操作</h5>
        <van-field label="默认账本" is-link readonly @click="defaultClick" />
        <van-field label="删除账单" is-link readonly @click="deleteClick" />
      </div>
      <div class="b-s-common">
        <h5>账本成员</h5>
        <div class="b-s-avatar" v-for="i in list" :key="i.nickName">
          <img :src="'/api/v1/storage/' + i.avatar" />
          <p>{{ i.nickName ? i.nickName : i.account }}</p>
          <div class="b-s-btn" @click="delClick(i.id)">
            <img :src="require('@/assets/img/del.png')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Dialog, Toast } from "vant";
import LedgerService from "@/services/ledger-service";
import { useRouter, useRoute } from "vue-router";
import { ILedger, IShare } from "@/types/ledger";

const router = useRouter();
const route = useRoute();
let id = ref(route.query.id);
const goBack = () => history.back();

//默认账本
const defaultClick = () => {
  Dialog.confirm({
    message: "确认设置此账单为默认账本？"
  })
    .then(() => {
      LedgerService.default(id.value?.toString() || "").then(() => {
        Toast("设置成功");
        router.push("/books");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteClick = () => {
  Dialog.confirm({
    title: "删除账单",
    message: "确认删除此账单？",
  })
    .then(() => {
      LedgerService.delete(id.value?.toString() || "").then(() => {
        Toast("删除成功");
        router.push("/books");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//获取详情
let leader: ILedger = reactive({});
if (id.value) {
  LedgerService.getDetials(id.value?.toString() || "").then((rep: ILedger) => {
    Object.assign(leader, rep);
  });
}
//账本共享用户列表
let list: IShare[] = reactive([]);
LedgerService.getList(id.value?.toString() || "").then((rep) => {
  list.push(...rep);
});

//取消分享账本
const delClick = (ledgerId) => {
  Dialog.confirm({
    message: "取消共享账本吗？",
  })
    .then(() => {
      LedgerService.cancel(
        leader.id?.toString() || "",
        ledgerId?.toString() || "",
      ).then(() => {
        Toast("取消成功");
        router.push("/books");
      });
    })
    .catch(() => {
      // on cancel
    });
};
const updateClick = () => {
  router.push({
    path: "/books/edit",
    query: {
      id: id.value,
    },
  });
};
</script>

<style scoped lang="scss">
.books-setting {
  font-size: 14px;
  .b-s-common {
    height: fit-content;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 8px;
  }
  h5 {
    font-weight: bold;
    padding: 16px;
  }
  p {
    padding: 16px 8px;
  }
  .b-s-avatar {
    display: flex;
    align-items: center;
    padding: 4px 24px;
    border-bottom: 1px dotted #efefef;
    img {
      width: 32px;
      height: 33px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .b-s-btn {
    display: block;
    width: 100%;
    text-align: right;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
