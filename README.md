# jquery.slider.js
    水平无缝滚动插件
  原理:
      将需要滚动的元素克隆最前最后两个
      外包裹两层,.slide .slide-list
      .slide:相对定位
      .slide-list绝对定位,top 0, left -滚动元素宽度
      需要滚动的元素绝对定位到.slide-list,水平排列在其中
      通过动画改变.slide-list的left值实现无缝滚动
      .slide,slide-list的样式通过js初始化时设置完成, 样式表设置.slide-prev .slide-next .slide-btns 的样式
      所需滚动元素个数大于1个时才实现
 bug: 
    不能自动获取需要滚动元素的高度,需要手动设置options
参数: options[width, height, btnHeight]
    width: 需要滚动元素的宽度
    height: 需要滚动元素的高度
    btnsHeight: 为放置下方按钮所需要的高度
