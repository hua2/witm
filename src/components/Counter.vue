<template>
  <div class="counter">
    <div class="counter-result">
      <van-field
          v-model="value"
          placeholder="点此输入备注..."
      >
      </van-field>
      <van-field
          v-model="result"
          input-align="right"
          readonly
      >
      </van-field>
    </div>
    <div class="counter-date">
      <div class="c-d-popup">
        <p @click="showPopup">默认账本</p>
        <van-popup v-model:show="showBill"
                   round
                   position="bottom"
                   :style="{ width:'375px' }">
          <div class="c-d-title"><span>选择账本</span> <span @click="router.push('/books')">管理</span></div>
          <van-radio-group v-model="checked">
            <van-cell-group inset>
              <van-cell title="默认账本" clickable @click="checked = '1'">
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
              <van-cell title="账本-1" clickable @click="checked = '2'">
                <template #right-icon>
                  <van-radio name="2" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </van-popup>
      </div>
      <van-cell :value=date?date:currentDate @click="showDate = true" />
      <van-calendar v-model:show="showDate" @confirm="onConfirm" color="#519AF8"  confirm-text="完成" :style="{ width: '375px',height: '480px'}"/>
    </div>
    <van-row :gutter="10" class="grid-content">
      <van-col :span="6"><div @click="getResult(1)" class="c-r-content">1</div></van-col>
      <van-col :span="6"><div @click="getResult(2)" class="c-r-content">2</div></van-col>
      <van-col :span="6"><div @click="getResult(3)" class="c-r-content">3</div></van-col>
      <van-col :span="6"><div @click="getResult('AC')" class="c-r-content">AC</div></van-col>
      <van-col :span="6"><div @click="getResult(4)" class="c-r-content">4</div></van-col>
      <van-col :span="6"><div @click="getResult(5)" class="c-r-content">5</div></van-col>
      <van-col :span="6"><div @click="getResult(6)" class="c-r-content">6</div></van-col>
      <van-col :span="6"><div @click="getResult('-')" class="c-r-content">-</div></van-col>
      <van-col :span="6"><div @click="getResult(7)" class="c-r-content">7</div></van-col>
      <van-col :span="6"><div @click="getResult(8)" class="c-r-content">8</div></van-col>
      <van-col :span="6"><div @click="getResult(9)" class="c-r-content">9</div></van-col>
      <van-col :span="6"><div @click="getResult('+')" class="c-r-content">+</div></van-col>
      <van-col :span="6"><div @click="getResult('reset')" class="c-r-content">重置</div></van-col>
      <van-col :span="6"><div @click="getResult(0)" class="c-r-content">0</div></van-col>
      <van-col :span="6"><div @click="getResult('.')" class="c-r-content">.</div></van-col>
      <van-col :span="6"><div @click="getResult('=')" class="c-r-content">保存</div></van-col>
    </van-row>
  </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import { defineComponent,ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name:"Witm-Counter",
  props: {
    show: Boolean
  },
  setup(){
    //选择账单
    const showBill = ref(false);
    const showPopup = () => {
      showBill.value = true;
      console.log('111')
    };
    const checked = ref('1');
    //日期选择
    const showDate = ref(false);
    const time = ref(new Date());
    const currentDate = `${time.value.getFullYear()}-${time.value.getMonth() + 1}-${time.value.getDate()}`;
    const date = ref<string>('');
    const onConfirm = (value:any) => {
      const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      showDate.value = false;
      date.value = formatDate(value);
    };
    //路由
    const router = useRouter();
    //计算器
    const value = ref<string>('');
    const result = ref<string>('');

    const sendMessage = (message:any)=> {
      Toast.fail(message)
    }

    const getResult = (e:any) =>{
      //用于重置或AC
      var str= String(result.value);
      if(result.value.startsWith('0')){
        result.value = str.substr(1,str.length-1);
      }
      // 不可以连续输入 小数点
      if (e === '.' && result.value.split('').reverse().join('').indexOf('.') === 0) {
        sendMessage('请输入正确的浮点数1')
        return false
      }
      // 如果第一次 输入的是 运算符号，则提示
      if (['+', '-', '*', '/', '%', '.','AC'].indexOf(e) > -1 && result.value.length === 0) {
        sendMessage('请先输入数字')
        return false
      }
      // 如果第一次 输入的是 = 号，则直接返回
      if (e === '=' && result.value.length === 0) {
        return false
      }
      //重置
      if (e === 'reset') {
        result.value = '0'
        return false
      }
      //AC-退格
      if (e === 'AC') {
        if(str.length==0){
          return -1;
        }else if(str.length==1){
          result.value='0';
        }
        else{
          result.value = str.substr(0,str.length-1);
        }
        return false;
      }
      // 出现 = 号则表示已经执行过计算，需要清空
      if (result.value.indexOf('=') > -1) {
        result.value = '0'
      }
      const count = ref<string>('')
      switch (e) {
        case '=':
          count.value += eval(result.value)
          result.value = count.value
          setTimeout(()=>{
            router.push('/')
          }, 1000)
          break
        default:
          result.value += e
      }
    }
    return{
      checked,
      showBill,
      showPopup,
      date,
      showDate,
      currentDate,
      onConfirm,
      router,
      value,
      result,
      sendMessage,
      getResult,
    }
  }
})
</script>

<style scoped lang="scss">
.counter{
  position: fixed;
  bottom: 0;
  .counter-result{
    display: flex;
    padding: 12px;
  }
  .grid-content{
    padding: 12px;
    .c-r-content{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
      border-radius: 5px;
      border:1px solid #e6e6e6;
    }
  }
  .counter-date{
    padding: 0 12px;
    display: flex;
    font-size: 14px;
    .c-d-popup{
      :deep(.van-cell){
        width: 100%;
        height: 48px;
        line-height: 48px;
        border-radius: unset;
      }
      p{
        width: 88px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        margin-right: 12px;
        background: #fff;
        border-radius: 16px;
      }
      .c-d-title{
        padding:24px 12px;
        display: flex;
        justify-content: space-between;
      }
    }
    :deep(.van-cell){
      width: 30%;
      height: 32px;
      padding: 0;
      line-height: 32px;
      border-radius: 16px;
    }
    :deep{
      .van-cell__value--alone{
        text-align: center;
      }
    }
  }
}

</style>