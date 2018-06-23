<template>
  <div class="my-page">
    <page-header>
      <header-title>{{ ktitle }}</header-title>
    </page-header>
    <page-content>
      <div id="app">
        <div style="font-size: 14px;">
          <iframe id="markPage" width="100%" height="280px" frameborder=0 scrolling="no" src=""></iframe>
          <iframe id="geoPage" width="100%" height="30%" frameborder=0 scrolling="no" style="display: none"
                  src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&effect=zoom"></iframe>
        </div>
        <br>
        <div id="gs2" style="text-align: left;font-size: 18px;font-weight:700;padding-left: 14%"></div>
        <div style="margin-top: 3%"></div>
        <div id="fuwusj" style="text-align: left;font-size: 14px;padding-left: 14%;font-weight:bold;">
          <br>
          <span>本次外勤时间：</span>
          <span style="float: right;padding-right: 18%" id="fuwu"></span>
        </div>
        <div id="cpdiv" style="display: none">
          <center>
            <div style="margin-top: 3%"></div>
            <div class="nice-select5">
              <input id="customer5Id" type="text" value="请选择产品" readonly="readonly"/>
              <ul id="chanpin"></ul>
            </div>
          </center>
        </div>
        <div id="zjDiv" style="padding-left: 14%;padding-right: 14%;margin-top: 3%;">
          <textarea id="zj" placeholder="请填写本次外勤总结(必填)" rows='5' style="width: 100%"></textarea>
        </div>
        <div id="imgDiv2" style="margin-top: 3%;display: none">
          <center>
            <div class="container">
              <a href="javascript:;" class="a-upload">
                <input type="file" id="file_input" accept="image/*" capture="camera"/>点击拍摄照片
              </a>
            </div>
            <div id="imgDiv" style="height: 100px;overflow: auto;">
            </div>
          </center>
        </div>
      </div>
      <div id="cunchu" style="display: none"></div>
    </page-content>
    <page-footer style="height: 50px;border: none;" id="footer12">
      <footer-item style="color: white;height: 48px;border-right: 1px solid #f9f9f9;display: none">
        {{ nian }}年{{ yue }}月{{ ri }}日{{ xiaoshi }}：{{ fen }}
      </footer-item>
      <footer-item style="color: white;height: 48px;" id="likai">
        <m-button
          style="background-color: #742323;"
          :bordered="true"
          size="large"
          :round="true"
          @click.native="log()">
          离开打卡
        </m-button>
      </footer-item>
    </page-footer>
    <prompt :title="'工作总结'" input="" :on-ok="log" ref="prompt"></prompt>
  </div>
</template>
<script>
  import { Footer, SecondFooter, FooterItem } from '../components/footer'
  import { Alert, Confirm, Prompt, Modal } from '../components/modal'
  import Grid from '../components/grid'
  import { Header, HeaderLink, HeaderTitle } from '../components/header'
  import Content from '../components/content'
  import { Button, ButtonGroup } from '../components/buttons'
  import Vue from 'vue'
//  import AMap from 'AMap'
  import $ from 'jquery'

/*  var map
  var geolocation*/
  var dataArr = { data : [] }; //直接传base64数据
  var fd = new FormData();  //FormData方式发送请求
  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid,
      ButtonGroup,
      Alert,
      Confirm,
      Modal,
      Prompt,
      'page-footer': Footer,
      SecondFooter,
      FooterItem,
      'm-button': Button
    },
    data () {
      var self = this
      return {
        gongsi: '',
        selected: null,
        options: [],
        waiqin: '',
        r: [],
        ServiceHoursId: '',
        test: '',
        hour: '',
        ktitle: '普通外勤打卡',
        dkcs: '',
        nian: '',
        yue: '',
        ri: '',
        imgName: '',
        xiaoshi: '',
        fen: '',
        miao: '',
        fwxs: '',
        fwfen: '',
        weizhi: '',
        list: [{}],
        companyid: '',
        serviceHoursid: '',
        did: '',
        companyID: '',
        result: '',
        time: '',
        int: '',
        dakaid: '',
        loc: '',
        productName: '',
        isMapInit: false
      }
    },
    methods: {
      /*//解析定位结果
      onComplete (data) {
        var _self = this
        _self.weizhi = data.formattedAddress
        var lnglatXY = [data.position.getLng(), data.position.getLat()] //已知点坐标
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(lnglatXY, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            geocoder_CallBack(result)
          }
        })
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
          var marker = new AMap.Marker({
            map: map,
            zIndex: 22,
            position: lnglatXY
          })
          var infoWindow = new SimpleInfoWindow({
            infoTitle: '<b>您当前的位置</b>',
            infoBody: data.formattedAddress,
            //基点指向marker的头部位置
            offset: new AMap.Pixel(0, -31)
          })
          infoWindow.open(map, marker.getPosition())
        })
        map.setFitView()
      },
      //解析定位错误信息
      onError (data) {
        document.getElementById('tip').innerHTML = '定位失败'
      },

      //定位、地图显示
      init () {
        var _self = this
        map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 4
        })
        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 60000,          //超过60秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          })
          map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', _self.onComplete)//返回定位信息
          AMap.event.addListener(geolocation, 'error', _self.onError)      //返回定位出错信息
        })
      },*/
      //  转成blob
      convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },

      //  打开图片
      yasuo(file, w, objDiv) {
        var that = this
        var ready = new FileReader()
        ready.readAsDataURL(file)
        ready.onload = function () {
          var re = this.result
          that.canvasDataURL(re, w, objDiv)
        }
      },

      //  在canvas中重绘
      canvasDataURL(path, obj, callback) {
        var that = this
        var img = new Image()
        img.src = path;
        img.onload = function () {
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          canvas.width = 800
          canvas.height = 600
          ctx.drawImage(this, 0, 0, 800, 600)
          var base64 = canvas.toDataURL('image/jpeg', 0.7)
          callback(base64)
        }
      },

      img_reduce(file) {
        let _self = this
        _self.yasuo(file, {qulity: 0.2}, function (base64code) {
          var b1 = _self.convertBase64UrlToBlob(base64code)
          fd.append('files', b1, _self.imgName)
        })
      },
      // 启动计时器
      a () {
        var _self = this
        _self.int = setInterval(() => {
          _self.start(_self.time)
        })
      },
      // 计时器启动
      start (time) {
        var date1 = time
        var date2 = new Date()
        var date3 = date2.getTime() - new Date(date1).getTime()
        //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        document.getElementById('fuwu').textContent = hours + '小时' + minutes + '分'
      },
      BB () {
        $('.nice-select').click(function (e) {
          $(this).find('ul').show()
          e.stopPropagation()
        })

        $('.nice-select ul li').hover(function (e) {
          $(this).toggleClass('on')
          e.stopPropagation()
        })
        $('.nice-select ul li').click(function (e) {
          var val = $(this).text()
          val = val.substring(0, val.indexOf('--'))
          $('.nice-select input').text = val
          $('.nice-select').find('ul').hide()
          e.stopPropagation()
        })

        $(document).click(function () {
          $('.nice-select').find('ul').hide()
        })

        $('.nice-select5').click(function (e) {
          $(this).find('ul').show()
          e.stopPropagation()
        })

        $('.nice-select5 ul li').hover(function (e) {
          $(this).toggleClass('on')
          e.stopPropagation()
        })
        $('.nice-select5 ul li').click(function (e) {
          var val = $(this).text()
          val = val.substring(0, val.indexOf('--'))
          $('.nice-select5 input').text = val
          $('.nice-select5').find('ul').hide()
          e.stopPropagation()
        })

        $(document).click(function () {
          $('.nice-select5').find('ul').hide()
        })
      },
      log (m) {
        var _self = this
        var _role = sessionStorage.getItem('data2')
        if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
          if (_self.weizhi != '' && document.getElementById('zj').value != '' && _self.productName != '') {
            _self.queryUnfinishedPunchCard2()
            if (localStorage.getItem('isImg') == 'true') {
              _self.bbb()
            } else {
              _self.aaaa()
            }
          } else {
            if (_self.weizhi == '') {
              alert('获取不到您的打卡地址，请打开定位')
            }
            if (document.getElementById('zj').value == '') {
              alert('请填写工作总结')
            }
            if (_self.productName == '') {
              alert('请选择产品')
            }
          }
        } else {
          if (_self.weizhi != '' && document.getElementById('zj').value != '') {
            _self.queryUnfinishedPunchCard2()
            if (localStorage.getItem('isImg') == 'true') {
              _self.bbb()
            } else {
              _self.aaaa()
            }
          } else {
            if (_self.weizhi == '') {
              alert('获取不到您的打卡地址，请打开定位')
            }
            if (document.getElementById('zj').value == '') {
              alert('请填写工作总结')
            }
          }
        }
      },
      aaaa() {
        var _self = this
        fd.append('id', _self.dakaid)
        this.$http({
          url: '/wq/iWoaFieldClockController.do?apifiledeal&timeStamp=123&token=1',
          method: 'post',
          dataType: 'json',
          processData: false,   //用FormData传fd时需有这两项
          contentType: false,
          data: fd,
        })
          .then(function(response) {
            if (response.data.msgCode == '50000') {
              alert(response.data.msg)
              $('#imgDiv2').show()
              fd = new FormData()
            } else if(response.data.msgCode == '40000') {
              fd = new FormData()
              _self.bbb()
            }
          })
      },
      bbb() {
        let _self = this
        let _role = sessionStorage.getItem('data2')
        let _data = {}
        let _chanp
        if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
            _data.address2 = _self.weizhi
            _data.id = _self.dakaid
            _data.remark = document.getElementById('zj').value
          if (_self.productName == 1) {
            _chanp = ''
          } else {
              _chanp = _self.productName
          }
          _data.productname = _chanp
        } else {
          _data.address2 = _self.weizhi
          _data.id = _self.dakaid
          _data.remark = document.getElementById('zj').value
        }
        this.$http({
          url: '/wq/iWoaFieldClockController.do?apiSaveLeaveClockTime&timeStamp=123',
          method: 'post',
          data: _data,
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            if (response.data.msgCode == '50000') {
              alert(response.data.msg)
              $('#imgDiv2').show()
            } else if (response.data.msgCode == '40000') {
              window.location.href = '/#/Actions'
            }
          })
      },
      queryUnfinishedPunchCard () {
        var _self = this
        this.$http.get('/wq/iWoaFieldClockController.do?apiQueryUnfinishedPunchCard&token=1&timeStamp=123')
          .then(function (response) {
            console.log(response.data.data.unfinishedPunchCard.date)
            var ls = response.data.data.unfinishedPunchCard.date
            _self.dakaid = ls.id
            $('#gs2').append(ls.companyname)
            var t1 = Date.parse(new Date())/1000;
            var t2 = ls.clocktime/1000
            var t3 = t1 - t2
            var day = Math.floor(t3/86400);
            var hour = Math.floor(t3%86400/3600);
            var minute = Math.floor(t3%86400%3600/60);
            document.getElementById('fuwu').textContent = hour + '小时' + minute + '分'
          })
      },
      queryUnfinishedPunchCard2 () {
        var _self = this
        this.$http.get('/wq/iWoaFieldClockController.do?apiQueryUnfinishedPunchCard&token=1&timeStamp=123')
          .then(function (response) {
            var ls = response.data.data.unfinishedPunchCard.date
            _self.dakaid = ls.id
            var t1 = Date.parse(new Date())/1000;
            var t2 = ls.clocktime/1000
            var t3 = t1 - t2
            var day = Math.floor(t3/86400);
            var hour = Math.floor(t3%86400/3600);
            var minute = Math.floor(t3%86400%3600/60);
            document.getElementById('fuwu').textContent = hour + '小时' + minute + '分'
            var shijian = hour + '小时' + minute + '分'
            localStorage.setItem('shijian', shijian)
          })
      },

      getProductData() {
          var _self = this
          this.$http.get('../static/chanpin.json')
            .then(function (response) {
              var _role = sessionStorage.getItem('data2')
              var _data

              if (_role == 'kj' || _role == 'kjzg') {
                _data = response.data.kj
              } else if (_role == 'planner') {
                _data = response.data.planner
              }

              var html3 = ''
              for (var j = 0; j < _data.length; j++) {
                html3 += '<li value=' + _data[j].value + ' style="height: 30px;\n' +
                  '    line-height: 2em;\n' +
                  '    overflow: hidden;\n' +
                  '    padding: 0 10px;\n' +
                  '    cursor: pointer;\n' +
                  '    border-top: 1px solid #d5d5d5;">' + _data[j].label + '</li>'
              }
              $('#chanpin').html(html3)

              $('.nice-select5 ul li').hover(function (e) {
                $(this).toggleClass('on')
                e.stopPropagation()
              })
              $('.nice-select5 ul li').click(function (e) {
                var val = $(this).text()
                _self.productName = $(this).attr('value')
                $('.nice-select5').find('input')[0].value = val
                $('.nice-select5').find('ul').hide()
                e.stopPropagation()
              })
              $(document).click(function () {
                $('.nice-select5').find('ul').hide()
              })
            })
      }
    },
    mounted () {
      var _role = sessionStorage.getItem('data2')
      if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
        $('#cpdiv').show()
      }
      this.queryUnfinishedPunchCard()
      this.getProductData()
      var _self = this

      // 解决安卓手机兼容问题
      var sUserAgent = navigator.userAgent;
      var bIsAndroid = sUserAgent.toLowerCase().match(/android/i)
      if (bIsAndroid == "android") {
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).on('resize', function () {
          var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理
            $('#footer12').hide()
            document.getElementById('zj').scrollIntoViewIfNeeded();
          }
          else {
            //键盘收起的事件处理
            $('#footer12').show()
          }
        });
      }
      var input = document.getElementById("file_input");
      var result, div;
      $('#file_input').change(function () {
        var iLen = this.files.length;
        for (var i = 0; i < iLen; i++) {
          if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)) {　　//判断上传文件格式
            return alert("上传的图片格式不正确，请重新选择");
          }
          var reader = new FileReader();
          _self.imgName = this.files[i].name
          _self.img_reduce(this.files[i])

          reader.readAsDataURL(this.files[i]);  //转成base64
          var fileName = this.files[i].name;
          reader.onload = function (e) {
            var imgMsg = {
              name: fileName,   //获取文件名
              base64: this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
            }
            dataArr.data.push(imgMsg);
            result = '<div style="display:none" class="result22" ><img src="' + this.result + '" alt=""/></div>';
            div = document.createElement('div');
            div.innerHTML = result;
            div['className'] = 'float22';
            // document.getElementsByTagName('body')[0].appendChild(div);  　　//插入dom树
            document.getElementById('imgDiv').appendChild(div)
            var img = div.getElementsByTagName('img')[0];
            img.onload = function () {
              var nowHeight = ReSizePic(this); //设置图片大小
              this.parentNode.style.display = 'block';
              var oParent = this.parentNode;
              if (nowHeight) {
                oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
              }
            }
          }
        }
      })
      function ReSizePic(ThisPic) {
        var RePicWidth = 100; //这里修改为您想显示的宽度值

        var TrueWidth = ThisPic.width; //图片实际宽度
        var TrueHeight = ThisPic.height; //图片实际高度

        if (TrueWidth > TrueHeight) {
          //宽大于高
          var reWidth = RePicWidth;
          ThisPic.width = reWidth;
          //垂直居中
          var nowHeight = TrueHeight * (reWidth / TrueWidth);
          return nowHeight;  //将图片修改后的高度返回，供垂直居中用
        } else {
          //宽小于高
          var reHeight = RePicWidth;
          ThisPic.height = reHeight;
        }
      }

      this.getDate = setInterval(() => {
        var dateObject = new Date() // 表示当前系统时间的Date对象
        var year = dateObject.getFullYear() // 获取当前系统时间的年份值
        var month = dateObject.getMonth() + 1 // 获取当前系统时间的月份值
        var date = dateObject.getDate() // 获取当前系统时间中的日份值
        var hour = dateObject.getHours() // 获取当前系统时间的小时值
        var minute = dateObject.getMinutes() // 获取当前系统时间的分钟值
        var secend = dateObject.getSeconds() // 获取当前系统时间的秒钟值
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        if (hour < 10) {
          hour = '0' + hour
        }
        if (secend < 10) {
          secend = '0' + secend
        }
        if (minute < 10) {
          minute = '0' + minute
        }
        this.nian = year
        this.yue = month
        this.ri = date
        this.xiaoshi = hour
        this.fen = minute
        this.miao = secend
      }, 1000)

      window.addEventListener('message', function(event) {
        _self.loc = event.data; // 接收位置信息
        console.log('location', _self.loc);

        if(_self.loc  && _self.loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
          var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
            '?marker=coord:' + _self.loc.lat + ',' + _self.loc.lng +
            ';title:我的位置;addr:' + (_self.loc.addr || _self.loc.city) +
            '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
          _self.weizhi = _self.loc.addr || _self.loc.city
          //给位置展示组件赋值
          document.getElementById('markPage').src = markUrl;
        } else { //定位组件在定位失败后，也会触发message, event.data为null
          console.log('定位失败');
        }
      }, false);
      //为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
      document.getElementById("geoPage").contentWindow.postMessage('getLocation', '*');

      //设置6s超时，防止定位组件长时间获取位置信息未响应
      setTimeout(function() {
        if(!_self.loc) {
          //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
          document.getElementById("geoPage")
            .contentWindow.postMessage('getLocation.robust', '*');
        }
      }, 6000);
      this.BB()
    }
  }
</script>

<style scoped>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }

  .nice-select input {
    outline: none;
    cursor: pointer;
    width: 100%;
    height: 1.8em;
    font-size: 1em;
    border: 1px solid #000;
    background: url(../../static/icon.png) no-repeat scroll right center transparent;
    background-position: 98.5% 50%;
    padding: 0 10px;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
    line-height: 1.8em;
  }

  ul {
    list-style: none;
  }

  .nice-select {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select ul {
    display: none;
    border: 1px solid #d5d5d5;
    width: 100%;
    position: absolute;
    top: 1.8em;
    overflow: hidden;
    background-color: #fff;
    max-height: 150px;
    overflow-y: auto;
    border-top: 0;
    z-index: 10001;
  }

  .nice-select ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select ul li.on {
    background-color: #e0e0e0;
  }

  .hf {
    width: 73%;
    border: 1px solid #000;
    border-radius: .3em;
    line-height: 1.8em;
    height: 1.8em;
    background-color: #f9f9f9;
    font-size: 1em;
    padding: 0 6px;
  }
  #aim {
    border: none;
    background-color: transparent;
    width: 100%;
    text-align: center;
  }
  img{
    position: relative;
  }
  .nice-select5 input {
    outline: none;
    cursor: pointer;
    width: 100%;
    height: 1.8em;
    font-size: 1em;
    border: 1px solid #000;
    background: url(../../static/icon.png) no-repeat scroll right center transparent;
    background-position: 98.5% 50%;
    padding: 0 10px;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
    line-height: 1.8em;
  }

  .nice-select5 {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select5 ul {
    display: none;
    border: 1px solid #d5d5d5;
    width: 100%;
    position: absolute;
    top: 1.8em;
    overflow: hidden;
    background-color: #fff;
    max-height: 150px;
    overflow-y: auto;
    border-top: 0;
    z-index: 10001;
  }

  .nice-select5 ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select5 ul li.on {
    background-color: #e0e0e0;
  }
</style>
