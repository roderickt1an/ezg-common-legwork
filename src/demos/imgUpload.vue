<template>
  <div class="my-page">
    <page-header>
      <header-title>拍照上传</header-title>
    </page-header>
    <page-content>
      <div id="app" style="padding-bottom: 100px">
        <div id="imgDiv2" style="margin-top: 30%">
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
        <div id="zjDiv" style="padding-left: 14%;padding-right: 14%;margin-top: 3%;display: none">
          <textarea id="zj" placeholder="请填写本次外勤总结" rows='5' style="width: 100%"></textarea>
        </div>
      </div>
      <div id="cunchu" style="display: none"></div>
    </page-content>
    <page-footer style="background-color: #742323;height: 48px" id="footer1">
      <footer-item style="color: white;height: 48px;border-right: 1px solid #f9f9f9">
        {{ nian }}年{{ yue }}月{{ ri }}日{{ xiaoshi }}：{{ fen }}
      </footer-item>
      <m-button size="small" style="width: 45%;" id="shangmen" @click.native="aaa()">
        <footer-item style="color: white;height: 48px">
          <div class="content-block">
            <p>
              确定上传
            </p>
          </div>
        </footer-item>
      </m-button>
    </page-footer>
    <!--<prompt :title="'工作总结'" input="" :on-ok="log" ref="prompt"></prompt>-->
  </div>
</template>
<script>
  import {Footer, SecondFooter, FooterItem} from '../components/footer'
  import {Alert, Confirm, Prompt, Modal} from '../components/modal'
  import Grid from '../components/grid'
  import {Header, HeaderLink, HeaderTitle} from '../components/header'
  import Content from '../components/content'
  import {Button, ButtonGroup} from '../components/buttons'
  import Vue from 'vue'
  //  import AMap from 'AMap'
  import $ from 'jquery'
  /*
    var map
    var geolocation*/
  var dataArr = {data: []}; //直接传base64数据
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
    data() {
      var self = this
      return {
        gongsi: '',
        selected: null,
        options: [],
        r: [],
        ServiceHoursId: '',
        test: '',
        hour: '',
        ktitle: '普通外勤打卡',
        dkcs: '',
        nian: '',
        yue: '',
        ri: '',
        xiaoshi: '',
        fen: '',
        miao: '',
        fwxs: '',
        fwfen: '',
        weizhi: '',
        list: [{}],
        companyid: '',
        customerid: '',
        waiqin: '',
        serviceHoursid: '',
        did: '',
        companyID: '',
        result: '',
        time: '',
        int: '',
        chunid: '',
        dakaid: '',
        loc: '',
        isMapInit: false
      }
    },
    methods: {
      // 上门打卡
      clockIn() {
        var _self = this
        if (sessionStorage.getItem('data2') != 'salers') {
          if (_self.gongsi != '' && _self.weizhi != '' && _self.waiqin != '') {
            // 获取当前时间
            _self.time = _self.nian + '/' + _self.yue + '/' + _self.ri + ' ' + _self.xiaoshi + ':' + _self.fen + ':' + _self.miao
            // 本次服务时间
            $('#fuwusj').show()
            $('#gsdiv').hide()
            $('#khdiv').hide()
            $('#wqdiv').hide()
            $('#memoDiv').hide()
            $('#zjDiv').show()
            $('#imgDiv2').hide()
            _self.a()
            $('#shangmen').hide()
            $('#likai').show()
            if (_self.gongsi == 1) {
              _self.gongsi = ''
            }
            if (_self.customerid == 1) {
              _self.customerid = ''
            }
            var a = {
              companyid: _self.gongsi,
              address1: _self.weizhi,
              customerid: _self.customerid,
              fieldtype: _self.waiqin,
              clockshows: document.getElementById('memo').value
            }
            this.$http({
              ///wq/iWoaFieldClockController.do?apiSaveClockTime&timeStamp=123&token=1
              url: '/wq/iWoaFieldClockController.do?apiSaveClockTime&timeStamp=123&token=1',
              method: 'post',
              dataType: 'json',
              processData: false,   //用FormData传fd时需有这两项
              contentType: false,
              data: a,
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
                _self.queryUnfinishedPunchCard()
              })
          } else {
            if (_self.gongsi == '') {
              alert('请选择公司')
            }
            if (_self.weizhi == '') {
              alert('获取不到您的打卡地址，请打开定位')
            }
            if (_self.waiqin == '') {
              alert('请选择外勤类型')
            }
          }
        } else {

          if (_self.gongsi != '' && _self.weizhi != '' && _self.waiqin != '') {
            // 获取当前时间
            _self.time = _self.nian + '/' + _self.yue + '/' + _self.ri + ' ' + _self.xiaoshi + ':' + _self.fen + ':' + _self.miao
            // 本次服务时间
            $('#fuwusj').show()
            $('#gsdiv').hide()
            $('#khdiv').hide()
            $('#wqdiv').hide()
            $('#memoDiv').hide()
            $('#zjDiv').show()
            $('#imgDiv2').hide()
            _self.a()
            $('#shangmen').hide()
            $('#likai').show()
            if (_self.gongsi == 1) {
              _self.gongsi = ''
            }
            if (_self.customerid == 1) {
              _self.customerid = ''
            }
            var a2 = {
              companyid: _self.gongsi,
              address1: _self.weizhi,
              customerid: _self.customerid,
              fieldtype: _self.waiqin,
              clockshows: document.getElementById('memo').value
            }
            this.$http({
              ///wq/iWoaFieldClockController.do?apiSaveClockTime&timeStamp=123&token=1
              url: '/wq/iWoaFieldClockController.do?apiSaveClockTime&timeStamp=123&token=1',
              method: 'post',
              dataType: 'json',
              data: a2,
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
                _self.chunid = response.data.data.date
                _self.aaa()
                _self.queryUnfinishedPunchCard()
              })
          } else {
            if (_self.gongsi == '') {
              alert('请选择公司')
            }
            if (_self.weizhi == '') {
              alert('获取不到您的打卡地址，请打开定位')
            }
            if (_self.waiqin == '') {
              alert('请选择外勤类型')
            }
          }
        }
      },
      aaa() {
        var _self = this
        fd.append('id', _self.dakaid)
        this.$http({
          ///wq/iWoaFieldClockController.do?apiSaveClockTime&timeStamp=123&token=1
          url: '/wq/iWoaFieldClockController.do?apifiledeal&timeStamp=123&token=1',
          method: 'post',
          dataType: 'json',
          processData: false,   //用FormData传fd时需有这两项
          contentType: false,
          data: fd,
        })
      },
      // 启动计时器
      a() {
        var _self = this
        _self.int = setInterval(() => {
          _self.start(_self.time)
        })
      },
      // 计时器启动
      start(time) {
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
      BB() {
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

        $('.nice-select2').click(function (e) {
          $(this).find('ul').show()
          e.stopPropagation()
        })

        $('.nice-select2 ul li').hover(function (e) {
          $(this).toggleClass('on')
          e.stopPropagation()
        })
        $('.nice-select2 ul li').click(function (e) {
          var val = $(this).text()
          val = val.substring(0, val.indexOf('--'))
          $('.nice-select2 input').text = val
          $('.nice-select2').find('ul').hide()
          e.stopPropagation()
        })

        $('.nice-select3').click(function (e) {
          $(this).find('ul').show()
          e.stopPropagation()
        })

        $('.nice-select3 ul li').hover(function (e) {
          $(this).toggleClass('on')
          e.stopPropagation()
        })
        $('.nice-select3 ul li').click(function (e) {
          var val = $(this).text()
          val = val.substring(0, val.indexOf('--'))
          $('.nice-select3 input').text = val
          $('.nice-select3').find('ul').hide()
          e.stopPropagation()
        })
      },
      log(m) {
        var _self = this
        _self.queryUnfinishedPunchCard2(m)
      },
      queryUnfinishedPunchCard2(m) {
        var _self = this
        this.$http.get('/wq/iWoaFieldClockController.do?apiQueryUnfinishedPunchCard&token=1&timeStamp=123')
          .then(function (response) {
            console.log(response.data.data.unfinishedPunchCard.date)
            var ls = response.data.data.unfinishedPunchCard.date
            sessionStorage.setItem('dakaa', ls.id)
            var t1 = Date.parse(new Date()) / 1000;
            var t2 = ls.clocktime / 1000
            var t3 = t1 - t2
            var day = Math.floor(t3 / 86400);
            var hour = Math.floor(t3 % 86400 / 3600);
            var minute = Math.floor(t3 % 86400 % 3600 / 60);
            document.getElementById('fuwu').textContent = hour + '小时' + minute + '分'
            var shijian = hour + '小时' + minute + '分'
            localStorage.setItem('shijian', shijian)
            _self.likaidaka(_self.memo)
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      likaidaka(m) {
        var _self = this
        if (_self.weizhi != '' && document.getElementById('zj').value != '') {
          this.$http({
            url: '/wq/iWoaFieldClockController.do?apiSaveLeaveClockTime&timeStamp=123',
            method: 'post',
            data: {
              address2: _self.weizhi,
              id: sessionStorage.getItem('dakaa'),
              remark: document.getElementById('zj').value
            },
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
                window.location.href = '/#/index'
              } else if (response.data.msgCode == '40000') {
                window.location.href = '/#/Actions'
              }
            })
        } else {
          if (_self.weizhi == '') {
            alert('获取不到您的打卡地址，请打开定位')
          }
          if (document.getElementById('zj').value == '') {
            alert('请填写工作总结')
          }
        }
      },
      queryUnfinishedPunchCard () {
        var _self = this
        this.$http.get('/wq/iWoaFieldClockController.do?apiQueryUnfinishedPunchCard&token=1&timeStamp=123')
          .then(function (response) {
            console.log(response.data.data.unfinishedPunchCard.date)
            var ls = response.data.data.unfinishedPunchCard.date
            _self.dakaid = ls.id
          })
      },
    },
    mounted() {
      this.queryUnfinishedPunchCard()
      var _self = this
      var input = document.getElementById("file_input");
      var result, div;
      $('#file_input').change(function () {
        var iLen = this.files.length;
        for (var i = 0; i < iLen; i++) {
          if (!input['value'].match(/.jpg|.gif|.png|.bmp/i)) {　　//判断上传文件格式
            return alert("上传的图片格式不正确，请重新选择");
          }
          var reader = new FileReader();
          fd.append('img23', this.files[i]);
          console.log(fd.get('img23'))
          reader.readAsDataURL(this.files[i]);  //转成base64
          var fileName = this.files[i].name;
          reader.onload = function (e) {
            var imgMsg = {
              name: fileName,//获取文件名
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

      // 解决安卓手机兼容问题
      var sUserAgent = navigator.userAgent;
      var bIsAndroid = sUserAgent.toLowerCase().match(/android/i)
      if (bIsAndroid == "android") {
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).on('resize', function () {
          var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
          if (clientHeight > nowClientHeight) {
            //键盘弹出的事件处理
            $('#footer1').hide()
            document.getElementById('gongsi').scrollIntoViewIfNeeded();
          }
          else {
            //键盘收起的事件处理
            $('#footer1').show()
          }
        });
      }
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

  ul {
    list-style: none;
  }

  .nice-select2 input {
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

  .nice-select2 {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select2 ul {
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

  .nice-select2 ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select2 ul li.on {
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

  img {
    position: relative;
  }

  .nice-select3 input {
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

  .nice-select3 {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select3 ul {
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

  .nice-select3 ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select3 ul li.on {
    background-color: #e0e0e0;
  }
</style>
