<template>
  <div>
    <simple-header title="会计服务内容" :back-link="true"></simple-header>
    <page-content>
    <center style="margin-top: 3%">
      <b>{{ gs }}</b>
    </center>
      <div style="margin: 3% 6% 0 6%;display: none" id="kjhs">
      </div>
      <div style="margin: 3% 6% 0 6%;display: none" id="cscl">
        <b>税务处理</b><br>
      </div>
      <div style="margin: 3% 6% 0 6%;display: none" id="cwgl">
        <b>财务管理</b><br>
      </div>
      <div style="margin: 3% 6% 0 6%;display: none" id="cspx">
        <b>财税培训</b><br>
      </div>
      <div style="margin: 3% 6% 0 6%;display: none" id="cszx">
        <b>财税咨询</b><br>
      </div>
      <div style="margin: 8% 6% 0 6%;" id="cerw">
        <b>超额任务</b>
        <img src="../../static/add.png" style="float: right" @click="diag2"/>
        <br>
        <div id="cnLable2" style="margin-top: 3%;">
          <span>超额1</span><textarea name='1' id='1111' cols='30' rows='3' style='margin-left: 5%;width: 65%;vertical-align:top'></textarea><br><br>
        </div>
      </div>
      <div style="margin: 6% 6% 0 6%;" id="xs">
        <b>线索</b>
        <img src="../../static/add.png" style="float: right" @click="diag"/>
        <br>
        <div id="cnLable" style="margin-bottom: 15%;margin-top: 3%;">
          <span>线索1</span><textarea name='2' id="2222" cols='30' rows='3' style='margin-left: 5%;width: 65%;vertical-align:top'></textarea><br><br>
        </div>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div class="content-block" style="width: 73%">
          <p>
            <m-button size="small" style="width: 70%" @click.native="next()">确定离开</m-button>
          </p>
        </div>
      </footer-item>
    </page-footer>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'
  import { Footer, SecondFooter, FooterItem } from '../components/footer'
  import { Button } from '../components/buttons'
  import $ from 'jquery'

  export default {
    components: {
      SimpleHeader,
      'page-content': Content,
      'page-footer': Footer,
      SecondFooter,
      FooterItem,
      'm-button': Button
    },
    data () {
      return {
        value: '',
        gs: '',
        num: 2,
        num2: 2,
        ls: [],
        c: [],
        bb: [],
        pushCardId: ''
      }
    },
    methods: {
      first () {
        var _self = this
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryServiceTime&token=1&timeStamp=123'
        url = url + '&companyId=' + sessionStorage.getItem('companyid')
        this.$http.get(url)
          .then(function (response) {
            alert(response.data.leg.pushCardId)
            _self.pushCardId = response.data.leg.pushCardId
            _self.getData()
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      getData () {
        var _self = this
        _self.gs = localStorage.getItem('Companyname')
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryFinishItem&timeStamp=123&token=1'
        url = url + '&legworkPushCardId=' +  _self.pushCardId
        this.$http.get(url)
          .then(function (response) {
            $('#kjhs').show()
            console.log(response.data)
            var ls = response.data
            var html = ''
            _self.ls = response.data
            for (var i = 0; i < ls.length; i++) {
              html += '<label><input style="margin: 3% 0 3% 0" type="checkbox" id='+ls[i].serviceContractItemId+' value='+ls[i].serviceContractItemName+'>'+ls[i].serviceContractItemName+'</label><br>'
              if (ls[i].workreport != undefined) {
                html += '<textarea id='+ls[i].arId+'>'+ls[i].workreport+'</textarea><br>'
              } else {
                html += '<textarea id='+ls[i].arId+'></textarea><br>'
              }
            }
            $('#kjhs').append(html)
            $('#kjhs textarea').each(function () {
              this.setAttribute('style', 'height:auto;overflow-y:hidden;vertical-align:top;width:100%');
            }).on('input', function () {
              this.style.height = 'auto';
              this.style.height = (this.scrollHeight) + 'px';
            });
          })
          .catch(function (response) {
            console.log(response)
          })
      },
      next () {
        var _self = this
        _self.chaoe()
        var p = {}
        var a = []
        var aa = []
        var aaa = []
        for (var i = 0; i < _self.ls.length; i++) {
          var a1 = {}
          if(document.getElementById(_self.ls[i].serviceContractItemId).checked){
            a1.isfinished = 1
          } else {
            a1.isfinished = 0
          }
          a1.arId = _self.ls[i].arId
          a1.serviceContractItemId = _self.ls[i].serviceContractItemId
          a1.workreport = document.getElementById(_self.ls[i].arId).value
          a.push(a1)
        }
        for (var i = 0; i < (_self.c).length; i++) {
          var b1 = {}
          b1.taskcontext = (_self.c)[i]
          if (b1.taskcontext != '') {
            aa.push(b1)
          }
        }
        for (var i = 0; i < (_self.bb).length; i++) {
          var a1 = {}
          a1.cluescontent = (_self.bb)[i]
          if (a1.cluescontent != '') {
            aaa.push(a1)
          }
        }
        p.serviceItems = JSON.stringify(a)
        p.excessTask = JSON.stringify(aa)
        p.clues = JSON.stringify(aaa)
        p.endaddress = localStorage.getItem('weizhi')
        p.legworkPushCardId = _self.pushCardId
        console.log(p)
        this.$http({
          ///api/iWoaMobileAccountHomeController.do?apiPunchCardLeaveSave&timeStamp=123&token=1
          url: '/api/iWoaMobileAccountHomeController.do?apiPunchCardLeaveSave&timeStamp=123&token=1',
          method: 'post',
          async: false,
          data: p,
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
        localStorage.clear()
        sessionStorage.clear()
        console.log('清除缓存成功')
      },
      diag () {
        let _self = this
        $('#cnLable').append("<span>线索"+_self.num+"</span><textarea name='2' id="+(_self.num*5000)+ " cols='30' rows='3' style='margin-left: 5%;width: 65%;vertical-align:top'></textarea><br><br>");
        _self.num = _self.num + 1
      },
      diag2 () {
        let _self = this
        $('#cnLable2').append("<span>超额"+_self.num2+"</span><textarea name='1' id="+(_self.num2*100)+" cols='30' rows='3' style='margin-left: 5%;width: 65%;vertical-align:top'></textarea><br><br>");
        _self.num2 = _self.num2 + 1
      },
      chaoe (a) {
        var _self = this
        var q = document.getElementsByName("1")
        var p = document.getElementsByName("2")
        var a = {}
        var a1 = []
        var b = {}
        var b1 = []
        // 超额任务
        for(var i=0;i<q.length;i++){
          b[i] = q[i].id
          b1.push(b[i])
        }
        for (var j = 0; j < b1.length; j++) {
          (_self.c)[j] = document.getElementById(b1[j]).value
        }
        // 线索
        for(var i=0;i<p.length;i++){
          a[i] = p[i].id
          a1.push(a[i])
        }
        for (var j = 0; j < a1.length; j++) {
          (_self.bb)[j] = document.getElementById(a1[j]).value
        }
      }
    },
    mounted () {
      this.first()
    }
  }
</script>
