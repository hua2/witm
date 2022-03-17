<template>
  <div class="counter">
    <div class="counter-result">
      <van-field v-model="value" placeholder="点此输入备注..."> </van-field>
      <van-field v-model="result" input-align="right" readonly> </van-field>
    </div>
    <div class="counter-date">
      <p @click="showPopup">默认账本</p>
      <div class="c-d-cell">
        <van-cell :value="date ? date : currentDate" @click="showDate = true" />
      </div>
    </div>
    <van-calendar
      v-model:show="showDate"
      @confirm="onConfirm"
      color="#519AF8"
      confirm-text="完成"
      :style="{ height: '50%' }"
    />
    <van-row :gutter="10" class="counter-content">
      <van-col :span="6"
        ><div @click="getResult(1)" class="c-c-content">1</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(2)" class="c-c-content">2</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(3)" class="c-c-content">3</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('AC')" class="c-c-content">AC</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(4)" class="c-c-content">4</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(5)" class="c-c-content">5</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(6)" class="c-c-content">6</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('-')" class="c-c-content">-</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(7)" class="c-c-content">7</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(8)" class="c-c-content">8</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(9)" class="c-c-content">9</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('+')" class="c-c-content">+</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('reset')" class="c-c-content">
          重置
        </div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult(0)" class="c-c-content">0</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('.')" class="c-c-content">.</div></van-col
      >
      <van-col :span="6"
        ><div @click="getResult('=')" class="c-c-content">保存</div></van-col
      >
    </van-row>
    <van-popup
      v-model:show="showBill"
      round
      position="bottom"
      class="counter-popup"
    >
      <div class="c-p-title">
        <span>选择账本</span> <span @click="router.push('/books')">管理</span>
      </div>
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
</template>
<script setup lang="ts">
import { Toast } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";

//选择账单
const showBill = ref(false);
const showPopup = () => {
  showBill.value = true;
};
const checked = ref("1");
//日期选择
const showDate = ref(false);
const time = ref(new Date());
const currentDate = `${time.value.getFullYear()}-${
  time.value.getMonth() + 1
}-${time.value.getDate()}`;
const date = ref<string>("");
const onConfirm = (value: any) => {
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  showDate.value = false;
  date.value = formatDate(value);
};
//路由
const router = useRouter();
//计算器
const value = ref<string>("");
const result = ref<string>("");

const sendMessage = (message: any) => {
  Toast.fail(message);
};

const getResult = (e: any) => {
//用于重置或AC
  var str = String(result.value);
  if (result.value.startsWith("0")) {
    result.value = str.substr(1, str.length - 1);
  }
  // 不可以连续输入 小数点
  if (
    e === "." &&
    result.value.split("").reverse().join("").indexOf(".") === 0
  ) {
    sendMessage("请输入正确的浮点数1");
    return false;
  }
// 如果第一次 输入的是 运算符号，则提示
if (
    ["+", "-", "*", "/", "%", ".", "AC"].indexOf(e) > -1 &&
    result.value.length === 0
    ) {
    sendMessage("请先输入数字");
    return false;
    }
// 如果第一次 输入的是 = 号，则直接返回
if (e === "=" && result.value.length === 0) {
   return false;
   }
//重置
if (e === "reset") {
    result.value = "0";
    return false;
  }
//AC-退格
  if (e === "AC") {
    if (str.length == 0) {
      return -1;
    } else if (str.length == 1) {
      result.value = "0";
    } else {
      result.value = str.substr(0, str.length - 1);
    }
    return false;
}
// 出现 = 号则表示已经执行过计算，需要清空
if (result.value.indexOf("=") > -1) {
    result.value = "0";
}
const count = ref<string>("");
  switch (e) {
    case "=":
      count.value += eval(result.value);
      result.value = count.value;
      setTimeout(() => {
        router.push("/home");
      }, 1000);
      break;
    default:
      result.value += e;
  }
};
</script>

<style scoped lang="scss">
.counter {
  width: 100%;
  position: fixed;
  bottom: 0;
  .counter-result {
    display: flex;
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
    .c-d-cell {
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