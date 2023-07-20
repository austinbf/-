

// Components/tabbar/tabbar.js
Component({
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      this.setData({ active: event.detail });
     if(event.detail==0){
      this.pageRouter.navigateTo({
        url: '/pages/index/index'
      })

     }
     else if(event.detail==1){
      this.pageRouter.navigateTo({
        url: '/pages/massage/massage',
      })

     }
     else{
      this.pageRouter.navigateTo({
        url: '/pages/my/my',
      })

     }

  
    },
    onMainPage(){
      
      this.pageRouter.navigateTo({
        url: '/pages/index/index'
      })
     
    },
    onMsgPage(){
      this.pageRouter.navigateTo({
        url: '/pages/massage/massage',
      })
    },
    onMyPage(){
      this.pageRouter.navigateTo({
        url: '/pages/my/my',
      })
    }
  }
})
