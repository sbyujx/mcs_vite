
export default [
  {
    url: '/Flash/LoadMoreTimeList',
    method: 'get',
    response: () => {
      return {
        timeList: ['FLASH_5','FLASH_6'],
      }
    }
  },
  {
    url: '/Flash/ReloadTimeList',
    method: 'get',
    response: () => {
      return {
        timeList: ['FLASH_1','FLASH_2','FLASH_3','FLASH_4'],
      }
    }
  },
  {
    url: '/MCS/TimeList',
    method: 'get',
    response: () => {
      return {
        timeList: ['C013_1','C013_2','C013_3','C013_4'],
      }
    }
  },
]
