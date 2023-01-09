import { defineAsyncComponent } from "vue";
import { LayerType } from "~/basic";

const g_LayerType: LayerType = {
  //红外云图
  C013: { 
    typeId: 100,
    typeName: "红外云图",
    layerLevel: 0,
    renderFuncName: "addImglayer",
    updateFuncName: "updateImglayer",
    requestPath: '/C013',
    // trigleSource: 'card',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[      
      {name:'冷云区-52℃', callBack:'handleC013_Cold52'},
      {name:'冷云区-62℃', callBack:'handleC013_Cold62'},
      {name:'冷云区-73℃', callBack:'handleC013_Cold73'},
      {name:'亮温梯度', callBack:'handleC013_Gradient'},
      {name:'半小时亮温变率', callBack:'C013_RateHalf'},
      {name:'一小时亮温变率', callBack:'C013_RateOne'},
    ]
  }, 
  //红外云图-冷云区-52℃
  C013_Cold52: {
    typeId: 110,
    typeName: "冷云区-52℃",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C013_Cold52',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'亮温中心', callBack:'handleC013_Center'},]
  },
  //红外云图-冷云区-62℃
  C013_Cold62: {
    typeId: 120,
    typeName: "冷云区-62℃",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C013_Cold62',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'亮温中心', callBack:'handleC013_Center'},]
  },
  //红外云图-冷云区-73℃
  C013_Cold73: {
    typeId: 130,
    typeName: "冷云区-73℃",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C013_Cold73',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'亮温中心', callBack:'handleC013_Center'},]
  },
  //红外云图-亮温中心
  C013_Center: {
    typeId: 101,
    typeName: "亮温中心",
    layerLevel: 2,
    renderFuncName: "addText",
    updateFuncName: "",
    requestPath: '/C013_Center',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //红外云图-亮温梯度
  C013_Gradient: {
    typeId: 140,
    typeName: "亮温梯度",
    layerLevel: 1,
    renderFuncName: "addImglayer",
    updateFuncName: "",
    requestPath: '/C013_Gradient',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'自定义', callBack:'自定义'},]
  },
    //红外云图-梯度密集区
  C013_GradientDensity: {
    typeId: 102,
    typeName: "梯度密集区",
    layerLevel: 2,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C013_GradientDensity',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  },
  //红外云图-亮温变率0.5H
  C013_RateHalf: {
    typeId: 150,
    typeName: "0.5h亮温变率",
    layerLevel: 1,
    renderFuncName: "addImglayer",
    updateFuncName: "",
    requestPath: '/C013_RateHalf',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  },
  //红外云图-亮温变率1H
  C013_RateOne: {
    typeId: 150,
    typeName: "1h亮温变率",
    layerLevel: 1,
    renderFuncName: "addImglayer",
    updateFuncName: "",
    requestPath: '/C013_RateOne',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  },

  //可见光云图
  C003: {
    typeId: 200,
    typeName: "可见光云图",
    layerLevel: 0,
    renderFuncName: "addImglayer",
    updateFuncName: "updateImglayer",
    requestPath: '/C003',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[
      {name:'80%反照率', callBack:'handleC003_Albedo80'},
      {name:'90%反照率', callBack:'handleC003_Albedo90'},
      {name:'半小时反照率变率', callBack:'handleC003_AlbedoHalf'},
      {name:'一小时反照率变率', callBack:'handleC003_AlbedoOne'},]
  }, 
  //可见光云图-反照率
  C003_Albedo80: {
    typeId: 210,
    typeName: "80%反照率",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C003_Albedo80',
    // trigleSource: 'sidebar',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //可见光云图-反照率
  C003_Albedo90: {
    typeId: 210,
    typeName: "90%反照率",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/C003_Albedo90',
    // trigleSource: 'sidebar',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //可见光云图-反照率变率
  C003_AlbedoRateHalf: {
    typeId: 220,
    typeName: "0.5h反照率变率",
    layerLevel: 1,
    renderFuncName: "addImglayer",
    updateFuncName: "",
    requestPath: '/C003_AlbedoRateHalf',
    // trigleSource: 'sidebar',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  },
  //可见光云图-反照率变率
  C003_AlbedoRateOne: {
    typeId: 220,
    typeName: "1h反照率变率",
    layerLevel: 1,
    renderFuncName: "addImglayer",
    updateFuncName: "",
    requestPath: '/C003_AlbedoRateOne',
    // trigleSource: 'sidebar',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //SWAN拼图
  Swan: {
    typeId: 300,
    typeName: "SWAN拼图",
    layerLevel: 0,
    renderFuncName: "addImglayer",
    updateFuncName: "updateImglayer",
    requestPath: '/Swan',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[
      {name:'35dbz强回波边界', callBack:'handleEcho35DBZ'},
      {name:'6分钟强回波边界', callBack:'handleEcho6min'},
      {name:'12分钟强回波边界', callBack:'handleEcho12min'}
    ]
  }, 
  //SWAN拼图-35dbz强回波边界
  Swan_35DBZ: {
    typeId: 310,
    typeName: "35dbz边界",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/Swan_35dbz',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //SWAN拼图-6分钟强回波边界
  Swan_6min: {
    typeId: 320,
    typeName: "6分钟边界",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/Swan_6min',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //SWAN拼图-12分钟强回波边界
  Swan_12min: {
    typeId: 330,
    typeName: "12分钟边界",
    layerLevel: 1,
    renderFuncName: "addPolygon",
    updateFuncName: "",
    requestPath: '/Swan_12min',
    // trigleSource: 'card',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //闪电数据
  Flash: {
    typeId: 400,
    typeName: "闪电数据",
    layerLevel: 0,
    renderFuncName: "addTextLayer",
    updateFuncName: "updateTextLayer",
    requestPath: '/Flash',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //实况风场-200hpa
  Wind200: {
    typeId: 500,
    typeName: "实况风场-200hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/Wind200',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //实况风场-300hpa
  Wind300: {
    typeId: 510,
    typeName: "实况风场-300hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/Wind300',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //实况风场-500+700hpa
  Wind500_700: {
    typeId: 520,
    typeName: "实况风场-500+700hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/Wind500_700',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //实况风场-850hpa
  Wind850: {
    typeId: 530,
    typeName: "实况风场-850hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/Wind850',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //EC风场_200
  ECWind200: {
    typeId: 600,
    typeName: "EC风场-200hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/ECWind200',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //EC风场_500
  ECWind500: {
    typeId: 610,
    typeName: "EC风场-500hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/ECWind500',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //EC风场_700
  ECWind700: {
    typeId: 620,
    typeName: "EC风场-700hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/ECWind700',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //EC风场_850
  ECWind850: {
    typeId: 630,
    typeName: "EC风场-850hpa",
    layerLevel: 0,
    renderFuncName: "addMultiIconLayer",
    updateFuncName: "updateMultiIconLayer",
    requestPath: '/ECWind850',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //小时雨量
  HourRain: {
    typeId: 700,
    typeName: "小时雨量",
    layerLevel: 0,
    renderFuncName: "addTextLayer",
    updateFuncName: "updateTextLayer",
    requestPath: '/HourRain',
    // trigleSource: 'sidebar',
    allowFlip: true,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //MCS
  MCS: {
    typeId: 800,
    typeName: "MCS",
    layerLevel: 0,
    renderFuncName: "addText",
    updateFuncName: "updateText",
    requestPath: '/MCS',
    // trigleSource: 'sidebar',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'MCS外推', callBack:'handleMcsPush'},]
  }, 
  //MCS外推
  MCS_Push: {
    typeId: 810,
    typeName: "MCS外推",
    layerLevel: 1,
    renderFuncName: "addText",
    updateFuncName: "updateText",
    requestPath: '/MCS_Push',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: 'dropdown',
    dropdownMenuList:[{name:'外推轨迹', callBack:'handleMcsTrack'},]
  }, 
  //MCS轨迹
  MCS_Track: {
    typeId: 820,
    typeName: "MCS轨迹",
    layerLevel: 2,
    renderFuncName: "addPolyline",
    updateFuncName: "",
    requestPath: '/MCS_Track',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  //逐小时预报降水
  InvertRainHour: {
    typeId: 900,
    typeName: "逐小时预报降水",
    layerLevel: 0,
    renderFuncName: "addTextLayer",
    updateFuncName: "updateTextLayer",
    requestPath: '/InvertRainHour',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 
  //3小时累计降水
  InvertRain3Hour: {
    typeId: 910,
    typeName: "3小时累计降水",
    layerLevel: 0,
    renderFuncName: "addTextLayer",
    updateFuncName: "updateTextLayer",
    requestPath: '/InvertRain3Hour',
    allowFlip: false,
    allowSave: true,
    allowDel: true,
    menuType: '',
    dropdownMenuList:[]
  }, 

  // 四川省行政区域
  DistrictSiChuan: {
    typeId: 1000,
    typeName: "四川行政边界",
    layerLevel: 0,
    renderFuncName: "addDistrict",
    updateFuncName: "",
    requestPath: '/District',
    allowFlip: false,
    allowSave: false,
    allowDel: false,
    menuType: '',
    dropdownMenuList:[]
  },
}

const g_cardComponent = new Map<string, any>()
function g_regCardComponent(){
  g_cardComponent.set(
    "InvertRainCard",
    defineAsyncComponent(() => import('/src/views/CardMenu/InvertRainCard.vue'))
  )
  g_cardComponent.set(
    "McsCard",
    defineAsyncComponent(() => import('/src/views/CardMenu/McsCard.vue'))
  )
}

export { g_LayerType, g_cardComponent, g_regCardComponent};
