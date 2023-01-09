<!--
  1. 获取传递进来的数据，数据暂时从mock/index.json传递
  2. 使用el-sub-menu遍历treeData的所有数据, 如果有children且menuType === 1，则产生一个名为menuName的el-submenu子菜单组。
  3. 递归判断是否有多级children , 如果有则继续生成下一级菜单
  4. 判断到最后一个层级 , 如果menuType === 1，则肯定是按钮而不是菜单组。所以用el-menu-item进行渲染
-->
<template>
  <div>
    <!-- LOGO -->
    <div style="height: 50px;">
      <el-image style="width: 100%; height: 30px; margin: 10px auto;" src="/src/assets/vue.svg" fit="contain"/>
    </div>
    <!-- 侧边栏菜单 -->
    <el-scrollbar>
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item index="1" @click="getLayer(g_LayerType.C013)">
          <el-icon><Menu /></el-icon>
          <span>红外云图</span>
        </el-menu-item>

        <el-menu-item index="2" @click="getLayer(g_LayerType.C003)">
          <el-icon><Menu /></el-icon>
          <span>可见光云图</span>
        </el-menu-item>

        <el-menu-item index="3" @click="store.SetCardVisible('McsCard')">
          <el-icon><Menu /></el-icon>
          <span>MCS识别</span>
        </el-menu-item>

        <el-menu-item index="4" @click="getLayer(g_LayerType.Swan)">
          <el-icon><Menu /></el-icon>
          <span>SWAN拼图</span>
        </el-menu-item>

        <el-menu-item index="5" @click="getLayer(g_LayerType.Flash)">
          <el-icon><Menu /></el-icon>
          <span>闪电数据</span>
        </el-menu-item>

        <el-sub-menu index="6">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>实况风场</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="getLayer(g_LayerType.Wind200)">
              <el-icon><Menu /></el-icon>
              <span>200hpa</span>
            </el-menu-item>
            <el-menu-item index="6-2" @click="getLayer(g_LayerType.Wind300)">
              <el-icon><Menu /></el-icon>
              <span>300hpa</span>
            </el-menu-item>
            <el-menu-item index="6-3" @click="getLayer(g_LayerType.Wind500_700)">
              <el-icon><Menu /></el-icon>
              <span>500+700hpa</span>
            </el-menu-item>
            <el-menu-item index="6-4" @click="getLayer(g_LayerType.Wind850)">
              <el-icon><Menu /></el-icon>
              <span>850hpa</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="7">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>EC模式风场</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="7-1" @click="getLayer(g_LayerType.ECWind200)">
              <el-icon><Menu /></el-icon>
              <span>200hpa</span>
            </el-menu-item>
            <el-menu-item index="7-2" @click="getLayer(g_LayerType.ECWind500)">
              <el-icon><Menu /></el-icon>
              <span>500hpa</span>
            </el-menu-item>
            <el-menu-item index="7-3" @click="getLayer(g_LayerType.ECWind700)">
              <el-icon><Menu /></el-icon>
              <span>700hpa</span>
            </el-menu-item>
            <el-menu-item index="7-4" @click="getLayer(g_LayerType.Wind850)">
              <el-icon><Menu /></el-icon>
              <span>850hpa</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="8" @click="getLayer(g_LayerType.HourRain)">
          <el-icon><Menu /></el-icon>
          <span>小时雨量</span>
        </el-menu-item>

        <el-menu-item index="9" @click="store.SetCardVisible('InvertRainCard')">
          <el-icon><Menu /></el-icon>
          <span>反演降水</span>
        </el-menu-item>

      </el-menu>
    </el-scrollbar>
  </div>
</template>


<script setup lang="ts">

import {ref,computed} from "vue";
import { useUsersStore }  from "@/store";
import type { LayerTypeItem } from "~/basic";
import { g_LayerType } from '@/layerType'

const store = useUsersStore();
const isCollapse = computed(() => {
  return store.isCollapse
})

let isFold = ref(true)


function getLayer(layerType: LayerTypeItem){
  store.requestNewLayer(layerType, store.layerTableLength, '')
}


// const sc_height = ref((window.innerHeight - 50) + 'px') //默认高度
// window.onresize = function () { //检测window窗口改变大小
// sc_height.value = (window.innerHeight - 50) + 'px' // window的窗口高度肯定比el-scrollbar高，可以稍微减少点。减少多少自己修改50这个值
// }
</script>




<style lang="scss" scoped>


</style>
