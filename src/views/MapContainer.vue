<template>
  <div id="container"></div>
</template>

<script setup lang="ts">

import { shallowRef } from 'vue'
import { useUsersStore }  from "@/store";
import {onMounted} from "vue";
import emitter from "@/emitter/bus";
import AMapLoader from '@amap/amap-jsapi-loader';
import "@amap/amap-jsapi-types";
import { g_LayerType } from '@/layerType';

const store = useUsersStore();

let map: AMap.Map = shallowRef(null);
let mapLayerList: any = [];

function initMap() {
  AMapLoader.load({
    key: "9a900077d74c31fbdec2a11f2de846d1",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType', 'AMap.DistrictLayer', 'AMap.GeoJSON'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    map = new AMap.Map("container", {
      viewMode: "2D",  
      zoom: 5,    
      center: [102.665, 30.11], 
      WebGLParams: {
        preserveDrawingBuffer: true
      },
    })

    map.addControl(new AMap.Scale({
      position: {
        bottom: '30px',
        left: 'var(--side-bar-width)'
      }
    }))
    map.addControl(new AMap.ToolBar({
      position: {
        bottom: '300px',
        right: 'var(--map-tools-postion-right)'
      }
    }))
    map.addControl(new AMap.MapType({
        position: {
          top: '100px',
          right: 'var(--map-tools-postion-right)'
      }
    }))



    // var geojson = new AMap.GeoJSON({
    //   geoJSON: sichuanGeoJson,
    //   getPolygon: function(geojson:any, lnglats:any) {
    //     var area = AMap.GeometryUtil.ringArea(lnglats[0])
    //     return new AMap.Polygon({
    //         path: lnglats,
    //         fillOpacity: 0,
    //         strokeOpacity:0.5,
    //         strokeStyle: 'dashed',
    //         strokeColor: 'green',
    //         strokeWeight: 1,
    //         fillColor: 'white'
    //     });
    //   }
    // });
    // map.add(geojson)

    map.on('mousemove', function(e) {
      store.mouseLngLat.Lng = e.lnglat.getLng().toFixed(4)
      store.mouseLngLat.Lat = e.lnglat.getLat().toFixed(4)
    });

    // 默认加载行政区域
    store.requestNewLayer(g_LayerType.DistrictSiChuan, store.layerTableLength, '')
  }).catch(e => {
    console.log(e);
  })
}

//定位至指定中心点
function LocationToCenter() {
  map.setCenter([102.665, 30.11]);
  map.setZoom(6);
}


//添加四川行政边界图层
function addDistrict(data: any) {
  var disCountry = new AMap.DistrictLayer.Country({
    // zIndex:10,
    // SOC:'CHN',
    adcode:'510000',  //四川
    depth: 2,
    opacity: 1,
    visible :true,
    styles:{
        'stroke-width': 1,
        // 'nation-stroke':'#ff0000',
        // 'province-stroke':'#0b1a38',
        'city-stroke':'#0b1a38',
        // 'county-stroke':'#477ef5',
        'fill':'none'//rgba(255,255,255,0)'
        }
    })
  map.add(disCountry)
  mapLayerList.splice(data.tableIndex, 0 , disCountry)
}

//添加多边形
function addPolygon(data: any) {
  let polygon = new AMap.Polygon()
  polygon.setOptions({
    path: data.layerListItem.data,
    fillColor: '#ccebc5',
    strokeOpacity: 1,
    fillOpacity: 0.5,
    strokeColor: '#2b8cbe',
    strokeWeight: 1,
    strokeStyle: 'dashed',
    strokeDasharray: [5, 5],
  });
  polygon.on('mouseover', () => {
    polygon.setOptions({
      fillOpacity: 0.7,
      fillColor: '#7bccc4'
    })
  })
  polygon.on('mouseout', () => {
    polygon.setOptions({
      fillOpacity: 0.5,
      fillColor: '#ccebc5'
    })
  })
  map.add(polygon);
  mapLayerList.splice(data.tableIndex, 0 ,polygon)
}

//更新多边形
function updatePolygon(data: any) {
  mapLayerList[data.tableIndex].setPath(data.layerListItem.data);
}

//添加图片图层
function addImglayer(data: any) {
  var imageLayer = new AMap.ImageLayer({
      url: data.layerListItem.data,
      bounds: [95, 25, 110, 35],
      zooms: [1, 20],
      opacity: 0.6
  });
  map.add(imageLayer);
  mapLayerList.splice(data.tableIndex, 0 ,imageLayer)
}
//更新图片图层
function updateImglayer(data: any) {
  map.remove(mapLayerList[data.tableIndex])
  var imageLayer = new AMap.ImageLayer({
      url: data.layerListItem.data,
      bounds: [110, 25, 95, 35],
      zooms: [1, 20],
      opacity: 0.6,
      visible: data.layerListItem.isLayerShow,
  });
  map.add(imageLayer);
  mapLayerList[data.tableIndex] = imageLayer;
}

//添加文本标记
function addText(data: any) {
  var marker = new AMap.Text({
        text: data.layerListItem.data[2],
        anchor:'center', // 设置文本标记锚点
        cursor:'pointer',
        // style:{
        //     'padding': '.75rem 1.25rem',
        //     'margin-bottom': '1rem',
        //     'border-radius': '.25rem',
        //     'background-color': 'white',
        //     'width': '15rem',
        //     'border-width': 0,
        //     'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
        //     'text-align': 'center',
        //     'font-size': '20px',
        //     'color': 'blue'
        // },
        position: [data.layerListItem.data[0],data.layerListItem.data[1]]
    });

  map.add(marker)  
  mapLayerList.splice(data.tableIndex, 0 ,marker)
}

//更新文本标记
function updateText(data: any) {
  // var marker = new AMap.Marker({
  //   // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
  //   position: data.layerListItem.data,
  //   // offset: new AMap.Pixel(-13, -30)
  // });
  // map.add(marker)  
  // mapLayerList.splice(data.tableIndex, 0 ,marker)
  // mapLayerList[data.tableIndex].setPath(data.layerListItem.data);
}

//添加点文本标记图层
function addTextLayer(data: any) {
  let markers:any = [];
  for(let iLoop=0; iLoop<data.layerListItem.data.length; iLoop++){
    let marker = new AMap.LabelMarker({
      position: data.layerListItem.data[iLoop].lnglat,
      text: {
        content: data.layerListItem.data[iLoop].text,
        direction: 'center',
        style: {
          fillColor: 'red',
          strokeColor: 'blue'
        },
      }
    })
    markers.push(marker)
  }
  
  let layer:any = new AMap.LabelsLayer({
    collision: true,
    allowCollision: true,
  });
  layer.add(markers);

  map.add(layer)  
  mapLayerList.splice(data.tableIndex, 0 ,layer)
}

//添加点文本标记图层
function updateTextLayer(data: any) {
  let markers:any = [];
  for(let iLoop=0; iLoop<data.layerListItem.data.length; iLoop++){
    let marker = new AMap.LabelMarker({
      position: data.layerListItem.data[iLoop].lnglat,
      text: {
        content: data.layerListItem.data[iLoop].text,
        direction: 'center',
        style: {
          fillColor: 'red',
          strokeColor: 'blue'
        },
      }
    })
    markers.push(marker)
  }
  mapLayerList[data.tableIndex].clear();
  mapLayerList[data.tableIndex].add(markers);
}

// 添加图标标记图层
function addMultiIconLayer(data: any) {
  // https://cloudconvert.com/webp-to-ico
  // https://www.bilibili.com/read/cv16887914
  // http://t.zoukankan.com/gezhaoatdlnu-p-13737602.html    //svg旋转，思路：动态生成svg，转换为icon，放入路径中。
  let markers:any = [];
  for(let iLoop=0; iLoop<data.layerListItem.data.length; iLoop++){
    let marker = new AMap.LabelMarker({
      position: data.layerListItem.data[iLoop].lnglat,
      icon: {
        // image: `/weatherIcon/${data.layerListItem.data[iLoop].force}.png`,
        image: '/vite.svg',
        // anchor: 'bottom-center',//图标锚点，锚点位置对应设置的 position 位置。
        size: [20, 20], 
        // clipOrigin: [459, 92], //图标所在图片偏移位置，默认值: [0, 0]
        // clipSize: [50, 68],    //图标所在图片裁剪大小，若未设置，则使用图片大小
      },
    })
    markers.push(marker)
  }
  
  let layer:any = new AMap.LabelsLayer({
    collision: true,
    allowCollision: true,
  });
  layer.add(markers);

  map.add(layer)  
  mapLayerList.splice(data.tableIndex, 0 ,layer)
}

// 更新图标标记图层
function updateMultiIconLayer(data: any) {
  let markers:any = [];
  for(let iLoop=0; iLoop<data.layerListItem.data.length; iLoop++){
    let marker = new AMap.LabelMarker({
      position: data.layerListItem.data[iLoop].lnglat,
      icon: {
        image: `/weatherIcon/${data.layerListItem.data[iLoop].force}.png`,
        size: [20, 20], 
      },
    })
    markers.push(marker)
  }
  mapLayerList[data.tableIndex].clear();
  mapLayerList[data.tableIndex].add(markers);
}


//添加轨迹图层
function addPolyline(data: any) {
  var polyline = new AMap.Polyline({
    path: data.layerListItem.data,
    // isOutline: true,
    outlineColor: '#ffeeff',
    // borderWeight: 3,
    strokeColor: "#3366FF",
    strokeOpacity: 0.8,
    strokeWeight: 6,
    // 折线样式还支持 'dashed'
    // strokeStyle: "solid",
    // strokeStyle是dashed时有效
    // strokeDasharray: [10, 5],
    lineJoin: 'round',
    lineCap: 'square',
    showDir: true,
    zIndex: 50,
  })
  map.add(polyline)  
  mapLayerList.splice(data.tableIndex, 0 ,polyline)
}



//添加GeoJson
function addGeojson() {
  // var geojson = new AMap.GeoJSON({
  //   geoJSON: sichuanGeoJson,
  // });
  // map.add(geojson)  
  // mapLayerList.push(geojson)
}

//显示Map图层
function showMapLayer(data: any) {
  if(data.show === true){
    mapLayerList[data.tableIndex].show()
  }else {
    mapLayerList[data.tableIndex].hide()
  }
}

//删除Map图层
function removeMapLayer(data: any) {
  let i = 0
  if (mapLayerList[data.tableIndex]) {
    for(i = 0; i < data.delLength; i++){
      map.remove(mapLayerList[data.tableIndex + i])
    }
    mapLayerList.splice(data.tableIndex, data.delLength)
  }
}


onMounted(()=>{
  initMap();
  // 注册事件
  emitter.on("addDistrict", (data:any) => {
    addDistrict(data);
  });
  emitter.on("addPolygon", (data:any) => {
    addPolygon(data);
  });
  emitter.on("updatePolygon", (data:any) => {
    updatePolygon(data);
  });
  emitter.on("addImglayer", (data:any) => {
    addImglayer(data);
  });
  emitter.on("updateImglayer", (data:any) => {
    updateImglayer(data);
  });
  emitter.on("addText", (data:any) => {
    addText(data);
  });
  emitter.on("updateText", (data:any) => {
    updateText(data);
  });
  emitter.on("addTextLayer", (data:any) => {
    addTextLayer(data);
  });
  emitter.on("updateTextLayer", (data:any) => {
    updateTextLayer(data);
  });
  emitter.on("addPolyline", (data:any) => {
    addPolyline(data);
  });
  emitter.on("addMultiIconLayer", (data:any) => {
    addMultiIconLayer(data);
  });
  emitter.on("updateMultiIconLayer", (data:any) => {
    updateMultiIconLayer(data);
  });

  emitter.on("removeMapLayer", (data: any) => {
    removeMapLayer(data);
  });
  emitter.on("showMapLayer", (data:any) => {
    showMapLayer(data);
  });
})

  
defineExpose({
  LocationToCenter
})

</script>



<style  scoped>
#container{
  position: absolute;
  left :0;
  right:0;
  top: 0;
  bottom: 0
}

</style>