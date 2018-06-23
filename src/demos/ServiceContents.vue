<template>
  <div>
    <simple-header title="会计服务内容" :back-link="true"></simple-header>
    <page-content>
      <center style="margin-top: 3%">
        <b>{{ gs }}</b>
      </center>
      <div style="margin: 3% 6% 0 6%;">
        <b>业务描述</b><br>
        <textarea id="ywms" style="margin-left: 17%;width: 70%;height: 130px;background-color: #f9f9f9"></textarea>
      </div>
      <div style="margin: 3% 6% 0 6%;">
        <b>解决思路</b><br>
        <textarea id="jjsl" style="margin-left: 17%;width: 70%;height: 130px;background-color: #f9f9f9"></textarea>
      </div>
      <div style="margin: 3% 6% 0 6%;">
        <b>检查周期</b><br>
        <select class="hf" id="jczq">
<!--          <option>每次</option>
          <option>每月</option>
          <option>每季度</option>
          <option>每年</option>-->
        </select>
      </div>
      <div style="margin: 3% 6% 0 6%;">
        <b>检查锚点</b><br>
        <select class="hf" id="jcmd">
<!--          <option>每周</option>
          <option>每月</option>
          <option>每季度</option>
          <option>每年</option>-->
        </select>
      </div>
      <div style="margin: 3% 6% 15% 6%;">
        <b>初访备注</b><br>
        <textarea id="beizhu" style="margin-left: 17%;width: 70%;height: 130px;background-color: #f9f9f9"></textarea>
      </div>
    </page-content>
    <page-footer>
      <footer-item>
        <div class="content-block" style="width: 73%">
          <p>
            <m-button size="small" style="width: 70%;background-color: white;color: inherit" @click.native="goto()">选择模板</m-button>
          </p>
        </div>
      </footer-item>
      <footer-item>
        <div class="content-block" style="width: 73%">
          <p>
            <m-button size="small" style="width: 70%" @click.native="next()">确认离开</m-button>
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
        gs: '',
        dakaid: ''
      }
    },
    methods: {
      getData () {
        var _self = this
        _self.gs = localStorage.getItem('Companyname')
        if (sessionStorage.getItem('moban') != '') {
          var url = '/api/iWoaMobileAccountHomeController.do?apiQueryChooseTemplate&token=1&timeStamp=123'
          url = url + '&templateId='+sessionStorage.getItem('moban')
          this.$http.get(url)
            .then(function (data) {
              console.log(data.data)
              document.getElementById('ywms').value = data.data[0].businessDescription
              document.getElementById('jjsl').value = data.data[0].solvingIdeas
             /* $("#jczq").prepend("<option value='"+data.data[0].searchCycleT+"'>"+data.data[0].searchCycleT+"</option>")
              $("#jcmd").prepend("<option value='"+data.data[0].anchorT+"'>"+data.data[0].anchorT+"</option>")*/
            })
            .catch(function (data) {
              console.log(data)
            })
        }
        this.$http.get('/api/iWoaMobileAccountHomeController.do?apiQueryChooseCheck&token=1&timeStamp=123')
          .then(function (data) {
            var html = ''
            var html2 = ''
            for (var i = 0; i < data.data.checkAnchor.length; i++) {
              html += '<option value="'+data.data.checkAnchor[i].typecode+'">'+data.data.checkAnchor[i].typename+'</option>'
            }
            for (var i = 0; i < data.data.checkCycle.length; i++) {
              html2 += '<option value="'+data.data.checkCycle[i].typecode+'">'+data.data.checkCycle[i].typename+'</option>'
            }
            $('#jcmd').append(html)
            $('#jczq').append(html2)
          })
          .catch(function (data) {
            console.log(data)
          })
      },
      next () {
        var _self = this
        ///api/iWoaMobileAccountHomeController.do?apiQueryServiceTime&token=1&timeStamp=123
        var url = '/api/iWoaMobileAccountHomeController.do?apiQueryServiceTime&token=1&timeStamp=123'
        url = url + '&companyId=' + localStorage.getItem('gsid')
        this.$http.get(url)
          .then(function (data) {
            _self.dakaid = data.data.leg.pushCardId
            _self.next2()
          })
          .catch(function (data) {
            console.log(data)
          })
/*        localStorage.clear()
        sessionStorage.clear()
        console.log('清除缓存成功')*/
      },
      goto () {
        window.location.href = '/#/moban'
      },
      next2 () {
        var _self = this
        this.$http({
          ///api/iWoaMobileAccountHomeController.do?apiManagePunchCardLeaveSave&timeStamp=123&token=1
          url: '/api/iWoaMobileAccountHomeController.do?apiManagePunchCardLeaveSave&timeStamp=123&token=1',
          method: 'post',
          async: false,
          data: {
            endtime: sessionStorage.getItem('shijian'),
            endaddress: localStorage.getItem('weizhi'),
            legworkPushCardId: _self.dakaid,
            workmemo: document.getElementById('beizhu').value,
            searchcyclec: $('#jczq').val(),
            anchorc : $('#jcmd').val(),
            templateId: sessionStorage.getItem('moban')
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
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style scoped>
  .hf {
    width: 71%;
    border-radius: .3em;
    line-height: 1.8em;
    height: 1.8em;
    background-color: #f9f9f9;
    font-size: 1em;
    padding: 0 6px;
    margin-left: 17%;
  }
</style>
