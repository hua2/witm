<template>
    <div class="classify">
        <van-nav-bar title="添加分类" left-arrow fixed placeholder="true" @click-left="onClickLeft">
        <template #right>
        <van-icon name="success" />
        </template>
         </van-nav-bar>
         <div class="c-content">
            <van-field v-model="value" label="分类名称" placeholder="请输入分类名称" input-align="right" clearable>
                <template #right-icon>
                 <van-icon name="smile-o" />
                 </template>
            </van-field>
            <div class="c-pic">
              <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
             <div class="c-icon">
              <van-icon name="chat-o" />
            </div>
            </div>
         </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name:"Operation-Classify",
  components:{},
    setup() {
    const value = ref('');
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
      value,
    };
    },
})
</script>
<style scoped lang="scss">
.classify{
  width: 100%;
  .c-pic{
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    .c-icon{
      width: 52px;
      height: 48px;
      line-height: 48px;
      text-align: center;
    }
  }
}
</style>
