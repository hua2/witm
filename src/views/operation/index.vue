<template>
    <div class="operation">
        <van-tabs 
        v-model:active="active" 
        swipeable 
        color="#519AF8"
        title-active-color="#519AF8"
        @click-tab="onClickTab" 
        >
         <template #nav-left> 
           <div class="icon">
            <van-icon name="cross" size="18" @click="router.back()"/>
           </div>
         </template>  
        <template #nav-right>
            <div class="icon">
            <van-icon name="plus" size="18" @click="router.push('/operation/add')"/>
            </div>
        </template>
        <van-tab title="支出">
            <van-row class="operation-top" >
                 <van-col span="4" @click="colClick">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                 <van-col span="4" @click="colClick">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                 <van-col span="4" @click="colClick">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                 <van-col span="4" @click="colClick">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                 <van-col span="4" @click="colClick">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                    <van-icon name="like-o" />
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                    <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                  <van-icon name="like-o"/>
                    <p>图片</p>
                </van-col>
                <van-col span="4">
                   <van-icon name="like-o"/>
                   <p>图片</p>
                </van-col>
            </van-row>
            <Counter/>
        </van-tab>
        <van-tab title="收入">
            <van-row class="operation-top" >
            <van-col span="4">
                <van-icon name="like-o"/>
                <p>收入</p>
                </van-col>
            </van-row>
             <Counter/>
         </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import Counter from "@/components/Counter.vue";
import { defineComponent,ref } from "vue";
import { useRouter } from "vue-router";
  export default defineComponent({
    name:"Witm-Operation",
    components:{Counter},
    setup(){
        const router = useRouter();
        const active = ref(0);
        const colClick = (e:any)=>{
            console.log('e-111',e)
        }
        const onClickTab = () => {
          //
        }
        return{
            active,
            router,
            colClick,
            onClickTab
        }
    }
})
</script>

<style scoped lang="scss">
.operation{
    width: 100%;
    height:calc(100% - 50px);
    :deep(.van-tabs){
       height: 100%;
    }
    :deep(.van-tabs__content--animated){
      height: 100%;
    }
    .icon{
        :deep(.van-icon){
            padding: 0 12px;
            line-height: 44px;
        }
    }
    .operation-top{
        background: #fff;
        :deep(.van-col--4){
         padding: 12px 0;
         text-align: center;
          p{
            font-size: 14px;
            text-align: center;
        }
        }
         :deep(.van-icon){
          font-size: 24px;
       }
    }
}

</style>