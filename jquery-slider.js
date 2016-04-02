// // 水平无缝滚动插件
// 原理:
//     将需要滚动的元素克隆最前最后两个
//     外包裹两层,.slide .slide-list
//     .slide:相对定位
//     .slide-list绝对定位,top 0, left -滚动元素宽度
//     需要滚动的元素绝对定位到.slide-list,水平排列在其中
//     通过动画改变.slide-list的left值实现无缝滚动
//     .slide,slide-list的样式通过js初始化时设置完成, 样式表设置.slide-prev .slide-next .slide-btns 的样式
//     所需滚动元素个数大于1个时才实现
//bug: 不能自动获取需要滚动元素的高度,需要手动设置options
// 参数: options[width, height, btnHeight]
// width: 需要滚动元素的宽度
// height: 需要滚动元素的高度
// btnsHeight: 为放置下方按钮所需要的高度

jQuery.fn.slider = function(options) {
    // 如果元素不足2个不进行此操作
    if (this.lenght <= 1)
        return;
    options = options || {};
    // 还会克隆首位两个原子,所以+2
    var btnsHeight = options.btnsHeight || 30,
        width = options.width || this.outerWidth(true),
        height = options.height || this.outerHeight(true),
        itemsNum = this.length + 2,
        itemWidth = this.outerWidth(true),
        // 增添的html
        html = {
            outer: '<div class="slide"><div class="slide-list"></div></div>',
            prev: "<span class='slide-prev'>prev</span>",
            next: "<span class='slide-next'>next</span>",
            btns: "<ul class='slide-btns'>"
        };

    // 初始化btn html
    for (var i = 0; i < this.length; i++) {
        html.btns += ("<li>" + i + 1 + "</li>");
    }
    html.btns += "</ul>";
    // 将克隆的两个元素加上去
    this.wrapAll(html.outer).addClass("slide-item");
    var slideList = this.parent(),
        slide = slideList.parent(),
        // 当前可见item的索引
        currentIndex = 1,
        // .slide和.slide-list的样式
        styles = {
            slide: {
                border: "1px solid black",
                height: height + btnsHeight,
                overflow: "hidden",
                position: "relative",
                width: width
            },
            slideList: {
                width: width,
                height: height,
                position: "absolute",
                left: -width,
                top: 0
            },
            slideItem: {
                width: width,
                position: "absolute",
                top: 0
            }
        };
    this.eq(0).clone(true).appendTo(slideList);
    this.eq(-1).clone(true).prependTo(slideList);
    // 设置.slide, .slide-list, slide-child的样式
    slide.append(html.prev + html.next + html.btns).css(styles.slide);
    slideList.css(styles.slideList)
        .find(".slide-item")
        .css(styles.slideItem)
        .each(function(index, el) {
            $(el).css("left", index * width)
        });

    var btns = slide.find(".slide-btns > li"),
        prev = slide.find(".slide-prev"),
        next = slide.find(".slide-next");

    // 初始化完成----------------------------------

    function resetIndex() {
        // 最后时
        if (currentIndex == itemsNum - 1) {
            currentIndex = 1
        }
        // 最前时
        if (currentIndex == 0) {
            currentIndex = itemsNum - 2;
        }
    }

    // 核心函数,移动元素,step为移动的格数,正数为向右移动,负数为向左移动
    function go(step) {
        var offset = "+=" + (-step * itemWidth);

        slideList.animate({ left: offset }, "slow", function() {

            // 滑动到最前和最后时,改变元素位置,欺骗视觉
            // 最后时
            var newLeft = parseFloat(slideList.css("left"));
            if (newLeft == -width * (itemsNum - 1)) {
                slideList.css("left", -width)
            }
            // 最前时
            if (newLeft == 0) {
                slideList.css("left", -width * (itemsNum - 2))
            }
        });

    }

    // 改变按钮样式,由currentIndex决定
    function showButton() {
        resetIndex();
        btns.eq(currentIndex - 1).addClass('on').siblings().removeClass('on');
    }
    showButton();

    // 翻页点击时的事件
    prev.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        currentIndex -= 1;
        showButton();
        go(-1);
    });
    next.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        currentIndex += 1;
        showButton();
        go(1);
    });

    prev.add(next)
        .mouseenter(function(event) {
            $(this).addClass("on")
        })
        .mouseleave(function(event) {
            $(this).removeClass('on')
        });

    // 点击按钮时间时滑动事件
    btns.click(function(event) {
        if (slideList.is(":animated"))
            return;
        event.preventDefault();
        // 被点击的按钮所在的索引
        var i = $(this).index();
        var step = (i + 1) - currentIndex;
        currentIndex += step;
        showButton();
        go(step);
    });


    return this;
}

$(function() {
    $(".reader-suggest-main-body .current > div").slider({ height: 269 });
})
