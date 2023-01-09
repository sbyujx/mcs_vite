<template>
  <div ref="layerList1">
    <el-table :data="store.layerList" ref="layerListTable" highlight-current-row size="small" height="100%"
      row-key="layerId" :expand-row-keys="expendRow" @expand-change="handleExpand" :indent="0">

    <!-- :cell-style="{padding: '0px', margin: '0px',height:'25px'}"
      :row-style="{padding: '0px', margin: '0px', height:'25px'}" -->
      <!--第零列：序号-->
      <!-- <el-table-column type="index" label="ID" width="50" align="right" ></el-table-column> -->

      <!--第一列：展开图标-->
      <el-table-column  label="" align="right" width="20px"></el-table-column>

      <!--第二列：图层名称-->
      <el-table-column label="图层名称" align="left" width="150px">
        <template #default="scope">
          <el-check-tag 
            @change="store.SetLayerVisible(scope)"
            :disable-transitions=true
            :checked="scope.row.isLayerShow"
            :class="(scope.row.type.layerLevel === 2) ? 'el-check-tag-level2' : ((scope.row.type.layerLevel === 1) ? 'el-check-tag-level1' : 'el-check-tag') ">
            <span style="color:chocolate; bold" >{{ scope.row.index + '-'}}</span>
            <span>{{ scope.row.type.typeName }}</span>
        </el-check-tag>
        </template>
      </el-table-column>

      <!--第三列：时次-->
      <el-table-column label="操作"  align="left" width="330px">
        <template #default="scope">
          <!--时次选择框-->
          <el-select ref="timeSelect" v-model="scope.row.time" :disabled="!scope.row.type.allowFlip"
            size="small" style="width: 160px" popper-class="elselect"
            @visible-change="handleGetTimes($event, scope)"
            @change="handleGetSelected($event, scope)">
            <el-option-group>
              <el-option size="small" v-for="layerTime in scope.row.timeList" :value="layerTime" :label="layerTime"/>
            </el-option-group>
            <el-option-group style="text-align:center">
              <el-button size="small" @click.stop="handleLoadMore(scope)">加载更多</el-button>
              <el-button size="small" @click.stop="handleReload(scope)">刷新列表</el-button>
            </el-option-group>
          </el-select>
          <!--上翻、下翻按钮-->
          <el-button-group>
            <el-button @click="handleFlipUp(scope)" plain size="small" type="info" circle :disabled="!scope.row.type.allowFlip" icon="ArrowLeftBold"/>
            <el-button @click="handleFlipDown(scope)" plain size="small" type="info" circle :disabled="!scope.row.type.allowFlip" icon="ArrowRightBold"/>
          </el-button-group>

          <el-divider direction="vertical" />

          <!--设置按钮-->
          <el-button v-if="scope.row.type.menuType !== 'dropdown'"
            :type="scope.row.type.menuType === '' ? 'default' : 'success'"
            :disabled="scope.row.type.menuType === ''"
            @click="store.SetCardVisible(scope.row.type)"
            size="small" icon="Operation" style="width: 23px; height: 23px"/>
            
          <!--下拉菜单按钮-->
          <el-dropdown v-if="scope.row.type.menuType == 'dropdown'" size="small" style="width: 23px; height: 23px" trigger="click">
            <el-button style="width: 23px; height: 23px" type="success" size="small" icon="MoreFilled"/>
            <template #dropdown>
              <div v-if="scope.row.type.typeName==='亮温梯度'" style="margin:10px;">
                  <el-input-number v-model="GradientDensity" size="small" controls-position="right" style="width:80px; margin: right 5px;" placeholder="阈值"/>
                  <el-button size="small">梯度密集区</el-button>
              </div> 
              <el-dropdown-menu v-else>
                <el-dropdown-item :icon="CirclePlus" v-for="menuItem in scope.row.type.dropdownMenuList" @click.native="handleCommand(menuItem.callBack, scope)">
                  {{menuItem.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-divider direction="vertical" style="margin-left: 4px; margin-right: 4px" />
          <el-button-group>
            <!--删除按钮-->
            <el-button :disabled="!scope.row.type.allowDel" circle size="small" type="danger" @click="store.DeleteLayer(scope.$index)" icon="Delete"/>
            <!--保存按钮-->
            <el-button
              :disabled="!scope.row.type.allowSave"
              :type="scope.row.type.allowSave ? 'success' : 'default'"
              @click="handleSaveFile(scope)"
              circle size="small" icon="Download"/>
          </el-button-group>

        </template>
      </el-table-column>
    </el-table>

    <!-- 最大/小化按钮 -->
    <div style="position: absolute; top: 2px; right: 5px;z-index: 2;">
      <el-button @click="handleMaxBtn" size="small" class="layer-List-min-el-btn" :icon="stateMaxMin===2 ? 'SemiSelect' : 'CaretTop'"/>
      <el-button @click="handleMinBtn" size="small" class="layer-List-min-el-btn" :icon="stateMaxMin===0 ? 'SemiSelect' : 'CaretBottom'"/>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store";
import { computed, onScopeDispose, ref, watch } from "vue";
import{ SemiSelect, CirclePlus, Delete, Download, MoreFilled, DCaret, Operation, View } from '@element-plus/icons-vue'
import { g_LayerType } from '@/layerType';
import { ElTable, ElTableColumn, ElTag, ElButton, ElIcon, ElSelect, ElButtonGroup, ElDivider, ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

const store = useUsersStore();
let layerList1 = ref(null);
let layerListTable = ref(null);
let currentScope = ref(null);
let expendRow = ref([])
let timeSelect = ref(null)
let GradientDensity = ref(null)


//--------------------------图层名称和展开动作-------------------------------------
// 点击一级行展开后更新展开状态
function handleExpand(row:any, expanded:boolean){
  if (!expanded) {
    expendRow.value.splice(expendRow.value.indexOf(row.layerId),1)
  }else{
    if(expendRow.value.indexOf(row.layerId) > 0){
      expendRow.value.push(row.layerId)
    }
  }
}
// 监视二级行添加后，更新一级行展开状态
watch(currentScope,(newvalue,oldvalue)=>{
  if(!expendRow.value.includes(currentScope.value.row.layerId)){
    expendRow.value.push(currentScope.value.row.layerId)
  }
})

// 动态计算图层名称前的序号
watch(store.layerList,(newVal,oldVal)=>{
  let iLoop,jLoop,kLoop;
  for(iLoop = 0; iLoop < store.layerList.length; iLoop++){
    store.layerList[iLoop].index = String(iLoop+1);
    for(jLoop = 0; jLoop < store.layerList[iLoop].children.length; jLoop++){
      store.layerList[iLoop].children[jLoop].index = String((iLoop+1)+'.'+(jLoop+1));
      for(kLoop = 0; kLoop < store.layerList[iLoop].children[jLoop].children.length; kLoop++){
        store.layerList[iLoop].children[jLoop].children[kLoop].index = String((iLoop+1)+'.'+(jLoop+1)+'.'+(kLoop+1));
      }
    }
  }
})
//--------------------------图层名称和展开动作 end-------------------------------------

//--------------------------下拉菜单回调函数清单-------------------------------------
//点击dropdown菜单事件
function handleCommand(callBackName: string, scope: any){
  eval(callBackName + '(scope)')
  currentScope.value = scope
  layerListTable.value.toggleRowExpansion(scope.row, true)
}
//c013
function handleC013_Cold52(scope: any){
  store.requestNewLayer(g_LayerType.C013_Cold52, scope.$index, scope.row.time)
}
function handleC013_Cold62(scope: any){
  store.requestNewLayer(g_LayerType.C013_Cold62, scope.$index, scope.row.time)
}
function handleC013_Cold73(scope: any){
  store.requestNewLayer(g_LayerType.C013_Cold73, scope.$index, scope.row.time)
}
function handleC013_Center(scope: any){
  store.requestNewLayer(g_LayerType.C013_Center, scope.$index, scope.row.time)
}
function handleC013_Gradient(scope: any){
  store.requestNewLayer(g_LayerType.C013_Gradient, scope.$index, scope.row.time)
}
function C013_RateHalf(scope: any){
  store.requestNewLayer(g_LayerType.C013_RateHalf, scope.$index, scope.row.time)
}
function C013_RateOne(scope: any){
  store.requestNewLayer(g_LayerType.C013_RateOne, scope.$index, scope.row.time)
}
//c003
function handleC003_Albedo80(scope: any){
  store.requestNewLayer(g_LayerType.C003_Albedo80, scope.$index, scope.row.time)
}
function handleC003_Albedo90(scope: any){
  store.requestNewLayer(g_LayerType.C003_Albedo90, scope.$index, scope.row.time)
}
function handleC003_AlbedoHalf(scope: any){
  store.requestNewLayer(g_LayerType.C003_AlbedoRateHalf, scope.$index, scope.row.time)
}
function handleC003_AlbedoOne(scope: any){
  store.requestNewLayer(g_LayerType.C003_AlbedoRateOne, scope.$index, scope.row.time)
}
//swan
function handleEcho35DBZ(scope: any){
  store.requestNewLayer(g_LayerType.Swan_35DBZ, scope.$index, scope.row.time)
}
function handleEcho6min(scope: any){
  store.requestNewLayer(g_LayerType.Swan_6min, scope.$index, scope.row.time)
}
function handleEcho12min(scope: any){
  store.requestNewLayer(g_LayerType.Swan_12min, scope.$index, scope.row.time)
}

//MCS
function handleMcsPush(scope: any){
  store.requestNewLayer(g_LayerType.MCS_Push, scope.$index, scope.row.time)
}
function handleMcsTrack(scope: any){
  store.requestNewLayer(g_LayerType.MCS_Track, scope.$index, scope.row.time)
}

//--------------------------下拉菜单回调函数清单 end-------------------------------------


//--------------------------时次选择相关-------------------------------------
//获取时次    参数$event：出现则为 true，隐藏则为 false
function handleGetTimes($event: boolean, scope: any) {
  if($event === true){
  }
}
//获取变更的时次对应的图层    参数$event：目前的选中值
function handleGetSelected($event: string, scope: any) {
  store.requestUpdateLayer(scope.row, scope.$index)
}
// 向前翻页
function handleFlipUp(scope: any) {
  let index = scope.row.timeList.map((item: any) => item).indexOf(scope.row.time)
  if(index > 0){
    scope.row.time = scope.row.timeList[index-1]
    store.requestUpdateLayer(scope.row, scope.$index)
  }
}
// 向后翻页
function handleFlipDown(scope: any) {
  let index = scope.row.timeList.map((item: any) => item).indexOf(scope.row.time)
  if(index < (scope.row.timeList.length-1)){
    scope.row.time = scope.row.timeList[index+1]
    store.requestUpdateLayer(scope.row, scope.$index)
  }
}
// 加载更多时次
function handleLoadMore(scope:any){
  store.RequestLoadMoreTimeList(scope.row)
}
// 刷新时次列表
function handleReload(scope:any){
  store.RequestReloadTimeList(scope.row)
}

//--------------------------时次选择相关 end-------------------------------------


//保存文件
function handleSaveFile(scope: any) {
  // console.log(scope)
}



let stateMaxMin = ref(1);
//最小化按钮
function handleMinBtn() {
  if(stateMaxMin.value !== 0){
    layerList1.value.style.height = "var(--layer-list-height-min)";
    stateMaxMin.value = 0
  } else{
    layerList1.value.style.height = "var(--layer-list-height)";
    stateMaxMin.value = 1
  }
}
//最大化按钮
function handleMaxBtn() {
  if(stateMaxMin.value !== 2){
    layerList1.value.style.height = "var(--layer-list-height-max)";
    stateMaxMin.value = 2
  } else{
    layerList1.value.style.height = "var(--layer-list-height)";
    stateMaxMin.value = 1
  }
}
</script>

<style lang="scss" scoped>

.layer-List-min-el-btn {
  width: 30;
  height: 25;
  padding: 5px;
}
.el-button+.el-button{
  margin-left: 5px;
}
.el-check-tag {
  font-size: 12px;
  width: 130px;
  padding-left: 10px;
  padding-right: 0px;
  text-align:left;
}
.el-check-tag.is-checked{
    color:rgb(76, 19, 235)
  }
.el-check-tag-level1{//https://www.jb51.net/article/215294.htm
    font-size: 11px;
    width: 120px;
    margin-left: 10px;
    padding-left: 10px;
    padding-right: 0px;
    text-align:left;
    // color:rgb(63, 44, 129)
  }
.el-check-tag-level2{
  font-size: 10px;
    width: 110px;
    margin-left: 20px;
    padding-left: 10px;
    padding-right: 0px;
    text-align:left;
}

.option_item{
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}


/*最外层背景*/
.elselect {
  background: #122856;
  color: rgb(115, 37, 187) !important;
  border: 1px solid rgba(149, 190, 255, 0.32);
  border: 1px solid rgb(29, 25, 85);
  border-radius: 5px;
}
/*修改单个的选项的样式*/
.elselect .el-select-dropdown__item {
  // background: #f2f6fa;
  // color: rgb(0, 0, 3) !important;
  font-size: 13px;
  text-align: center;
  height: 25px;
  line-height: 25px;
}
/*item选项的hover样式*/
.elselect .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #7387d44c;
}
</style>

