<template>
    <div class="classify">
        <van-nav-bar :title="info.id?'修改分类':'添加分类'" left-arrow fixed :placeholder="true" @click-left="onClickLeft">
        <!-- <template #right>
        <van-icon name="success" />
        </template> -->
         </van-nav-bar>
         <div class="c-content">
          <van-form show-error :show-error-message="false" @submit="onSubmit">
            <van-field v-model="info.name" label="分类名称"  placeholder="请输入分类名称"
             input-align="right" 
             clearable 
             :rules="[{ required: true}]">
                <template #right-icon>
                 <van-icon name="smile-o" />
                 </template>
            </van-field>
            <van-field
              v-model="info.type"
              is-link
              readonly
              name="picker"
              label="类型"
              placeholder="点击选择类型"
              @click="showPicker = true"
              :rules="[{ required: true}]"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
            <div class="c-pic">
              <div class="c-icon" v-for="(i,index) in iconList" :key="index"
              :class="{active: isActive === index}"
             >
               <span v-html="i.icon"  @click="iconClick(index,i.name)"/>   
            </div>
            </div>
          <div class="c-btn">
            <van-button :loading="isLoading" native-type="submit">
            提交
          </van-button>
        </div>
        </van-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter,useRoute } from "vue-router";
import { Toast } from 'vant';
import { IClassify } from "@/types/classify";
import ClassifyService from "@/services/classify-service";
import CommonService from "@/services/common-service";
import { IIcon } from "@/types/common";

const onClickLeft = () => history.back();
const router = useRouter();
const route = useRoute();
console.log("获取到的参数", route.query);
let id = ref(route.query.id);
const isActive = ref(0);

let iconList: IIcon[] = reactive([]);
CommonService.iconList().then((rep) => {
  iconList.push(...rep);
  console.log('rep',rep)
});

const showPicker = ref(false);
const columns = ['支出', '收入', ];
const onConfirm = (value:string) => {
  info.type = value;
  showPicker.value = false;
};

//选择图标
const iconClick =(i:number,name:string)=>{
  console.log('i',i)
  console.log('name',name)
  isActive.value = i;
  info.icon = name;
}

let info: IClassify = reactive({});
//获取详情
if (id.value) {
  ClassifyService.getDetials(id.value?.toString() || "").then(
    (rep: IClassify) => {
    Object.assign(info, rep);
     if(rep.type==='INCOME'){
       info.type = '收入'
     }else{
        info.type  = '支出'
     }
    }
  );
}
//保存or修改
const isLoading =ref<boolean>(false)
const onSubmit = () => {
   if (!info.icon) {
   Toast('请选择图标！')
   return
  }
  isLoading.value = true
  let method = ClassifyService.add;
  if (info.id) {
    method = ClassifyService.update;
  }
  method({
    ...info,
    type:info.type=='支出'?'OUTLAY':'INCOME',
  }).then(() => {
    Toast(info.id?'修改成功':'新建成功')
    router.push("/operation");
  }).finally(()=>{
    isLoading.value = false
  })
};

</script>
<style scoped lang="scss">
.classify{
  width: 100%;
  position:relative;
  .active {
   background: #519AF8;
 }
  .c-pic{
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    .c-icon{
      width: 36px;
      height: 36px;
      line-height: 48px;
      text-align: center;
    }
    span{
      display:block;
    }
  }
  .c-btn{
    width: 62px;
    position: absolute;
    top: -8px;
    right: 0;
    z-index: 1;
    :deep(.van-button--default){
      background:unset;
      border:unset;
    }
  }
}
</style>
