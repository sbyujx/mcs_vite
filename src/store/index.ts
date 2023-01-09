import emitter from "@/emitter/bus";
import axios from "axios";
import { g_LayerType } from '@/layerType'
import type { LayerTypeItem, LayerListItem } from "~/basic";
import { defineStore } from "pinia";
import {nanoid} from 'nanoid';

// 第一个参数name：一个字符串，必传项，该store的唯一id。
// 第二个参数options：一个对象，store的配置项，比如配置store内的数据，修改数据的方法等等
export const useUsersStore = defineStore("basic", {
  state: () => {
    return {
      layerList: new Array<LayerListItem>(),  //图层列表
      layerTableLength: 0,               //图层列表的总长度
      
      //选项卡状态
      cardName: '',     //存放当前显示的选项卡
      cardVisible:false,
      mcsTimeList:[],

      mouseLngLat: { Lng: 0, Lat: 0 }, //鼠标经纬度
      isCollapse: true,     //指示侧边栏是否收起
    };
  },
  
  actions: {
    //用户请求添加图层，tableIndex代表要插入mapLayer列表中的位置
    requestNewLayer(layertype: LayerTypeItem, tableIndex: number, layerTime: string) {  
      axios.get(layertype.requestPath, {
          params: { 'layerTime': layerTime }
        }).then((response)=>{
        this.AddLayer(layertype, response.data, tableIndex);
      });
    },
    //用户请求MCS识别图层
    RequestMcsLayer(McsPara:any) {  
      axios.get('/MCS',{params: McsPara}).then((response)=>{
        this.AddLayer(g_LayerType.MCS, response.data, this.layerTableLength);
      });
    },
    //用户请求反演降水逐小时预报图层
    RequestInvertRainHourLayer(RainPara:any) {  
      axios.get('/InvertRainHour',{params: RainPara}).then((response)=>{
        this.AddLayer(g_LayerType.InvertRainHour, response.data, this.layerTableLength);
      });
    },
    //用户请求反演降水3小时累计预报图层
    RequestInvertRain3HourLayer(RainPara:any) {  
      axios.get('/InvertRain3Hour',{params: RainPara}).then((response)=>{
        this.AddLayer(g_LayerType.InvertRain3Hour, response.data, this.layerTableLength);
      });
    },
    //用户请求更新图层，tableIndex代表要插入mapLayer列表中的位置
    requestUpdateLayer(layerListItem: LayerListItem, tableIndex: number) {  
      axios.get(layerListItem.type.requestPath, {
          params: { 'layerTime': layerListItem.time }
        }).then((response)=>{
        this.UpdateLayer(layerListItem, response.data, tableIndex);
      });
    },

    //用户请求加载更多时次
    RequestLoadMoreTimeList(layerListItem: LayerListItem) {  
      let lastTime = layerListItem.timeList[layerListItem.timeList.length-1]
      axios.get(layerListItem.type.requestPath + '/LoadMoreTimeList', {params: { 'lastTime': lastTime }}).then((response)=>{
        layerListItem.timeList = layerListItem.timeList.concat(response.data.timeList)
      });
    },
    //用户请求刷新时次
    RequestReloadTimeList(layerListItem: LayerListItem) {  
      axios.get(layerListItem.type.requestPath + '/ReloadTimeList').then((response)=>{
        layerListItem.timeList = response.data.timeList
      });
    },
    //用户请求MCS时次
    RequestMcsTimeList() {  
      axios.get('/MCS/TimeList').then((response)=>{
        this.mcsTimeList = response.data.timeList
      });
    },

 
    // 添加 图层  对于level为1或2的图层，tableIndex代表要添加的图层的父级所在的scope.$index
    AddLayer(layertype: LayerTypeItem, respData:any, tableIndex: number){
      let layerListItem:LayerListItem = {
        index:'',
        layerId: nanoid(),
        time: respData?.time,
        timeList:respData?.timeList || [],
        label: respData?.time,
        type: layertype,
        isLayerShow: true,
        isCardShow: false,
        data:respData?.layerData,// data = JSON.parse(response.data.layerData)
        children:[],
      }

      const {i,j} = this.getLayerIndex(tableIndex)
      // 要添加的是level=2的节点，tableIndex必然是level=1的节点
      if(layertype.layerLevel===2){         
        this.layerList[i].children[j].children.push(layerListItem);
        tableIndex = tableIndex + this.layerList[i].children[j].children.length //保证mapLayerList中添加的位置和table中的序号一致。
      }
      // 要添加的是level=1的节点，tableIndex必然是level=0的节点
      else if(layertype.layerLevel===1){    
        this.layerList[i].children.push(layerListItem);
        tableIndex = tableIndex + this.layerList[i].children.length
        for(let iLoop=0; iLoop<this.layerList[i].children.length; iLoop++){       //保证mapLayerList中添加的位置和table中的序号一致。
          tableIndex = tableIndex + this.layerList[i].children[iLoop].children.length
        }
      }
      // 要添加的是level=0的节点，tableIndex必然是最后一个节点
      else if(layertype.layerLevel===0){    
        this.layerList.push(layerListItem);  
      }
      this.layerTableLength++;

      //根据renderFuncName动态匹配图层的渲染函数
      emitter.emit(layertype.renderFuncName, {layerListItem, tableIndex});
    },

    // 更新 图层（更新时次）  
    UpdateLayer(layerListItem: LayerListItem, respData:any, tableIndex: number){
      layerListItem.data = respData?.layerData
      emitter.emit(layerListItem.type.updateFuncName, {layerListItem, tableIndex});//根据updateFuncName动态匹配图层的渲染函数
    },

    // 删除 图层
    DeleteLayer(tableIndex: number) {
      const {i,j,k} = this.getLayerIndex(tableIndex)

      let delLength = 0;
      if((j === -1) && (k === -1)){          // 图层level为0 返回{i,-1,-1}
        //处理level=1的子节点个数
        delLength = this.layerList[i].children.length + 1
        //处理level=2的子节点个数
        if(this.layerList[i].children.length !== 0){
          for(let iLoop = 0; iLoop < this.layerList[i].children.length; iLoop++){
            delLength = delLength + this.layerList[i].children[iLoop].children.length;
          }
        }
        this.layerList.splice(i, 1)
      }else if(k === -1){                     // 图层level为1 返回{i,j,-1}
        delLength = this.layerList[i].children[j].children.length + 1
        this.layerList[i].children.splice(j, 1)
      }else{                                   // 图层level为2 返回{i,j,k}
        delLength = 1
        this.layerList[i].children[j].children.splice(k,1)
      }

      //更新图层数量
      this.layerTableLength = this.layerTableLength - delLength;
      emitter.emit("removeMapLayer", {tableIndex, delLength});
    },

    // 显示/隐藏 图层
    SetLayerVisible(scope: any) {
      scope.row.isLayerShow = !scope.row.isLayerShow;
      const tableIndex = scope.$index
      const show = scope.row.isLayerShow;
      emitter.emit("showMapLayer", {tableIndex, show});
    },

    // 显示/隐藏 卡片
    SetCardVisible(cardName: string){
      if (cardName === this.cardName) {
        this.cardVisible = !this.cardVisible;
      } else {
        this.cardName = cardName;
        this.cardVisible = true;
    }},


    //将TableIndex转换成LayerIndex，匹配到第一级时j=-1
    getLayerIndex(tableIndex: number):{i:number,j:number,k:number}{
      let tempIndex = 0;
      let i=0,j=0,k=0;
      for(i = 0; i < this.layerList.length; i++){
        if(tempIndex === tableIndex){         //图层level为0 返回{i,-1,-1}
          j=-1;
          k=-1;
          return {i,j,k};
        }
        tempIndex++;
        if(this.layerList[i].children.length !== 0){
          for(j = 0; j < this.layerList[i].children.length; j++){
            if(tempIndex === tableIndex){     //图层level为1 返回{i,j,-1}
              k=-1;
              return {i,j,k};
            }
            tempIndex++;
            if(this.layerList[i].children[j].children.length !== 0){
              for(k = 0; k < this.layerList[i].children[j].children.length; k++){
                if(tempIndex === tableIndex){     //图层level为2 返回{i,j,k}
                  return {i,j,k};
                }
                tempIndex++;
              }
            }
          }
        }
      }
      return {i,j,k}
    },
  
  },
});
