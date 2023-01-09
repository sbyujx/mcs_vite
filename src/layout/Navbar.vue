<template>
  <div class="navbar rowBC">
    <div>
      <el-button :class="{ 'is-active': opened }" class="hamburger-style" @click="toggleSideBar">
        <el-icon size="25px" color="#606266"><Expand/></el-icon>
      </el-button>
    </div>
    <!-- 导航栏标题 -->
    <div class="heardCenterTitle"> {{title}} </div>
    
  </div>
</template>

<script setup lang="ts">

import { useUsersStore }  from "@/store";
import {computed} from "vue"
import { Edit, Expand } from '@element-plus/icons-vue'
import setting from '@/settings'

defineProps<{ title: string }>()

const store = useUsersStore();
// opened变量，将侧边栏的opened状态作为属性发送给hamburger组件，让该组件实现展开和收起的图标切换
const opened = computed(() => {
  return store.isCollapse
})



// 控制侧边栏收起和展开
const toggleSideBar = () => {
  store.isCollapse = !store.isCollapse;
}

</script>



<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);
}

//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 40px;
  background-color: var(--nav-bar-right-menu-background);
}

.hamburger-style{
  margin-left: 8px;
  border:none;
  background-color: rgba(0,0,0,0) !important;
}
.is-active {
    transform: rotate(180deg);
  }

</style>
