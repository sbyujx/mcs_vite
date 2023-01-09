var C003_Albedo80 = [
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
var C003_Albedo90 = [
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

export default [
  { //可见光云图：Image
    url: '/C003',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: "C003_1",
        timeList: ['C003_1','C003_2','C003_3','C003_4'],
        layerData:'/1.png',
      }
    }
  },
  {//反照率区域：Polygon
    url: '/C003_Albedo80',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C003_Albedo80,
      }
    }
  },
  {//反照率区域：Polygon
    url: '/C003_Albedo90',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: C003_Albedo90,
      }
    }
  },
  {//60%反照率变率：Image
    url: '/C003_AlbedoRateHalf',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: '/1.png',
      }
    }
  },
  {//60%反照率变率：Image
    url: '/C003_AlbedoRateOne',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: '/1.png',
      }
    }
  },
]
