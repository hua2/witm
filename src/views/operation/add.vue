<template>
    <div class="add">
        <van-tabs 
            v-model:active="active" 
            swipeable 
            color="#519AF8"
            title-active-color="#519AF8"
            @click-tab="onClickTab" 
        >
         <template #nav-left> 
           <div class="icon">
            <van-icon name="arrow-left" size="18" @click="router.back()" style="padding:12px 0 0 12px"/>
           </div>
         </template> 
        <van-tab title="支出">
            <van-cell-group>
                <van-cell title="三餐" is-link icon="shop-o">
                <!-- <template #icon>
                <van-icon name="cart-circle-o" size="18"/>
                </template> -->
                <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
                 <van-cell title="零食" is-link icon="shop-o">
                <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
                 <van-cell title="衣服" is-link icon="shop-o" >
                 <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
                 <van-cell title="交通" is-link icon="shop-o">
                 <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
                 <van-cell title="旅行" is-link icon="shop-o">
                 <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
                 <van-cell title="孩子" is-link icon="shop-o">
                 <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>

            </van-cell-group>
        </van-tab>
        <van-tab title="收入">
            <van-cell-group>
                <van-cell title="三餐" is-link icon="shop-o">
                <template #right-icon>
                    <span @click="click">
                    ...
                    </span>
                </template>
                </van-cell>
            </van-cell-group>
         </van-tab>
        </van-tabs>
        <van-popup v-model:show="show" 
            position="bottom" 
            round
            :style="{ height: '20%' }">
             <h6>住房</h6> 
            <van-cell title="修改"/>
            <van-cell title="删除" @click="onDelete"/>
        </van-popup>
        <div class="add-pic" >
            <img :src="require('@/assets/img/add.png')" width="64" @click="router.push('/operation/classify')"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import { useRouter } from "vue-router";
import { Dialog } from 'vant';

  export default defineComponent({
    name:"Operation-Add",
    components:{},
    setup(){
        const router = useRouter();
        const active = ref(0);
        const show = ref(false);
        const showPopup = () => {
        show.value = true;
        };
        const click = () =>{
           show.value = true
        }
          const onDelete =() =>{
            Dialog.confirm({
            title: '删除',
            message:
                '确认要删除此分类吗？',
            })
            .then(() => {
             console.log()
            })
            .catch((err) => {
                 console.log(err)
            });
        }
        return{
            active,
            router,
            show,
            showPopup,
            click,
            onDelete
        }
    }
})
</script>

<style scoped lang="scss">
.add{
    width: 100%;
    height:100%;
    background: #fff;
     h6{
        height: 56px;
        line-height: 56px;
        padding: 0 12px;
        font-size: 18px;
     }
     span{
        writing-mode:vertical-rl;
        font-weight: bold;
        padding-top: 8px;
     }
     .add-pic{
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         bottom: 64px;
     }
       
    :deep{
     .van-sidebar{
         width: 100%;
     }
     .van-sidebar-item{
         background: #fff;
     }
     .van-sidebar-item--select{
        background: #EFEFEF;
        border-bottom: 1px solid #EFEFEF;
     }
     .van-sidebar-item--select:before{
        content: "";
        width: 0px;
        height: 0px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #000;
        position: absolute;
        top: 30px;
        left: 4px;
        background-color:unset
     }
    }
}

</style>