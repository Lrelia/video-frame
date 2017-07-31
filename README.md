## 使用方法简介
* 引入video-frame.js
* 新建一个`videoFrame`对象，传入参数
    * videoWrap: 影像的视频框
    * frameRadio: 视频帧比例，高/宽，非必填
    * trigger: 触发按钮
    * interval: 间隔时间，毫秒
    * basePixelRadio: 设备密度比，比如iphone6就等于2，默认为iphone6
    * baseScreenWidth: 设备屏幕宽度，默认为iphone6
    * mp3: 音频序列
    * unfinishCallback: 图片没加载完时的执行函数

```javascript
    var imgSeris = [
        "http://localhost/image/1.jpg",
        "http://localhost/image/2.jpg",
        "http://localhost/image/3.jpg",
        "http://localhost/image/4.jpg",
        "http://localhost/image/5.jpg",
        "http://localhost/image/6.jpg",
        "http://localhost/image/7.jpg",
        "http://localhost/image/8.jpg",
        "http://localhost/image/9.jpg",
        "http://localhost/image/10.jpg",
        "http://localhost/image/11.jpg",
        "http://localhost/image/12.jpg",
        "http://localhost/image/13.jpg"
    ];
    var xixi = new videoFrame({
        videoWrap: document.getElementById("J-video-container"),
        frameRadio: 1206/750,
        trigger: document.getElementById("J-trigger"),
        imgSeris: imgSeris,
        interval: 84,
        basePixelRadio: 2,
        baseScreenWidth: 375,
        mp3: [
            {
                src: "http://localhost/image/music-1.mp3",
                startTime: 4000
            }
        ],
        unfinishCallback: function() {
            alert("图片还没加载完~");
        }
    });
```