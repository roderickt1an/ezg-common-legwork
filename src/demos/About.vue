<template>
  <div class="my-page">
    <page-header>
      <header-title>{{ ktitle }}</header-title>
    </page-header>
    <page-content>
      <div id="app">
        <div id="wqlxdiv">
          <center>
            <div style="margin-top: 3%"></div>
            <select style="width: 70%;height: 30px;" id="wqlx" name="123">
              <option value="" id="two" name="two">— 请选择外勤类型 —</option>
            </select>
          </center>
        </div>
        <div id="gsdiv" style="display: none">
          <center>
            <div style="margin-top: 3%"></div>
            <select style="width: 70%;height: 30px;" id="gongsi" name="123">
              <option value="" id="one" name="one">— 请选择公司 —</option>
            </select>
          </center>
        </div>
        <div id="hflxdiv" style="display: none">
          <center>
            <div style="margin-top: 3%"></div>
            <select style="width: 70%;height: 30px;" id="hflx" name="123">
              <option value="" id="tree" name="tree">主管回访</option>
            </select>
          </center>
        </div>
        <div style="font-size: 14px;margin-top: 3%">
<!--          <div id="container" style="height:300px;"></div>-->
          <iframe id="markPage" width="100%" height="280px" frameborder=0 scrolling="no" src=""></iframe>
          <iframe id="geoPage" width="100%" height="30%" frameborder=0 scrolling="no" style="display: none"
                  src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&effect=zoom"></iframe>
        </div>
        <br>
        <div style="margin-top: 3%"></div>
        <div id="fuwusj" style="display: none">
          <br>
          <span>本次服务时间：</span>
          <span style="float: right;padding-right: 18%" id="fuwu">{{ fwxs }}小时{{ fwfen }}分</span>
        </div>
        <div style="text-align: left;font-size: 14px;padding-left: 14%">
          <span>会计到家剩余服务账期：</span>
          <span id="syzq" style="float: right;padding-right: 18%"></span>
        </div>
        <div style="text-align: left;font-size: 14px;padding-left: 14%">
          <span>本月已打卡次数：</span>
          <span id="dkcs" style="float: right;padding-right: 18%"></span>
        </div>
        <div style="text-align: left;font-size: 14px;padding-left: 14%">
          <span>本月剩余服务时长：</span>
          <span id="fwsc" style="float: right;padding-right: 18%"></span>
        </div>
        <center>
          <div style="width: 55%;height: 145px;font-weight: bold">
            <div style="font-size: 14px;text-align: center;padding-top: 8%">
              <p>{{ nian }}年{{ yue }}月{{ ri }}日</p>
              <p>{{ xiaoshi }}：{{ fen }}：{{ miao }}</p>
            </div>
            <div class='content-padded'>
              <div class="content-block">
                <p>
                  <m-button id="smdk" style="display: block" v-on:click.native="B()" content="smdk">上门打卡</m-button>
                  <!--  <m-button id="lkdk" style="display: none" v-on:click.native="testA();$refs.prompt.open()">离开打卡</m-button>-->
                </p>
              </div>
            </div>
          </div>
        </center>
      </div>
      <div id="cunchu" style="display: none"></div>
    </page-content>
  </div>
</template>
<script>
  import Grid from '../components/grid'
  import { Header, HeaderLink, HeaderTitle } from '../components/header'
  import Content from '../components/content'
  import { Button, ButtonGroup } from '../components/buttons'
  import { Prompt } from '../components/modal'
  import Vue from 'vue'
//  import AMap from 'AMap'
  import $ from 'jquery'


/*  var map
  var geolocation*/
  export default {
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid,
      ButtonGroup,
      Prompt,
      'm-button': Button
    },
    data () {
      var self = this
      return {
        waiqin: '',
        options: [],
        r: [],
        ServiceHoursId: '',
        test: '',
        hour: '',
        ktitle: '会计打卡',
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
        serviceHoursid: '',
        did: '',
        companyID: '',
        result: '',
        loc: '',
        isMapInit: false
      }
    },
    methods: {
/*      //解析定位结果
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
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
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

      //判断是否为服务会计
      judge () {
        console.log('444'+localStorage.getItem('judge'))
        var _self = this
        if (localStorage.getItem('judge') == '' || localStorage.getItem('judge') == null) {
          var id = window.location.href
          var result2 = id.split('?')[1]
          _self.result = result2
        }
        if (_self.result == 'f' || localStorage.getItem('judge') == 'f') {
          _self.wq()
        } else {
          _self.zg()
        }
      },

      //主管会计
      zg () {
        alert('主管会计')
        var _self = this
        _self.ktitle = '主管会计打卡'
        $("#hflxdiv").show();
        $("#gsdiv").show();
        $("#wqlxdiv").hide();
        var url = '/api/iWoaMobileDownQueryController.do?apiQueryDownQueryAccountHomeCompany&token=1&timeStamp=123'
        console.log('selected=' + localStorage.getItem('selected'))
        ///api/iWoaMobileDownQueryController.do?apiQueryDownQueryAccountHomeCompany&token=1&timeStamp=123
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            for (var j = 0; j < response.data.length; j++) {
              $('#gongsi').append('<option value=\'' + response.data[j].companyId + '\' id=\'' + response.data[j].companyId + '\'>' + response.data[j].CompanyName + '</option>')
            }
            $('#gongsi').searchableSelect()
            $('#hflx').searchableSelect()

            $('#gongsi').change(function () {
              var p = document.getElementById('gongsi').value
              console.log('所选中的公司id为：' + p)
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].companyId == p) {
                  _self.companyid = response.data[i].companyId
                  _self.did = response.data[i].id
                  _self.serviceHoursid = response.data[i].serviceHoursId
                  document.getElementById('syzq').textContent = response.data[i].serviceMonthTime + '月'
                  document.getElementById('dkcs').textContent = response.data[i].visitsnum + '次'
                  document.getElementById('fwsc').textContent = response.data[i].remainingTime + '小时'
                }
              }
            })
            if (localStorage.getItem('selected') != null) {
              _self.C()
            }
          })
      },

      //获取外勤类型填充下拉列表
      wq () {
        var _self = this
        _self.ktitle = '服务会计打卡'
        ///api/iWoaMobileAccountHomeController.do?apiQueryDownQueryFieldType&token=1&timeStamp=123
        this.$http.get('/api/iWoaMobileAccountHomeController.do?apiQueryFieldType&token=1&timeStamp=123')
          .then(function (response) {
            console.log(response.data)
            for (var j = 0; j < response.data.length; j++) {
              $('#wqlx').append('<option value=\'' + response.data[j].typecode + '\' id=\'' + response.data[j].typecode + '\'>' + response.data[j].typename + '</option>')
            }
            $('#wqlx').searchableSelect()

            $('#wqlx').change(function () {
              var q = document.getElementById('wqlx').value
              console.log('所选中的外勤类型id为：' + q)
              _self.A(q)
            })

            if (localStorage.getItem('selected') != null) {
              _self.C()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      //获取公司填充下拉列表
      A (n) {
        $("#gsdiv").show();
        var _self = this
        var url = '/api/iWoaMobileDownQueryController.do?apiQueryDownQueryAccountHomeCompany&token=1&timeStamp=123'
        var typecode = '&typecode=' + n
        url = url + typecode
        console.log('selected=' + localStorage.getItem('selected'))
        ///api/iWoaMobileDownQueryController.do?apiQueryDownQueryAccountHomeCompany&token=1&timeStamp=123
        this.$http.get(url)
          .then(function (response) {
            console.log(response.data)
            for (var j = 0; j < response.data.length; j++) {
              $('#gongsi').append('<option value=\'' + response.data[j].companyId + '\' id=\'' + response.data[j].companyId + '\'>' + response.data[j].CompanyName + '</option>')
            }
            $('#gongsi').searchableSelect()

            $('#gongsi').change(function () {
              var p = document.getElementById('gongsi').value
              console.log('所选中的公司id为：' + p)
              for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].companyId == p) {
                  _self.companyid = response.data[i].companyId
                  _self.did = response.data[i].id
                  _self.serviceHoursid = response.data[i].serviceHoursId
                  document.getElementById('syzq').textContent = response.data[i].serviceMonthTime + '月'
                  document.getElementById('dkcs').textContent = response.data[i].visitsnum + '次'
                  document.getElementById('fwsc').textContent = response.data[i].remainingTime + '小时'
                }
              }
            })
            /*              if (localStorage.getItem('selected') != null) {
                            _self.C()
                          }*/
          })
          .catch(function (error) {
            console.log(error)
          })
      },

      //点击上门打卡按钮
      B () {
        var _self = this
        localStorage.setItem('judge', _self.result)
        localStorage.setItem('selected', document.getElementById('gongsi').value) //存储所选择的选项的值
        localStorage.setItem('wq', document.getElementById('wqlx').value)
        if (document.getElementById('smdk').textContent == '上门打卡') {
          if (localStorage.getItem('judge') == 'f') {
            document.getElementById('smdk').textContent = '离开打卡'
            _self.C()
            window.location.href = '/#/options?dropIn'
          } else {
            console.log('上门打卡')
            var punchcardtime
            punchcardtime = _self.nian + '-' + _self.yue + '-' + _self.ri + ' ' + _self.xiaoshi + ':' + _self.fen + ':' + _self.miao
            this.$http({
              ///api/iWoaMobileAccountHomeController.do?apiFieldPunchCardSave&timeStamp=123&token=1
              url: '',
              method: 'post',
              async: false,
              data: {
                time: punchcardtime,
                serviceHoursId: _self.serviceHoursid,
                address: _self.weizhi,
                remark: _self.weizhi
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
            document.getElementById('smdk').textContent = '离开打卡'
            _self.C()
            //          history.go(0)
            return
          }
        } else {
          console.log(localStorage.getItem('judge'))
          if (localStorage.getItem('judge') == 'f') {
            _self.companyID = localStorage.getItem('companyID')
            _self.C()
            window.location.href = '/#/options?leave'
          } else {
            console.log(localStorage.getItem('judge'))
            _self.companyID = localStorage.getItem('companyID')
            _self.C()
            window.location.href = '/#/BusinessTracking'
          }
        }
      },

      //获取最新打卡id
      C (a) {
        var _self = this
        var sid = localStorage.getItem('selected')
        var aid = localStorage.getItem('companyID') == null ? _self.companyID : localStorage.getItem('companyID')
        console.log('sid=' + sid)
        console.log('selected不为空')
        document.getElementById('smdk').textContent = '离开打卡'
        var url = '/api/iWoaMobileDownQueryController.do?apiQueryDownQueryServiceTime&token=1&timeStamp=123'
        if (sid != null && sid != '') {
          url = url + '&companyId=' + sid
        } else {
          url = url + '&companyId=' + aid
        }
        this.$http.get(url)
          .then(function (responses) {
            console.log(responses.data)
            document.getElementById('s').textContent = responses.data.CompanyName
            _self.did = responses.data.id
            var date1 = responses.data.punchCardTime
            date1 = Date.parse(new Date(date1))
            var date2 = Date.parse(new Date())
            var date3 = date2 - date1
            var days = Math.floor(date3 / (24 * 3600 * 1000))
            //计算出小时数
            var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000))
            var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000))
            document.getElementById('gongsi').textContent = responses.data.CompanyName
            document.getElementById('wqlx').textContent = localStorage.getItem('wq')
            document.getElementById('gongsi').value = responses.data.companyId
            localStorage.setItem('companyID', responses.data.companyId)
            var _companyid = responses.data.companyId
            if (!_companyid) {
              _companyid = _self.companyID
            }
            localStorage.getItem('a', responses.data.companyId)
            document.getElementById('syzq').textContent = responses.data.serviceMonthTime + '月'
            document.getElementById('dkcs').textContent = responses.data.visitsnum + '次'
            document.getElementById('fwsc').textContent = responses.data.remainingTime + '小时'
            document.getElementById('fuwusj').style = 'display:block;text-align: left;font-size: 14px;padding-left: 14%;font-weight:bold;'
            if (isNaN(hours)) {
              document.getElementById('fuwu').textContent = '0小时' + '0分'
            } else {
              document.getElementById('fuwu').textContent = hours + '小时' + minutes + '分'
            }
            _self.companyid = responses.data.companyId
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      //提交服务总结
      /*      log (m) {
              var _self = this
              var a = localStorage.getItem('companyID')
              _self.C(a)
              var leavetime = _self.nian + '-' + _self.yue + '-' + _self.ri + ' ' + _self.xiaoshi + ':' + _self.fen + ':' + _self.miao
              this.$http({
                url: '/api/iWoaMobileAccountHomeController.do?apiFieldPunchCardLeaveSave&timeStamp=123&token=1',
                method: 'post',
                async:false,
                data: {
                  leavetime: leavetime,
                  servicesummary: m ,
                  id: _self.did,
                  address: _self.weizhi
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
                alert('提交成功~')
              _self.D()
                WeixinJSBridge.invoke('closeWindow',{},function(res){
                })
                if (typeof WeixinJSBridge === "undefined") {
                  document.addEventListener('WeixinJSBridgeReady', readyFunc, false);
                } else {
                  readyFunc();
                }
              history.go(0)
            }*/,
    },
    mounted () {
      this.judge()
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
      let _self = this
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
    }
  }
</script>
