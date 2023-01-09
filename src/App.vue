<template>
  <Mapview ref="mapView"></Mapview> 
  <Layout/>

  <!--定位图标-->
  <el-button class="btn-location" @click="handleLocation">
    <el-icon style="font-size: 15px;"><Aim/></el-icon>
  </el-button>

  <!-- 图层列表 -->
  <LayerList class="layer-list"></LayerList>

</template>

<script setup lang="ts">

import Layout from "@/layout/Layout.vue";
import Mapview from "@/views/MapContainer.vue"
import LayerList from "@/layout/LayerList.vue";
import { shallowRef } from "vue"
import { ElMessage } from "element-plus";

const mapView = shallowRef(null)

const handleLocation = () => {
  mapView.value.LocationToCenter()
  ElMessage({message: '已定位至四川省',type: 'success',})
}

</script>

<style lang="scss">

.btn-location{
  position:absolute;
  right: var(--map-tools-postion-right); 
  bottom:380px; 
  width: 25px; 
  height: 25px;
  color: #000000; 
  border-color: #e1e4ef;
  border-radius: 6px;
  box-shadow : 0px 0px 1px 1px gray;
}


.layer-list{
  position:absolute;
  right:var(--map-tools-postion-right); 
  bottom:30px;
  height:250px; 
  width: 500px; 
  border-radius: 5px; 
  transition: height 0.3s,width 0.3s;
  overflow: hidden; 
  box-shadow : 1px 1px 5px 5px rgba(192, 192, 192);
}


</style>
