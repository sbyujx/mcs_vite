<template>
  <el-card style="height:250px; width: 250px;">
    <el-tag style="position:absolute; top:5px; left:5px; right:5px;">MCS识别</el-tag>
    <div style="position:absolute; top:35px; bottom: 5px; left:5px; right:5px; border:1px solid var(--el-border-color);border-radius:5px">
      <el-form label-position='left' label-width="100px" size = 'small' :model="McsPara" style="margin: 10px;">
        <el-form-item label="红外云图时次" style="margin-bottom:15px">
          <el-select v-model="McsPara.McsTime" placeholder="选择时次">
            <el-option v-for="mcsTime in store.mcsTimeList" :value="mcsTime" :label="mcsTime"/>
          </el-select>
        </el-form-item>
        <el-form-item label="冷云区阈值(℃)" style="margin-bottom:15px">
          <el-input v-model="McsPara.ColdThreshold"  placeholder="输入阈值"/>
        </el-form-item>
        <el-form-item label="梯度阈值(℃)" style="margin-bottom:15px">
          <el-input v-model="McsPara.DegreeRate"  placeholder="输入阈值"/>
        </el-form-item>
        <el-form-item label="亮温变率时间" style="margin-bottom:15px">
          <el-select v-model="McsPara.Rate" placeholder="选择时间">
            <el-option value="0.5" label="0.5小时"/>
            <el-option value="1" label="1小时"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="position:absolute; bottom: 10px; left:5px; right:5px;">
        <el-button style="margin-left: 40px;" size='small' @click="handleMCS()">MCS识别</el-button>
        <el-button size='small' @click="store.SetCardVisible('McsCard')">取消</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useUsersStore }  from "@/store";
import { ElMessage } from "element-plus";
import {computed, onMounted, reactive, Ref, ref} from "vue";

const store = useUsersStore();
//MCS参数
const McsPara = reactive({
  McsTime: '',
  ColdThreshold: '',
  DegreeRate:'',
  Rate: '',
})

// MCS识别按钮
function handleMCS(){
  if(!hasEmpty.value){
    store.RequestMcsLayer(McsPara);
  }else{
    ElMessage({ message: '请填写完整的MCS参数！', type: 'warning', })
  }
}

// 加载组件前先请求时次列表
onMounted(() => {
  store.RequestMcsTimeList();
})

const hasEmpty = computed(() => {
  if((McsPara.McsTime==='') || (McsPara.ColdThreshold==='') || (McsPara.DegreeRate==='') || (McsPara.Rate==='')){
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