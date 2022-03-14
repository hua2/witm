<template>
    <div class="books-setting">
        <van-nav-bar title="账本设置" left-arrow fixed placeholder="true" @click-left="goBack">
        </van-nav-bar>
      <div class="content">
        <div class="b-s-common">
            <h5>设置</h5>
            <van-field label="修改" is-link readonly  to="/books/update" />
         </div>
          <div class="b-s-common">
           <h5>操作</h5>
            <van-field label="删除账单" is-link readonly @click="deleteClick"/>
          </div>
          <div class="b-s-common">
           <h5>账本成员</h5>
           <p>邀请成员</p>
          </div>
       </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue'
import { Dialog } from 'vant';
import LedgerService from "@/services/ledger-service";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Books-Setting',
    setup(){
        const router = useRouter();
        onMounted(() => {
        console.log("获取到的参数", router.currentRoute.value.query.id);
        
        });
        // const id =router.currentRoute.value.query.id;
        const goBack = () => history.back();
    
        const deleteClick =() =>{
            Dialog.confirm({
            title: '删除账单',
            message:
                '确认删除此账单？',
            })
            .then(() => {
            LedgerService.delete(2).then();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return{
        goBack,
        deleteClick
        }
    }
})

</script>

<style scoped lang="scss">
.books-setting{
     font-size: 14px;
    .b-s-common{
        height: fit-content;
        margin-bottom: 16px;
        background: #fff;
        border-radius: 8px;
    }
    h5{
        font-weight: bold;
        padding: 16px;
       }
     p{
      padding: 16px;
     } 
}

</style>