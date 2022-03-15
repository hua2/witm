<template>
  <div class="books-setting">
    <van-nav-bar
      title="账本设置"
      left-arrow
      fixed
      placeholder="true"
      @click-left="goBack"
    >
    </van-nav-bar>
    <div class="content">
      <div class="b-s-common">
        <h5>设置</h5>
        <van-field label="修改" is-link readonly @click="updateClick" />
      </div>
      <div class="b-s-common">
        <h5>操作</h5>
        <van-field label="删除账单" is-link readonly @click="deleteClick" />
      </div>
      <div class="b-s-common">
        <h5>账本成员</h5>
        <p @click="router.push('/books/join')">加入他人账本</p>
        <p @click="onCancel">取消共享</p>
      </div>
      <div class="b-s-common">
        <h5>账本共享用户列表</h5>
        <p v-for="i in list" :key="i.nickName">
          {{ i.nickName ? i.nickName : i.account }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Dialog, Toast } from "vant";
import LedgerService from "@/services/ledger-service";
import { useRouter, useRoute } from "vue-router";
import { ILedger } from "@/types/ledger";

export default defineComponent({
  name: "Books-Setting",
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log("获取到的参数", route.query.id);
    let id = ref(route.query.id);
    const goBack = () => history.back();
    const deleteClick = () => {
      Dialog.confirm({
        title: "删除账单",
        message: "确认删除此账单？",
      })
        .then(() => {
          LedgerService.delete(id.value?.toString() || "").then(() => {
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
      LedgerService.getDetials(id.value?.toString() || "").then(
        (rep: ILedger) => {
          Object.assign(leader, rep);
          console.log(leader);
        }
      );
    }
    //取消分享账本
    const onCancel = () => {
      Dialog.confirm({
        message: "取消共享账本吗？",
      })
        .then(() => {
          LedgerService.cancel(
            leader.id?.toString() || "",
            leader.userId?.toString() || ""
          ).then(() => {
            Toast("取消成功");
            router.push("/books");
          });
        })
        .catch(() => {
          // on cancel
        });
    };
    //账本共享用户列表
    //  LedgerService.getList(id.value?.toString() || "").then(
    //     (rep: ILedger) => {
    //       Object.assign(leader, rep);
    //         console.log(leader);
    //     }
    //   );
    let list: ILedger[] = reactive([]);
    LedgerService.getList(id.value?.toString() || "").then((rep) => {
      list.push(...rep);
      console.log("list", list);
    });
    const updateClick = () => {
      router.push({
        path: "/books/update",
        query: {
          id: id.value,
        },
      });
    };

    return {
      goBack,
      deleteClick,
      updateClick,
      onCancel,
      router,
    };
  },
});
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
    padding: 16px;
  }
}
</style>