const HourRain_data1 = [
  { lnglat:[105, 31], text:'-15'},
  { lnglat:[104, 31], text:'-16'},
  { lnglat:[103, 31], text:'-17'},
  { lnglat:[102, 31], text:'-18'},
  { lnglat:[101, 31], text:'-19'},

  { lnglat:[105, 30], text:'-15'},
  { lnglat:[104, 30], text:'-16'},
  { lnglat:[103, 30], text:'-17'},
  { lnglat:[102, 30], text:'-18'},
  { lnglat:[101, 30], text:'-19'},

  { lnglat:[105, 29], text:'-15'},
  { lnglat:[104, 29], text:'-16'},
  { lnglat:[103, 29], text:'-17'},
  { lnglat:[102, 29], text:'-18'},
  { lnglat:[101, 29], text:'-19'},

  { lnglat:[105, 28], text:'-15'},
  { lnglat:[104, 28], text:'-16'},
  { lnglat:[103, 28], text:'-17'},
  { lnglat:[102, 28], text:'-18'},
  { lnglat:[101, 28], text:'-19'},
]

const HourRain_data2 = [
  { lnglat:[105, 31], text:'-25'},
  { lnglat:[104, 31], text:'-26'},
  { lnglat:[103, 31], text:'-27'},
  { lnglat:[102, 31], text:'-28'},
  { lnglat:[101, 31], text:'-29'},

  { lnglat:[105, 30], text:'-25'},
  { lnglat:[104, 30], text:'-26'},
  { lnglat:[103, 30], text:'-27'},
  { lnglat:[102, 30], text:'-28'},
  { lnglat:[101, 30], text:'-29'},

  { lnglat:[105, 29], text:'-25'},
  { lnglat:[104, 29], text:'-26'},
  { lnglat:[103, 29], text:'-27'},
  { lnglat:[102, 29], text:'-28'},
  { lnglat:[101, 29], text:'-29'},

  { lnglat:[105, 28], text:'-25'},
  { lnglat:[104, 28], text:'-26'},
  { lnglat:[103, 28], text:'-27'},
  { lnglat:[102, 28], text:'-28'},
  { lnglat:[101, 28], text:'-29'},
]

const HourRain_data3 = [
  { lnglat:[105, 31], text:'-35'},
  { lnglat:[104, 31], text:'-36'},
  { lnglat:[103, 31], text:'-37'},
  { lnglat:[102, 31], text:'-38'},
  { lnglat:[101, 31], text:'-39'},

  { lnglat:[105, 30], text:'-35'},
  { lnglat:[104, 30], text:'-36'},
  { lnglat:[103, 30], text:'-37'},
  { lnglat:[102, 30], text:'-38'},
  { lnglat:[101, 30], text:'-39'},

  { lnglat:[105, 29], text:'-35'},
  { lnglat:[104, 29], text:'-36'},
  { lnglat:[103, 29], text:'-37'},
  { lnglat:[102, 29], text:'-38'},
  { lnglat:[101, 29], text:'-39'},

  { lnglat:[105, 28], text:'-35'},
  { lnglat:[104, 28], text:'-36'},
  { lnglat:[103, 28], text:'-37'},
  { lnglat:[102, 28], text:'-38'},
  { lnglat:[101, 28], text:'-39'},
]

const HourRain_data4 = [
  { lnglat:[105, 31], text:'-45'},
  { lnglat:[104, 31], text:'-46'},
  { lnglat:[103, 31], text:'-47'},
  { lnglat:[102, 31], text:'-48'},
  { lnglat:[101, 31], text:'-49'},

  { lnglat:[105, 30], text:'-45'},
  { lnglat:[104, 30], text:'-46'},
  { lnglat:[103, 30], text:'-47'},
  { lnglat:[102, 30], text:'-48'},
  { lnglat:[101, 30], text:'-49'},

  { lnglat:[105, 29], text:'-45'},
  { lnglat:[104, 29], text:'-46'},
  { lnglat:[103, 29], text:'-47'},
  { lnglat:[102, 29], text:'-48'},
  { lnglat:[101, 29], text:'-49'},

  { lnglat:[105, 28], text:'-45'},
  { lnglat:[104, 28], text:'-46'},
  { lnglat:[103, 28], text:'-47'},
  { lnglat:[102, 28], text:'-48'},
  { lnglat:[101, 28], text:'-49'},
]
let HourRain_data:any = {
  'HourRain_1':HourRain_data1,
  'HourRain_2':HourRain_data2,
  'HourRain_3':HourRain_data3,
  'HourRain_4':HourRain_data4,
}

export default [
  { //闪电：TextLayer，经纬度+值
    url: '/HourRain',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      if(query.layerTime===''){
        return {
          time: "HourRain_1",
          timeList: ['HourRain_1','HourRain_2','HourRain_3','HourRain_4'],
          layerData: HourRain_data['HourRain_1'],
        }  
      }else{
        return {
          time: query.layerTime,
          layerData: HourRain_data[query.layerTime],
        }
      }
    }
  },
]
