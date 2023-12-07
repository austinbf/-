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
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
    },
  },
  observers: {
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
      "iconPath": "/images/icon/3.1首页.png",
      "selectedIconPath": "/images/icon/选中后的tabbar/3.1首页-选中.png",
      "text": "主页"
    },
     {
      "pagePath": "/pages/remindPage/remind",
      "iconPath": "/images/icon/选中后的tabbar/3.1旺旺.png",
      "selectedIconPath": "/images/icon/选中后的tabbar/3.1旺旺-选中.png",
      "text": "提醒"
    },
  {
    "pagePath": "/pages/my/my",
    "text": "我的",
    "selectedIconPath": "/images/icon/选中后的tabbar/mine2.png",
    "iconPath": "/images/icon/我.png"

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
