<template>
    <div class="books">
        <van-nav-bar title="多账本" left-arrow  placeholder="true"  @click-left="onClickLeft">
        <template #right>
           <van-icon name="plus" size="18" @click="showAdd"/>
        </template>
        </van-nav-bar>
      <div class="content">
        <div class="books-list" v-for="i in list" :key="i.name">
           <div class="b-l-pic">
            <span>{{i.name}}</span>
           </div>
            <div class="b-l-circle" @click="goSetting(i.id)" v-if="!i.isShare || !i.isDefault">
                 ...
            </div>
        </div>
      </div>
         <van-popup v-model:show="show" round position="bottom" :style="{ height: '26%' }" >
            <h3>操作</h3>
            <van-cell title="新建账本" label="创建新账本，分类默认由系统提供" @click="addClick"/>
            <van-cell title="加入他人账本" label="通过邀请码加入他人账本一起记账" to="/books/join" />
        </van-popup>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive} from 'vue';
import { useRouter } from 'vue-router';
import LedgerService from "@/services/ledger-service";
import { ILedger } from '@/types/ledger';

export default defineComponent({
  name: 'Witm-Books',
    setup(){
        const router = useRouter();
        const onClickLeft = () => history.back();
        const goSetting = (id:number) =>{
            console.log('id',id)
            router.push({
            path: '/books/setting',
            query: {
                id: id,
            },
            });
        }
        const show = ref<boolean>(false);
        const showAdd = () => {
         show.value = true;
        };
        const addClick = () =>{
            router.push({
            path: '/books/update',
            query: {
                from: 'add',
            },
            });
        }
      let list: ILedger[] = reactive([]);
      LedgerService.userList().then((rep) => {
        list.push(...rep);
      });
        return{
        onClickLeft,
        goSetting,
        show,
        showAdd,
        addClick,
        list,
        }
    }
})

</script>

<style scoped lang="scss">
.books{
    width: 100%;
    .books-list{
        color: #fff;
        position: relative;
        margin-bottom: 12px;
        .b-l-pic{
            height:128px;
            line-height: 128px;
            text-align: center;
            font-size: 16px;
            background-image: url("https://img.yzcdn.cn/vant/cat.jpeg");
             background-size: 100% 100%;
            border-radius: 8px;
        }
        .b-l-circle{
            writing-mode:vertical-rl;
            position: absolute;
            top: 10px;
            right: -4px;
        }
    }
       h3{
        height: 62px;
        line-height: 62px;
        font-size: 18px;
        font-weight: bold;
        padding-left: 16px;
        border-bottom: 1px solid #EFEFEF;
    }
}

</style>