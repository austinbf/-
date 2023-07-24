import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'

// Components/tabbar/tabbar.js
Component({
  options: {
    styleIsolation: 'shared'
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
    },
  },
  observers: {
    'sum': function (val) {
      this.setData({
        'list[1].info': val
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    "list": [{
      "pagePath": "/pages/index/index",
      "iconPath": "/images/icon/主页.png",
      "selectedIconPath": "/images/icon/选中后的tabbar/主页.png",
      "text": "主页"
    },
    //  {
    //   "pagePath": "/pages/massage/massage",
    //   "iconPath": "/images/icon/短信.png",
    //   "selectedIconPath": "/images/icon/选中后的tabbar/短信.png",
    //   "text": "信息"
    // },
  {
    "pagePath": "/pages/my/my",
    "text": "我的",
    "selectedIconPath": "/images/icon/选中后的tabbar/个人.png",
    "iconPath": "/images/icon/个人.png"

  }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      
      this.updateActive(event.detail)
    wx.switchTab({
      url: this.data.list[event.detail].pagePath,
    })

  
    }
  }
})
