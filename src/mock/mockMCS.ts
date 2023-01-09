

export default [
  { //MCS：经纬度
    url: '/MCS',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: [101,31],
      }
    }
  },
  { //MCS外推：经纬度
    url: '/MCS_Push',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: [103,32],
      }
    }
  },
  { //MCS轨迹：Polyline
    url: '/MCS_Track',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: [[101,31],[102,31],[103,32]],
      }
    }
  },
]
