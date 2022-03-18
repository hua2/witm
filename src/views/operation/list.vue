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
          <van-icon
            name="arrow-left"
            size="18"
            @click="router.back()"
            style="padding: 12px 0 0 12px"
          />
        </div>
      </template>
      <van-tab title="支出">
        <van-cell-group>
          <van-cell v-for="i in list" :key="i.name" :title="i.name">
            <template #icon>
              <span v-html="i.icon" />
            </template>
            <template #right-icon>
              <van-icon name="ellipsis" @click="showPopup(i)" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="收入">
        <van-cell v-for="i in list" :key="i.name" :title="i.name">
          <template #icon>
            <span v-html="i.icon" />
          </template>
          <template #right-icon>
            <van-icon name="ellipsis" @click="showPopup(i)" />
          </template>
        </van-cell>
      </van-tab>
    </van-tabs>
    <van-popup
      v-model:show="show"
      position="bottom"
      round
      :style="{ height: '20%' }"
    >
      <h6>{{ info.name }}</h6>
      <van-cell title="修改" @click="updateClick(info)" />
      <van-cell title="删除" @click="delClick(info.id)" />
    </van-popup>
    <div class="add-pic">
      <img
        :src="require('@/assets/img/add.png')"
        width="64"
        @click="router.push('/operation/edit')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Dialog, Toast } from "vant";
import ClassifyService from "@/services/classify-service";
import { IClassify } from "@/types/classify";

const router = useRouter();
const active = ref(0);
const type = ref("OUTLAY");

onMounted(() => {
  getList();
});
//获取列表
let list: IClassify[] = reactive([]);
const getList = () => {
  console.log("type.value", type.value);
  ClassifyService.list({
    type: type.value.toString() || "",
  }).then((rep) => {
    Object.assign(list, rep);
  });
};
const onClickTab = (v) => {
  list.splice(0);
  if (v.name === 0) {
    type.value = "OUTLAY";
  } else {
    type.value = "INCOME";
  }
  getList();
};
const show = ref(false);
let info: IClassify = reactive({});
const showPopup = (value) => {
  console.log("showPopup-value", value);
  Object.assign(info, value);
  show.value = true;
};

// 修改
const updateClick = (info) => {
  router.push({
    path: "/operation/edit",
    query: {
      id: info.id,
    },
  });
};

//删除分类
const delClick = (id) => {
  Dialog.confirm({
    title: "删除",
    message: "确认要删除此分类吗？",
  })
    .then(() => {
      ClassifyService.delete(id).then(() => {
        Toast("删除成功");
        show.value = false;
        list.splice(0);
        getList();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped lang="scss">
.add {
  width: 100%;
  height: 100%;
  background: #fff;
  h6 {
    height: 56px;
    line-height: 56px;
    padding: 0 12px;
    font-size: 18px;
  }
  span {
    writing-mode: vertical-rl;
    margin-right: 4px;
  }
  .add-pic {
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    bottom: 64px;
  }

  :deep {
    .van-sidebar {
      width: 100%;
    }
    .van-sidebar-item {
      background: #fff;
    }
    .van-sidebar-item--select {
      background: #efefef;
      border-bottom: 1px solid #efefef;
    }
    .van-sidebar-item--select:before {
      content: "";
      width: 0px;
      height: 0px;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid #000;
      position: absolute;
      top: 30px;
      left: 4px;
      background-color: unset;
    }
  }
}
</style>
