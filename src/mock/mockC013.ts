var C013_Cold52 = [
  [105.7789, 31.3102],
  [105.7279, 31.3548],
  [106.5723, 31.4361],
  [106.5093, 32.4898],
  [106.5624, 32.4864],
  [106.5856, 32.4547],
  [106.7694, 32.3907],
  [105.796, 33.3456],
  [105.7789, 33.3102],
]
var C013_Cold62 = [
  [105.7789, 31.3102],
  [105.7279, 31.3548],
  [106.5723, 31.4361],
  [106.5093, 32.4898],
  [106.5624, 32.4864],
  [106.5856, 32.4547],
  [106.7694, 32.3907],
  [105.796, 33.3456],
  [105.7789, 33.3102],
]

var C013_Cold73 = [
  [105.7789, 31.3102],
  [105.7279, 31.3548],
  [106.5723, 31.4361],
  [106.5093, 32.4898],
  [106.5624, 32.4864],
  [106.5856, 32.4547],
  [106.7694, 32.3907],
  [105.796, 33.3456],
  [105.7789, 33.3102], 
]

var C013_Center = [105, 31, '-45℃']

var C013_GradientDensity = [
  [105.7789, 31.3102],
  [105.7279, 31.3548],
  [106.5723, 31.4361],
  [106.5093, 32.4898],
  [106.5624, 32.4864],
  [106.5856, 32.4547],
  [106.7694, 32.3907],
  [105.796, 33.3456],
  [105.7789, 33.3102], 
]

let c013_data:any = {
  'C013_1':'/1.png',
  'C013_2':'/2.png',
  'C013_3':'/3.png',
  'C013_4':'/4.png',
}

export default [
  {// 红外云图：Image
    url: '/C013',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      if(query.layerTime===''){
        return {
          time: "C013_1",
          timeList: ['C013_1','C013_2','C013_3','C013_4'],
          layerData:'/C013_Water.gif',
        }
      }else{
        return {
          time: query.layerTime,
          layerData: c013_data[query.layerTime],
        }
      }
    }
  },
  {// 冷云区：Polygon
    url: '/C013_Cold52',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C013_Cold52,
      }
    }
  },
  {// 冷云区：Polygon
    url: '/C013_Cold62',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C013_Cold62,
      }
    }
  },
  {// 冷云区：Polygon
    url: '/C013_Cold73',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C013_Cold73,
      }
    }
  },
  {//亮温中心：经纬度+值
    url: '/C013_Center',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C013_Center,
      }
    }
  },
  {//亮温梯度：Image
    url: '/C013_Gradient',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: '/1.png',
      }
    }
  },
  {//梯度密集区：Polygon
    url: '/C013_GradientDensity',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C013_GradientDensity,
      }
    }
  },
  {//亮温变率0.5H：Image
    url: '/C013_RateHalf',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: '/1.png',
      }
    }
  },
  {//亮温变率1H：Image
    url: '/C013_RateOne',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: '/1.png',
      }
    }
  },
]
