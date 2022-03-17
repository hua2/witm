<template>
  <div class="operation">
    <van-tabs
      v-model:active="active"
      sticky
      color="#519AF8"
      title-active-color="#519AF8"
      @click-tab="onClickTab"
    >
      <template #nav-left>
        <div class="icon">
          <van-icon name="cross" size="18" @click="router.back()" />
        </div>
      </template>
      <template #nav-right>
        <div class="icon">
          <van-icon
            name="plus"
            size="18"
            @click="router.push('/operation/list')"
          />
        </div>
      </template>
      <van-tab title="支出">
        <van-row class="operation-top">
          <van-col span="4" v-for="o in list" :key="'O' + o.name">
            <span v-html="o.icon" />
            <p>{{ o.name }}z</p>
          </van-col>
        </van-row>
        <Counter />
      </van-tab>
      <van-tab title="收入">
        <van-row class="operation-top">
          <van-col span="4" v-for="i in list" :key="'I' + i.name">
            <span v-html="i.icon" />
            <p>{{ i.name }}s</p>
          </van-col>
        </van-row>
        <Counter />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import Counter from "@/components/Counter.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import ClassifyService from "@/services/classify-service";
import { IClassify } from "@/types/classify";

const router = useRouter();
const active = ref(0);
const type = ref("OUTLAY");
onMounted(() => {
  getList();
});

let list: IClassify[] = reactive([]);
const getList = () => {
  ClassifyService.list({
    type: type.value.toString() || "",
  }).then((rep) => {
    list.push(...rep);
    console.log("list", list);
  });
};
const onClickTab = (v: any) => {
  list.splice(0)
  if (v.name === 0) {
    type.value = "OUTLAY";
  } else {
    type.value = "INCOME";
  }
    getList();
};
</script>

<style scoped lang="scss">
.operation {
  width: 100%;
  height: calc(100% - 50px);
  :deep(.van-tabs) {
    height: 100%;
  }
  :deep(.van-tabs__content--animated) {
    height: 100%;
  }
  .icon {
    :deep(.van-icon) {
      padding: 0 12px;
      top: 6px;
    }
  }
  .operation-top {
    background: #fff;
    :deep(.van-col--4) {
      padding: 12px 0;
      text-align: center;
      p {
        font-size: 12px;
        text-align: center;
        margin-top: 4px;
      }
      svg {
        width: 50%;
      }
    }
  }
}
</style>
