/**
 * 这是一个视频帧动画的库js，模拟视频播放
 *
 * @param    {dom element}     videoWrap        影像的视频框
 * @param    {number/number}   frameRadio       视频帧比例，高/宽，非必填
 * @param    {dom element}     trigger          触发按钮
 * @param    {number}          interval         间隔时间，毫秒
 * @param    {array}           imgSeris         图片地址序列
 * @param    {number}          basePixelRadio   设备密度比，比如iphone6就等于2，默认为iphone6
 * @param    {number}          baseScreenWidth  设备屏幕宽度，默认为iphone6
 * @param    {array}           mp3              音频序列
 *                              - src           音频地址
 *                              - startTime     开始播放距离点击按钮的时间
 * @param    {function}        unfinishCallback 图片没加载完时的执行函数
 *
 * @returns  一个视频对象
 *
 * @date     2017/7/31
 * @author   susan.wu<susan.wu@vipshop.com>
 */

function videoFrame(option) {
    this.videoWrap = option.videoWrap;
    this.frameRadio = option.frameRadio;
    this.trigger = option.trigger;
    this.imgSeris = option.imgSeris;
    this.mp3 = option.mp3;
    this.canvasContext = this.videoWrap.getContext("2d");
    this.imgQuery = new Array;
    this.lines = new Array;

    this.downloadCount = 0;

    // 如果有帧比例，则动态设置高度
    if (this.frameRadio) {
        this.setHeight();
    }
    
    option.basePixelRadio = option.basePixelRadio ? option.basePixelRadio : 2;
    option.baseScreenWidth = option.baseScreenWidth ? option.baseScreenWidth : 375;
    this.canvasRadio = option.basePixelRadio / document.documentElement.clientWidth * option.baseScreenWidth;

    // 预加载视频帧
    this.preloadImg();

    this.trigger.addEventListener("touchend", this.playVideo.bind(this), false);
    return this;
}

/**
 *  设置canvas高度
 */
videoFrame.prototype.setHeight = function() {
    this.videoWidth = this.videoWrap.clientWidth;
    this.videoHeight = parseInt(this.videoWrap.clientWidth * this.frameRadio);
    this.videoWrap.style.height = this.videoHeight + "px";
}

/**
 *  预加载视频图片
 *  
 */
videoFrame.prototype.preloadImg = function() {
    var imageFirst = new Image(),
        ctx = this.canvasContext,
        that = this;

    imageFirst.src = this.imgSeris[0];
    imageFirst.onload = function() {
        that.downloadCount++;
        ctx.drawImage(this, 0, 0, that.videoWidth * that.canvasRadio, that.videoHeight * that.canvasRadio);
    }

    this.imgQuery.push(imageFirst);

    for(var i = 1; i < that.imgSeris.length; i++) {
        var image = new Image();
        image.src = that.imgSeris[i];
        that.imgQuery.push(image);
        image.onload = function() {
            that.downloadCount++;
        }
    }
}

/**
 *  播放视频、音频
 */
videoFrame.prototype.playVideo = function() {
    var that = this, 
        cxt = that.videoWrap.getContext("2d");

    if(that.downloadCount < that.imgSeris.length) {
        that.unfinishCallback();
        return;
    }

    if (that.mp3) {
        for(var i = 0; i < that.mp3.length; i++) {
            var audio = new Audio(that.mp3[i].src);
            that.lines.push(audio);
            audio.volume = 0;
            audio.play();
            setTimeout(function() {
                audio.volume = 1;
                audio.play();
            }, that.mp3[i].startTime || 0);
        } 
    }

    for(var i = 1; i < that.imgSeris.length; i++) {
        (function(i) {
            setTimeout(function() {
                that.canvasContext.drawImage(that.imgQuery[i], 0, 0, that.videoWidth * that.canvasRadio, that.videoHeight * that.canvasRadio);
            }, 84 * i)
        })(i);
    }
}

