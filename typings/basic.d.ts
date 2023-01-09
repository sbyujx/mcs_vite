/*
 * 声明.d.ts文件规范
 * 导出的类型以大写开头
 * 对象：config
 * 数组：options
 * 枚举：emu
 * 函数：Fn
 * 属性：props
 * 实例：instance
 * */
export class LayerTypeItem{
  typeId: number            //类型ID
  typeName: string          //类型名称
  layerLevel:number         //图层在layerList表格中的层级
  renderFuncName: string    //mapcontainer中的渲染函数
  updateFuncName: string    //mapcontainer中的更新函数
  requestPath: string       //网络请求路径
  // trigleSource: 'sidebar'|'card'//图层触发来源，侧边栏或卡片
  allowFlip:boolean         //允许翻页
  allowSave:boolean         //允许保存文件
  allowDel: boolean         //允许删除图层
  menuType:'dropdown'|'card'|''//选项卡类型
  dropdownMenuList:Array<{name:string,callBack:string}>  // layerList中下拉菜单的条目，显示名称和回调函数
}

export class LayerType {
  C013: LayerTypeItem            //红外云图
  C013_Cold52: LayerTypeItem     //红外云图-52度冷云区
  C013_Cold62: LayerTypeItem     //红外云图-62度冷云区
  C013_Cold73: LayerTypeItem     //红外云图-73度冷云区
  C013_Center: LayerTypeItem     //红外云图-亮温中心
  C013_Gradient: LayerTypeItem   //红外云图-亮温梯度
  C013_GradientDensity: LayerTypeItem//红外云图-梯度密集区
  C013_RateHalf: LayerTypeItem       //红外云图-亮温变率0.5H
  C013_RateOne: LayerTypeItem       //红外云图-亮温变率1H

  C003: LayerTypeItem             //可见光云图
  C003_Albedo80:LayerTypeItem      //可见光云图-反照率
  C003_Albedo90:LayerTypeItem      //可见光云图-反照率
  C003_AlbedoRateHalf:LayerTypeItem //可见光云图-反照率
  C003_AlbedoRateOne:LayerTypeItem  //可见光云图-反照率变率

  Swan: LayerTypeItem            //SWAN拼图
  Swan_35DBZ: LayerTypeItem      //SWAN拼图-35dbz强回波边界
  Swan_6min: LayerTypeItem       //SWAN拼图-6分钟强回波边界
  Swan_12min: LayerTypeItem      //SWAN拼图-12分钟强回波边界

  Flash: LayerTypeItem           //闪电数据

  Wind200: LayerTypeItem         //实况风场-200hpa
  Wind300: LayerTypeItem         //实况风场-300hpa
  Wind500_700: LayerTypeItem     //实况风场-500+700hpa
  Wind850: LayerTypeItem         //实况风场-850hpa

  ECWind200: LayerTypeItem       //EC风场-200hpa
  ECWind500: LayerTypeItem       //EC风场-500hpa
  ECWind700: LayerTypeItem       //EC风场-700hpa
  ECWind850: LayerTypeItem       //EC风场-850hpa

  HourRain: LayerTypeItem        //小时雨量

  MCS: LayerTypeItem             //MCS
  MCS_Push: LayerTypeItem        //MCS外推
  MCS_Track: LayerTypeItem        //MCS外推

  InvertRainHour: LayerTypeItem  //逐小时预报降水
  InvertRain3Hour: LayerTypeItem //3小时累计降水

  DistrictSiChuan: LayerTypeItem //四川省行政边界
}

export class LayerListItem{
  index: string
  layerId: string      //在列表中的唯一标识
  time: string         //时次
  timeList: string[]   //时次清单
  label: string        //界面显示标签
  type: LayerTypeItem  //图层类型
  isLayerShow: boolean //显示图层
  isCardShow: boolean  //显示选项卡
  data:any             //图层数据
  children: LayerListItem[] //子图层
}

/*settings*/
export interface SettingsConfig {
  sidebarLogo: boolean
  showLeftMenu: boolean
  ShowDropDown: boolean
  showHamburger: boolean
  isNeedLogin: boolean
  isNeedNprogress: boolean
  showTagsView: boolean
  tagsViewNum: number
  openProdMock: boolean
  errorLog: string | Array<string>
  permissionMode: string
  delWindowHeight: string
  tmpToken: string
  showNavbarTitle: boolean
  showTopNavbar: boolean
  mainNeedAnimation: boolean
  viteBasePath: string
  defaultLanguage: string
  defaultSize: string
  defaultTheme: string
  plateFormId: number
}