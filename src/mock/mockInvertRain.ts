const InvertRainHour_data = [
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

const InvertRain3Hour_data = [
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

export default [
  { //逐小时预报降水
    url: '/InvertRainHour',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: InvertRainHour_data,
      }
    }
  },
  { //3小时累计降水
    url: '/InvertRain3Hour',
    method: 'get',
    response: ({query}: Record<string,any>) => {
      return {
        time: query.layerTime,
        layerData: InvertRain3Hour_data,
      }
    }
  },

]
