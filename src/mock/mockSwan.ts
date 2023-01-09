
var swan12min = [
  [100, 30],
  [101, 30],
  [101, 31],
]
var swan6min = [
  [100, 32],
  [101, 32],
  [101, 33],
]

var Swan_35dbz = [
  [100, 34],
  [101, 34],
  [101, 35],
]


let swan_data:any = {
  'SWAN_1':'/1.png',
  'SWAN_2':'/2.png',
  'SWAN_3':'/3.png',
  'SWAN_4':'/4.png',
}

export default [
  
  {// SWAN：Image
    url: '/Swan',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      if(query.layerTime===''){
        return {
          time: "SWAN_1",
          timeList: ['SWAN_1','SWAN_2','SWAN_3','SWAN_4'],
          layerData:'/1.png',
        } 
      }else{
        return {
          time: query.layerTime,
          layerData: swan_data[query.layerTime],
        }
      }
    }
  },
  { //回波边界：Polygon
    url: '/Swan_35dbz',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData:Swan_35dbz,
      }
    }
  },
  {//回波边界：Polygon
    url: '/Swan_6min',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData:swan6min,
      }
    }
  },
  {//回波边界：Polygon
    url: '/Swan_12min',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData:swan12min,
      }
    }
  },
]
