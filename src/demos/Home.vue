<style>

</style>
<template>
  <div class="my-page">
    <page-header>
      <header-title>{{ ktitle }}</header-title>
    </page-header>
    <page-content>
      <!-- 地图组件 -->
      <div id="app" style="padding-bottom: 100px">
        <div style="font-size: 14px;">
          <iframe id="markPage" width="100%" height="280px" frameborder=0     scrolling="no" src=""></iframe>
          <iframe id="geoPage" width="100%" height="30%" frameborder=0     scrolling="no" style="display: none"
                  src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&zeffect=oom"></iframe>
        </div>
        <br>
        <div style="margin-top: 3%"></div>
        <!-- 下拉菜单 -->
        <div id="gsdiv">
          <center>
            <div style="margin-top: 3%"></div>
            <div class="nice-select">
              <input id="customerId" type="text" value="请选择公司"/>
              <ul id="gongsi"></ul>
            </div>
          </center>
        </div>
        <div id="khdiv">
          <center>
            <div style="margin-top: 3%"></div>
            <div class="nice-select2">
              <input id="customer2Id" type="text" value="请选择客户"/>
              <ul id="kehu"></ul>
            </div>
          </center>
        </div>
        <div id="dhdiv">
          <center>
            <div style="margin-top: 3%"></div>
            <div class="nice-select4">
              <input id="customer4Id" type="text" value="请选择客户电话"/>
              <ul id="dianhua"></ul>
            </div>
          </center>
        </div>
        <div id="wqdiv">
          <center>
            <div style="margin-top: 3%"></div>
            <div class="nice-select3">
              <input id="customer3Id" type="text" value="请选择外勤类型" readonly="readonly"/>
              <ul id="waiqin"></ul>
            </div>
          </center>
        </div>
        <div id="gs2" style="display: none;text-align: left;font-size: 18px;font-weight:700;padding-left: 14%"></div>
        <div id="fuwusj" style="display: none;text-align: left;font-size: 14px;padding-left: 14%;font-weight:bold;">
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
        <div id="memoDiv" style="padding-left: 14%;padding-right: 14%;margin-top: 3%">
          <textarea id="memo" placeholder="请填写备注说明" rows='5' style="width: 100%"></textarea>
        </div>
        <div id="imgDiv2" style="margin-top: 6%">
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
          <textarea id="zj" placeholder="请填写本次外勤总结(必填)" rows='5' style="width: 100%"></textarea>
        </div>
      </div>
      <div id="cunchu" style="display: none"></div>
    </page-content>

    <toast text="打卡成功！" ref="t1"></toast>
    
    <page-footer style="height: 50px;border: none;" id="footer1">
      <footer-item style="color: white;height: 48px;border-right: 1px solid #f9f9f9;display: none">
        {{ nian }}年{{ yue }}月{{ ri }}日{{ xiaoshi }}：{{ fen }}
      </footer-item>
      <footer-item style="color: white;height: 48px" id="shangmen">
        <m-button
          style="background-color: #742323;"
          :bordered="true"
          size="large"
          :round="true"
          @click.native="clockIn()">
          上门打卡
        </m-button>
      </footer-item>
      <footer-item style="color: white;height: 48px;display: none" id="likai">
        <m-button
          style="background-color: #742323;"
          :bordered="true"
          size="large"
          :round="true"
          @click.native="queryUnfinishedPunchCard2()">
          离开打卡
        </m-button>
      </footer-item>
    </page-footer>
  </div>
</template>
<script>
  import {Footer, SecondFooter, FooterItem} from '../components/footer'
  import {Alert, Confirm, Prompt, Modal} from '../components/modal'
  import Grid from '../components/grid'
  import {Header, HeaderLink, HeaderTitle} from '../components/header'
  import Content from '../components/content'
  import {Button, ButtonGroup} from '../components/buttons'
  import Toast from '../components/toast'
  import yas from '../../static/img_reduce'
  import Vue from 'vue'
  import $ from 'jquery'

  var dataArr = {data: []}; //直接传base64数据
  var fd = new FormData();  //FormData方式发送请求
  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid,
      Toast,
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
        imgName: '',
        iscustomerid: false,
        isgongsi: false,
        gongsi: '',
        r: [],
        hour: '',
        ktitle: '普通外勤打卡',
        nian: '',
        yue: '',
        ri: '',
        xiaoshi: '',
        fen: '',
        miao: '',
        weizhi: '',
        companyid: '',
        customerid: '',
        waiqin: '',
        serviceHoursid: '',
        result: '',
        time: '',
        int: '',
        chunid: '',
        dakaid: '',
        loc: '',
        productName: '',
        isMapInit: false,
        isImg: false
      }
    },
    methods: {
      // 上门打卡
      clockIn() {
        var _self = this
        if (_self.gongsi != '' && _self.weizhi != '' && _self.waiqin != '') {
          _self.time = _self.nian + '/' + _self.yue + '/' + _self.ri + ' ' + _self.xiaoshi + ':' + _self.fen + ':' + _self.miao
          $('#fuwusj').show()
          var _role = sessionStorage.getItem('data2')
          if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
            $('#cpdiv').show()
            _self.getProductData()
          }
          $('#gsdiv').hide()
          $('#khdiv').hide()
          $('#dhdiv').hide()
          $('#wqdiv').hide()
          $('#memoDiv').hide()
          $('#zjDiv').show()
          $('#imgDiv2').hide()
          _self.a()    // 启动计时器
          $('#shangmen').hide()
          $('#likai').show()
          if (_self.gongsi == 1) {
            _self.gongsi = ''
          }
          if (_self.customerid == 1) {
            _self.customerid = ''
          }
          if (_self.customerid == 0) {
            _self.customerid = ''
          }
          if (_self.waiqin == 1) {
            _self.waiqin = ''
          }
          var a2 = {
            companyid: _self.gongsi,
            address1: _self.weizhi,
            customerid: _self.customerid,
            fieldtype: _self.waiqin,
            clockshows: document.getElementById('memo').value
          }
          this.$http({
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
              _self.$refs.t1.open()
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
      },

      convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },

      //  判断图片是否上传
      aaa() {
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
          .then(function (response) {
            if (response.data.msgCode == '50000') {
              _self.isImg = false
              localStorage.setItem('isImg', 'false')
              fd = new FormData()
            } else {
              _self.isImg = true
              localStorage.setItem('isImg', 'true')
              fd = new FormData()
            }
          })
	  },
	  

      aaaa() {
        var _self = this
        fd.append('id', _self.dakaid)
        console.log('aaaa')
        this.$http({
          url: '/wq/iWoaFieldClockController.do?apifiledeal&timeStamp=123&token=1',
          method: 'post',
          dataType: 'json',
          processData: false,   //用FormData传fd时需有这两项
          contentType: false,
          data: fd,
        })
          .then(function (response) {
            if (response.data.msgCode == '50000') {
              _self.isImg = false
              localStorage.setItem('isImg', 'false')
              alert(response.data.msg)
              $('#imgDiv2').show()
              fd = new FormData()
            } else if (response.data.msgCode == '40000') {
              _self.isImg = true
              localStorage.setItem('isImg', 'true')
              fd = new FormData()
              _self.bbb()
            }
          })
	  },
	  

      bbb() {
        let _self = this
        let _role = sessionStorage.getItem('data2')
        let _data = {}
        if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
          _data.address2 = _self.weizhi
          _data.id = sessionStorage.getItem('dakaa')
          _data.remark = document.getElementById('zj').value
          _data.productname = _self.productName
        } else {
          _data.address2 = _self.weizhi
          _data.id = sessionStorage.getItem('dakaa')
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
			  //	跳转打卡成功提示页面！
            }
          })
	  },
	  //	获取未结束的打卡记录
      queryUnfinishedPunchCard() {
        let _self = this
        $('#gsdiv').hide()
        $('#gs2').show()
        this.$http.get('/wq/iWoaFieldClockController.do?apiQueryUnfinishedPunchCard&token=1&timeStamp=123')
          .then(function (response) {
            var ls = response.data.data.unfinishedPunchCard.date
            _self.dakaid = ls.id
            $('#gs2').append(ls.companyname)
            _self.aaa()
          })
      },
      // 启动计时器
      a() {
        var _self = this
        _self.int = setInterval(() => {
          _self.start(_self.time)
        })
      },
      // 计时器启动，计算时间差
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

      //获取填充下拉列表，外勤类型
      A(n) {
        var _self = this
        this.$http.get('../static/legoutData.json')
          .then(function (response) {
            var _role = sessionStorage.getItem('data2')
            var _data

            if (_role == 'salers') {
              _data = response.data.salers
            } else if (_role == 'kj' || _role == 'kjzg') {
              _data = response.data.kj
            } else if (_role == 'planner') {
              _data = response.data.planner
            } else if (_role == 'servicer') {
              _data = response.data.servicer
            } else if (_role == 'gzyzg') {
              _data = response.data.gzyzg
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
            $('#waiqin').html(html3)

            $('.nice-select3 ul li').hover(function (e) {
              $(this).toggleClass('on')
              e.stopPropagation()
            })
            $('.nice-select3 ul li').click(function (e) {
              var val = $(this).text()
              if ($(this).attr('value') == '') {
                _self.waiqin = 1
              } else {
                _self.waiqin = $(this).attr('value')
              }
              $('.nice-select3').find('input')[0].value = val
              $('.nice-select3').find('ul').hide()
              e.stopPropagation()
            })
            $(document).click(function () {
              $('.nice-select3').find('ul').hide()
            })
          })
	  },
	  
      BB() {
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
        $('.nice-select').click(function (e) {
          document.getElementById('customerId').value = ''
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
          document.getElementById('customer2Id').value = ''
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
          document.getElementById('customer3Id').value = ''
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

        $('.nice-select4').click(function (e) {
          document.getElementById('customer4Id').value = ''
          $(this).find('ul').show()
          e.stopPropagation()
        })

        $('.nice-select4 ul li').hover(function (e) {
          $(this).toggleClass('on')
          e.stopPropagation()
        })
        $('.nice-select4 ul li').click(function (e) {
          var val = $(this).text()
          val = val.substring(0, val.indexOf('--'))
          $('.nice-select4 input').text = val
          $('.nice-select4').find('ul').hide()
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
            var ls = response.data.data.unfinishedPunchCard.date
            sessionStorage.setItem('dakaa', ls.id)
            _self.dakaid = ls.id
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
	  },
	  //	离开打卡
      likaidaka(m) {
        var _self = this
        var _role = sessionStorage.getItem('data2')
        if (_role == 'kj' || _role == 'kjzg' || _role == 'planner') {
          if (_self.weizhi != '' && document.getElementById('zj').value != '' && _self.productName != '') {
            if (_self.isImg != true) {
              _self.aaaa()
            } else {
              _self.bbb()
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
            if (_self.isImg != true) {
              _self.aaaa()
            } else {
              _self.bbb()
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

      init() {
        let _self = this
        window.addEventListener('message', function (event) {
          _self.loc = event.data; // 接收位置信息

          if (_self.loc && _self.loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
            var markUrl = 'https://apis.map.qq.com/tools/poimarker' +
              '?type=0&marker=coord:' + _self.loc.lat + ',' + _self.loc.lng +
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
        setTimeout(function () {
          if (!_self.loc) {
            //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
            document.getElementById("geoPage")
              .contentWindow.postMessage('getLocation.robust', '*');
          }
        }, 6000);
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
      },

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
      }
    },
    mounted() {
      var _self = this
      var input = document.getElementById("file_input");
      var result, div
      var reader = new FileReader(), img = new Image()
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')

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

      this.A()
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

      this.init()

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
            document.getElementById('customerId').scrollIntoViewIfNeeded();
          }
          else {
            //键盘收起的事件处理
            $('#footer1').show()
          }
        });
      }


      document.getElementById('customerId').oninput = function () {
        searchList(document.getElementById('customerId').value)
      }

      document.getElementById('customer2Id').oninput = function () {
        searchList2(document.getElementById('customer2Id').value)
      }

      document.getElementById('customer3Id').oninput = function () {
        searchList3(document.getElementById('customer3Id').value)
      }

      document.getElementById('customer4Id').oninput = function () {
        searchList4(document.getElementById('customer4Id').value)
      }

      function searchList(strValue) {
        var count = 0
        if (strValue != '') {
          setTimeout(function () {
            _self.$http({
              url: '/wq/iWoaFieldClockController.do?apiQueryCompany&token=1&timeStamp=123',
              method: 'post',
              data: {
                companyname: strValue,
                name: ''
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
                var html = ''
                for (var j = 0; j < response.data.length; j++) {
                  if (response.data[j].customerid == null && response.data[j].name == '空') {
                    html += '<li value=1 style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].companyname + '</li>'
                  } else {
                    html += '<li value=' + response.data[j].companyid + ' style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].companyname + '</li>'
                  }
                }
                $('#gongsi').html(html)

                $('.nice-select ul li').hover(function (e) {
                  $(this).toggleClass('on')
                  e.stopPropagation()
                })
                $('.nice-select ul li').click(function (e) {
                  var val = $(this).text()
                  _self.gongsi = $(this).val()
                  sessionStorage.setItem('Companyname', val)
                  var html2 = ''
                  var html3 = ''
                  for (var i = 0; i < response.data.length; i++) {
                    if (_self.gongsi == 1 && (response.data[i].companyid == null && response.data[i].customerid != null)) {
                      _self.isgongsi = true
                      html2 += '<li value=' + response.data[i].customerid + ' style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">' + response.data[i].name + '</li>'
                    } else if (_self.gongsi == response.data[i].companyid) {
                      _self.isgongsi = false
                      _self.customerid = response.data[i].customerid
                      document.getElementById('customer2Id').value = response.data[i].name
                      document.getElementById('customer4Id').value = response.data[i].tel
                      html2 = '<li value=' + response.data[i].customerid + ' style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">' + response.data[i].name + '</li>'
                      html3 = '<li value=' + response.data[i].customerid + ' style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">' + response.data[i].tel + '</li>'
                    } else if (_self.gongsi == 1 && (response.data[i].companyid == null && response.data[i].customerid == null)) {
                      _self.isgongsi = true
                      break
                    }
                  }
                  if (_self.isgongsi == true) {
                    html2 += '<li value=1 style="height: 30px;\n' +
                      '    line-height: 2em;\n' +
                      '    overflow: hidden;\n' +
                      '    padding: 0 10px;\n' +
                      '    cursor: pointer;\n' +
                      '    border-top: 1px solid #d5d5d5;">空</li>'
                    html3 += '<li value=1 style="height: 30px;\n' +
                      '    line-height: 2em;\n' +
                      '    overflow: hidden;\n' +
                      '    padding: 0 10px;\n' +
                      '    cursor: pointer;\n' +
                      '    border-top: 1px solid #d5d5d5;">空</li>'
                    $('#kehu').html(html2)
                    $('#dianhua').html(html3)
                  } else {
                    $('#kehu').html(html2)
                    $('#dianhua').html(html3)
                  }
                  $('.nice-select2 ul li').hover(function (e) {
                    $(this).toggleClass('on')
                    e.stopPropagation()
                  })
                  $('.nice-select2 ul li').click(function (e) {
                    var val = $(this).text()
                    _self.customerid = $(this).val()
                    $('.nice-select2').find('input')[0].value = val
                    $('.nice-select2').find('ul').hide()
                    e.stopPropagation()
                  })
                  $(document).click(function () {
                    $('.nice-select2').find('ul').hide()
                  })

                  $('.nice-select4 ul li').hover(function (e) {
                    $(this).toggleClass('on')
                    e.stopPropagation()
                  })
                  $('.nice-select4 ul li').click(function (e) {
                    var val = $(this).text()
                    _self.customerid = $(this).val()
                    $('.nice-select4').find('input')[0].value = val
                    $('.nice-select4').find('ul').hide()
                    e.stopPropagation()
                  })
                  $(document).click(function () {
                    $('.nice-select4').find('ul').hide()
                  })
                  $('.nice-select').find('input')[0].value = val
                  $('.nice-select').find('ul').hide()
                  e.stopPropagation()
                })
                $(document).click(function () {
                  $('.nice-select').find('ul').hide()
                })
              })
          }, 2000)
        } else {
          $('.nice-select ul li').each(function (i) {
            $(this).show()
          })
          _self.A()
        }
      }

      function searchList2(strValue) {
        var count = 0
        if (strValue != '') {
          setTimeout(function () {
            _self.$http({
              url: '/wq/iWoaFieldClockController.do?apiQueryCompany&token=1&timeStamp=123',
              method: 'post',
              data: {
                companyname: '',
                name: strValue
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
                var html2 = ''
                for (var j = 0; j < response.data.length; j++) {
                  if (response.data[j].customerid == null && response.data[j].name == '空') {
                    html2 += '<li value=1 style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].name + '</li>'
                  } else {
                    html2 += '<li value=' + response.data[j].customerid + ' style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].name + '</li>'
                  }
                }
                $('#kehu').html(html2)

                $('.nice-select2 ul li').hover(function (e) {
                  $(this).toggleClass('on')
                  e.stopPropagation()
                })
                $('.nice-select2 ul li').click(function (e) {
                  var val = $(this).text()
                  _self.customerid = $(this).val()
                  var html1 = ''
                  var html2 = ''
                  for (var i = 0; i < response.data.length; i++) {
                    if (_self.customerid == 1) {
                      _self.iscustomerid = true
                      html1 = '<li value=1 style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">空</li>'
                      html2 = '<li value=1 style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">空</li>'
                    } else {
                      _self.iscustomerid = false
                      if ((_self.customerid == response.data[i].customerid) && response.data[i].companyname != null) {
//                    count++
                        _self.customerid = response.data[i].customerid
                        document.getElementById('customer4Id').value = response.data[i].tel
                        html1 += '<li value=' + response.data[i].companyid + ' style="height: 30px;' +
                          '    line-height: 2em;' +
                          '    overflow: hidden;' +
                          '    padding: 0 10px;' +
                          '    cursor: pointer;' +
                          '    border-top: 1px solid #d5d5d5;">' + response.data[i].companyname + '</li>'
                        html2 = '<li value=' + response.data[i].customerid + ' style="height: 30px;' +
                          '    line-height: 2em;' +
                          '    overflow: hidden;' +
                          '    padding: 0 10px;' +
                          '    cursor: pointer;' +
                          '    border-top: 1px solid #d5d5d5;">' + response.data[i].tel + '</li>'
                      } else if ((_self.customerid == response.data[i].customerid) && response.data[i].companyname == null) {
                        _self.customerid = response.data[i].customerid
                        document.getElementById('customer4Id').value = response.data[i].tel
                        html2 = '<li value=' + response.data[i].customerid + ' style="height: 30px;' +
                          '    line-height: 2em;' +
                          '    overflow: hidden;' +
                          '    padding: 0 10px;' +
                          '    cursor: pointer;' +
                          '    border-top: 1px solid #d5d5d5;">' + response.data[i].tel + '</li>'
                      }
                    }
                  }
                  if (_self.iscustomerid == false) {
                    html1 += '<li value=1 style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">空</li>'
                    $('#gongsi').html(html1)
                    $('#dianhua').html(html2)
                  } else {
                    $('#gongsi').html(html1)
                    $('#dianhua').html(html2)
                  }

                  $('.nice-select ul li').hover(function (e) {
                    $(this).toggleClass('on')
                    e.stopPropagation()
                  })
                  $('.nice-select ul li').click(function (e) {
                    var val = $(this).text()
                    _self.gongsi = $(this).val()
                    sessionStorage.setItem('Companyname', val)
                    $('.nice-select').find('input')[0].value = val
                    $('.nice-select').find('ul').hide()
                    e.stopPropagation()
                  })
                  $(document).click(function () {
                    $('.nice-select4').find('ul').hide()
                  })

                  $('.nice-select4 ul li').hover(function (e) {
                    $(this).toggleClass('on')
                    e.stopPropagation()
                  })
                  $('.nice-select4 ul li').click(function (e) {
                    var val = $(this).text()
                    _self.customerid = $(this).val()
                    $('.nice-select4').find('input')[0].value = val
                    $('.nice-select4').find('ul').hide()
                    e.stopPropagation()
                  })
                  $(document).click(function () {
                    $('.nice-select').find('ul').hide()
                  })
                  $('.nice-select2').find('input')[0].value = val
                  $('.nice-select2').find('ul').hide()
                  e.stopPropagation()
                })
                $(document).click(function () {
                  $('.nice-select2').find('ul').hide()
                })
              })
          }, 2000)
        } else {
          $('.nice-select2 ul li').each(function (i) {
            $(this).show()
          })
          _self.A()
        }
      }

      function searchList3(strValue) {
        var count = 0
        if (strValue != '') {
          $('.nice-select3 ul li').each(function (i) {
            var contentValue = $(this).text()
            if (contentValue.toLowerCase().indexOf(strValue.toLowerCase()) < 0) {
              $(this).hide()
              count++
            } else {
              $(this).show()
            }
            if (count == (i + 1)) {
              $('.nice-select3').find('ul').hide()
            } else {
              $('.nice-select3').find('ul').show()
            }
          })
        } else {
          $('.nice-select3 ul li').each(function (i) {
            $(this).show()
          })
        }
      }

      function searchList4(strValue) {
        var count = 0
        if (strValue != '') {
          setTimeout(function () {
            _self.$http({
              url: '/wq/iWoaFieldClockController.do?apiQueryCompany&token=1&timeStamp=123',
              method: 'post',
              data: {
                companyname: '',
                name: '',
                tel: strValue
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
                let html4 = ''
                for (var j = 0; j < response.data.length; j++) {
                  if (response.data[j].customerid == null && response.data[j].name == '空') {
                    html4 += '<li value=1 style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].name + '</li>'
                  } else {
                    html4 += '<li value=' + response.data[j].customerid + ' style="height: 30px;' +
                      '    line-height: 2em;' +
                      '    overflow: hidden;' +
                      '    padding: 0 10px;' +
                      '    cursor: pointer;' +
                      '    border-top: 1px solid #d5d5d5;">' + response.data[j].tel + '</li>'
                  }
                }
                $('#dianhua').html(html4)

                $('.nice-select4 ul li').hover(function (e) {
                  $(this).toggleClass('on')
                  e.stopPropagation()
                })
                $('.nice-select4 ul li').click(function (e) {
                  var val = $(this).text()
                  _self.customerid = $(this).val()
                  var html1 = ''
                  var html2 = ''
                  for (var i = 0; i < response.data.length; i++) {
                    if (_self.customerid == 1) {
                      html1 = '<li value=1 style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">空</li>'
                      html2 = '<li value=1 style="height: 30px;\n' +
                        '    line-height: 2em;\n' +
                        '    overflow: hidden;\n' +
                        '    padding: 0 10px;\n' +
                        '    cursor: pointer;\n' +
                        '    border-top: 1px solid #d5d5d5;">空</li>'
                    } else {
                      if ((_self.customerid == response.data[i].customerid) && response.data[i].companyname != null) {
//                    count++
                        _self.customerid = response.data[i].customerid
                        document.getElementById('customer2Id').value = response.data[i].name
                        html1 = '<li value=' + response.data[i].customerid + ' style="height: 30px;' +
                          '    line-height: 2em;' +
                          '    overflow: hidden;' +
                          '    padding: 0 10px;' +
                          '    cursor: pointer;' +
                          '    border-top: 1px solid #d5d5d5;">' + response.data[i].name + '</li>'
                        html2 += '<li value=' + response.data[i].companyid + ' style="height: 30px;' +
                          '    line-height: 2em;' +
                          '    overflow: hidden;' +
                          '    padding: 0 10px;' +
                          '    cursor: pointer;' +
                          '    border-top: 1px solid #d5d5d5;">' + response.data[i].companyname + '</li>'
                      }
                    }
                  }
                  $('#kehu').html(html1)
                  $('#gongsi').html(html2)

                  $('.nice-select ul li').hover(function (e) {
                    $(this).toggleClass('on')
                    e.stopPropagation()
                  })
                  $('.nice-select ul li').click(function (e) {
                    var val = $(this).text()
                    _self.gongsi = $(this).val()
                    sessionStorage.setItem('Companyname', val)
                    $('.nice-select').find('input')[0].value = val
                    $('.nice-select').find('ul').hide()
                    e.stopPropagation()
                  })
                  $(document).click(function () {
                    $('.nice-select').find('ul').hide()
                  })
                  $('.nice-select4').find('input')[0].value = val
                  $('.nice-select4').find('ul').hide()
                  e.stopPropagation()
                })
                $(document).click(function () {
                  $('.nice-select4').find('ul').hide()
                })
              })
          }, 2000)
        } else {
          $('.nice-select4 ul li').each(function (i) {
            $(this).show()
          })
          _self.A()
        }
      }

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

  .nice-select4 input {
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

  .nice-select4 {
    position: relative;
    width: 73%;
    -webkit-border-radius: .3em;
    -moz-border-radius: .3em;
    border-radius: .3em;
  }

  .nice-select4 ul {
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

  .nice-select4 ul li {
    height: 30px;
    line-height: 2em;
    overflow: hidden;
    padding: 0 10px;
    cursor: pointer;
    border-top: 1px solid #d5d5d5;
  }

  .nice-select4 ul li.on {
    background-color: #e0e0e0;
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
