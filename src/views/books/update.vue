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
        <img src="https://img.yzcdn.cn/vant/tree.jpg" alt="" />
      </van-uploader>
      <van-uploader>
        <van-cell
          title="封面图"
          center
          size="large"
          label="封面图会作为主页的背景图来展示"
          is-link
          readonly
        />
      </van-uploader>
      <div class="b-ntn">
        <van-button block type="primary" native-type="submit" @click="onSubmit">
          保存
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useRouter,useRoute } from "vue-router";
import LedgerService from "@/services/ledger-service";
import CommonService from "@/services/common-service";
import { ILedger } from "@/types/ledger";
import { Toast } from "vant";

export default defineComponent({
  name: "Books-Update",
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log("update-获取到的参数", route.query.from, route.query.id);
    let from = ref(route.query.from);
    let id = ref(route.query.id);
    const onClickLeft = () => history.back();
    //上传
    const afterRead = (file:any) => {
      CommonService.storage(file.file).then((rep)=>{
          let fileName:ILedger= reactive({});
          fileName = rep
      })
      console.log('file',file)
    };

    const beforeRead = (file: any) => {
        console.log('file-be',file)
      if (file.type !== "image/png") {
        Toast("上传只能是图片格式");
        return false;
      }
      return true;
    };

    let leader: ILedger = reactive({});
    //获取详情
    if(id.value){
      LedgerService.getDetials(id.value?.toString() || "").then(
            (rep: ILedger) => {
              Object.assign(leader, rep);
            }
          );
      }
    //保存or修改
    const onSubmit = () => {
      let method = LedgerService.add;
      if (id.value) {
         method = LedgerService.update;
      }
      method({
        ...leader,
        id: id.value?.toString()  ||  "",
      }).then((rep: ILedger) => {
        console.log(rep);
        router.push('/books')
      });
    };
    return {
      onClickLeft,
      beforeRead,
      afterRead,
      onSubmit,
      from,
      leader,
    };
  },
});
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
