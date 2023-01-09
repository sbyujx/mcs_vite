<template>
    <el-card style="height:250px; width: 250px;">
      <el-tag style="position:absolute; top:5px; left:5px; right:5px;">反演降水</el-tag>
      <div style="position:absolute; top:35px; bottom: 5px; left:5px; right:5px; border:1px solid var(--el-border-color);border-radius:5px">
        <el-form size = 'small' :model="RainPara" style="margin: 10px;">

          <el-form-item label="预报日期" style="margin-bottom:15px">
            <el-date-picker v-model="RainPara.RainDate" type="date" placeholder="选择日期" size="small" format="YYYY-MM-DD" value-format="YYYY-MM-DD"/>
          </el-form-item>
          <el-form-item label="预报时次" style="margin-bottom:15px">
            <el-time-select v-model="RainPara.RainTime" start="00:00" step="01:00" end="23:59" placeholder="Select time" format="HH时" />
          </el-form-item>
          <el-form-item label="降水格距" style="margin-bottom:15px">
            <el-select v-model="RainPara.Distance">
              <el-option value="0.1°"/>
              <el-option value="0.2°"/>
            </el-select>
          </el-form-item>
        </el-form>  

        <div style="position:absolute; bottom: 20px; left:5px; right:5px;">
          <el-button style="margin-left: 20px;" size='small' @click="handleInvertRainHour()">逐小时</el-button>
          <el-button size='small' @click="handleInvertRain3Hour()">3小时</el-button>
          <el-button size='small' @click="store.SetCardVisible('InvertRainCard')">取消</el-button>
        </div>

      </div>
    </el-card>
</template>


<script setup lang="ts">

import {computed, reactive} from "vue";
import { useUsersStore }  from "@/store";
import { ElMessage } from "element-plus";
const store = useUsersStore();

//反演降水参数
const RainPara = reactive({
  RainDate:'',
  RainTime:'',
  Distance: '0.1°',
})

// 逐小时预报降水
function handleInvertRainHour(){
  if(!hasEmpty.value){
    store.RequestInvertRainHourLayer(RainPara);
  }else{
    ElMessage({ message: '请填写完整的反演降水参数！', type: 'warning', })
  }
}
//3小时累计降水
function handleInvertRain3Hour(){
  if(!hasEmpty.value){
    store.RequestInvertRain3HourLayer(RainPara);
  }else{
    ElMessage({ message: '请填写完整的反演降水参数！', type: 'warning', })
  }
}

const hasEmpty = computed(() => {
  if((RainPara.RainDate==='') || (RainPara.RainTime==='')){
    return true
  }else{
    return false
  }
})
</script>



<style lang="scss" scoped>
.el-select-dropdown__item {
  font-size: 13px;
  text-align: center;
  height: 25px;
  line-height: 25px;
}
</style>