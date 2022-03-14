<template>
    <div class="books-update">
        <van-nav-bar :title="title" left-arrow fixed placeholder="true" @click-left="onClickLeft">
        </van-nav-bar>
        <div class="content">
        <van-field v-model="name" label="文本" placeholder="请输入名称" />
        <van-field v-model="remark" rows="2" autosize label="备注" type="textarea" placeholder="请输入备注"/>
            <van-uploader :after-read="afterRead">
                <img src="https://img.yzcdn.cn/vant/tree.jpg" alt="" >
             </van-uploader>
            <van-uploader>
             <van-cell title="封面图" center size="large" label="封面图会作为主页的背景图来展示"  is-link readonly/>
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
import { defineComponent,ref, onMounted } from 'vue';
 import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Books-Update',
    setup(){
        const router = useRouter();
        const title = ref('');
        const from = ref<string>('');
        const name = ref('');
        const remark = ref('');
        const onClickLeft = () => history.back();
        const afterRead = (file:any) => {
        // 此时可以自行将文件上传至服务器
        console.log(file);
        };
        onMounted(() => {
        console.log("获取到的参数", router.currentRoute.value.query.from);
        //  from.value = router.currentRoute.value.query.from
        if(from.value=='add'){
            title.value = "新建账本"
        } else{
            title.value = "修改账本"
        }

        });


        return{
        onClickLeft,
        afterRead,
        title,
        name,
        remark
        }
    }
})

</script>

<style scoped lang="scss">
.books-update{
    .van-uploader{
        width: 100%;
    }
    :deep(.van-uploader__input-wrapper){
        width: 100%;
    }
    img{
        width: 100%;
        height: 128px;
        border-radius: 8px;
       margin: 12px auto;
    }
    .b-ntn{
        margin-top: 12px;
    }
}

</style>