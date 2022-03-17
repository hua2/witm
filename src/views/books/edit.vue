<template>
  <div class="books-update">
    <van-nav-bar
      :title="from ? '新建账本' : '修改账本'"
      left-arrow
      fixed
      placeholder="true"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="content">
      <van-field v-model="leader.name" label="文本" placeholder="请输入名称" />
      <van-field
        v-model="leader.remark"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        placeholder="请输入备注"
      />
        <van-uploader :before-read="beforeRead" :after-read="afterRead">
          <img v-if="pic.fileName" :src="'/api/v1/storage/' + pic.fileName" alt="">
          <img v-else src="https://img.yzcdn.cn/vant/tree.jpg" alt="" />
        </van-uploader>
      <div class="b-ntn">
        <van-button block type="primary" native-type="submit" :loading="isLoading" @click="onSubmit">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import LedgerService from "@/services/ledger-service";
import CommonService from "@/services/common-service";
import { ILedger, IUploader } from "@/types/ledger";
import { Toast } from "vant";

const isLoading =ref<boolean>(false)
const router = useRouter();
const route = useRoute();
let from = ref(route.query.from);
let id = ref(route.query.id);
const onClickLeft = () => history.back();
//上传
let pic: IUploader = reactive({});
const afterRead = (file: any) => {
  CommonService.storage(file.file).then((rep) => {
      Object.assign(pic, rep);
  });
};
const beforeRead = (file: any) => {
  console.log("file-be", file);
  if (file.type !== "image/png") {
    Toast("上传只能是图片格式");
    return false;
  }
  return true;
};
let leader: ILedger = reactive({});
//获取详情
if (id.value) {
  LedgerService.getDetials(id.value?.toString() || "").then(
    (rep: ILedger) => {
      Object.assign(leader, rep);
       pic.fileName = leader.cover 
    }
  );
}
//保存or修改
const onSubmit = () => {
  isLoading.value = true
  let method = LedgerService.add;
  if (id.value) {
    method = LedgerService.update;
  }
  method({
    ...leader,
    id: id.value?.toString() || "",
    cover: pic.fileName,
  }).then(() => {
    isLoading.value = false
    Toast(id.value?'修改成功':'新建成功')
    router.push("/books");
  });
};
</script>

<style scoped lang="scss">
.books-update {
  .van-uploader {
    width: 100%;
  }
  :deep(.van-uploader__input-wrapper) {
    width: 100%;
  }
  img {
    width: 100%;
    height: 128px;
    border-radius: 8px;
    margin: 12px auto;
  }
  .b-ntn {
    margin-top: 12px;
  }
}
</style>
