<template>
  <div class="counter">
    <div class="counter-form">
      <van-field v-model="money" label="金额" readonly input-align="right"></van-field>
      <div class="counter-cell">
        <van-cell title="日历" :value="date ? date : currentDate" is-link @click="showDate = true" />
      </div>
      <van-calendar
        v-model:show="showDate"
        @confirm="onConfirm"
        color="#519AF8"
        confirm-text="完成"
        :style="{ height: '50%' }"
      />
      <van-field v-model="remark" label="备注" placeholder="点此输入备注..." clearable></van-field>
    </div>
    <van-row :gutter="10" class="counter-content">
      <van-col :span="6">
        <div @click="getResult(1)" class="c-c-content">1</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(2)" class="c-c-content">2</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(3)" class="c-c-content">3</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('AC')" class="c-c-content">AC</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(4)" class="c-c-content">4</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(5)" class="c-c-content">5</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(6)" class="c-c-content">6</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('-')" class="c-c-content">-</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(7)" class="c-c-content">7</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(8)" class="c-c-content">8</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(9)" class="c-c-content">9</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('+')" class="c-c-content">+</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('reset')" class="c-c-content">重置</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult(0)" class="c-c-content">0</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('.')" class="c-c-content">.</div>
      </van-col>
      <van-col :span="6">
        <div @click="getResult('=')" class="c-c-content">保存</div>
      </van-col>
    </van-row>
  </div>
</template>
<script setup lang="ts">
import { Toast } from "vant";
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import BillService from "../services/bill-service";
const props = defineProps({
  classifyId: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: ""
  }
});
const router = useRouter();
//日期选择
const showDate = ref(false);
const time = ref(new Date());
const currentDate = `${time.value.getFullYear()}-${time.value.getMonth() < 9 ? "0" + (time.value.getMonth() + 1) : time.value.getMonth() + 1
  }-${time.value.getDate() <= 9 ? "0" + time.value.getDate() : time.value.getDate()}`;

const date = ref<string>("");
const onConfirm = (value: any) => {
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}`;
  showDate.value = false;
  date.value = formatDate(value);
};

//计算器
const remark = ref<string>('');
const money = ref<string>('');
const sendMessage = (message: any) => {
  Toast.fail(message);
};

const getResult = (e: any) => {
  //用于重置或AC
  var str = String(money.value);
  if (money.value.startsWith("0")) {
    money.value = str.substr(1, str.length - 1);
  }
  // 不可以连续输入 小数点
  if (
    e === "." &&
    money.value.split("").reverse().join("").indexOf(".") === 0
  ) {
    sendMessage("请输入正确的浮点数1");
    return false;
  }
  // 如果第一次 输入的是 运算符号，则提示
  if (
    ["+", "-", "*", "/", "%", ".", "AC"].indexOf(e) > -1 &&
    money.value.length === 0
  ) {
    sendMessage("请先输入数字");
    return false;
  }
  // 如果第一次 输入的是 = 号，则直接返回
  if (e === "=" && money.value.length === 0) {
    sendMessage('请填写信息！')
    return false;
  }
  //重置
  if (e === "reset") {
    money.value = "0";
    return false;
  }
  //AC-退格
  if (e === "AC") {
    if (str.length == 0) {
      return -1;
    } else if (str.length == 1) {
      money.value = "0";
    } else {
      money.value = str.substr(0, str.length - 1);
    }
    return false;
  }
  // 出现 = 号则表示已经执行过计算，需要清空
  if (money.value.indexOf("=") > -1) {
    money.value = "0";
  }
  const count = ref<string>("");
  switch (e) {
    case "=":
      count.value += eval(money.value);
      money.value = count.value;
      if (money.value === '') {
        sendMessage('请填写金额')
        return
      }
      if (props.classifyId === '') {
        sendMessage('请选择分类')
        return
      }
      setTimeout(() => {
        BillService.add({
          money: money.value,
          type: props.type,
          remark: remark.value,
          useDate: date.value ? date.value : currentDate,
          classifyId: props.classifyId
        }).then(() => {
          Toast('记录成功！')
          router.push("/home");
        })
      }, 1000)
      break;
    default:
      money.value += e;
  }
};

</script>

<style scoped lang="scss">
.counter {
  width: 100%;
  position: fixed;
  bottom: 0;
  .counter-form {
    padding: 12px;
  }
  .counter-content {
    padding: 12px;
    .c-c-content {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
      font-weight: bold;
      border-radius: 5px;
      border: 1px solid #e6e6e6;
    }
  }
  .counter-date {
    padding: 0 12px;
    display: flex;
    align-items: center;
    p {
      color: #323233;
      font-size: 12px;
      padding: 6px 12px;
      background: #fff;
      border-radius: 16px;
    }
    .counter-cell {
      :deep(.van-cell) {
        line-height: 1;
        font-size: 12px;
        background: unset;
      }
    }
  }
  .counter-popup {
    .c-p-title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      padding: 16px;
    }
    :deep(.van-cell-group--inset) {
      margin: unset;
    }
  }
}
</style>