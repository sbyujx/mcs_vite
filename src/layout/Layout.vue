<template>
  <div :class="classObj" >
    <!--左侧：侧边栏-->
    <Sidebar class="sidebar-container" />
    <!--上侧：导航栏-->
    <div class="main-container"><Navbar  title="MCS系统"/></div>
    <!-- 选项卡 -->
    <div class="card">
      <component v-if="store.cardVisible" :is="g_cardComponent.get(store.cardName)"></component>
    </div>
  </div>
  <!--页脚-->
  <div class="footer">
    <!-- <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="8">
        <el-tag>经度：{{store.mouseLngLat.Lng}} &nbsp; &nbsp; 纬度：{{store.mouseLngLat.Lat}}</el-tag>
      </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="4"></el-col>
    </el-row> -->
  <el-tag :disable-transitions=true>经度：{{store.mouseLngLat.Lng}} &nbsp; &nbsp; 纬度：{{store.mouseLngLat.Lat}}</el-tag>
  </div>
</template>

<script setup>

// import treeData from "@/mock/Navi.json";
import Sidebar from "@/layout/Sidebar.vue";
import Navbar from '@/layout/Navbar.vue'
import { useUsersStore }  from "@/store";
import { computed } from "vue";
import { g_cardComponent } from "@/layerType";

const store = useUsersStore();

// opened变量：监视侧边栏是否收起
const opened = computed(() => {
  return store.isCollapse
})

// classObj变量：closeSidebar指示opened状态，hideSidebar指示是否显示侧边栏，用于控制样式
const classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
  }
})

let activedId = computed(()=>{
  let tempId = -1
  store.layerList.forEach((item,index,array)=>{
    if(item.isCardShow){
      tempId = index
    }
  })
  return tempId
})

</script>


<style lang="scss" scoped>

* {
  margin: 0;
  padding: 0;
}

.setup-card{
  position:absolute;
  right:120px;
  top:20px;
}
.footer{
  height:"15px";
  position:absolute;
  bottom:0;
  right:0;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.3s;
  margin-left: var(--side-bar-width);
  position: relative;
}
.sidebar-container {
  transition: width 0.3s;
  width: var(--side-bar-width) !important;
  background-color: var(--el-menu-bg-color);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-right: 0.5px solid #eee;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}

.card{
  position: absolute;
  right:var(--map-card-postion-right);
  top:100px;
}

</style>
